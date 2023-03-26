from dataclasses import dataclass


@dataclass(frozen=True)
class RankingResult:
    ranked: list
    ratings: dict
