"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import FadeIn from "./FadeIn";

export default function CtaSection({ productName }: { productName: string }) {
  return (
    <section className="bg-gradient-to-b from-secondary-800 to-secondary-900 py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Empieza a cerrar más ventas hoy
          </h2>
          <p className="mt-4 text-lg md:text-xl text-secondary-300 max-w-2xl mx-auto">
            Únete a los corredores que ya usan {productName} para transformar su
            operación comercial.
          </p>
          <div className="mt-10">
            <Link
              href="/auth/register"
              className="inline-flex items-center px-8 py-4 rounded-xl bg-primary-600 text-white font-semibold text-lg hover:bg-primary-700 transition-colors duration-200 btn-press cursor-pointer"
            >
              Crear Cuenta Gratis
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
          <p className="mt-4 text-sm text-secondary-400">
            Sin tarjeta de crédito. Configura tu cuenta en 2 minutos.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
