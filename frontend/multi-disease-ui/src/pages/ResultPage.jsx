import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaChartLine,
} from "react-icons/fa";

import "react-circular-progressbar/dist/styles.css";
import {
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";
import { useEffect } from "react";

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { disease, result } = location.state || {};

  // ================= SAVE HISTORY =================
  useEffect(() => {
    if (!disease || !result) return;

    const newEntry = {
      disease,
      result: result.result,
      prediction: result.prediction,
      date: new Date().toLocaleString(),
    };

    const existing =
      JSON.parse(localStorage.getItem("predictionHistory")) || [];

    existing.unshift(newEntry);

    const limitedHistory = existing.slice(0, 10);

    localStorage.setItem(
      "predictionHistory",
      JSON.stringify(limitedHistory)
    );
  }, [disease, result]);

  // Safety check
  if (!result) {
    return (
      <div className="flex justify-center items-center h-[70vh] text-xl">
        No prediction data available.
      </div>
    );
  }

  const highRisk = result.prediction === 1;
  const riskValue = highRisk ? 85 : 30;

  // ================= AI EXPLANATION =================
  const getAIExplanation = () => {
    if (!disease) return "";

    if (disease === "Heart") {
      return highRisk
        ? "The AI model detected patterns associated with increased cardiovascular stress. Elevated medical indicators may suggest higher probability of heart disease."
        : "The analyzed heart parameters fall within healthy ranges indicating low cardiovascular risk.";
    }

    if (disease === "Diabetes") {
      return highRisk
        ? "Glucose-related indicators suggest possible insulin resistance patterns and higher diabetes risk."
        : "Metabolic indicators appear stable showing low likelihood of diabetes.";
    }

    if (disease === "Liver") {
      return highRisk
        ? "Liver enzyme patterns indicate potential liver stress requiring clinical attention."
        : "Liver biomarkers appear within acceptable ranges.";
    }

    return "";
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl rounded-3xl shadow-2xl
        bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600
        text-white p-10 text-center"
      >
        {/* ICON */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3 }}
          className="text-6xl flex justify-center mb-6"
        >
          {highRisk ? <FaExclamationTriangle /> : <FaCheckCircle />}
        </motion.div>

        {/* TITLE */}
        <h2 className="text-4xl font-bold mb-4">
          {disease} Prediction Result
        </h2>

        {/* RESULT */}
        <p className="text-lg opacity-90 mb-10">
          {result.result}
        </p>

        {/* AI GAUGE */}
        <div className="w-40 mx-auto mb-10">
          <CircularProgressbar
            value={riskValue}
            text={`${riskValue}%`}
            styles={buildStyles({
              textColor: "#fff",
              pathColor: highRisk ? "#ff6b6b" : "#4ade80",
              trailColor: "rgba(255,255,255,0.2)",
            })}
          />
          <p className="mt-3 text-sm">AI Risk Score</p>
        </div>

        {/* AI ANALYSIS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-10 text-left"
        >
          <h3 className="text-xl font-semibold mb-3">
            AI Health Analysis
          </h3>

          <p className="opacity-90 leading-relaxed">
            {getAIExplanation()}
          </p>
        </motion.div>

        {/* CONFIDENCE BAR */}
        <div className="mb-10">
          <div className="w-full h-5 bg-white/30 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: highRisk ? "85%" : "35%" }}
              transition={{ duration: 1 }}
              className={`h-full ${
                highRisk ? "bg-red-400" : "bg-green-400"
              }`}
            />
          </div>

          <p className="mt-3 text-sm">
            AI Confidence Analysis
          </p>
        </div>

        {/* BUTTONS */}
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={() =>
              navigate("/dashboard", { state: { disease, result } })
            }
            className="flex items-center gap-2 bg-white text-indigo-600
            px-6 py-3 rounded-xl font-semibold shadow-lg
            hover:scale-105 transition"
          >
            <FaChartLine />
            Open Dashboard
          </button>

          <button
            onClick={() => navigate("/")}
            className="border border-white px-6 py-3 rounded-xl
            hover:bg-white hover:text-indigo-600 transition"
          >
            Back Home
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ResultPage;