// @types/cep-promise.d.ts
declare module 'cep-promise' {
    export default function cepPromise(cep: string): Promise<{
      cep: string;
      state: string;
      city: string;
      neighborhood: string;
      street: string;
      service: string;
    }>;
  }