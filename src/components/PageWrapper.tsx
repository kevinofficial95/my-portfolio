import { motion } from "framer-motion";
import { ReactNode } from "react";

interface PageWrapperProps {
  children: ReactNode;
}

export default function PageWrapper({ children }: PageWrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}   // start faded + slightly below
      animate={{ opacity: 1, y: 0 }}    // fade in + move up
      exit={{ opacity: 0, y: -20 }}     // fade out + move up
      transition={{ duration: 0.4, ease: "easeInOut" }}
      style={{ minHeight: "70vh" }}
    >
      {children}
    </motion.div>
  );
}
