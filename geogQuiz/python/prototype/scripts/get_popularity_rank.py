import json
import os

from prototype.clients.google_trends_client import GoogleTrendsClient
from prototype.handlers.CityPopularityRankHandler import CityPopularityRankHandler
from prototype.logger import get_logger


def get_popularity_rank(cities_filepath):
    logger = get_logger()
    
    # Get proxy servers, we need these to spread out requests to
    # the google trends API
    proxies = os.environ.get('proxy_servers', [])
    proxies.append('local')
    countries_to_use_data_from = [
            "Australia", "New Zealand",
            "Brazil", "Argentina",
            "Nigeria", "Kenya",
            "India", "Japan", "South Korea",
            "France", "Germany", "Netherlands", "United Kingdom",
            "Mexico", "United States"
    ]
    google_trends_client = GoogleTrendsClient(hl='en-GB', tz=0, proxies=proxies, keys=countries_to_use_data_from)
    handler = CityPopularityRankHandler(google_trends_client)
    with open(cities_filepath, 'r') as f:
        cities = json.load(f)

    # Run the ranking algorithm
    result = handler.get_popularity_rank(cities)
    logger.critical('FINISHED RANKING')
    for i, city in enumerate(result):
        cities[str(city.geo_id)]["popularity_rank"] = i
        logger.info(city)

    # Save the results
    with open(cities_filepath, 'w') as f:
        json.dump(cities, f)


if __name__ == '__main__':
    input_path = 'C:/Users/alexp/projects/CityGuesser/prototype/data/city_details.json'
    result = get_popularity_rank(input_path)
