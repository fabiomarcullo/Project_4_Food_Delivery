import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, inspect
import json
import requests
from flask import Flask, jsonify, render_template


# Database setup
engine = create_engine("postgresql+psycopg2://knskdyld:qfGxP5LoTlErHnHlhVsayMFEmaXV_B-R@hansken.db.elephantsql.com/knskdyld")

# reflect an existing database into a new model
Base = automap_base()

# reflect the tables
Base.prepare(autoload_with=engine)

## To gain information form the database

## Base.classes.keys()
## inspector = inspect(engine)
## columns = inspector.get_columns('restaurant')

# Saving reference to the table
restaurants = Base.classes.restaurant

session = Session(engine)

# Flask setup
app = Flask(__name__)

# Connecting to index.html
@app.route("/")
def index ():
    return render_template("index.html")

@app.route('/data')
def data(): 
    f = open('app.json')
    output_data = json.load(f)
    return jsonify(output_data)

# Define a route for retrieving the restaurant data as JSON
@app.route('/restaurants')
def get_restaurants():
    results = session.query(
        restaurants.restaurant_name,
        restaurants.rating,
        restaurants.category,
        restaurants.address,
        restaurants.latitude,
        restaurants.longitude,
        restaurants.province
    ).all()

    # Convert the results to a list of dictionaries
    restaurant_list = []
    for result in results:
        restaurant = {
            'restaurant_name': result.restaurant_name,
            'rating': result.rating,
            'category': result.category,
            'address': result.address,
            'latitude': result.latitude,
            'longitude': result.longitude,
            'province': result.province
        }
        restaurant_list.append(restaurant)

    # Return the restaurant data as JSON
    return jsonify(restaurant_list)
    

if __name__ == "__main__":
    app.run()