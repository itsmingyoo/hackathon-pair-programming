/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly APP_ID: string;
    readonly APP_CERTIFICATE?: string;
    readonly RTC_TOKEN?: string;
    // ... any other custom environment variables you have ...
}
