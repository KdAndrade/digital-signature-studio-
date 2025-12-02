import { Shield, Github, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="py-8 relative border-t border-border/30">
      <div className="absolute inset-0 gradient-bg" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            <span className="font-display font-semibold text-foreground">
              SecureSign<span className="text-primary">Wallet</span>
            </span>
          </div>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Feito com <Heart className="w-4 h-4 text-destructive" /> para fins educacionais
          </p>

          {/* Year */}
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Projeto Acadêmico
          </p>
        </div>
      </div>
    </footer>
  );
}
