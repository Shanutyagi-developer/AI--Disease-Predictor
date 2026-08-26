from flask import Flask, request,jsonify 
from flask_cors import CORS
import joblib
import numpy as np 
import pandas as pd 
import os

app = Flask(__name__)
CORS(app)  

# Loading ML Models.
 
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODELS_DIR = os.path.join(BASE_DIR,'..','models')

diabetes_model = joblib.load(os.path.join(MODELS_DIR,'diabetes_model.pkl'));

liver_model = joblib.load(os.path.join(MODELS_DIR,'liver_model.pkl'));

print("ML models loaded successfully"); 

@app.route('/',methods = ['GET'])
def home():
    return jsonify({'message':'Dise_pred API running successfully'});

# Diabetes Prediction Route.

@app.route('/predict/diabetes', methods = ['POST'])
def predict_diabetes():

    try:
        data = request.json 

        features = pd.DataFrame([[
            data['pregnancies'],
            data['glucose'],
            data['bloodPressure'],
            data['skinThickness'],
            data['insulin'],
            data['bmi'],
            data['diabetesPedigree'],
            data['age']
        ]], columns=['Pregnancies','Glucose','BloodPressure',
             'SkinThickness','Insulin','BMI',
             'DiabetesPedigreeFunction','Age'])

        prediction = diabetes_model.predict(features)[0]
        probability = diabetes_model.predict_proba(features)[0][1] 

        return jsonify({
            'prediction': int(prediction),
            'probability': round(float(probability) * 100,2),
            'result': 'High Risk' if prediction == 1 else 'Low Risk',
            'disease': 'Diabetes'
        })
    except Exception as e:
        return jsonify({'error': str(e)}),400 

# Liver Prediction Route.

@app.route('/predict/liver', methods = ['POST'])
def predict_liver():

    try: 
        data = request.json
        
        features = pd.DataFrame([[
            data['age'],
            data['gender'],
            data['totalBilirubin'],
            data['directBilirubin'],
            data['alkalinePhosphotase'],
            data['alamineAminotransferase'],
            data['aspartateAminotransferase'],
            data['totalProtiens'],
            data['albumin'],
            data['albuminGlobulinRatio']
        ]], columns=['Age','Gender','Total_Bilirubin','Direct_Bilirubin',
             'Alkaline_Phosphotase','Alamine_Aminotransferase',
             'Aspartate_Aminotransferase','Total_Protiens',
             'Albumin','Albumin_and_Globulin_Ratio'])

        prediction = liver_model.predict(features)[0]
        probability = liver_model.predict_proba(features)[0][1]

        return jsonify({
            'prediction': int(prediction),
            'probability': round(float(probability) * 100 , 2),
            'result': "High Risk" if prediction == 1 else "Low Risk",
            'disease': 'Liver Disease'
        }); 
    
    except Exception as e:
        return jsonify({'error': str(e)}), 400
    
if __name__ == '__main__':
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000))) 







