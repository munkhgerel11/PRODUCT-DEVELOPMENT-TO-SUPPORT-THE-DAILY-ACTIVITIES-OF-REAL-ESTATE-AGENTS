import json
import pickle
import numpy as np
import scipy.stats as st
__locations = None
__data_columns = None
__model = None


def predict_price(tagt,on,garaj,davhar,talbai,davhart,tsonh,duureg,zarune):
    try:
        loc_index = __data_columns.index(duureg.lower())
    except:
        loc_index = -1
    x = np.zeros(len(__data_columns))
    x[0] = tagt
    x[1] = on
    x[2] = garaj
    x[3] = davhar
    x[4] = talbai
    x[5] = davhart
    x[6] = tsonh
    if loc_index >= 0:
        x[loc_index] = 1
    a = round(__model.predict([x])[0],2)
    p = probabilaty(zarune,a)
    return a, p

def probabilaty(zar_une,model_une):
    std = 10000000
    mean = float(model_une)
    print(mean)
    z = (zar_une-mean)/std
    print(z)
    if z < 0:
        prob = 1
    else:
        prob = round(1-st.norm.cdf(z),2)*2
    prob = round(prob*0.95,2)
    return prob


def get_location_names():
    return __locations

def load_saved_artifacts():
    print('Loading saved artifacts.........')
    global __data_columns
    global __locations

    with open("./artifacts/columns.json",'r') as f:
        __data_columns = json.load(f)['data_columns']
        __locations = __data_columns[7:]
    global __model
    with open("./artifacts/Ulaanbatar_Oronsuuts_une_taamaglah_model.pickle",'rb') as f:
        __model = pickle.load(f)

    print('Loading artifacts is complete!!!')

if __name__ == '__main__':
    load_saved_artifacts()
    print(get_location_names())
    print(predict_price(0, 2016, 0, 16, 51.0, 9, 2, 'Баянзүрх'))
    print(predict_price(1, 2021, 0, 12, 46.0, 2, 3, 'Хан-Уул'))
