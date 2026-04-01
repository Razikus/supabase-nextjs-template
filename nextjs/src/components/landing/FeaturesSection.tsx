"use client";
import {
  Users,
  Lock,
  Calendar,
  Building2,
  Calculator,
  TrendingUp,
} from "lucide-react";
import FadeIn from "./FadeIn";
import StaggerContainer, { StaggerItem } from "./StaggerContainer";

const features = [
  {
    icon: Users,
    title: "Explorar Leads",
    description:
      "Navega leads disponibles con scoring de calidad y filtros avanzados para encontrar los mejores prospectos.",
  },
  {
    icon: Lock,
    title: "Reservas Exclusivas",
    description:
      "Reserva leads con créditos. Cada lead reservado es exclusivo para ti, sin competencia.",
  },
  {
    icon: Calendar,
    title: "Agenda Integrada",
    description:
      "Programa reuniones directamente desde la plataforma con calendario visual y recordatorios.",
  },
  {
    icon: Building2,
    title: "Stock en Tiempo Real",
    description:
      "Consulta unidades disponibles por proyecto, con estado actualizado al instante.",
  },
  {
    icon: Calculator,
    title: "Escenarios de Inversión",
    description:
      "Genera simulaciones financieras de pie, crédito hipotecario y plusvalía para tus clientes.",
  },
  {
    icon: TrendingUp,
    title: "Pipeline de Ventas",
    description:
      "Gestiona tus clientes desde la asesoría hasta el cierre de la venta.",
  },
];

export default function FeaturesSection({
  productName,
}: {
  productName: string;
}) {
  return (
    <section id="funcionalidades" className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary-600">
            Funcionalidades
          </p>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-secondary-900">
            Todo lo que necesitas para vender más
          </h2>
          <p className="mt-4 text-lg text-secondary-500 max-w-2xl mx-auto">
            Desde la captación del lead hasta el cierre de la venta,{" "}
            {productName} te acompaña en cada paso.
          </p>
        </FadeIn>

        <StaggerContainer
          staggerDelay={0.06}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature) => (
            <StaggerItem key={feature.title}>
              <div className="bg-white border border-secondary-100 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-[250ms] h-full">
                <div className="bg-primary-50 text-primary-600 p-3 rounded-xl w-12 h-12 flex items-center justify-center">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-secondary-900 mt-5">
                  {feature.title}
                </h3>
                <p className="text-secondary-500 mt-2 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
