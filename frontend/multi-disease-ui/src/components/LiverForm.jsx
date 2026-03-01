import { useState } from "react";
import { motion } from "framer-motion";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { FaUserMd } from "react-icons/fa";
import { GiLiver } from "react-icons/gi";

const LiverForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    Age: "",
    Gender: "",
    Total_Bilirubin: "",
    Direct_Bilirubin: "",
    Alkaline_Phosphotase: "",
    Alamine_Aminotransferase: "",
    Aspartate_Aminotransferase: "",
    Total_Proteins: "",
    Albumin: "",
    Albumin_and_Globulin_Ratio: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/predict/liver", formData);
      navigate("/processing", {
        state: { disease: "Liver", result: res.data },
      });
    } catch (err) {
      alert("Error: " + err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 
    bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-100">

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl backdrop-blur-xl
        bg-white/70 border border-white/40
        shadow-2xl rounded-3xl p-8"
      >
        <div className="text-center mb-6">
          <div className="flex justify-center text-purple-600 text-4xl mb-3">
            <GiLiver />
          </div>

          <h2 className="text-3xl font-bold text-gray-800">
            Liver Disease Prediction
          </h2>

          <p className="text-gray-500 text-sm mt-1">
            AI liver health risk assessment
          </p>
        </div>

        <form
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          onSubmit={handleSubmit}
        >
          <input
            name="Age"
            placeholder="Age"
            onChange={handleChange}
            required
            className="inputStyle"
          />

          <select
            name="Gender"
            onChange={handleChange}
            required
            className="inputStyle"
          >
            <option value="">Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          <input
            name="Total_Bilirubin"
            placeholder="Total Bilirubin"
            onChange={handleChange}
            className="inputStyle"
          />

          <input
            name="Direct_Bilirubin"
            placeholder="Direct Bilirubin"
            onChange={handleChange}
            className="inputStyle"
          />

          <input
            name="Alkaline_Phosphotase"
            placeholder="Alkaline Phosphatase"
            onChange={handleChange}
            className="inputStyle"
          />

          <input
            name="Alamine_Aminotransferase"
            placeholder="ALT"
            onChange={handleChange}
            className="inputStyle"
          />

          <input
            name="Aspartate_Aminotransferase"
            placeholder="AST"
            onChange={handleChange}
            className="inputStyle"
          />

          <input
            name="Total_Proteins"
            placeholder="Total Proteins"
            onChange={handleChange}
            className="inputStyle"
          />

          <input
            name="Albumin"
            placeholder="Albumin"
            onChange={handleChange}
            className="inputStyle"
          />

          <input
            name="Albumin_and_Globulin_Ratio"
            placeholder="A/G Ratio"
            onChange={handleChange}
            className="sm:col-span-2 inputStyle"
          />

          <motion.button
            whileHover={!loading ? { scale: 1.04 } : {}}
            whileTap={!loading ? { scale: 0.97 } : {}}
            type="submit"
            disabled={loading}
            className={`sm:col-span-2 p-3 rounded-xl font-semibold text-white shadow-lg transition-all duration-300 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-purple-600 to-indigo-500"
            }`}
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

export default LiverForm;