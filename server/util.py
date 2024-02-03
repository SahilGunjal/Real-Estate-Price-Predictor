import json
import pickle
import numpy as np


__locations = None
__data_columns = None
__model = None


def get_estimated_prize(location, sqft, bhk, bath):
    try:
        loc_ind = __data_columns.index(location.lower())

    except :
        loc_ind = -1
    x = np.zeros(len(__data_columns))
    x[0] = sqft
    x[1] = bath
    x[2] = bhk
    if loc_ind >= 0:
        x[loc_ind] = 1

    return round(__model.predict([x])[0], 2)

def get_location_names():
    return __locations


def load_saved_artifacts():
    print('Load the saved artifacts...')
    global __data_columns
    global __locations
    global __model

    with open('./artifacts/columns.json', 'r') as f:
        __data_columns = json.load(f)['data_columns']
        __locations = __data_columns[3:]

    with open('./artifacts/banglore_home_prize_model.pickle', 'rb') as f:
        __model = pickle.load(f)

    print('Saved the artifacts...')


if __name__ == '__main__':
    load_saved_artifacts()
    print(get_estimated_prize('1st phase jp nagar', 1000, 3, 3))
