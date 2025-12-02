import { Key, FileText, PenTool, ShieldCheck } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Gerar Chaves',
    description: 'O usuário gera um par de chaves: uma chave privada (secreta) e uma chave pública (compartilhável).',
    icon: Key,
    color: 'primary',
  },
  {
    number: '02',
    title: 'Escrever o Documento',
    description: 'Um documento ou mensagem é escrito. Usamos uma função de hash para gerar um resumo único desse conteúdo.',
    icon: FileText,
    color: 'accent',
  },
  {
    number: '03',
    title: 'Assinar com a Chave Privada',
    description: 'A chave privada assina o hash do documento, gerando uma assinatura digital única.',
    icon: PenTool,
    color: 'primary',
  },
  {
    number: '04',
    title: 'Verificar com a Chave Pública',
    description: 'Qualquer pessoa com a chave pública pode verificar se a assinatura é válida e se o documento foi alterado.',
    icon: ShieldCheck,
    color: 'success',
  },
];

export function HowItWorksSection() {
  return (
    <section id="como-funciona" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-bg" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-6">
            <span>4 Passos Simples</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Como a <span className="text-primary">Assinatura Digital</span> Funciona
          </h2>
          <p className="text-lg text-muted-foreground">
            Uma visão simplificada do processo de assinatura e verificação digital
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            const colorClasses = {
              primary: 'bg-primary/10 text-primary border-primary/20 group-hover:bg-primary/20 group-hover:border-primary/40',
              accent: 'bg-accent/10 text-accent border-accent/20 group-hover:bg-accent/20 group-hover:border-accent/40',
              success: 'bg-success/10 text-success border-success/20 group-hover:bg-success/20 group-hover:border-success/40',
            };
            
            return (
              <div
                key={step.number}
                className="group glass-card-hover p-6 lg:p-8 relative"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Step Number */}
                <div className="absolute -top-3 -left-3 w-10 h-10 rounded-lg bg-secondary border border-border flex items-center justify-center">
                  <span className="font-display font-bold text-sm text-primary">{step.number}</span>
                </div>

                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl border flex items-center justify-center mb-6 transition-all duration-300 ${colorClasses[step.color as keyof typeof colorClasses]}`}>
                  <IconComponent className="w-7 h-7" />
                </div>

                {/* Content */}
                <h3 className="font-display text-xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>

                {/* Connection line (desktop only) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-border to-transparent" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
