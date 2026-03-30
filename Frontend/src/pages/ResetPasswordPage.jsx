import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Check, Loader, Lock, X } from "lucide-react";
import { Input } from "../components/Input";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passCheck, setPassCheck] = useState(false);

  const { token } = useParams();
  const navigate = useNavigate();
  const { resetPassword, error, isLoading } = useAuthStore();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!passCheck) return toast.error("Passwords do not match");

    try {
      await resetPassword(token, password);
      toast.success(
        "Password reset successfully, redirecting to login page...",
      );
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      toast.error(err.message || "Error resetting password");
    }
  }

  useEffect(() => {
    setPassCheck(password === confirmPassword);
  }, [password, confirmPassword]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-white w-full max-w-sm sm:max-w-md mx-auto bg-white/5 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden border border-white/10"
    >
      <div className="p-6 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center bg-linear-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
          Reset Password
        </h2>

        <form onSubmit={handleSubmit}>
          <Input
            icon={Lock}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Input
            icon={confirmPassword === "" ? Lock : passCheck ? Check : X}
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {error && (
            <p className="mb-2 text-red-500 font-semibold text-sm">{error}</p>
          )}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-3 px-4 bg-linear-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:cursor-not-allowed text-sm sm:text-base"
            disabled={!passCheck || isLoading}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-3">
                <Loader className="animate-spin" />
                Resetting...
              </span>
            ) : (
              "Set New Password"
            )}
          </motion.button>
        </form>
      </div>

      {/* Footer */}
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
