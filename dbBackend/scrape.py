import requests
import json

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

# Define the endpoint URL
url = "https://graphql-prod-4700.prod.aws.worldathletics.org/graphql"

# Generate the payload
payload = generate_search_competitors_payload(
    query="neeraj chopra"
)

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

# Make the POST request
response = requests.post(url, json=payload, headers=headers)

# Print out more diagnostic information
print("Status Code:", response.status_code)
print("Response Headers:", response.headers)
print("Response Content:", response.text)

# Decode JSON only if content type is JSON
try:
    data = response.json()  # Safer way to parse JSON
    print(json.dumps(data, indent=2))
except json.JSONDecodeError as e:
    print(f"JSON Decode Error: {e}")
except Exception as e:
    print(f"Unexpected error: {e}")