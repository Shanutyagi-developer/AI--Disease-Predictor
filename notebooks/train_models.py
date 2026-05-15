import pandas as pd
import numpy as np 
import seaborn as sns 
import matplotlib.pyplot as plt 

print("libraries imported successfully");

# loading the data 
diabetes_df = pd.read_csv("./datasets/diabetes.csv");
liver_df = pd.read_csv("./datasets/indian_liver_patient.csv");
#print(diabetes_df);
#print(liver_df); 

print("datasets loaded sucesssfully");

# Exploring Diabetes dataset info 

print(diabetes_df.head());

print(diabetes_df.shape);

print(diabetes_df.info());

print(diabetes_df.isnull().sum()); # checking for null or missing values in the datasets.

print(diabetes_df.describe()); # statistical summary of the diabetes dataset.

#Exploring Liver dataset info

print(liver_df.head());

print(liver_df.shape);

print(liver_df.info());

print(liver_df.isnull().sum()); # checking for null or missing values in the datasets.

print(liver_df.describe()); # statistical summary of the liver dataset. 

# target column distribution in data sets .

print(diabetes_df["Outcome"].value_counts());

print(liver_df["Dataset"].value_counts());  

print("Data Exploration Completed"); 

# Data Cleaning and Modeling 

from sklearn.model_selection import train_test_split;
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, accuracy_score, confusion_matrix 
from sklearn.preprocessing import LabelEncoder 
import joblib
import os

print("libraries for modeling imported successfully");

# Diabetes Disease Model.

os.makedirs("./models",exist_ok = True);    

# Replacing zero values with mean in diabetes dataset for specific columns

cols_with_zeros = ["Glucose", "BloodPressure", "SkinThickness", "Insulin", "BMI"];
for col in cols_with_zeros:
    diabetes_df[col] = diabetes_df[col].replace(0, diabetes_df[col].mean());

print(diabetes_df.describe());
print("Zero is replaced with mean");

# Separate features and target 

x_diabetes = diabetes_df.drop("Outcome",axis =1);
y_diabetes = diabetes_df['Outcome'];

print(x_diabetes.shape);
print(y_diabetes.shape); 

# Split into training and testing data.
 
x_train_d,x_test_d,y_train_d,y_test_d = train_test_split(
    x_diabetes,y_diabetes,test_size =0.2, random_state =42
    );

print(x_train_d.shape[0]);
print(x_test_d.shape[0]); 

# Training the model.

diabetes_model  = RandomForestClassifier(n_estimators = 100, random_state=42);
diabetes_model.fit(x_train_d,y_train_d)
print(diabetes_model);
print("model training completed");

# Accuracy.

y_pred_d = diabetes_model.predict(x_test_d);
accuracy_d = accuracy_score(y_test_d, y_pred_d);
print("\n Diabetes Model Accuracy;",round(accuracy_d * 100,2));
print("\n Report:");
print(classification_report(y_test_d, y_pred_d));

# Save Model.
joblib.dump(diabetes_model,"./models/diabetes_model.pkl");
print("Model Saved successfully");

# LIVER DISEASES MODEL.

# fixing the missig value .

print(liver_df.isnull().sum()[liver_df.isnull().sum() > 0 ]);

liver_df['Albumin_and_Globulin_Ratio'] = liver_df['Albumin_and_Globulin_Ratio'].fillna(liver_df['Albumin_and_Globulin_Ratio'].mean());
print(liver_df.isnull().sum());
print("Fixed Missing values");


# Fix Gender Column.

le = LabelEncoder()
liver_df['Gender'] = le.fit_transform(liver_df['Gender'])
print("Gender Encoded: Male=1, Female=0");

# Fix Target Column.

liver_df['Dataset'] = liver_df['Dataset'].map({1:1,2:0})
print("Target Column fixed");

# Separate the feature and Target.
x_liver = liver_df.drop('Dataset',axis =1)
y_liver = liver_df['Dataset']

# Split into train & test.

x_train_l,x_test_l,y_train_l,y_test_l = train_test_split(
    x_liver,y_liver,test_size =0.2,random_state=42
) 

print(x_train_l.shape[0]);
print(x_test_l.shape[0]); 

# Train the Model.

liver_model = RandomForestClassifier(n_estimators = 100, random_state =42);
liver_model.fit(x_train_l, y_train_l);
print("model training completed");

# Check Accuracy.

y_pred_l = liver_model.predict(x_test_l);
accuracy_l = accuracy_score(y_test_l, y_pred_l)
print("\n Model accuracy", round(accuracy_l * 100,2));
print(classification_report(y_test_l,y_pred_l)); 

# Save Model.
joblib.dump(liver_model, './models/liver_model.pkl');
print("Model saved successfully");


























