import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import { formatDate } from "../utils/date";
import { toast } from "react-toastify";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export const HomePage = () => {
  const { user, logout } = useAuthStore();

  async function handleLogout(e) {
    e.preventDefault();
    await logout();
    toast.success("Successfully Logged out");
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className="text-white w-full max-w-sm sm:max-w-md mx-auto bg-white/5 backdrop-blur-xl rounded-2xl shadow-xl border border-white/10 overflow-hidden"
    >
      <div className="p-6 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center bg-linear-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
          Dashboard
        </h2>

        <div className="space-y-6">
          {/* Profile Info */}
          <motion.div
            className="p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-lg sm:text-xl font-semibold text-green-400 mb-3">
              Profile Information
            </h3>
            <p className="text-gray-300 text-sm sm:text-base">
              Name: {user?.name}
            </p>
            <p className="text-gray-300 text-sm sm:text-base">
              Email: {user?.email}
            </p>
          </motion.div>

          {/* Account Activity */}
          <motion.div
            className="p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h3 className="text-lg sm:text-xl font-semibold text-green-400 mb-3">
              Account Activity
            </h3>
            <p className="text-gray-300 text-sm sm:text-base">
              <span className="font-bold">Joined: </span>
              {new Date(user.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p className="text-gray-300 text-sm sm:text-base">
              <span className="font-bold">Last Login: </span>
              {formatDate(user?.lastLogin)}
            </p>
          </motion.div>
        </div>

        {/* Logout Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-6"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="w-full py-3 px-4 bg-linear-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 text-sm sm:text-base"
          >
            Logout
          </motion.button>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 bg-gray-900/50 flex items-center justify-between text-xs sm:text-sm whitespace-nowrap group">
        <Link
          to="/login"
          className="text-green-400 hover:text-green-500 hover:underline flex items-center"
        >
          <ArrowLeft className="w-4 h-4 mr-1 transform transition-transform duration-200 ease-out group-hover:-translate-x-1" />
          Back to login
        </Link>

        <p className="text-gray-400 opacity-70">
          Powered by{" "}
          <span className="text-green-400 font-semibold">SecureGate</span>
        </p>
      </div>
    </motion.div>
  );
};
