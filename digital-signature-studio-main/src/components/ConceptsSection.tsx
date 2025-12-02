import { PenTool, Key, Hash, Award } from 'lucide-react';

const concepts = [
  {
    title: 'Assinatura Digital',
    description: 'É um mecanismo criptográfico que garante autenticidade, integridade e não-repúdio de documentos eletrônicos. Funciona como uma assinatura manuscrita, mas com muito mais segurança.',
    icon: PenTool,
    color: 'primary',
  },
  {
    title: 'Chave Pública e Privada',
    description: 'A chave privada assina e deve ser mantida em segredo absoluto. A chave pública verifica e pode ser compartilhada livremente. Juntas, formam um par criptográfico.',
    icon: Key,
    color: 'accent',
  },
  {
    title: 'Hash (Resumo)',
    description: 'É um resumo único e de tamanho fixo de um documento. Se o documento muda, mesmo que minimamente, o hash muda completamente. Isso garante a integridade.',
    icon: Hash,
    color: 'primary',
  },
  {
    title: 'Certificado Digital',
    description: 'É como um documento de identidade eletrônico que vincula uma chave pública à identidade de uma pessoa ou empresa, emitido por uma autoridade certificadora confiável.',
    icon: Award,
    color: 'success',
  },
];

export function ConceptsSection() {
  return (
    <section id="conceitos" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-bg" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
            <span>📚 Aprenda</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Conceitos <span className="text-primary">Essenciais</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Entenda os fundamentos das assinaturas e certificados digitais
          </p>
        </div>

        {/* Concepts Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {concepts.map((concept, index) => {
            const IconComponent = concept.icon;
            const colorClasses = {
              primary: 'bg-primary/10 text-primary border-primary/20 group-hover:bg-primary/20 group-hover:border-primary/40 group-hover:shadow-primary/20',
              accent: 'bg-accent/10 text-accent border-accent/20 group-hover:bg-accent/20 group-hover:border-accent/40 group-hover:shadow-accent/20',
              success: 'bg-success/10 text-success border-success/20 group-hover:bg-success/20 group-hover:border-success/40 group-hover:shadow-success/20',
            };

            return (
              <div
                key={concept.title}
                className="group glass-card-hover p-8 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-5">
                  <div className={`w-14 h-14 rounded-xl border flex items-center justify-center shrink-0 transition-all duration-300 group-hover:shadow-lg ${colorClasses[concept.color as keyof typeof colorClasses]}`}>
                    <IconComponent className="w-7 h-7" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                      {concept.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {concept.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
