import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
import joblib
import os

data = pd.read_csv("datasets/liver.csv")

# Convert Dataset column: 1 = disease, 2 = no disease → make it 1/0
data["Dataset"] = data["Dataset"].map({1: 1, 2: 0})

# Convert Gender to numeric
data["Gender"] = data["Gender"].map({"Male": 1, "Female": 0})

X = data.drop("Dataset", axis=1)
y = data["Dataset"]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

os.makedirs("models", exist_ok=True)
joblib.dump(model, "models/liver_model.pkl")

print("Liver model trained and saved!")