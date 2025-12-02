import { Button } from '@/components/ui/button';
import { Shield, Key, FileCheck, Lock, ArrowRight } from 'lucide-react';

export function HeroSection() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="inicio" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 gradient-bg" />
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
      
      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
              <Shield className="w-4 h-4" />
              <span>Simulador Educacional</span>
            </div>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Simulador de{' '}
              <span className="text-primary">Carteira Cripto</span>
              {' '}para Assinaturas Digitais
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
              Entenda, na prática, como funcionam <span className="text-foreground font-medium">chaves públicas e privadas</span>, 
              <span className="text-foreground font-medium"> hash</span> e <span className="text-foreground font-medium">verificação de documentos</span> — 
              tudo em uma interface simples, bonita e interativa.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="hero"
                size="xl"
                onClick={() => scrollToSection('#simulador')}
                className="group"
              >
                Começar Simulação
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                variant="hero-outline"
                size="xl"
                onClick={() => scrollToSection('#conceitos')}
              >
                Ver Conceitos Básicos
              </Button>
            </div>
          </div>

          {/* Right Content - Preview Card */}
          <div className="relative animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="relative">
              {/* Glow effect behind card */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 blur-3xl scale-110" />
              
              {/* Main Preview Card */}
              <div className="relative glass-card p-8 space-y-6 animate-float">
                {/* Wallet Header */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                    <Key className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Carteira Didática</p>
                    <p className="font-mono text-sm text-foreground">0xA9F2...C81</p>
                  </div>
                </div>

                {/* Document Preview */}
                <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
                  <div className="flex items-start gap-3">
                    <FileCheck className="w-5 h-5 text-success mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">Documento Assinado</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        "Contrato de Exemplo..."
                      </p>
                    </div>
                  </div>
                </div>

                {/* Signature Badge */}
                <div className="flex items-center justify-between p-4 rounded-lg bg-success/10 border border-success/30">
                  <div className="flex items-center gap-3">
                    <Lock className="w-5 h-5 text-success" />
                    <span className="text-sm font-medium text-success">Assinado Digitalmente</span>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                </div>

                {/* Hash Preview */}
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Hash SHA-256</p>
                  <p className="font-mono text-xs text-primary/80 break-all">
                    7F9A13B82D4E5F6A...
                  </p>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 border-2 border-primary/30 rounded-lg rotate-12" />
              <div className="absolute -bottom-4 -left-4 w-6 h-6 border-2 border-accent/30 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
          <div className="w-1.5 h-2.5 bg-muted-foreground/50 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}
