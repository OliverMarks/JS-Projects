import logging
import os

import requests


logger = logging.getLogger(__name__)

HOST = "https://countries-cities.p.rapidapi.com"
HEADERS = {
    "X-RapidAPI-Key": os.environ.get("X-RapidAPI-Key", ""),
    "X-RapidAPI-Host": os.environ.get("X-RapidAPI-Host", "")
}


def get_country_list():
    url = f"{HOST}/location/country/list"
    try:
        response = requests.request("GET", url, headers=HEADERS)
        response.raise_for_status()
    except Exception as exc:
        logger.critical(f'Failed to get country list')
        logger.exception(exc)
        raise exc

    return response.json()


def get_country_details(country):
    url = f"{HOST}/location/country/{country}"
    try:
        response = requests.request("GET", url, headers=HEADERS)
        response.raise_for_status()
    except Exception as exc:
        logger.critical(f'Country: {country} failed to get details')
        logger.exception(exc)
        raise exc

    return response.json()


def get_cities_in_country(country):
    url = f"{HOST}/location/country/{country}/city/list"
    try:
        params = {"per_page": "1000", "population": "100000"}
        response = requests.request("GET", url, headers=HEADERS, params=params)
        response.raise_for_status()
    except Exception as exc:
        logger.critical(f'Country: {country} failed to get cities')
        logger.exception(exc)
        # raise exc

    return response.json()


def get_city_details(city_id):
    url = f"{HOST}/location/city/{city_id}"
    try:
        response = requests.request("GET", url, headers=HEADERS)
        response.raise_for_status()
    except Exception as exc:
        logger.critical(f'City: {city_id} failed to get details')
        logger.exception(exc)
        raise exc

    return response.json()


if __name__ == '__main__':
    # get_country_list()
    # get_country_details("GB")
    # get_cities_in_country("AU")
    get_city_details(2147714)
