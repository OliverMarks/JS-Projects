import json
import logging
import math
from datetime import datetime

from prototype.clients.google_trends_client import GoogleTrendsClient
from prototype.logger import get_logger
from prototype.models.City import City
from prototype.models.RankingResult import RankingResult

logger = logging.getLogger('handler')


class CityPopularityRankHandler:

    def __init__(self, google_trends_client):
        self._client = google_trends_client
        self._query_count = 0

    def get_popularity_rank(self, cities: dict, order_so_far=None, query_size=5):
        ranking_set = []
        for geo_id, data in cities.items():
            _city = City(geo_id, data['name'], data['population'])
            ranking_set.append(_city)
        ranking_set.sort(key=lambda x: x.population, reverse=True)

        # Seed with the initial query size if pre-ranked list isn't given
        if order_so_far is None:
            initial_query_cities = ranking_set[:query_size]
            ranked_cities = self._get_rank(initial_query_cities).ranked
        else:
            ranked_cities = []
            for city in order_so_far:
                _city_details = cities[city.split("-")[-1]]
                _city = City(_city_details["geonameid"], _city_details["name"], _city_details["population"])
                ranked_cities.append(_city)

        logger.critical(f'Ranking {len(ranking_set)} cities...')

        # Insert one at a time into ranked list
        for num, city in enumerate(ranking_set):
            if city not in ranked_cities:
                logger.info(f'CITY {num} {city.name}::QUERIES {self._query_count}::{datetime.now().isoformat()}')
                insertion_index = self._get_insertion_index(ranked_cities, city, 0, len(ranked_cities) - 1, query_size)
                ranked_cities.insert(insertion_index, city)
                logger.info(f'Ranking so far:')
                logger.info(json.dumps([city.__repr__() for city in ranked_cities]))
        return ranked_cities

    def _get_rank(self, cities: [City]) -> RankingResult:
        ranked_cities = self._client.rank_cities(cities)
        self._query_count += 1
        return ranked_cities

    def _get_insertion_index(self, ranked_cities, city, starting_index, end_index, query_size):
        search_indices = self._get_equally_spaced_indices(end_index + 1 - starting_index, query_size - 1)
        try:
            # search equally
            search_indices = [num + starting_index for num in search_indices]
            search_cities = [ranked_cities[ind] for ind in search_indices]
            search_cities.append(city)
            results = self._get_rank(search_cities)
            position = results.ranked.index(city)
            rating = results.ratings[city]

            if len(search_indices) == 1:
                binding_indices = search_indices[0] + position, search_indices[0] + position

            # zoom in if poorly resolved result
            elif list(results.ratings.values()).count(rating) > 1:
                previous_index = self._get_previous_non_identical_index(results, position, rating, search_indices)
                next_index = self._get_next_non_identical_index(results, position, rating, search_indices)
                assert previous_index >= starting_index, f'previous index logic error! prev={previous_index}, start={starting_index}'
                assert next_index <= end_index, f'next index logic error! next={next_index}, end={end_index}'
                # prevent reiterating with the same inputs (getting stuck in an infinite loop)
                if (previous_index, next_index) == (starting_index, end_index):
                    if (previous_index + 1) not in search_indices:
                        previous_index += 1
                    elif (next_index - 1) not in search_indices:
                        next_index -= 1
                    # we can't zoom in unambiguously, so just return a tighter set of indices
                    else:
                        same_value_search_indices = list(filter(
                            lambda ind: results.ratings[ranked_cities[ind]] == rating,
                            search_indices
                        ))
                        if len(same_value_search_indices) == len(search_indices):
                            previous_index, next_index = same_value_search_indices[1], same_value_search_indices[-1]
                        else:
                            previous_index, next_index = same_value_search_indices[0], same_value_search_indices[-1]

                binding_indices = previous_index, next_index
                return self._get_insertion_index(ranked_cities, city, binding_indices[0], binding_indices[1], query_size)

            # handle boundaries
            elif position == len(search_indices):
                binding_indices = end_index + 1, end_index + 1
            elif position == 0:
                binding_indices = starting_index, search_indices[0]
            else:
                binding_indices = search_indices[position - 1], search_indices[position]

            if binding_indices[1] - binding_indices[0] <= 1:
                return binding_indices[1]
            else:
                return self._get_insertion_index(ranked_cities, city, binding_indices[0], binding_indices[1], query_size)

        except Exception as exc:
            logger.critical(f'Failed process: search_indices={search_indices}, city={city}, '
                            f'starting_index={starting_index}, end_index={end_index}, query_size={query_size}')
            logger.exception(exc)

    @staticmethod
    def _get_previous_non_identical_index(results, position, rating, search_indices):
        for num in range(position):
            previous_position = position - num - 1
            previous_city = list(results.ratings.keys())[previous_position]
            previous_rating = results.ratings[previous_city]
            if previous_rating != rating:
                return search_indices[previous_position]
        return search_indices[0]

    @staticmethod
    def _get_next_non_identical_index(results, position, rating, search_indices):
        i = 0
        for num in range(len(search_indices)):
            i += 1
            next_position = position + i
            if next_position < len(search_indices):
                next_city = list(results.ratings.keys())[next_position]
                next_rating = results.ratings[next_city]
                if next_rating != rating:
                    return search_indices[next_position - 1]
            else:
                break
        return search_indices[-1]

    @staticmethod
    def _get_equally_spaced_indices(len_collection, number_of_elements):
        if len_collection <= number_of_elements:
            return [_ for _ in range(len_collection)]
        indices = []
        spacing = len_collection / (number_of_elements - 1)
        for num in range(number_of_elements - 1):
            _index = math.ceil(num * spacing)
            if _index != 0:
                _index -= 1
            indices.append(_index)
        indices.append(len_collection - 1)
        return indices
