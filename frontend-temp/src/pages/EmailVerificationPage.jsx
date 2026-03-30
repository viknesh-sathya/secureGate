import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Loader } from "lucide-react";
import { toast } from "react-toastify";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

export const EmailVerificationPage = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const { verifyEmail, error, isLoading } = useAuthStore();
  const navigate = useNavigate();

  function handleChange(idx, value) {
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[idx] = value;
    setCode(newCode);

    if (value && idx < 5) {
      inputRefs.current[idx + 1]?.focus();
    }
  }

  function handlePaste(e) {
    e.preventDefault();

    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6)
      .split("");

    const newCode = [...code];
    for (let i = 0; i < 6; i++) {
      newCode[i] = pasted[i] || "";
    }

    setCode(newCode);

    const lastFilled = newCode.map((d) => d !== "").lastIndexOf(true);
    const nextIndex = lastFilled < 5 ? lastFilled + 1 : 5;
    inputRefs.current[nextIndex]?.focus();
  }

  function handleKeyDown(idx, e) {
    if (e.key === "Backspace") {
      if (code[idx] === "" && idx > 0) {
        inputRefs.current[idx - 1]?.focus();
      }
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const verificationCode = code.join("");

    try {
      await verifyEmail(verificationCode);
      toast.success("Verification Successfull");
      navigate("/");
    } catch (err) {
      toast.error("Something went wrong");
    }
  }

  useEffect(() => {
    if (code.every((digit) => digit !== "")) {
      handleSubmit(new Event("submit"));
    }
  }, [code]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-white w-full max-w-sm sm:max-w-md mx-auto bg-white/5 backdrop-blur-xl rounded-2xl shadow-xl border border-white/10 p-6 sm:p-8"
    >
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center bg-linear-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
        Verify your email
      </h2>

      <p className="text-center text-gray-300 mb-6 text-sm sm:text-base">
        Enter the 6-digit code sent to your email address.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex justify-between gap-2 sm:gap-3">
          {code.map((digit, idx) => (
            <input
              key={idx}
              ref={(el) => (inputRefs.current[idx] = el)}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(idx, e.target.value)}
              onKeyDown={(e) => handleKeyDown(idx, e)}
              onPaste={handlePaste}
              className="w-10 h-10 sm:w-12 sm:h-12 text-center text-xl sm:text-2xl font-bold bg-gray-700 text-white border-2 border-gray-600 rounded-lg focus:border-green-500 focus:outline-none"
            />
          ))}
        </div>

        {error && (
          <span className="mt-2 text-red-500 font-semibold text-sm block text-center">
            {error}
          </span>
        )}

        <motion.button
          className="mt-4 w-full py-3 px-4 bg-linear-to-r from-green-500 to-emerald-500 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200 disabled:cursor-not-allowed text-sm sm:text-base"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 1 }}
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader className="w-6 h-6 animate-spin mx-auto" />
          ) : (
            "Verify"
          )}
        </motion.button>
      </form>

      {/* Footer */}
      <p className="text-center text-gray-400 text-xs mt-6 opacity-70">
        Powered by{" "}
        <span className="text-green-400 font-semibold">SecureGate</span>
      </p>
    </motion.div>
  );
};
