"use client";
import Link from "next/link";
import { Check } from "lucide-react";
import FadeIn from "./FadeIn";
import StaggerContainer, { StaggerItem } from "./StaggerContainer";

const tiers = [
  {
    name: "Starter",
    price: "$39 USD",
    period: "/mes",
    description: "Ideal para corredores independientes que están comenzando.",
    features: [
      "3 reservas de leads al mes",
      "Acceso a leads con scoring",
      "Calendario de reuniones",
      "Stock en tiempo real",
      "Soporte por email",
    ],
    cta: "Comenzar Ahora",
    href: "/auth/login",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$149 USD",
    period: "/mes",
    description:
      "Para equipos y corredores con alto volumen de operaciones.",
    features: [
      "20 reservas de leads al mes",
      "Todo lo del plan Starter",
      "Pipeline Kanban completo",
      "Escenarios de inversión",
      "Créditos adicionales con descuento",
      "Soporte prioritario",
    ],
    cta: "Comenzar Ahora",
    href: "/auth/login",
    highlighted: true,
    badge: "Más Popular",
  },
  {
    name: "Enterprise",
    price: "Personalizado",
    period: "",
    description:
      "Soluciones a medida para inmobiliarias y equipos grandes.",
    features: [
      "Reservas ilimitadas",
      "Todo lo del plan Pro",
      "Integración con sistemas propios",
      "Gerente de cuenta dedicado",
      "Onboarding personalizado",
      "SLA garantizado",
    ],
    cta: "Contactar Ventas",
    href: "/auth/login",
    highlighted: false,
    dark: true,
  },
];

export default function PricingSection() {
  return (
    <section id="precios" className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary-600">
            Precios
          </p>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-secondary-900">
            Planes simples, resultados reales
          </h2>
          <p className="mt-4 text-lg text-secondary-500 max-w-2xl mx-auto">
            Elige el plan que se ajuste a tu volumen de ventas. Sin sorpresas.
          </p>
        </FadeIn>

        <StaggerContainer
          staggerDelay={0.06}
          className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
        >
          {tiers.map((tier) => (
            <StaggerItem key={tier.name}>
              <div
                className={`relative flex flex-col rounded-2xl p-8 h-full ${
                  tier.highlighted
                    ? "border-2 border-primary-500 shadow-xl"
                    : tier.dark
                    ? "border border-secondary-200 bg-secondary-50"
                    : "border border-secondary-200"
                }`}
              >
                {tier.badge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary-600 text-white text-xs font-medium px-3 py-1 rounded-full">
                    {tier.badge}
                  </span>
                )}

                <div>
                  <h3 className="text-xl font-semibold text-secondary-900">
                    {tier.name}
                  </h3>
                  <p className="mt-2 text-sm text-secondary-500">
                    {tier.description}
                  </p>
                </div>

                <div className="mt-6 mb-6">
                  <span className="text-4xl font-bold text-secondary-900">
                    {tier.price}
                  </span>
                  {tier.period && (
                    <span className="text-secondary-500 ml-1">
                      {tier.period}
                    </span>
                  )}
                </div>

                <ul className="space-y-3 flex-grow mb-8">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-secondary-600">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={tier.href}
                  className={`w-full text-center px-6 py-3 rounded-xl font-medium transition-colors duration-200 cursor-pointer btn-press block ${
                    tier.highlighted
                      ? "bg-primary-600 text-white hover:bg-primary-700"
                      : "border-2 border-primary-600 text-primary-600 hover:bg-primary-50"
                  }`}
                >
                  {tier.cta}
                </Link>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeIn delay={0.3} className="text-center mt-12">
          <p className="text-sm text-secondary-400">
            Todos los planes incluyen: Actualizaciones en tiempo real ·
            Seguridad de datos · Sin permanencia
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
