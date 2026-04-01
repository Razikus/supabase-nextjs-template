"use client";
import { motion, useReducedMotion } from "framer-motion";
import AuthAwareButtons from "@/components/AuthAwareButtons";

const easeOut = [0.23, 1, 0.32, 1] as const;

function heroChild(delay: number, reducedMotion: boolean | null) {
  return {
    hidden: {
      opacity: 0,
      ...(reducedMotion ? {} : { transform: "translateY(30px)" }),
    },
    visible: {
      opacity: 1,
      ...(reducedMotion ? {} : { transform: "translateY(0px)" }),
      transition: { duration: reducedMotion ? 0.3 : 0.6, delay, ease: easeOut },
    },
  };
}

export default function HeroSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative bg-gradient-to-br from-secondary-900 via-secondary-800 to-primary-900 pt-36 pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.div
            variants={heroChild(0.2, shouldReduceMotion)}
            initial="hidden"
            animate="visible"
          >
            <span className="inline-block border border-secondary-600 text-secondary-300 px-4 py-1.5 rounded-full text-sm font-medium">
              CRM para Corredores Inmobiliarios en Chile
            </span>
          </motion.div>

          <motion.h1
            variants={heroChild(0.4, shouldReduceMotion)}
            initial="hidden"
            animate="visible"
            className="mt-8 text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-white"
          >
            Convierte leads en{" "}
            <span className="bg-gradient-to-r from-primary-400 to-primary-300 bg-clip-text text-transparent">
              ventas reales
            </span>
          </motion.h1>

          <motion.p
            variants={heroChild(0.6, shouldReduceMotion)}
            initial="hidden"
            animate="visible"
            className="mt-6 text-lg md:text-xl text-secondary-300 max-w-2xl mx-auto leading-relaxed"
          >
            Reserva leads exclusivos, agenda reuniones y cierra negocios
            inmobiliarios con la plataforma que simplifica tu operación
            comercial.
          </motion.p>

          <motion.div
            variants={heroChild(0.8, shouldReduceMotion)}
            initial="hidden"
            animate="visible"
            className="mt-10 flex gap-4 justify-center flex-wrap"
          >
            <AuthAwareButtons />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
