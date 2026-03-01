import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  FaHeartbeat,
  FaUserMd,
  FaLungs,
  FaBrain,
  FaChartLine,
  FaShieldAlt,
} from "react-icons/fa";

const Home = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  // ========== Typing Animation ==========
  const fullText = "AI Powered Disease Prediction";
  const [typedText, setTypedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText((prev) => prev + fullText[index]);
        setIndex(index + 1);
      }, 60); // typing speed
      return () => clearTimeout(timeout);
    }
  }, [index]);

  // ========== Disease Cards ==========
  const diseases = [
    {
      name: "Heart Prediction",
      path: "/heart",
      icon: <FaHeartbeat />,
      gradient: "from-red-500 to-pink-500",
    },
    {
      name: "Diabetes Prediction",
      path: "/diabetes",
      icon: <FaUserMd />,
      gradient: "from-green-400 to-cyan-400",
    },
    {
      name: "Liver Prediction",
      path: "/liver",
      icon: <FaLungs />,
      gradient: "from-purple-500 to-indigo-500",
    },
  ];

  return (
    <div className="overflow-hidden">

      {/* ================= HERO ================= */}
      <section
        onMouseMove={(e) => setPos({ x: e.clientX, y: e.clientY })}
        className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 text-white py-24 overflow-hidden"
      >

        {/* mouse glow */}
        <motion.div
          animate={{ x: pos.x - 200, y: pos.y - 200 }}
          transition={{ type: "spring", damping: 30 }}
          className="pointer-events-none absolute w-[400px] h-[400px] bg-white/10 blur-3xl rounded-full"
        />

        {/* floating blobs */}
        <motion.div
          animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute w-96 h-96 bg-pink-500 opacity-30 blur-3xl rounded-full top-10 left-10"
        />
        <motion.div
          animate={{ y: [0, 40, 0], x: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute w-96 h-96 bg-blue-400 opacity-30 blur-3xl rounded-full bottom-10 right-10"
        />

        {/* particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -40, 0], opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 6 + i, repeat: Infinity }}
            className="absolute w-2 h-2 bg-white/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}

        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">

          {/* animated heading with typing */}
          <motion.h1
            initial={{ opacity: 0, y: -60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold mb-6
              bg-gradient-to-r from-white via-pink-200 to-white
              bg-[length:200%_auto] animate-gradient
              bg-clip-text text-transparent"
          >
            {typedText}
            <span className="animate-pulse">|</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto"
          >
            Predict heart, diabetes, and liver diseases using intelligent
            machine learning models with real-time analysis and dashboard insights.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.7, type: "spring" }}
            className="mt-10"
          >
            <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/choose"
                className="relative overflow-hidden bg-white text-indigo-600
                px-8 py-4 rounded-xl font-semibold shadow-xl group"
              >
                <span className="relative z-10">Start Prediction</span>
                <span
                  className="absolute inset-0 bg-gradient-to-r
                  from-transparent via-white/40 to-transparent
                  translate-x-[-100%] group-hover:translate-x-[100%]
                  transition-transform duration-700"
                />
              </Link>
            </motion.div>
          </motion.div>

        </div>
      </section>

      {/* ================= DISEASE CARDS ================= */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 grid gap-10 md:grid-cols-3">
          {diseases.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 80, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ scale: 1.06 }}
              className={`relative bg-gradient-to-br ${item.gradient} text-white p-10 rounded-3xl shadow-xl cursor-pointer overflow-hidden`}
            >
              <Link
                to={item.path}
                className="flex flex-col items-center text-center"
              >
                <motion.div
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                  className="text-5xl mb-6"
                >
                  {item.icon}
                </motion.div>

                <h2 className="text-2xl font-semibold">{item.name}</h2>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-12 text-center">
          <Feature
            icon={<FaBrain />}
            title="AI Models"
            desc="Advanced machine learning models trained on medical datasets."
          />
          <Feature
            icon={<FaChartLine />}
            title="Smart Dashboard"
            desc="Visual analytics and risk interpretation instantly."
          />
          <Feature
            icon={<FaShieldAlt />}
            title="Reliable Results"
            desc="Validated prediction workflow with clean data processing."
          />
        </div>
      </section>

    </div>
  );
};

const Feature = ({ icon, title, desc }) => (
  <motion.div
    whileHover={{ y: -12, scale: 1.05 }}
    transition={{ type: "spring", stiffness: 200 }}
    className="p-6 rounded-2xl hover:shadow-xl transition-all"
  >
    <motion.div
      animate={{ scale: [1, 1.06, 1] }}
      transition={{ duration: 3, repeat: Infinity }}
      className="text-4xl text-indigo-600 mb-4 flex justify-center"
    >
      {icon}
    </motion.div>

    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{desc}</p>
  </motion.div>
);

export default Home;