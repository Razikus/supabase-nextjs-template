"use client";
import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

interface StaggerContainerProps {
  children: ReactNode;
  staggerDelay?: number;
  className?: string;
}

const containerVariants = (staggerDelay: number) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: staggerDelay },
  },
});

export const staggerItemVariants = {
  hidden: { opacity: 0, transform: "translateY(20px)" },
  visible: {
    opacity: 1,
    transform: "translateY(0px)",
    transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] },
  },
};

export const staggerItemReducedVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
};

export default function StaggerContainer({
  children,
  staggerDelay = 0.06,
  className,
}: StaggerContainerProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={containerVariants(shouldReduceMotion ? 0.02 : staggerDelay)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={
        shouldReduceMotion ? staggerItemReducedVariants : staggerItemVariants
      }
      className={className}
    >
      {children}
    </motion.div>
  );
}
