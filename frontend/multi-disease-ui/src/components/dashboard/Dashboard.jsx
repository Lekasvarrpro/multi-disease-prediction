import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaHeartbeat,
  FaBrain,
  FaArrowLeft,
  FaShieldAlt,
  FaChartLine,
  FaDatabase,
} from "react-icons/fa";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { disease, result } = location.state || {};

  const [history, setHistory] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);

    const stored =
      JSON.parse(localStorage.getItem("predictionHistory")) || [];

    setHistory(stored);

    /*
    =====================================
    AUTO SAVE CURRENT PREDICTION
    (NEW — does NOT change UI)
    =====================================
    */
    if (result && disease) {
      const newEntry = {
        disease,
        result: result.result,
        prediction: result.prediction,
        date: new Date().toLocaleString(),
      };

      const updatedHistory = [newEntry, ...stored];

      localStorage.setItem(
        "predictionHistory",
        JSON.stringify(updatedHistory)
      );

      setHistory(updatedHistory);
    }
  }, [disease, result]);

  if (!result) {
    return (
      <div className="flex flex-col justify-center items-center h-[70vh] gap-4">
        <p className="text-xl font-semibold">
          No dashboard data available
        </p>

        <button
          onClick={() => navigate("/")}
          className="bg-indigo-600 text-white px-5 py-2 rounded-lg"
        >
          Go Home
        </button>
      </div>
    );
  }

  const highRisk = result.prediction === 1;
  const healthScore = highRisk ? 40 : 85;

  const getRecommendations = () => {
    if (disease === "Heart")
      return [
        "Maintain regular exercise",
        "Reduce salt intake",
        "Monitor blood pressure",
        "Consult cardiologist regularly",
      ];

    if (disease === "Diabetes")
      return [
        "Control sugar intake",
        "Exercise daily",
        "Monitor glucose levels",
        "Follow balanced diet",
      ];

    if (disease === "Liver")
      return [
        "Avoid alcohol",
        "Eat antioxidant foods",
        "Maintain healthy weight",
        "Regular liver checkups",
      ];

    return [];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-6">
      {/* HEADER */}
      <div className="max-w-6xl mx-auto mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-indigo-700">
          AI Health Dashboard
        </h1>

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg"
        >
          <FaArrowLeft />
          Back
        </button>
      </div>

      {/* ANALYTICS CARDS */}
      <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 rounded-2xl shadow-lg"
        >
          <FaHeartbeat className="text-3xl mb-3" />
          <p className="text-sm opacity-80">Health Score</p>
          <h2 className="text-3xl font-bold">{healthScore}%</h2>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className={`p-6 rounded-2xl shadow-lg text-white ${
            highRisk
              ? "bg-gradient-to-r from-red-500 to-pink-500"
              : "bg-gradient-to-r from-green-400 to-emerald-500"
          }`}
        >
          <FaShieldAlt className="text-3xl mb-3" />
          <p className="text-sm opacity-80">Risk Status</p>
          <h2 className="text-2xl font-bold">
            {highRisk ? "High Risk" : "Healthy"}
          </h2>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-6 rounded-2xl shadow-lg"
        >
          <FaDatabase className="text-3xl mb-3" />
          <p className="text-sm opacity-80">Total Predictions</p>
          <h2 className="text-3xl font-bold">{history.length}</h2>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-6 rounded-2xl shadow-lg"
        >
          <FaChartLine className="text-3xl mb-3" />
          <p className="text-sm opacity-80">System Status</p>
          <h2 className="text-2xl font-bold">Active</h2>
        </motion.div>
      </div>

      {/* MAIN GRID */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
        {/* SUMMARY */}
        <motion.div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <FaHeartbeat className="text-red-500 text-2xl" />
            <h2 className="text-xl font-semibold">Disease Summary</h2>
          </div>

          <p className="text-lg font-medium">{disease}</p>
          <p className={highRisk ? "text-red-500" : "text-green-500"}>
            {result.result}
          </p>
        </motion.div>

        {/* AI INSIGHT */}
        <motion.div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <FaBrain className="text-purple-600 text-2xl" />
            <h2 className="text-xl font-semibold">AI Insight</h2>
          </div>

          <p className="text-gray-600">
            Machine learning models analyze medical parameters to estimate
            disease probability and generate preventive insights.
          </p>
        </motion.div>

        {/* RECOMMENDATIONS */}
        <motion.div className="bg-white rounded-2xl shadow-lg p-6 md:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <FaShieldAlt className="text-green-600 text-2xl" />
            <h2 className="text-xl font-semibold">
              Health Recommendations
            </h2>
          </div>

          <ul className="list-disc pl-6 space-y-2">
            {getRecommendations().map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </motion.div>

        {/* HISTORY */}
        <motion.div className="bg-white rounded-2xl shadow-lg p-6 md:col-span-2">
          <h2 className="text-xl font-semibold mb-4">
            Prediction History
          </h2>

          {history.length === 0 ? (
            <p>No previous predictions yet.</p>
          ) : (
            <div className="space-y-3">
              {history.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between bg-gray-50 p-4 rounded-xl"
                >
                  <div>
                    <p className="font-semibold text-indigo-600">
                      {item.disease}
                    </p>
                    <p className="text-sm text-gray-500">
                      {item.date}
                    </p>
                  </div>

                  <span
                    className={
                      item.prediction === 1
                        ? "text-red-500"
                        : "text-green-500"
                    }
                  >
                    {item.result}
                  </span>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;