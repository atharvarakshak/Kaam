from flask import Flask, request, jsonify
import pickle
import numpy as np

app = Flask(__name__)

# Load the trained model
with open('models/model.pkl', 'rb') as file:
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

if __name__ == '__main__':
    app.run(debug=True)
