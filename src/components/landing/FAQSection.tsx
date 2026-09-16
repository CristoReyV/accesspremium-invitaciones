import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "¿En cuánto tiempo entregan?",
    answer: "Entregamos tu invitación lista en 3 días hábiles tras recibir tu anticipo y la información de tu evento. Si tienes prisa, contamos con servicio Express de 24 horas por $100 adicionales (o incluido en el paquete Fiesta Total)."
  },
  {
    question: "¿Puedo pedir un personaje o temática específica?",
    answer: "¡Sí, por supuesto! Hacemos invitaciones de princesas, superhéroes, safari, videojuegos y cualquier temática que necesites, manteniendo siempre un diseño elegante y premium."
  },
  {
    question: "¿Puedo cambiar colores o fuentes?",
    answer: "Sí, todos nuestros diseños son adaptables. Podemos ajustar la paleta de colores para que coincida exactamente con la decoración de tu evento."
  },
  {
    question: "¿Qué necesito enviar para empezar?",
    answer: "Solo requieres un anticipo de $50 pesos. Después, te enviaremos un formulario sencillo donde podrás colocar fecha, hora, ubicación, fotos y preferencias."
  },
  {
    question: "¿Cómo se comparte la invitación?",
    answer: "Te entregamos un link único (ejemplo: accesspremium.site/boda/ana-y-carlos) que puedes enviar libremente por WhatsApp a todos tus contactos. Ellos solo tienen que darle clic."
  },
  {
    question: "¿Puedo hacer cambios después de entregada?",
    answer: "Sí, incluimos hasta 2 rondas de correcciones menores (errores de dedo, cambio de horario). Si requieres cambios estructurales mayores, podrían generar un costo extra."
  },
  {
    question: "¿La invitación se abre bien en celular?",
    answer: "¡Claro! Todos nuestros diseños están construidos específicamente (mobile-first) para verse increíbles y ser 100% funcionales en cualquier smartphone."
  },
  {
    question: "¿Cómo aparto mi diseño?",
    answer: "Solo da clic en cualquier botón de 'Pedir por WhatsApp'. Te atenderemos personalmente para confirmar tu paquete y recibir tu anticipo seguro de $50 pesos."
  }
];

const FAQSection = () => {
  return (
    <section id="faq" className="py-20 md:py-28 bg-primary/5">
      <div className="container px-4 max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-primary font-semibold tracking-widest uppercase text-xs mb-3">
            Soporte
          </p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            Preguntas Frecuentes
          </h2>
          <p className="text-muted-foreground text-base">
            Resolvemos todas tus dudas para que pidas tu invitación con total confianza.
          </p>
          <div className="divider-gold max-w-xs mx-auto mt-6" />
        </div>

        {/* Accordion */}
        <div className="bg-white rounded-2xl border border-border/60 shadow-card p-4 md:p-8">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-border">
                <AccordionTrigger className="text-left font-serif text-lg font-bold hover:text-primary transition-colors text-foreground">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed text-base">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

      </div>
    </section>
  );
};

export default FAQSection;
