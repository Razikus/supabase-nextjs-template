"use client";
import StaggerContainer, { StaggerItem } from "./StaggerContainer";

const companies = ["Paz Corp", "Delabase", "Metra"];

export default function SocialProofStrip() {
  return (
    <section className="bg-white py-12 border-y border-secondary-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs uppercase tracking-[0.2em] text-secondary-400 mb-8">
          Empresas que confían en nosotros
        </p>
        <StaggerContainer
          staggerDelay={0.05}
          className="flex items-center justify-center gap-12 md:gap-20 flex-wrap"
        >
          {companies.map((name) => (
            <StaggerItem key={name}>
              <span className="text-xl md:text-2xl font-semibold text-secondary-300 select-none">
                {name}
              </span>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
