import { useState } from "react";
import { motion } from "framer-motion";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { FaHeartbeat, FaUserMd } from "react-icons/fa";

const HeartForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    age: "",
    sex: "",
    cp: "",
    trestbps: "",
    chol: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/predict/heart", formData);
      navigate("/processing", { state: { disease: "Heart", result: res.data } });
    } catch (err) {
      alert("Error: " + err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 bg-gradient-to-br from-red-50 via-pink-50 to-orange-100">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg backdrop-blur-xl bg-white/70 border border-white/40 shadow-2xl rounded-3xl p-8"
      >
        <div className="text-center mb-6">
          <div className="flex justify-center text-red-500 text-4xl mb-3">
            <FaHeartbeat />
          </div>
          <h2 className="text-3xl font-bold text-gray-800">Heart Disease Prediction</h2>
          <p className="text-gray-500 text-sm mt-1">AI cardiovascular risk assessment</p>
        </div>

        <form className="grid grid-cols-1 sm:grid-cols-2 gap-4" onSubmit={handleSubmit}>
          <input name="age" placeholder="Age" onChange={handleChange} required className="inputStyle"/>
          <input name="sex" placeholder="Sex (0=F,1=M)" onChange={handleChange} required className="inputStyle"/>
          <input name="cp" placeholder="Chest Pain Type" onChange={handleChange} required className="inputStyle"/>
          <input name="trestbps" placeholder="Resting BP" onChange={handleChange} required className="inputStyle"/>
          <input name="chol" placeholder="Cholesterol" onChange={handleChange} required className="sm:col-span-2 inputStyle"/>

          <motion.button
            whileHover={!loading ? { scale: 1.04 } : {}}
            whileTap={!loading ? { scale: 0.97 } : {}}
            type="submit"
            disabled={loading}
            className={`sm:col-span-2 p-3 rounded-xl font-semibold text-white shadow-lg transition-all duration-300 ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-red-600 to-pink-500"
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <FaUserMd className="animate-pulse" /> AI Analyzing...
              </span>
            ) : "Predict Disease"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default HeartForm;