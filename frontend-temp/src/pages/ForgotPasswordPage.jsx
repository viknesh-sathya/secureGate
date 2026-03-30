import { motion } from "framer-motion";
import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { Input } from "../components/Input";
import { ArrowLeft, Loader, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { isLoading, forgotPassword } = useAuthStore();

  async function handleSubmit(e) {
    e.preventDefault();
    await forgotPassword(email);
    setIsSubmitted(true);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-white w-full max-w-sm sm:max-w-md mx-auto bg-white/5 backdrop-blur-xl rounded-2xl shadow-xl border border-white/10 overflow-hidden"
    >
      <div className="p-6 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center bg-linear-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
          Forgot password
        </h2>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit}>
            <p className="text-center text-gray-300 mb-6 text-sm sm:text-base">
              Enter your email address and we'll send you a link to reset your
              password.
            </p>

            <Input
              icon={Mail}
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value.toLowerCase())}
              required
            />

            <motion.button
              className="mt-5 w-full py-3 px-4 bg-linear-to-r from-green-500 to-emerald-500 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200 disabled:cursor-not-allowed text-sm sm:text-base"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 1 }}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader className="w-6 h-6 animate-spin mx-auto" />
              ) : (
                "Send Reset Link"
              )}
            </motion.button>
          </form>
        ) : (
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <Mail className="h-8 w-8 text-white" />
            </motion.div>

            <p className="text-gray-300 mb-6 text-sm sm:text-base">
              If an account exists for <strong>{email}</strong>, you will
              receive a password reset link shortly.
            </p>
          </div>
        )}
      </div>

      {/* Back to login */}
      <div className="px-6 py-4 bg-gray-900/50 flex items-center justify-between text-xs sm:text-sm whitespace-nowrap gap-2 group">
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
