import json
import logging
import time

from prototype.clients import geo_cities_client

logging.basicConfig(level='INFO')
logger = logging.getLogger(__name__)


def populate_country_details(country_list_filepath, output_filepath):
    with open(country_list_filepath, 'r') as f:
        country_list = json.load(f)

    cities_in_country = {}
    for country_code in country_list:
        result = geo_cities_client.get_cities_in_country(country_code)
        if result['status'] != 'failed':
            logger.info(f'Cities in {country_code}')
            result['cities'].sort(key=lambda x: x['population'], reverse=True)
            result['cities'] = result['cities'][:50]
            assert country_code not in cities_in_country
            cities_in_country[country_code] = result
            time.sleep(0.5)

    with open(output_filepath, 'w') as f:
        json.dump(cities_in_country, f)


if __name__ == '__main__':
    country_list_filepath = 'C:/Users/alexp/projects/CityGuesser/prototype/data/countries.json'
    cities_in_country_filepath = 'C:/Users/alexp/projects/CityGuesser/prototype/data/cities_in_country.json'
    populate_country_details(country_list_filepath, cities_in_country_filepath)
