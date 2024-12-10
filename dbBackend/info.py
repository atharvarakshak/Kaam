import requests
from bs4 import BeautifulSoup

def fetch_athlete_data(url):
    # Send a GET request to the provided URL
    response = requests.get(url)
    if response.status_code != 200:
        return {"error": f"Failed to fetch data, status code: {response.status_code}"}

    # Parse the HTML content
    soup = BeautifulSoup(response.content, 'html.parser')

    # Extract the main div containing the athlete information
    athlete_div = soup.find('div', class_='athletesBio_athletesBioHeader__1QkoM')
    if not athlete_div:
        return {"error": "Athlete information not found"}

    # Extract other details
    athlete_name = athlete_div.find('div', class_='athletesBio_athletesBioTitle__3pPRL').get_text(strip=True)
    athlete_event = athlete_div.find('div', class_='athletesBio_athletesBioTag__3ki57').get_text(strip=True)

    details_container = athlete_div.find('div', class_='athletesBio_athletesBioDetailsContainer__3_nDn')
    if details_container:
        country = details_container.find('span', class_='athletesBio_athletesBioTagValue__oKZC4')
        country = country.get_text(strip=True) if country else "N/A"

        birth_info = details_container.find_all('span', class_='athletesBio_athletesBioTagValue__oKZC4')[1].get_text(strip=True)
        athlete_code = details_container.find_all('span', class_='athletesBio_athletesBioTagValue__oKZC4')[2].get_text(strip=True)
    else:
        country, birth_info, athlete_code = "N/A", "N/A", "N/A"

    ranking_div = athlete_div.find('div', class_='athletesBio_athletesBioLastResults__3I5De')
    if ranking_div:
        highest_ranking = ranking_div.find('span', class_='athletesBio_athletesBioLastResultsPlace__RUMWI')
        highest_ranking = highest_ranking.get_text(strip=True) if highest_ranking else "N/A"

        event_name = ranking_div.find('span', class_='athletesBio_athletesBioLastResultsValue__2MIPM')
        event_name = event_name.get_text(strip=True) if event_name else "N/A"
    else:
        highest_ranking, event_name = "N/A", "N/A"

    honours_container = athlete_div.find('div', class_='athletesBio_athletesBioHonoursContainer__3EVKf')
    honours = []
    if honours_container:
        for honour_div in honours_container.find_all('div', class_='athletesBio_athletesBioHonour__1Zqdq'):
            count_div = honour_div.find('div', class_='athletesBio_athletesBioHonourCount__2sBko')
            count = count_div.get_text(strip=True) if count_div else "N/A"

            title_div = honour_div.find('div', class_='athletesBio_athletesBioHonourValue_QHLA')
            title = title_div.get_text(strip=True) if title_div else "N/A"

            honours.append({"count": count, "title": title})

    # Create a structured dictionary
    athlete_data = {
        "name": athlete_name,
        "event": athlete_event,
        "country": country,
        "birth_info": birth_info,
        "athlete_code": athlete_code,
        "highest_event_ranking": {"ranking": highest_ranking, "event": event_name},
        "honours": honours,
        "image_url": f"https://media.aws.iaaf.org/athletes/{athlete_code}.jpg" if athlete_code != "N/A" else None
    }

    return athlete_data

# Example usage
url = "https://worldathletics.org/athletes/india/neeraj-chopra-14549089"
athlete_info = fetch_athlete_data(url)
print(athlete_info)
