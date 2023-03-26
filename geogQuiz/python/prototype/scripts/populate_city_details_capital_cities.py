import json
import logging
import time

from prototype.clients import geo_cities_client

logging.basicConfig(level='INFO')
logger = logging.getLogger(__name__)


def populate_city_details_capitals(input_filename, output_filename, limit=1):
    with open(input_filename, 'r') as f:
        country_details = json.load(f)

    with open(output_filename, 'r') as f:
        city_details = json.load(f)

    number_of_requests = 0

    for country_code, data in country_details.items():
        city_id = str(data['capital']['geonameid'])
        city_name = str(data['capital']['name'])
        if (city_id not in city_details) and (number_of_requests <= limit) and city_id != 'None' and city_name != 'None':
            result = geo_cities_client.get_city_details(city_id)
            number_of_requests += 1
            logger.info(f"Details for country {country_code}, city {city_name}")
            city_details[city_id] = result
            time.sleep(0.5)

    with open(output_filename, 'w') as f:
        json.dump(city_details, f)


if __name__ == '__main__':
    country_details_filepath = 'C:/Users/alexp/projects/CityGuesser/prototype/data/country_details.json'
    output_filename = 'C:/Users/alexp/projects/CityGuesser/prototype/data/city_details.json'
    populate_city_details_capitals(country_details_filepath, output_filename, limit=500)
