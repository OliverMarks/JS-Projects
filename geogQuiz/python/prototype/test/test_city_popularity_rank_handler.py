from unittest import TestCase
from unittest.mock import MagicMock

from prototype.handlers.CityPopularityRankHandler import CityPopularityRankHandler
from prototype.models.City import City
from prototype.models.RankingResult import RankingResult


class TestCityPopularityRankHandler(TestCase):

    def test_get_insertion_index_all_different(self):
        CI = [City(str(num), str(num), num) for num in range(20)]
        test_city = City('test', 'test', 99)
        handler = self._get_handler(
            [
                RankingResult(
                    [CI[0], CI[6], test_city, CI[13], CI[19]],
                    {CI[0]: 5000, CI[6]: 4000, test_city: 3000, CI[13]: 2000, CI[19]: 1000}
                ),
                RankingResult(
                    [CI[6], CI[8], test_city, CI[11], CI[13]],
                    {CI[6]: 5000, CI[8]: 4000, test_city: 3000, CI[11]: 2000, CI[13]: 1000}
                ),
                RankingResult(
                    [CI[8], CI[9], test_city, CI[10], CI[11]],
                    {CI[8]: 5000, CI[9]: 4000, test_city: 3000, CI[10]: 2000, CI[11]: 1000}
                ),
            ]
        )
        insertion_index = handler._get_insertion_index(CI, test_city, 0, len(CI) - 1, 5)

        self.assertEqual(insertion_index, 10)

    def test_get_insertion_index_all_different_decimal(self):
        CI = [City(str(num), str(num), num) for num in range(1000)]
        test_city = City('test', 'test', 99)
        handler = self._get_handler(
            [
                RankingResult(
                    [CI[0], CI[333], test_city, CI[666], CI[999]],
                    {CI[0]: 5.56878578, CI[333]: 4.4654746, test_city: 3.43566, CI[666]: 2.323432, CI[999]: 1.34566}
                ),
                RankingResult(
                    [CI[333], CI[444], test_city, CI[555], CI[666]],
                    {CI[333]: 5.56878578, CI[444]: 4.4654746, test_city: 3.43566, CI[555]: 2.323432, CI[666]: 1.34566}
                ),
                RankingResult(
                    [CI[444], CI[481], test_city, CI[518], CI[555]],
                    {CI[444]: 5.56878578, CI[481]: 4.4654746, test_city: 3.43566, CI[518]: 2.323432, CI[555]: 1.34566}
                ),
                RankingResult(
                    [CI[481], CI[493], test_city, CI[506], CI[518]],
                    {CI[481]: 5.56878578, CI[493]: 4.4654746, test_city: 3.43566, CI[506]: 2.323432, CI[518]: 1.34566}
                ),
                RankingResult(
                    [CI[493], CI[497], test_city, CI[502], CI[506]],
                    {CI[493]: 5.56878578, CI[497]: 4.4654746, test_city: 3.43566, CI[502]: 2.323432, CI[506]: 1.34566}
                ),
                RankingResult(
                    [CI[497], CI[498], test_city, CI[500], CI[502]],
                    {CI[497]: 5.56878578, CI[498]: 4.4654746, test_city: 3.43566, CI[500]: 2.323432, CI[502]: 1.34566}
                ),
                RankingResult(
                    [CI[498], test_city, CI[499], CI[500]],
                    {CI[498]: 5.56878578, test_city: 3.43566, CI[499]: 2.323432, CI[500]: 1.34566}
                )
            ]
        )
        insertion_index = handler._get_insertion_index(CI, test_city, 0, len(CI) - 1, 5)

        self.assertEqual(insertion_index, 499)

    def test_get_insertion_index_end(self):
        CI = [City(str(num), str(num), num) for num in range(20)]
        test_city = City('test', 'test', 99)
        handler = self._get_handler(
            [
                RankingResult(
                    [CI[0], CI[6], CI[13], CI[19], test_city],
                    {CI[0]: 5000, CI[6]: 4000, CI[13]: 2000, CI[19]: 1000, test_city: 1}
                )
            ]
        )
        insertion_index = handler._get_insertion_index(CI, test_city, 0, len(CI) - 1, 5)

        self.assertEqual(insertion_index, 20)

    def test_get_insertion_index_start(self):
        CI = [City(str(num), str(num), num) for num in range(20)]
        test_city = City('test', 'test', 99)
        handler = self._get_handler(
            [
                RankingResult(
                    [test_city, CI[0], CI[6], CI[13], CI[19]],
                    {test_city: 6000, CI[0]: 5000, CI[6]: 4000, CI[13]: 2000, CI[19]: 1000}
                )
            ]
        )
        insertion_index = handler._get_insertion_index(CI, test_city, 0, len(CI) - 1, 5)

        self.assertEqual(insertion_index, 0)

    def test_get_insertion_index_same(self):
        CI = [City(str(num), str(num), num) for num in range(5)]
        test_city = City('test', 'test', 99)
        handler = self._get_handler(
            [
                RankingResult(
                    [CI[0], CI[1], test_city, CI[3], CI[4]],
                    {CI[0]: 5000, CI[1]: 3000, test_city: 3000, CI[3]: 3000, CI[4]: 1000}
                ),
                RankingResult(
                    [CI[1], CI[2], test_city, CI[3]],
                    {CI[1]: 3000, CI[2]: 3000, test_city: 3000, CI[3]: 3000}
                ),
                RankingResult(
                    [CI[2], test_city, CI[3]],
                    {CI[2]: 3000, test_city: 3000, CI[3]: 3000}
                ),
                RankingResult(
                    [test_city, CI[3]],
                    {test_city: 3000, CI[3]: 3000}
                )
            ]
        )
        insertion_index = handler._get_insertion_index(CI, test_city, 0, len(CI) - 1, 5)

        self.assertEqual(insertion_index, 3)

    def test_get_insertion_index_100_0_0(self):
        CI = [City(str(num), str(num), num) for num in range(10)]
        test_city = City('test', 'test', 99)
        handler = self._get_handler(
            [
                RankingResult(
                    [CI[0], CI[2], CI[4], CI[6], test_city],
                    {CI[0]: 100, CI[2]: 0, CI[4]: 0, CI[6]: 0, test_city: 0}
                ),
                RankingResult(
                    [CI[1], CI[3], CI[6], CI[9], test_city],
                    {CI[1]: 100, CI[3]: 0, CI[6]: 0, CI[9]: 0, test_city: 0}
                ),
                RankingResult(
                    [CI[2], CI[4], CI[7], CI[9], test_city],
                    {CI[2]: 90, CI[4]: 9, CI[7]: 1, CI[9]: 0, test_city: 0}
                ),
                RankingResult(
                    [CI[7], CI[8], CI[9], test_city],
                    {CI[7]: 90, CI[8]: 10, CI[9]: 0, test_city: 0}
                ),
                RankingResult(
                    [CI[8], CI[9], test_city],
                    {CI[8]: 100, CI[9]: 0, test_city: 0}
                ),
                RankingResult(
                    [test_city, CI[9]],
                    {CI[9]: 49, test_city: 51}
                )
            ]
        )
        insertion_index = handler._get_insertion_index(CI, test_city, 0, len(CI) - 1, 5)

        self.assertEqual(insertion_index, 9)

    def _get_handler(self, google_responses):
        google_client = MagicMock()
        google_client.rank_cities.side_effect = google_responses
        handler = CityPopularityRankHandler(google_client)
        return handler
