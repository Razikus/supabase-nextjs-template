import Link from "next/link";
import BetaLogo from "./BetaLogo";

const footerLinks = {
  Producto: [
    { label: "Funcionalidades", href: "#funcionalidades" },
    { label: "Precios", href: "#precios" },
  ],
  Recursos: [
    { label: "Soporte", href: "mailto:soporte@betaplus.cl" },
  ],
  Legal: [
    { label: "Privacidad", href: "/legal/privacy" },
    { label: "Términos", href: "/legal/terms" },
  ],
};

export default function Footer({ productName }: { productName: string }) {
  return (
    <footer className="bg-[#070b14] text-secondary-400 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <BetaLogo variant="light" />
            <p className="mt-3 text-sm text-secondary-400 leading-relaxed">
              CRM para corredores inmobiliarios en Chile.
            </p>
          </div>
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-sm font-semibold text-secondary-200">
                {category}
              </h4>
              <ul className="mt-4 space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-secondary-400 hover:text-secondary-200 transition-colors duration-200 cursor-pointer"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-8 border-t border-secondary-800">
          <p className="text-center text-sm text-secondary-500">
            © {new Date().getFullYear()} {productName}. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
