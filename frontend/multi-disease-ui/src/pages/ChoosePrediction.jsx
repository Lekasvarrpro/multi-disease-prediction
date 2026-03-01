import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHeartbeat, FaUserMd, FaLungs } from "react-icons/fa";

const ChoosePrediction = () => {
  const diseases = [
    {
      name: "Heart Disease",
      path: "/heart",
      icon: <FaHeartbeat />,
      gradient: "from-red-500 to-pink-500",
    },
    {
      name: "Diabetes",
      path: "/diabetes",
      icon: <FaUserMd />,
      gradient: "from-green-400 to-cyan-400",
    },
    {
      name: "Liver Disease",
      path: "/liver",
      icon: <FaLungs />,
      gradient: "from-purple-500 to-indigo-500",
    },
  ];

  return (
    <div className="min-h-[90vh] flex flex-col justify-center items-center bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-100 px-6">

      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-gray-800 mb-12 text-center"
      >
        Select Prediction Type
      </motion.h1>

      <div className="grid md:grid-cols-3 gap-10 max-w-5xl w-full">
        {diseases.map((item, index) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            whileHover={{ scale: 1.06 }}
            className={`rounded-3xl shadow-xl text-white bg-gradient-to-br ${item.gradient}`}
          >
            <Link
              to={item.path}
              className="flex flex-col items-center text-center p-10"
            >
              <div className="text-5xl mb-5">{item.icon}</div>
              <h2 className="text-2xl font-semibold">{item.name}</h2>
              <p className="opacity-80 mt-2 text-sm">
                Start AI prediction
              </p>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ChoosePrediction;