from flask import Flask, request, jsonify
from flask_cors import CORS  
import requests
import json
import pickle
import numpy as np
from bs4 import BeautifulSoup

# Initialize the Flask app
app = Flask(__name__)

# Enable CORS for all routes
CORS(app)


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



@app.route('/athlete-data/<athlete_slug>', methods=['GET'])
def athlete_data(athlete_slug):
    # Construct the URL using the athlete_slug directly from the URL
    url = f"https://worldathletics.org/athletes/india/{athlete_slug}"

    if not athlete_slug:
        return jsonify({"error": "Athlete slug parameter is required"}), 400

    # Fetch athlete data
    athlete_info = fetch_athlete_data(url)

    if "error" in athlete_info:
        return jsonify(athlete_info), 500
    
    return jsonify(athlete_info)


def generate_search_competitors_payload(query, gender=None, discipline_code=None, environment=None, country_code=None):
    return {
        "operationName": "SearchCompetitors",
        "variables": {
            "query": query,
            "gender": gender,
            "disciplineCode": discipline_code,
            "environment": environment,
            "countryCode": country_code
        },
        "query": """
        query SearchCompetitors($query: String, $gender: GenderType, $disciplineCode: String, $environment: String, $countryCode: String) {
          searchCompetitors(query: $query, gender: $gender, disciplineCode: $disciplineCode, environment: $environment, countryCode: $countryCode) {
            aaAthleteId
            familyName
            givenName
            birthDate
            disciplines
            iaafId
            gender
            country
            urlSlug
            __typename
          }
        }
        """
    }

# Flask route to search for competitors
@app.route('/search-competitors', methods=['POST'])
def search_competitors():
    # Get the query parameter from the request body
    body = request.get_json()
    query = body.get('query', None)

    if not query:
        return jsonify({"error": "Query parameter is required"}), 400

    # Generate the payload
    payload = generate_search_competitors_payload(query=query)

    # Define the endpoint URL
    url = "https://graphql-prod-4700.prod.aws.worldathletics.org/graphql"

    # Set the headers
    headers = {
        "Accept-Encoding": "gzip, deflate, br, zstd",
        "Accept-Language": "en-GB,en-US;q=0.9,en;q=0.8",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
        "Content-Length": str(len(str(payload))),
        "DNT": "1",
        "Host": "graphql-prod-4700.prod.aws.worldathletics.org",
        "Origin": "https://worldathletics.org",
        "Pragma": "no-cache",
        "Referer": "https://worldathletics.org/",
        "Sec-CH-UA": '"Chromium";v="101", "Not A Brand";v="99"',
        "Sec-CH-UA-Mobile": "?0",
        "Sec-CH-UA-Platform": '"Windows"',
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.64 Safari/537.36"
    }

    # Make the POST request
    try:
        response = requests.post(url, json=payload, headers=headers)
        response.raise_for_status()

        response_data = response.json()  # Ensure this is parsed as JSON
        return jsonify(response_data)

    except requests.exceptions.RequestException as e:
        return jsonify({"error": str(e)}), 500


with open('models/log_reg.pkl', 'rb') as file:
    model = pickle.load(file)

print(model)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Parse JSON data from the request
        data = request.get_json()
        # Convert data to a NumPy array
        features = np.array(data['features']).reshape(1, -1)
        # Make a prediction
        prediction = model.predict(features)
        # Return the prediction
        return jsonify({'prediction': int(prediction[0])})
    except Exception as e:
        return jsonify({'error': str(e)}), 400

# Run the app
if __name__ == '__main__':
    app.run(debug=True)
