from flask import Flask, request, jsonify
import util

app = Flask(__name__)

@app.route('/get_location_names', methods=['GET'])
def get_location_names():
    response = jsonify({
        'locations': util.get_location_names()
    })
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

@app.route('/predict_price', methods=['GET', 'POST'])
def predict_price():
    tagt = int(request.form['tagt'])
    on = int(request.form['on'])
    garaj = int(request.form['garaj'])
    davhar = int(request.form['davhar'])
    talbai = float(request.form['talbai'])
    davhart = int(request.form['davhart'])
    tsonh = int(request.form['tsonh'])
    duureg = request.form['duureg']
    zarune = int(request.form['zarune'])

    response = jsonify({
        'estimated_price': util.predict_price(tagt,on,garaj,davhar,talbai,davhart,tsonh,duureg,zarune)[0],
        'estimated_p': util.predict_price(tagt,on,garaj,davhar,talbai,davhart,tsonh,duureg,zarune)[1]
    })
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

if __name__ == "__main__":
    print("Starting Python Flask Server For Home Price Prediction...")
    util.load_saved_artifacts()
    app.run()
