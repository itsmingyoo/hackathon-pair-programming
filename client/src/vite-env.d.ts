/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_APP_ID: string;
    readonly VITE_APP_CERTIFICATE?: string;
    readonly VITE_RTC_TOKEN?: string;
    // ... any other custom environment variables you have ...
}
