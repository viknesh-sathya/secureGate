import React from "react";
import { motion } from "framer-motion";

export function LoadingSpinner({
  containerClass = "min-h-screen bg-linear-to-br from-[#0f172a] to-[#1e293b] flex items-center justify-center relative overflow-hidden",
  size = 50,
  radius = 22,
  ballSize = 8,
  spinDuration = 2,
} = {}) {
  const center = size / 2;
  const angles = [0, 72, 144, 216, 288];

  return (
    <div className={containerClass}>
      <motion.div
        style={{ position: "relative", width: size, height: size }}
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: spinDuration,
          ease: "linear",
        }}
      >
        {angles.map((deg, i) => {
          const rad = (deg * Math.PI) / 180;
          const x = center + radius * Math.cos(rad);
          const y = center + radius * Math.sin(rad);

          return (
            <motion.div
              key={i}
              style={{
                position: "absolute",
                left: x,
                top: y,
                width: ballSize,
                height: ballSize,
                borderRadius: 9999,
                background: "linear-gradient(180deg,#86efac,#16a34a)",
                boxShadow:
                  "0 0 18px rgba(34,197,94,0.95), 0 6px 18px rgba(0,0,0,0.45)",
                transform: "translate(-50%, -50%)",
              }}
              animate={{ scale: [1, 1.6, 1] }}
              transition={{
                repeat: Infinity,
                duration: 1.2,
                ease: "easeInOut",
                delay: i * 0.14,
              }}
            />
          );
        })}
      </motion.div>
    </div>
  );
}
