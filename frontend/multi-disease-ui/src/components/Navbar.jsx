import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHeartbeat } from "react-icons/fa";
import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Listen to Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Predictions", path: "/choose" },
    { name: "Dashboard", path: "/dashboard" },
  ];

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-50 backdrop-blur-lg bg-white/70 shadow-md"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2">
          <motion.div
            whileHover={{ rotate: 15, scale: 1.2 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="text-red-500 text-2xl"
          >
            <img
              src="./src/assets/favicon.png"
              alt="PredictraNova"
              className="w-12 h-12"
            />
          </motion.div>

          <motion.h1
            whileHover={{ scale: 1.05 }}
            className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
          >
            PredictraNova
          </motion.h1>
        </Link>

        {/* NAV LINKS */}
        <div className="flex gap-6 items-center">
          {navItems.map((item, index) => (
            <NavLink key={index} to={item.path}>
              {({ isActive }) => (
                <motion.div
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  className="relative group"
                >
                  <span
                    className={`font-semibold transition-colors duration-300
                    ${
                      isActive
                        ? "text-indigo-600"
                        : "text-gray-700 group-hover:text-indigo-600"
                    }`}
                  >
                    {item.name}
                  </span>

                  <motion.span
                    layoutId="underline"
                    className={`absolute left-0 -bottom-1 h-[2px] bg-gradient-to-r
                    from-indigo-500 to-purple-500 rounded-full
                    ${
                      isActive
                        ? "w-full"
                        : "w-0 group-hover:w-full transition-all duration-300"
                    }`}
                  />
                </motion.div>
              )}
            </NavLink>
          ))}

          {/* LOGIN / REGISTER / LOGOUT */}
          {user ? (
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-xl text-white bg-red-500 hover:bg-red-600 transition"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 rounded-xl text-white bg-purple-600 hover:bg-purple-700 transition"
              >
                Register
              </Link>
            </>
          )}

          {/* CTA BUTTON */}
          <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.9 }}>
            <Link
              to="/choose"
              className="px-5 py-2 rounded-xl text-white font-semibold
              bg-gradient-to-r from-indigo-600 to-purple-600
              shadow-lg hover:shadow-purple-400/40 transition-all"
            >
              Predict Now
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;