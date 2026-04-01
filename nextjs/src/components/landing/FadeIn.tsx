"use client";
import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
}

const directionOffset = {
  up: { transform: "translateY(30px)" },
  down: { transform: "translateY(-30px)" },
  left: { transform: "translateX(30px)" },
  right: { transform: "translateX(-30px)" },
  none: { transform: "translateY(0px)" },
};

const directionReset = {
  up: { transform: "translateY(0px)" },
  down: { transform: "translateY(0px)" },
  left: { transform: "translateX(0px)" },
  right: { transform: "translateX(0px)" },
  none: { transform: "translateY(0px)" },
};

export default function FadeIn({
  children,
  delay = 0,
  duration = 0.6,
  direction = "up",
  className,
}: FadeInProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{
        opacity: 0,
        ...(shouldReduceMotion ? {} : directionOffset[direction]),
      }}
      whileInView={{
        opacity: 1,
        ...(shouldReduceMotion ? {} : directionReset[direction]),
      }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: shouldReduceMotion ? 0.3 : duration,
        delay,
        ease: [0.23, 1, 0.32, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
