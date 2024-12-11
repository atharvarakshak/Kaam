from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np

app = Flask(__name__)
CORS(app) 
# Load the trained model
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

@app.route('/search-competitors', methods=['GET'])
def search_competitors():
    # Get parameters from query string
    query = request.args.get('query')
    gender = request.args.get('gender')
    discipline_code = request.args.get('discipline_code')
    environment = request.args.get('environment')
    country_code = request.args.get('country_code')

    # Generate the payload for the request
    payload = generate_search_competitors_payload(query, gender, discipline_code, environment, country_code)

    # Define the endpoint URL
    url = "https://graphql-prod-4700.prod.aws.worldathletics.org/graphql"

    # Set the headers for the request
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
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-site",
        "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
        "accept": "/",
        "content-type": "application/json",
        "sec-ch-ua": '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Linux"',
        "x-amz-user-agent": "aws-amplify/3.0.2",
        "x-api-key": "da2-2xqo7n34jzcp5mnd45fu4uq56y"
    }

    # Make the POST request to the GraphQL API
    response = requests.post(url, json=payload, headers=headers)

    # Check if the response was successful
    if response.status_code == 200:
        try:
            data = response.json()  # Safer way to parse JSON
            return jsonify(data)  # Return the JSON response as output
        except json.JSONDecodeError as e:
            return jsonify({"error": "JSON Decode Error", "message": str(e)}), 400
    else:
        return jsonify({"error": "Request failed", "status_code": response.status_code, "message": response.text}), response.status_code


if __name__ == '__main__':
    app.run(host='0.0.0.0')
