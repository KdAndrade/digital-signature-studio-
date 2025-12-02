import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FileText, Hash, PenTool, Copy, Check, AlertCircle, CheckCircle2 } from 'lucide-react';
import { generateHash, signDocument } from '@/lib/crypto-utils';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface DocumentSignerProps {
  privateKey: string | null;
  onDocumentSigned: (data: { document: string; hash: string; signature: string }) => void;
}

export function DocumentSigner({ privateKey, onDocumentSigned }: DocumentSignerProps) {
  const [document, setDocument] = useState('');
  const [hash, setHash] = useState('');
  const [signature, setSignature] = useState('');
  const [isHashing, setIsHashing] = useState(false);
  const [isSigning, setIsSigning] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleGenerateHash = async () => {
    if (!document.trim()) {
      toast.error('Por favor, escreva um documento antes de gerar o hash.');
      return;
    }

    setIsHashing(true);
    await new Promise(resolve => setTimeout(resolve, 400));
    const generatedHash = await generateHash(document);
    setHash(generatedHash);
    setSignature(''); // Reset signature when hash changes
    setIsHashing(false);
    toast.success('Hash gerado com sucesso!');
  };

  const handleSign = async () => {
    if (!privateKey) {
      toast.error('Gere uma carteira primeiro na coluna à esquerda.');
      return;
    }

    if (!hash) {
      toast.error('Você precisa gerar o hash antes de assinar.');
      return;
    }

    setIsSigning(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    const generatedSignature = await signDocument(hash, privateKey);
    setSignature(generatedSignature);
    onDocumentSigned({ document, hash, signature: generatedSignature });
    setIsSigning(false);
    toast.success('Documento assinado digitalmente!');
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
        <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
          <FileText className="w-5 h-5 text-accent" />
        </div>
        <div>
          <h3 className="font-display text-lg font-semibold text-foreground">2. Assinar um Documento</h3>
          <p className="text-xs text-muted-foreground">Crie e assine digitalmente</p>
        </div>
      </div>

      {/* Document Input */}
      <div className="space-y-2 mb-4">
        <label className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
          Documento
        </label>
        <textarea
          value={document}
          onChange={(e) => {
            setDocument(e.target.value);
            setHash('');
            setSignature('');
          }}
          placeholder="Digite aqui o conteúdo do documento que você deseja assinar digitalmente..."
          className="w-full h-32 p-4 rounded-lg bg-muted/30 border border-border/50 text-foreground placeholder:text-muted-foreground/50 resize-none focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
        />
      </div>

      {/* Generate Hash Button */}
      <Button
        variant="outline"
        className="w-full mb-4"
        onClick={handleGenerateHash}
        disabled={isHashing || !document.trim()}
      >
        {isHashing ? (
          <>
            <Hash className="w-4 h-4 animate-spin" />
            Gerando Hash...
          </>
        ) : (
          <>
            <Hash className="w-4 h-4" />
            Gerar Hash do Documento
          </>
        )}
      </Button>

      {/* Hash Display */}
      {hash && (
        <div className="space-y-2 mb-4 animate-fade-in">
          <label className="text-xs text-muted-foreground uppercase tracking-wider font-medium flex items-center gap-2">
            <CheckCircle2 className="w-3 h-3 text-success" />
            Hash Gerado (SHA-256)
          </label>
          <div className="flex items-start gap-2 p-3 rounded-lg bg-muted/50 border border-border/50">
            <span className="font-mono text-xs text-primary flex-1 break-all">
              {hash}
            </span>
            <button
              onClick={() => copyToClipboard(hash, 'hash')}
              className="p-1.5 rounded-md hover:bg-secondary transition-colors shrink-0"
              title="Copiar hash"
            >
              {copiedField === 'hash' ? (
                <Check className="w-4 h-4 text-success" />
              ) : (
                <Copy className="w-4 h-4 text-muted-foreground" />
              )}
            </button>
          </div>
        </div>
      )}

      {/* Sign Button */}
      <Button
        variant={signature ? 'success' : 'hero'}
        className="w-full mb-4"
        onClick={handleSign}
        disabled={isSigning || !hash || !privateKey}
      >
        {isSigning ? (
          <>
            <PenTool className="w-4 h-4 animate-pulse" />
            Assinando...
          </>
        ) : signature ? (
          <>
            <CheckCircle2 className="w-4 h-4" />
            Documento Assinado ✓
          </>
        ) : (
          <>
            <PenTool className="w-4 h-4" />
            Assinar com a Chave Privada
          </>
        )}
      </Button>

      {/* Warning if no wallet */}
      {!privateKey && (
        <div className="flex items-start gap-2 p-3 rounded-lg bg-accent/10 border border-accent/20 mb-4">
          <AlertCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" />
          <p className="text-xs text-accent">
            Gere uma carteira primeiro para poder assinar documentos.
          </p>
        </div>
      )}

      {/* Signature Display */}
      {signature && (
        <div className="space-y-4 animate-fade-in">
          <div className="space-y-2">
            <label className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
              Assinatura Digital (Simulada)
            </label>
            <div className="flex items-start gap-2 p-3 rounded-lg bg-success/10 border border-success/30">
              <span className="font-mono text-xs text-success flex-1 break-all">
                {signature}
              </span>
              <button
                onClick={() => copyToClipboard(signature, 'signature')}
                className="p-1.5 rounded-md hover:bg-success/20 transition-colors shrink-0"
                title="Copiar assinatura"
              >
                {copiedField === 'signature' ? (
                  <Check className="w-4 h-4 text-success" />
                ) : (
                  <Copy className="w-4 h-4 text-success" />
                )}
              </button>
            </div>
          </div>

          {/* Success Badge */}
          <div className={cn(
            "flex items-center gap-3 p-4 rounded-lg",
            "bg-success/10 border border-success/30"
          )}>
            <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="text-sm font-medium text-success">Documento Assinado ✅</p>
              <p className="text-xs text-success/80">A assinatura está pronta para verificação</p>
            </div>
          </div>

          <p className="text-xs text-muted-foreground text-center">
            Esta assinatura é uma simulação didática. Em sistemas reais, usa-se criptografia assimétrica segura.
          </p>
        </div>
      )}

      {/* Empty State */}
      {!hash && !signature && document.trim() && (
        <div className="text-center py-4 border border-dashed border-border rounded-lg">
          <Hash className="w-8 h-8 text-muted-foreground/30 mx-auto mb-2" />
          <p className="text-xs text-muted-foreground">
            Clique em "Gerar Hash" para continuar
          </p>
        </div>
      )}
    </div>
  );
}
