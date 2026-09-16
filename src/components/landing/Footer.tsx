import { MessageCircle } from "lucide-react";

const WHATSAPP_URL =
  "https://wa.me/526645922368?text=Hola%2C%20me%20interesa%20una%20invitaci%C3%B3n%20web%20personalizada";

const Footer = () => {
  return (
    <footer className="bg-foreground text-white py-12">
      <div className="container px-4">
        <div className="flex flex-col items-center text-center gap-6">

          {/* Brand */}
          <div>
            <h3 className="font-serif text-2xl font-bold text-white">
              Access<span className="text-[#D4AF37]">Premium</span>
            </h3>
            <p className="text-white/50 text-sm mt-1 tracking-wide">
              Invitaciones digitales personalizadas
            </p>
          </div>

          {/* Divider */}
          <div className="w-16 h-0.5 bg-white/10" />

          {/* WhatsApp contact */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-white/15 text-white/70 hover:text-white hover:border-white/30 transition-all duration-200 text-sm font-medium"
          >
            <MessageCircle className="w-4 h-4 text-[#25D366]" />
            Escríbenos por WhatsApp
          </a>

          {/* Copyright */}
          <p className="text-white/30 text-xs">
            © {new Date().getFullYear()} AccessPremium. Todos los derechos reservados.
          </p>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
