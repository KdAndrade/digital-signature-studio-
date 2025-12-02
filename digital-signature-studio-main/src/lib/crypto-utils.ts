// Simulated cryptographic utilities for educational purposes
// This is NOT real cryptography - it's a visual demonstration

export function generateRandomHex(length: number): string {
  const chars = '0123456789ABCDEF';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}

export function generateKeyPair() {
  const privateKey = `priv_${generateRandomHex(64)}`;
  const publicKey = `pub_${generateRandomHex(64)}`;
  const address = `0x${generateRandomHex(40)}`;
  
  return {
    privateKey,
    publicKey,
    address,
  };
}

export async function generateHash(content: string): Promise<string> {
  // Use Web Crypto API for a real hash (SHA-256)
  const encoder = new TextEncoder();
  const data = encoder.encode(content);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex.toUpperCase();
}

export async function signDocument(hash: string, privateKey: string): Promise<string> {
  // Simulated signature - combines hash with private key identifier
  const combined = hash + privateKey.slice(5, 20);
  const signatureHash = await generateHash(combined);
  return `sig_${signatureHash.slice(0, 64)}`;
}

export async function verifySignature(
  document: string,
  publicKey: string,
  signature: string,
  originalPrivateKey: string
): Promise<boolean> {
  // In our simulation, we recreate the signing process and compare
  const documentHash = await generateHash(document);
  const expectedSignature = await signDocument(documentHash, originalPrivateKey);
  return signature === expectedSignature;
}

export function truncateKey(key: string, startChars: number = 10, endChars: number = 6): string {
  if (key.length <= startChars + endChars + 3) return key;
  return `${key.slice(0, startChars)}...${key.slice(-endChars)}`;
}
