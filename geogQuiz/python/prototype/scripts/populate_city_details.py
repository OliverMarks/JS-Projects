import json
import logging
import time

from prototype.clients import geo_cities_client

logging.basicConfig(level='INFO')
logger = logging.getLogger(__name__)


def populate_country_details(city_list_filepath, output_filename, limit=1):
    with open(city_list_filepath, 'r') as f:
        city_list = json.load(f)

    with open(output_filename, 'r') as f:
        city_details = json.load(f)

    number_of_requests = 0

    for country_code, data in city_list.items():
        for city in data['cities']:
            city_id = str(city['geonameid'])
            if (city_id not in city_details) and number_of_requests <= limit:
                result = geo_cities_client.get_city_details(city_id)
                number_of_requests += 1
                logger.info(f"Details for country {country_code}, city {city['name']}")
                city_details[city_id] = result
                time.sleep(0.5)

    with open(output_filename, 'w') as f:
        json.dump(city_details, f)


if __name__ == '__main__':
    city_list_filepath = 'C:/Users/alexp/projects/CityGuesser/prototype/data/cities_in_country.json'
    output_filename = 'C:/Users/alexp/projects/CityGuesser/prototype/data/city_details.json'
    populate_country_details(city_list_filepath, output_filename, limit=500)
