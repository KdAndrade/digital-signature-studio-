import { GraduationCap, Shield, Code, Heart } from 'lucide-react';

export function AboutSection() {
  return (
    <section id="sobre" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-bg" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Main Content */}
          <div className="glass-card p-8 lg:p-12 text-center">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-8">
              <GraduationCap className="w-8 h-8 text-primary" />
            </div>

            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
              Sobre o <span className="text-primary">Projeto</span>
            </h2>

            <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-2xl mx-auto">
              Este simulador foi desenvolvido como parte de um projeto acadêmico na área de 
              <span className="text-foreground font-medium"> Segurança da Informação</span>, 
              com foco em <span className="text-foreground font-medium">Assinaturas e Certificados Digitais</span>. 
              O objetivo é tornar o aprendizado visual, prático e intuitivo, usando a metáfora de uma carteira cripto.
            </p>

            {/* Features */}
            <div className="grid sm:grid-cols-3 gap-6 mb-8">
              <div className="p-4 rounded-lg bg-muted/30 border border-border/30">
                <Shield className="w-6 h-6 text-primary mx-auto mb-3" />
                <h4 className="font-medium text-foreground mb-1">100% Educacional</h4>
                <p className="text-xs text-muted-foreground">
                  Simulação didática sem blockchain real
                </p>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border/30">
                <Code className="w-6 h-6 text-accent mx-auto mb-3" />
                <h4 className="font-medium text-foreground mb-1">Front-end Puro</h4>
                <p className="text-xs text-muted-foreground">
                  Funciona 100% no navegador
                </p>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border/30">
                <Heart className="w-6 h-6 text-destructive mx-auto mb-3" />
                <h4 className="font-medium text-foreground mb-1">Open Source</h4>
                <p className="text-xs text-muted-foreground">
                  Código aberto para aprendizado
                </p>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="p-4 rounded-lg bg-accent/5 border border-accent/20 max-w-2xl mx-auto">
              <p className="text-sm text-muted-foreground">
                <strong className="text-accent">Aviso:</strong> Este é um simulador educacional. 
                As funções de criptografia são simplificadas para fins didáticos. 
                Não utilize para fins reais de segurança.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
