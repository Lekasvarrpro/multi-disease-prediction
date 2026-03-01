from flask import Flask, request, jsonify
import joblib
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load models
diabetes_model = joblib.load("models/diabetes_model.pkl")
heart_model = joblib.load("models/heart_model.pkl")
liver_model = joblib.load("models/liver_model.pkl")


@app.route("/")
def home():
    return "Multi Disease Prediction API Running"


# ---------------- DIABETES ----------------
@app.route("/predict/diabetes", methods=["POST"])
def predict_diabetes():
    data = request.get_json(force=True)
    diabetes_features = [
        "Pregnancies", "Glucose", "BloodPressure", "SkinThickness",
        "Insulin", "BMI", "DiabetesPedigreeFunction", "Age"
    ]
    for col in diabetes_features:
        if col not in data or data[col] == "":
            return jsonify({"error": f"{col} is required"}), 400
    try:
        features = [float(data[col]) for col in diabetes_features]
    except ValueError:
        return jsonify({"error": "All feature values must be numeric"}), 400
    prediction = diabetes_model.predict(np.array(features).reshape(1, -1))[0]
    result = "High risk of Diabetes" if prediction == 1 else "Low risk (Healthy)"
    return jsonify({"prediction": int(prediction), "result": result})


# ---------------- HEART ----------------
@app.route("/predict/heart", methods=["POST"])
def predict_heart():
    data = request.get_json(force=True)
    # Minimal features
    heart_features = ["age", "sex", "cp", "trestbps", "chol"]
    for col in heart_features:
        if col not in data or data[col] == "":
            return jsonify({"error": f"{col} is required"}), 400
    try:
        features = [float(data[col]) for col in heart_features]
    except ValueError:
        return jsonify({"error": "All feature values must be numeric"}), 400
    prediction = heart_model.predict(np.array(features).reshape(1, -1))[0]
    result = "High risk of Heart Disease" if prediction == 1 else "Low risk (Healthy)"
    return jsonify({"prediction": int(prediction), "result": result})


# ---------------- LIVER ----------------
@app.route("/predict/liver", methods=["POST"])
def predict_liver():
    data = request.get_json(force=True)
    liver_features = [
        "Age", "Gender", "Total_Bilirubin", "Direct_Bilirubin",
        "Alkaline_Phosphotase", "Alamine_Aminotransferase",
        "Aspartate_Aminotransferase", "Total_Proteins",
        "Albumin", "Albumin_and_Globulin_Ratio"
    ]
    gender_map = {"Male": 1, "Female": 0}
    gender = gender_map.get(data.get("Gender", "Male"), 1)  # default Male
    features = []
    for col in liver_features:
        if col == "Gender":
            features.append(gender)
        else:
            try:
                features.append(float(data.get(col, 0)))  # default 0 if missing
            except ValueError:
                return jsonify({"error": f"{col} must be numeric"}), 400
    prediction = liver_model.predict(np.array(features).reshape(1, -1))[0]
    result = "High risk of Liver Disease" if prediction == 1 else "Low risk (Healthy)"
    return jsonify({"prediction": int(prediction), "result": result})


if __name__ == "__main__":
    app.run(debug=True)