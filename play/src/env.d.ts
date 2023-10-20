/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly BASE_APP_TITLE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
