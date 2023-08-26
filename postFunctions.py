import requests
from data import session

async def post_league_games_by_season(obj, season, base_url):
    print(season)
    url = base_url + f"api/leagueGames/{season}"
    try:
        headers = {
            'Content-Type': 'application/json'
        }
        response = session.post(url, headers=headers, json=obj)
        if response.ok:
            json_response = response.json()
            print(json_response)
            return json_response
    except Exception as error:
        print(error)