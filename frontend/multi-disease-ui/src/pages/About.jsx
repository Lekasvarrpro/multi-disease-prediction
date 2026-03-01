import { motion } from "framer-motion";
import {
  FaBrain,
  FaHeartbeat,
  FaUserMd,
  FaShieldAlt,
  FaChartLine,
  FaLaptopMedical,
} from "react-icons/fa";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br
      from-indigo-50 via-purple-50 to-blue-100
      overflow-hidden">

      {/* ================= HERO ================= */}
      <section className="py-20 text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl font-bold text-gray-800 mb-6"
        >
          About Our AI Prediction System
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="max-w-3xl mx-auto text-gray-600 text-lg"
        >
          This platform uses Artificial Intelligence and Machine Learning
          models to assist in early disease risk prediction. Our goal is to
          provide fast, accessible, and intelligent health insights using
          modern data-driven technology.
        </motion.p>
      </section>

      {/* ================= MISSION ================= */}
      <section className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-2 gap-12 items-center">

        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Our Mission
          </h2>

          <p className="text-gray-600 leading-relaxed">
            We aim to make healthcare prediction accessible to everyone.
            By combining machine learning with intuitive design, users
            can analyze potential health risks quickly and understand
            their condition through smart insights and dashboards.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <FaLaptopMedical className="text-8xl text-indigo-500 opacity-80" />
        </motion.div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10">

          <Feature
            icon={<FaBrain />}
            title="AI Powered Models"
            desc="Machine learning algorithms trained using medical datasets for accurate prediction."
          />

          <Feature
            icon={<FaHeartbeat />}
            title="Multiple Disease Checks"
            desc="Predict heart, diabetes, and liver conditions in one integrated platform."
          />

          <Feature
            icon={<FaChartLine />}
            title="Instant Analysis"
            desc="Real-time processing and intelligent interpretation of health data."
          />

          <Feature
            icon={<FaUserMd />}
            title="User Friendly"
            desc="Simple forms and interactive UI designed for easy usage."
          />

          <Feature
            icon={<FaShieldAlt />}
            title="Reliable Workflow"
            desc="Clean preprocessing and validated prediction pipelines."
          />

          <Feature
            icon={<FaLaptopMedical />}
            title="Modern Technology"
            desc="Built using React, AI models, and responsive web technologies."
          />

        </div>
      </section>

      {/* ================= FOOTER NOTE ================= */}
      <section className="text-center py-14 px-6">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-gray-500 max-w-2xl mx-auto"
        >
          ⚠️ This system is designed for educational and preliminary
          assessment purposes only and should not replace professional
          medical advice.
        </motion.p>
      </section>

    </div>
  );
};

const Feature = ({ icon, title, desc }) => (
  <motion.div
    whileHover={{ y: -10, scale: 1.05 }}
    transition={{ type: "spring", stiffness: 200 }}
    className="bg-gradient-to-br from-indigo-50 to-purple-50
    p-8 rounded-2xl shadow-md text-center"
  >
    <div className="text-4xl text-indigo-600 mb-4 flex justify-center">
      {icon}
    </div>

    <h3 className="text-xl font-semibold mb-2 text-gray-800">
      {title}
    </h3>

    <p className="text-gray-600">{desc}</p>
  </motion.div>
);

export default About;