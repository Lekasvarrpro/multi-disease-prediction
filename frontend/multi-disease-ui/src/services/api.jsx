import axios from "axios";

/*
=====================================
AXIOS BASE CONFIGURATION
=====================================
*/
const API = axios.create({
  baseURL: "https://multi-disease-prediction-1-5m13.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

/*
=====================================
UNIVERSAL DISEASE PREDICTION API
=====================================
*/
export const predictDisease = async (disease, formData) => {
  try {
    let endpoint = "";

    // Select backend route
    switch (disease) {
      case "Heart":
        endpoint = "/predict-heart";
        break;

      case "Diabetes":
        endpoint = "/predict-diabetes";
        break;

      case "Liver":
        endpoint = "/predict-liver";
        break;

      default:
        throw new Error("Invalid disease type");
    }

    const response = await API.post(endpoint, formData);

    return response.data;
  } catch (error) {
    console.error("API Prediction Error:", error);

    return {
      prediction: 0,
      result: "Server error. Please try again later.",
    };
  }
};

/*
=====================================
SERVER HEALTH CHECK (OPTIONAL)
=====================================
*/
export const checkServer = async () => {
  try {
    const response = await API.get("/");
    return response.data;
  } catch (error) {
    console.error("Backend server not running");
    return null;
  }
};

export default API;
