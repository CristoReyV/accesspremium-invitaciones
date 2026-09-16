import { Check, X } from "lucide-react";

const features = [
  "Fotos del festejado",
  "Música de fondo",
  "Ubicación con mapa",
  "Confirmación de asistencia",
  "Mesa de regalos",
  "Botón para subir fotos",
  "Código QR",
  "Entrega express",
  "Personalización avanzada",
];

const plans = ["Básico", "Premium", "Recuerdos", "Fiesta Total"];

// true = included, false = not included
const matrix: boolean[][] = [
  [true, true, true, true],      // Fotos
  [false, true, true, true],     // Música
  [true, true, true, true],      // Ubicación
  [false, true, true, true],     // Confirmación de asistencia
  [false, false, true, true],    // Mesa de regalos
  [false, false, true, true],    // Botón subir fotos
  [false, false, true, true],    // QR
  [false, false, false, true],   // Entrega express
  [false, false, false, true],   // Personalización avanzada
];

const prices = ["$299", "$349", "$429", "$499"];

const ComparisonTable = () => {
  return (
    <section id="comparativa" className="py-20 md:py-24 bg-background">
      <div className="container px-4">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-primary font-semibold tracking-widest uppercase text-xs mb-3">
            Comparativa
          </p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            ¿Qué incluye cada paquete?
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto text-base">
            Compara fácilmente y elige el que mejor se adapta a tu evento.
          </p>
          <div className="divider-gold max-w-xs mx-auto mt-6" />
        </div>

        {/* Table wrapper */}
        <div className="max-w-4xl mx-auto overflow-x-auto rounded-2xl border border-border shadow-card">
          <table className="w-full min-w-[640px]">
            <thead>
              <tr className="bg-secondary/60">
                <th className="text-left py-4 px-6 font-semibold text-sm text-muted-foreground w-1/3">
                  Característica
                </th>
                {plans.map((plan, i) => (
                  <th
                    key={plan}
                    className={`py-4 px-4 text-center text-sm font-bold ${
                      i === 2 ? "text-primary" : "text-foreground"
                    }`}
                  >
                    <div className="flex flex-col items-center gap-1">
                      <span>{plan}</span>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        i === 2
                          ? "bg-primary/15 text-primary"
                          : "bg-secondary text-muted-foreground"
                      }`}>
                        {prices[i]}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-border/60">
              {features.map((feature, rowIdx) => (
                <tr
                  key={feature}
                  className="hover:bg-secondary/30 transition-colors duration-150"
                >
                  <td className="py-3.5 px-6 text-sm text-foreground font-medium">
                    {feature}
                  </td>
                  {plans.map((plan, colIdx) => {
                    const included = matrix[rowIdx][colIdx];
                    return (
                      <td key={plan} className="py-3.5 px-4 text-center">
                        {included ? (
                          <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/12">
                            <Check className="w-3.5 h-3.5 text-primary" strokeWidth={2.5} />
                          </div>
                        ) : (
                          <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-muted/60">
                            <X className="w-3.5 h-3.5 text-muted-foreground/50" strokeWidth={2} />
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Note */}
        <p className="text-center text-muted-foreground text-sm mt-8">
          Todos los paquetes incluyen link para compartir por WhatsApp y diseño responsive para celular.
        </p>
      </div>
    </section>
  );
};

export default ComparisonTable;
