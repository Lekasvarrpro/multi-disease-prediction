import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaBrain } from "react-icons/fa";

const ProcessingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { disease, result } = location.state || {};

  useEffect(() => {
    // simulate AI processing delay
    const timer = setTimeout(() => {
      navigate("/result", {
        state: { disease, result }
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate, disease, result]);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center">

      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
        className="text-6xl text-indigo-600 mb-6"
      >
        <FaBrain />
      </motion.div>

      <h2 className="text-3xl font-bold text-gray-800 mb-4">
        AI Analyzing Patient Data...
      </h2>

      <div className="space-y-2 text-gray-600">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          ✔ Processing medical parameters
        </motion.p>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
          ✔ Running machine learning model
        </motion.p>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}>
          ✔ Generating health report
        </motion.p>
      </div>

    </div>
  );
};

export default ProcessingPage;