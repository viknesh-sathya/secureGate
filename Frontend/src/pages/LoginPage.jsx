/* eslint-disable no-unused-vars */
import { Lock, Mail, Loader } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Input } from "../components/Input";
import { useAuthStore } from "../store/authStore";
import { toast } from "react-toastify";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isLoading, error, login } = useAuthStore();

  async function handleLogin(e) {
    e.preventDefault();
    if (!email || !password) return toast.error("All fields are required");
    await login(email, password);
    toast.success("Logged in Successfully");
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-white w-full max-w-sm sm:max-w-md mx-auto bg-white/5 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden border border-white/10"
    >
      <div className="p-6 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center bg-linear-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
          Login
        </h2>

        <form onSubmit={handleLogin}>
          <Input
            icon={Mail}
            type="email"
            placeholder="Email Address"
            value={email}
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            icon={Lock}
            type="password"
            placeholder="Password"
            value={password}
            autoComplete="off"
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="flex items-center mb-6">
            <Link
              to="/forgot-password"
              className="text-sm text-green-400 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {error && (
            <span className="mt-2 text-red-500 font-semibold text-sm">
              {error}
            </span>
          )}

          <motion.button
            className="mt-5 w-full py-3 px-4 bg-linear-to-r from-green-500 to-emerald-500 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200 disabled:cursor-not-allowed text-sm sm:text-base"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 1 }}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader className="w-6 h-6 animate-spin duration-700 mx-auto" />
            ) : (
              "Login"
            )}
          </motion.button>
        </form>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 bg-gray-900/50 flex flex-col items-center justify-between text-xs sm:text-sm whitespace-nowrap gap-2">
        <div className="flex items-center gap-1">
          <p className="text-gray-400">Don’t have an account?</p>
          <Link
            to="/signup"
            className="text-green-400 hover:text-green-500 hover:underline"
          >
            Signup
          </Link>
        </div>

        <p className="text-gray-400 opacity-70">
          Powered by{" "}
          <span className="text-green-400 font-semibold">SecureGate</span>
        </p>
      </div>
    </motion.div>
  );
};
