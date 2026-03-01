import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">

      {/* Global Navbar */}
      <Navbar />

      {/* Page Content */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex-1"
      >
        <Outlet />
      </motion.main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;