declare global {
  interface Window {
    xverse?: {
      request: (method: string, params?: Record<string, unknown>) => Promise<unknown>;
    };
  }
}

export {};
