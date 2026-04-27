export type GiftPayload = { a: string; b: string };

function toBase64Url(str: string): string {
  const utf8 = new TextEncoder().encode(str);
  let binary = "";
  for (const byte of utf8) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(str: string): string {
  const padded = str.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((str.length + 3) % 4);
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return new TextDecoder().decode(bytes);
}

export function encodeGift(payload: GiftPayload): string {
  return toBase64Url(JSON.stringify(payload));
}

export function decodeGift(encoded: string): GiftPayload | null {
  try {
    const parsed = JSON.parse(fromBase64Url(encoded));
    if (typeof parsed?.a !== "string" || typeof parsed?.b !== "string") return null;
    return { a: parsed.a, b: parsed.b };
  } catch {
    return null;
  }
}
