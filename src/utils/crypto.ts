// utils/crypto.ts
import CryptoJS from 'crypto-js';

const SECRET_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || 'default-dev-key';

export function encryptData<T>(data: T): string {
    const json = JSON.stringify(data);
    return CryptoJS.AES.encrypt(json, SECRET_KEY).toString();
}

export function decryptData<T = any>(ciphertext: string): T {
    const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
    const decryptedJson = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decryptedJson);
}
