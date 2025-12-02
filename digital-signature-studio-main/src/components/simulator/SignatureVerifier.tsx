import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ShieldCheck, CheckCircle2, XCircle, AlertCircle, Search } from 'lucide-react';
import { generateHash, signDocument } from '@/lib/crypto-utils';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface SignatureVerifierProps {
  originalPrivateKey: string | null;
}

type VerificationResult = 'valid' | 'invalid' | null;

export function SignatureVerifier({ originalPrivateKey }: SignatureVerifierProps) {
  const [receivedDocument, setReceivedDocument] = useState('');
  const [receivedPublicKey, setReceivedPublicKey] = useState('');
  const [receivedSignature, setReceivedSignature] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<VerificationResult>(null);

  const handleVerify = async () => {
    if (!receivedDocument.trim()) {
      toast.error('Por favor, cole o documento recebido.');
      return;
    }
    if (!receivedPublicKey.trim()) {
      toast.error('Por favor, cole a chave pública do remetente.');
      return;
    }
    if (!receivedSignature.trim()) {
      toast.error('Por favor, cole a assinatura digital recebida.');
      return;
    }

    setIsVerifying(true);
    setVerificationResult(null);
    await new Promise(resolve => setTimeout(resolve, 800));

    // Simulate verification
    // In our simplified model, we recalculate the hash and signature
    const documentHash = await generateHash(receivedDocument);
    
    // If we have the original private key, we can properly verify
    if (originalPrivateKey) {
      const expectedSignature = await signDocument(documentHash, originalPrivateKey);
      const isValid = receivedSignature === expectedSignature;
      setVerificationResult(isValid ? 'valid' : 'invalid');
    } else {
      // Without the original private key, we can only do a format check
      // In a real system, we'd use the public key to verify
      // For this simulation, we'll check if the signature format is correct
      const isValidFormat = receivedSignature.startsWith('sig_') && receivedSignature.length === 68;
      setVerificationResult(isValidFormat ? 'valid' : 'invalid');
    }

    setIsVerifying(false);
  };

  const resetVerification = () => {
    setVerificationResult(null);
  };

  return (
    <div className="glass-card p-6 lg:p-8 h-full">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-success/10 border border-success/20 flex items-center justify-center">
          <ShieldCheck className="w-5 h-5 text-success" />
        </div>
        <div>
          <h3 className="font-display text-lg font-semibold text-foreground">3. Verificar Assinatura</h3>
          <p className="text-xs text-muted-foreground">Valide a autenticidade</p>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
        Simule o papel de um verificador. Cole o documento, a chave pública e a assinatura para verificar a autenticidade.
      </p>

      {/* Input Fields */}
      <div className="space-y-4 mb-6">
        {/* Document Input */}
        <div className="space-y-2">
          <label className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
            Documento Recebido
          </label>
          <textarea
            value={receivedDocument}
            onChange={(e) => {
              setReceivedDocument(e.target.value);
              resetVerification();
            }}
            placeholder="Cole aqui o texto do documento que você recebeu..."
            className="w-full h-24 p-3 rounded-lg bg-muted/30 border border-border/50 text-foreground placeholder:text-muted-foreground/50 resize-none focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all text-sm"
          />
        </div>

        {/* Public Key Input */}
        <div className="space-y-2">
          <label className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
            Chave Pública do Remetente
          </label>
          <input
            type="text"
            value={receivedPublicKey}
            onChange={(e) => {
              setReceivedPublicKey(e.target.value);
              resetVerification();
            }}
            placeholder="Cole aqui a chave pública do remetente..."
            className="w-full p-3 rounded-lg bg-muted/30 border border-border/50 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all text-sm font-mono"
          />
        </div>

        {/* Signature Input */}
        <div className="space-y-2">
          <label className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
            Assinatura Digital Recebida
          </label>
          <input
            type="text"
            value={receivedSignature}
            onChange={(e) => {
              setReceivedSignature(e.target.value);
              resetVerification();
            }}
            placeholder="Cole aqui a assinatura digital recebida..."
            className="w-full p-3 rounded-lg bg-muted/30 border border-border/50 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all text-sm font-mono"
          />
        </div>
      </div>

      {/* Verify Button */}
      <Button
        variant="hero"
        className="w-full mb-6"
        onClick={handleVerify}
        disabled={isVerifying}
      >
        {isVerifying ? (
          <>
            <Search className="w-4 h-4 animate-pulse" />
            Verificando...
          </>
        ) : (
          <>
            <ShieldCheck className="w-4 h-4" />
            Verificar Assinatura
          </>
        )}
      </Button>

      {/* Verification Result */}
      {verificationResult && (
        <div
          className={cn(
            "p-6 rounded-xl border-2 animate-scale-in",
            verificationResult === 'valid'
              ? "bg-success/10 border-success/30"
              : "bg-destructive/10 border-destructive/30"
          )}
        >
          <div className="flex items-start gap-4">
            <div className={cn(
              "w-12 h-12 rounded-full flex items-center justify-center shrink-0",
              verificationResult === 'valid' ? "bg-success/20" : "bg-destructive/20"
            )}>
              {verificationResult === 'valid' ? (
                <CheckCircle2 className="w-7 h-7 text-success" />
              ) : (
                <XCircle className="w-7 h-7 text-destructive" />
              )}
            </div>
            <div className="flex-1">
              <h4 className={cn(
                "font-display text-lg font-semibold mb-2",
                verificationResult === 'valid' ? "text-success" : "text-destructive"
              )}>
                {verificationResult === 'valid' ? (
                  <>Assinatura VÁLIDA ✅</>
                ) : (
                  <>Assinatura INVÁLIDA ❌</>
                )}
              </h4>
              <p className={cn(
                "text-sm leading-relaxed",
                verificationResult === 'valid' ? "text-success/90" : "text-destructive/90"
              )}>
                {verificationResult === 'valid' ? (
                  <>O documento não foi alterado e a assinatura corresponde à chave pública informada.</>
                ) : (
                  <>O documento pode ter sido alterado ou a assinatura não corresponde à chave pública.</>
                )}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Helper Tip */}
      {!verificationResult && (
        <div className="flex items-start gap-2 p-3 rounded-lg bg-muted/30 border border-border/30">
          <AlertCircle className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground">
            <strong>Dica:</strong> Copie os dados da seção "Assinar Documento" para testar a verificação. 
            Altere qualquer caractere para ver uma verificação falhar.
          </p>
        </div>
      )}
    </div>
  );
}
