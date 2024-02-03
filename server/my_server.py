from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import util

app = Flask(__name__)
CORS(app)

# Add a route to handle preflight OPTIONS requests
@app.route('/predict_home_price', methods=['OPTIONS'])
def handle_preflight():
    response = jsonify(success=True)
    return response


@app.route('/get_location_names')
def get_location_names():
    response = jsonify(
        {
            'locations': util.get_location_names()
        }
    )
    return response

@app.route('/predict_home_price', methods=['POST'])

def predict_home_price():
    print(request.form)
    print(request.json)
    print(request.data)

    total_sqft = float(request.json['total_sqft'])
    location = request.json['location']
    bhk = int(request.json['bhk'])
    bath = int(request.json['bath'])

    response = jsonify(
        {
            'estimated_price': util.get_estimated_prize(location, total_sqft, bhk, bath)
        }
    )

    return response

@app.route('/hello')
def hello():
    return 'Hi'

if __name__ == '__main__':
    util.load_saved_artifacts()
    print('Starting the server')
    app.run()
