import datetime
import json
import logging
import time
from collections import defaultdict

from pytrends.request import TrendReq

from prototype.models.RankingResult import RankingResult

logger = logging.getLogger('handler')


class GoogleTrendsClient:

    def __init__(self, hl, tz, proxies, keys, wait_time_between_queries=16):
        self._hl = hl
        self._tz = tz
        self._clients = {}
        self._proxies = proxies
        self._proxy_timeouts = {}
        self._wait_time = wait_time_between_queries
        self._countries = keys

    def _get_client(self):
        proxy = self._proxies[0]
        if self._proxy_timeouts.get(proxy, datetime.datetime.min) < datetime.datetime.now():
            client = self._clients.get('proxy')
            if proxy == "local":
                if client is None:
                    _cli = TrendReq(hl=self._hl, tz=self._tz, retries=0)
                    self._clients[proxy] = _cli
                    return _cli
                else:
                    return client
            else:
                if client is None:
                    _cli = TrendReq(hl=self._hl, tz=self._tz, retries=0, proxies=[proxy])
                    self._clients[proxy] = _cli
                    return _cli
                else:
                    return client

        # delete the client so that it is refreshed after timeout
        if proxy in self._clients:
            del self._clients[proxy]
        logger.critical(f'Proxy on timeout: {proxy}')

    def rank_cities(self, cities):
        try:
            names_to_cities = {city.name: city for city in cities}
            client = self._get_client()
            if client is None:
                time.sleep(self._wait_time)
                self._rotate_proxy_server()
                return self.rank_cities(cities)

            client.build_payload([name for name in names_to_cities])
            data = client.interest_by_region(resolution='COUNTRY', inc_low_vol=True, inc_geo_code=False)
            data_dict = data.to_dict()

            # return results
            averaged_data_dict = self._average_accross_keys(data_dict, self._countires)
            ranking = [names_to_cities[name] for name in data_dict]
            ranking.sort(key=lambda x: averaged_data_dict[x.name], reverse=True)

            ratings = {names_to_cities[name]: ranking for name, ranking in averaged_data_dict.items()}
            self._rotate_proxy_server()
            time.sleep(self._wait_time)
            return RankingResult(ranking, ratings)

        except Exception as exc:
            self._proxy_timeouts[self._proxies[0]] = datetime.datetime.now() + datetime.timedelta(seconds=(60 * 10) - 1)
            if len(self._proxy_timeouts) == len(self._proxies):
                if all([timeout > datetime.datetime.now() for timeout in self._proxy_timeouts.values()]):
                    logger.critical(f'All proxies are on timeout. Sleeping for a bit.')
                    time.sleep(60*20)   # backoff a bit

            logger.critical(f'Failed to rank cities: {cities} with exception:')
            logger.exception(exc)
            self._rotate_proxy_server()
            return self.rank_cities(cities)

    def _rotate_proxy_server(self):
        logger.critical(f'Switching proxy to {self._proxies[-1]}')
        self._proxies = [self._proxies[-1]] + self._proxies[:-1]

    @staticmethod
    def _average_accross_keys(data_dict, keys):
        averaged_data_dict = defaultdict(int)
        for city, data in data_dict.items():
            for country in keys:
                assert country in data, f"Key country {country} not in returned data!"
                averaged_data_dict[city] += data[country]
            averaged_data_dict[city] /= len(keys)
        return averaged_data_dict


if __name__ == '__main__':
    pytrends = TrendReq(hl='en-GB', tz=0)
    pytrends.build_payload(['Rome', 'Sao Paulo'], cat=1084)
    data = pytrends.interest_by_region(resolution='COUNTRY', inc_low_vol=True, inc_geo_code=False)

    result = pytrends.suggestions('Paris')
    print(1)
