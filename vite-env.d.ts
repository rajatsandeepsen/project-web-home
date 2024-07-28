/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SPOTIFY_CLIENT_ID: string;
  readonly VITE_BASE_URL: string;
  readonly VITE_SPOTIFY_CLIENT_SECRET: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
