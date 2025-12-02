import { useState } from 'react';
import { WalletGenerator } from '@/components/simulator/WalletGenerator';
import { DocumentSigner } from '@/components/simulator/DocumentSigner';
import { SignatureVerifier } from '@/components/simulator/SignatureVerifier';
import { Sparkles } from 'lucide-react';

interface WalletData {
  privateKey: string;
  publicKey: string;
  address: string;
}

interface SignedData {
  document: string;
  hash: string;
  signature: string;
}

export function SimulatorSection() {
  const [wallet, setWallet] = useState<WalletData | null>(null);
  const [signedData, setSignedData] = useState<SignedData | null>(null);

  return (
    <section id="simulador" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-bg" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      
      {/* Glow effects */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            <span>Simulador Interativo</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Experimente na <span className="text-primary">Prática</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Gere chaves, assine documentos e verifique assinaturas em tempo real
          </p>
        </div>

        {/* Simulator Grid */}
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="animate-fade-in" style={{ animationDelay: '0s' }}>
            <WalletGenerator
              wallet={wallet}
              onWalletGenerated={setWallet}
            />
          </div>
          <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <DocumentSigner
              privateKey={wallet?.privateKey || null}
              onDocumentSigned={setSignedData}
            />
          </div>
          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <SignatureVerifier
              originalPrivateKey={wallet?.privateKey || null}
            />
          </div>
        </div>

        {/* Flow Indicators (Desktop only) */}
        <div className="hidden lg:flex justify-center items-center gap-4 mt-8">
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary font-semibold text-xs">
              1
            </div>
            <span>Gerar</span>
          </div>
          <div className="w-12 h-0.5 bg-gradient-to-r from-primary/30 to-accent/30" />
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <div className="w-8 h-8 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center text-accent font-semibold text-xs">
              2
            </div>
            <span>Assinar</span>
          </div>
          <div className="w-12 h-0.5 bg-gradient-to-r from-accent/30 to-success/30" />
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <div className="w-8 h-8 rounded-full bg-success/20 border border-success/30 flex items-center justify-center text-success font-semibold text-xs">
              3
            </div>
            <span>Verificar</span>
          </div>
        </div>
      </div>
    </section>
  );
}
