# AI-Based Multi-Disease Prediction System Using React & Python

## 🎯 Project Overview
This is a **full-stack AI web application** that predicts the likelihood of multiple diseases based on user input medical parameters. It helps in **early detection and preventive healthcare** for diseases such as:

- Diabetes  
- Heart Disease  
- Liver Disease  

*(Future scope: Kidney Disease, Parkinson’s, Breast Cancer, etc.)*

Users input health parameters via a **React frontend**, and the **Python Flask backend** processes the data with machine learning models to provide predictions.

---

## 🧠 Concept
**Multi-Disease Prediction System** uses machine learning models trained on medical datasets to predict disease risks.  

**Workflow:**
1. User inputs health data (age, BP, glucose, cholesterol, BMI, etc.) via React form  
2. Data is sent to Flask backend (REST API)  
3. Flask backend preprocesses the data and loads the trained ML model (`.pkl`)  
4. Model predicts disease risk and returns results to React  
5. React frontend displays `Positive/Negative` or risk percentage  

🔗 Live Demo

Try the project online: https://multi-disease-prediction-green.vercel.app/
