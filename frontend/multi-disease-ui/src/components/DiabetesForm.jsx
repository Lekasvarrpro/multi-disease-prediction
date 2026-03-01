import { useState } from "react";
import { motion } from "framer-motion";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { FaHeartbeat, FaUserMd } from "react-icons/fa";

const DiabetesForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Pregnancies: "",
    Glucose: "",
    BloodPressure: "",
    SkinThickness: "",
    Insulin: "",
    BMI: "",
    DiabetesPedigreeFunction: "",
    Age: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await api.post("/predict/diabetes", formData);
    setLoading(false);
    navigate("/processing", {
      state: { disease: "Diabetes", result: res.data },
    });
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 bg-gradient-to-br from-green-50 via-cyan-50 to-blue-100">

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg backdrop-blur-xl
        bg-white/70 border border-white/40
        shadow-2xl rounded-3xl p-8"
      >
        {/* HEADER */}
        <div className="text-center mb-6">
          <div className="flex justify-center text-green-600 text-4xl mb-3">
            <FaHeartbeat />
          </div>

          <h2 className="text-3xl font-bold text-gray-800">
            Diabetes Prediction
          </h2>

          <p className="text-gray-500 text-sm mt-1">
            Enter medical parameters for AI analysis
          </p>
        </div>

        {/* FORM */}
        <form
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          onSubmit={handleSubmit}
        >
          {[
            ["Pregnancies", "Pregnancies"],
            ["Glucose", "Glucose"],
            ["BloodPressure", "Blood Pressure"],
            ["SkinThickness", "Skin Thickness"],
            ["Insulin", "Insulin"],
            ["BMI", "BMI"],
            ["DiabetesPedigreeFunction", "Pedigree Function"],
            ["Age", "Age"],
          ].map(([name, placeholder]) => (
            <input
              key={name}
              name={name}
              placeholder={placeholder}
              onChange={handleChange}
              required
              className="
                w-full p-3 rounded-xl
                bg-white/80
                border border-gray-200
                focus:outline-none
                focus:ring-2 focus:ring-green-400
                focus:border-transparent
                transition-all duration-300
                shadow-sm
                hover:shadow-md
              "
            />
          ))}

          {/* BUTTON */}
          <motion.button
            whileHover={!loading ? { scale: 1.04 } : {}}
            whileTap={!loading ? { scale: 0.97 } : {}}
            type="submit"
            disabled={loading}
            className={`
              col-span-1 sm:col-span-2
              p-3 rounded-xl font-semibold text-white
              shadow-lg transition-all duration-300
              ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-green-600 to-emerald-500"
              }
            `}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <FaUserMd className="animate-pulse" />
                AI Analyzing...
              </span>
            ) : (
              "Predict Disease"
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default DiabetesForm;