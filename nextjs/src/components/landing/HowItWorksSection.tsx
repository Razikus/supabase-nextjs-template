"use client";
import FadeIn from "./FadeIn";
import StaggerContainer, { StaggerItem } from "./StaggerContainer";

const steps = [
  { number: 1, title: "Explora", description: "Navega leads filtrados por calidad y zona" },
  { number: 2, title: "Reserva", description: "Usa créditos para reservar leads exclusivos" },
  { number: 3, title: "Contacta", description: "Accede a los datos del cliente" },
  { number: 4, title: "Agenda", description: "Programa reuniones desde tu calendario" },
  { number: 5, title: "Vende", description: "Cierra la venta y registra el éxito" },
];

export default function HowItWorksSection() {
  return (
    <section id="como-funciona" className="bg-secondary-50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary-600">
            Como Funciona
          </p>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-secondary-900">
            De lead a venta en 5 pasos
          </h2>
          <p className="mt-4 text-lg text-secondary-500 max-w-2xl mx-auto">
            Un flujo simple y directo para que te enfoques en lo que mejor
            haces: vender.
          </p>
        </FadeIn>

        {/* Desktop: horizontal */}
        <StaggerContainer
          staggerDelay={0.08}
          className="hidden md:grid grid-cols-5 gap-4"
        >
          {steps.map((step, i) => (
            <StaggerItem key={step.number}>
              <div className="flex flex-col items-center text-center">
                <div className="relative">
                  <div className="w-14 h-14 rounded-full bg-primary-600 text-white font-bold text-lg flex items-center justify-center">
                    {step.number}
                  </div>
                  {i < steps.length - 1 && (
                    <div className="absolute top-1/2 left-full w-full border-t-2 border-dashed border-secondary-300 -translate-y-1/2 pointer-events-none" />
                  )}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-secondary-900">
                  {step.title}
                </h3>
                <p className="mt-1 text-sm text-secondary-500 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Mobile: vertical */}
        <StaggerContainer
          staggerDelay={0.08}
          className="md:hidden space-y-0"
        >
          {steps.map((step, i) => (
            <StaggerItem key={step.number}>
              <div className="flex items-start gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-primary-600 text-white font-bold text-base flex items-center justify-center flex-shrink-0">
                    {step.number}
                  </div>
                  {i < steps.length - 1 && (
                    <div className="w-0.5 h-12 bg-secondary-300 border-l-2 border-dashed border-secondary-300" />
                  )}
                </div>
                <div className="pt-2 pb-6">
                  <h3 className="text-lg font-semibold text-secondary-900">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-sm text-secondary-500 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
