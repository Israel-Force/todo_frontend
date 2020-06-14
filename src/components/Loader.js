import React from "react";
import { motion } from "framer-motion";

export default function Loader() {
  const loaderVariants = {
    visible: {
      x: [-20, 20],
      y: [0, -30],
      transition: {
        x: {
          yoyo: Infinity,
          duration: 0.5,
        },
        y: {
          yoyo: Infinity,
          duration: 0.25,
        },
      },
    },
  };

  return (
    <motion.div
      className="loader"
      variants={loaderVariants}
      animate="visible"
    ></motion.div>
  );
}