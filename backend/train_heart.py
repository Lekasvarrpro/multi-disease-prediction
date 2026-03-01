import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
import joblib
import os

# Load dataset
data = pd.read_csv("datasets/heart.csv")

# DROP unwanted columns
drop_cols = []
if "id" in data.columns:
    drop_cols.append("id")
if "dataset" in data.columns:
    drop_cols.append("dataset")

if drop_cols:
    data = data.drop(drop_cols, axis=1)

# Encode categorical columns
le = LabelEncoder()
for col in data.columns:
    if data[col].dtype == "object":
        data[col] = le.fit_transform(data[col])

# Target column
target_column = "num"

# ----- NEW: keep only the 5 features your frontend uses -----
selected_features = ["age", "sex", "cp", "trestbps", "chol"]
X = data[selected_features]
y = data[target_column]

# Train model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X, y)

# Save model
os.makedirs("models", exist_ok=True)
joblib.dump(model, "models/heart_model.pkl")

print("Trained Heart model with features:", list(X.columns))
print("Feature count:", X.shape[1])