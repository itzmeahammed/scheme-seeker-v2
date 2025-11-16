/// <reference types="vite/client" />
/// <reference types="react/jsx-runtime" />

// Electron API declarations
declare global {
  interface Window {
    electron?: {
      shell: {
        openExternal: (url: string) => Promise<void>;
      };
    };
  }
}

export {};
