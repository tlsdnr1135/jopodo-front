/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly BASE_URL: string
  // 여기에 다른 환경 변수들도 추가할 수 있습니다
  // readonly VITE_APP_TITLE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
