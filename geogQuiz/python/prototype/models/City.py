from dataclasses import dataclass


@dataclass(frozen=True)
class City:
    geo_id: str
    name: str
    population: int

    def json(self):
        return self.__repr__()

    def __eq__(self, other):
        return self.__repr__() == other.__repr__()

    def __repr__(self):
        return f"{self.name}-{self.geo_id}"
