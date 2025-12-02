import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Wallet, Key, Copy, Check, RefreshCw, Eye, EyeOff, AlertTriangle } from 'lucide-react';
import { generateKeyPair, truncateKey } from '@/lib/crypto-utils';
import { cn } from '@/lib/utils';

interface WalletData {
  privateKey: string;
  publicKey: string;
  address: string;
}

interface WalletGeneratorProps {
  onWalletGenerated: (wallet: WalletData) => void;
  wallet: WalletData | null;
}

export function WalletGenerator({ onWalletGenerated, wallet }: WalletGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleGenerate = async () => {
    setIsGenerating(true);
    // Small delay for visual feedback
    await new Promise(resolve => setTimeout(resolve, 600));
    const newWallet = generateKeyPair();
    onWalletGenerated(newWallet);
    setIsGenerating(false);
    setShowPrivateKey(false);
  };

  const copyToClipboard = async (text: string, field: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="glass-card p-6 lg:p-8 h-full">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
          <Wallet className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-display text-lg font-semibold text-foreground">1. Gerar Carteira Didática</h3>
          <p className="text-xs text-muted-foreground">Crie sua identidade digital</p>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
        Clique no botão abaixo para gerar um par de chaves e um endereço de carteira fictício. 
        Isso simula a criação de uma identidade digital.
      </p>

      {/* Generate Button */}
      <Button
        variant={wallet ? 'outline' : 'hero'}
        className="w-full mb-6"
        onClick={handleGenerate}
        disabled={isGenerating}
      >
        {isGenerating ? (
          <>
            <RefreshCw className="w-4 h-4 animate-spin" />
            Gerando...
          </>
        ) : wallet ? (
          <>
            <RefreshCw className="w-4 h-4" />
            Gerar Nova Carteira
          </>
        ) : (
          <>
            <Key className="w-4 h-4" />
            Gerar Carteira
          </>
        )}
      </Button>

      {/* Generated Wallet Display */}
      {wallet && (
        <div className="space-y-4 animate-fade-in">
          {/* Address */}
          <div className="space-y-2">
            <label className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
              Endereço da Carteira
            </label>
            <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50 border border-border/50">
              <span className="font-mono text-sm text-primary flex-1 truncate">
                {truncateKey(wallet.address, 8, 8)}
              </span>
              <button
                onClick={() => copyToClipboard(wallet.address, 'address')}
                className="p-1.5 rounded-md hover:bg-secondary transition-colors"
                title="Copiar endereço"
              >
                {copiedField === 'address' ? (
                  <Check className="w-4 h-4 text-success" />
                ) : (
                  <Copy className="w-4 h-4 text-muted-foreground" />
                )}
              </button>
            </div>
          </div>

          {/* Public Key */}
          <div className="space-y-2">
            <label className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
              Chave Pública
            </label>
            <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50 border border-border/50">
              <span className="font-mono text-xs text-foreground flex-1 break-all">
                {truncateKey(wallet.publicKey, 12, 8)}
              </span>
              <button
                onClick={() => copyToClipboard(wallet.publicKey, 'publicKey')}
                className="p-1.5 rounded-md hover:bg-secondary transition-colors shrink-0"
                title="Copiar chave pública"
              >
                {copiedField === 'publicKey' ? (
                  <Check className="w-4 h-4 text-success" />
                ) : (
                  <Copy className="w-4 h-4 text-muted-foreground" />
                )}
              </button>
            </div>
          </div>

          {/* Private Key */}
          <div className="space-y-2">
            <label className="text-xs text-muted-foreground uppercase tracking-wider font-medium flex items-center gap-2">
              Chave Privada
              <span className="text-destructive">(Secreta)</span>
            </label>
            <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/5 border border-destructive/20">
              <span className={cn(
                "font-mono text-xs flex-1 break-all transition-all",
                showPrivateKey ? "text-foreground" : "text-muted-foreground blur-sm select-none"
              )}>
                {showPrivateKey ? truncateKey(wallet.privateKey, 12, 8) : '••••••••••••••••••••••••'}
              </span>
              <button
                onClick={() => setShowPrivateKey(!showPrivateKey)}
                className="p-1.5 rounded-md hover:bg-secondary transition-colors shrink-0"
                title={showPrivateKey ? "Ocultar" : "Revelar"}
              >
                {showPrivateKey ? (
                  <EyeOff className="w-4 h-4 text-muted-foreground" />
                ) : (
                  <Eye className="w-4 h-4 text-muted-foreground" />
                )}
              </button>
              <button
                onClick={() => copyToClipboard(wallet.privateKey, 'privateKey')}
                className="p-1.5 rounded-md hover:bg-secondary transition-colors shrink-0"
                title="Copiar chave privada"
              >
                {copiedField === 'privateKey' ? (
                  <Check className="w-4 h-4 text-success" />
                ) : (
                  <Copy className="w-4 h-4 text-muted-foreground" />
                )}
              </button>
            </div>
            <div className="flex items-start gap-2 p-2 rounded-md bg-destructive/10 border border-destructive/20">
              <AlertTriangle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
              <p className="text-xs text-destructive/90">
                Mantenha esta chave em segredo (simulação). Nunca compartilhe sua chave privada!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!wallet && !isGenerating && (
        <div className="text-center py-8 border border-dashed border-border rounded-lg">
          <Key className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">
            Nenhuma carteira gerada ainda
          </p>
        </div>
      )}

      {/* Loading State */}
      {isGenerating && (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-3 w-24 bg-muted/50 rounded animate-shimmer" />
              <div className="h-12 bg-muted/30 rounded-lg animate-shimmer" style={{ animationDelay: `${i * 0.1}s` }} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
