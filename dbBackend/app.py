from flask import Flask, request, jsonify
from flask_cors import CORS
from file1 import generate_athlete_url
from file2 import scrape_athlete_data

app = Flask(__name__)

# Enable CORS
CORS(app)

@app.route('/fetch-athlete-data', methods=['POST'])
def fetch_athlete_data():
    try:
        # Parse incoming JSON
        body = request.json
        if not body:
            return jsonify({"error": "Request body is required"}), 400
        
        # Step 1: Generate URL using file1
        athlete_url = generate_athlete_url(body)
        
        # Step 2: Scrape data using file2
        athlete_data = scrape_athlete_data(athlete_url)
        
        if "error" in athlete_data:
            return jsonify({"error": athlete_data["error"]}), 500
        
        # Step 3: Return JSON response
        return jsonify({"url": athlete_url, "data": athlete_data})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
