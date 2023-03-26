import json
import logging
import time

from prototype.clients import geo_cities_client

logging.basicConfig(level='INFO')
logger = logging.getLogger(__name__)


def populate_country_details(country_list_filepath, country_details_filepath):
    with open(country_list_filepath, 'r') as f:
        country_list = json.load(f)

    country_details = {}
    for country_code in country_list:
        result = geo_cities_client.get_country_details(country_code)
        logger.info(f'Details for {country_code}')
        assert country_code not in country_details
        country_details[country_code] = result
        time.sleep(0.5)

    with open(country_details_filepath, 'w') as f:
        json.dump(country_details, f)


if __name__ == '__main__':
    country_list_filepath = 'C:/Users/alexp/projects/CityGuesser/prototype/data/countries.json'
    country_details_filepath = 'C:/Users/alexp/projects/CityGuesser/prototype/data/country_details.json'
    populate_country_details(country_list_filepath, country_details_filepath)
