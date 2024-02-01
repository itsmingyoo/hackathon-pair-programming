import { EncryptionMode, UID, SDK_MODE } from 'agora-rtc-sdk-ng';

const config: configType = {
    uid: 0,
    appId: import.meta.env.VITE_APP_ID,
    channelName: '',
    rtcToken: '',
    serverUrl: 'https://agora-token-server-kicu.onrender.com',
    proxyUrl: '',
    tokenExpiryTime: 600,
    token: '',
    encryptionMode: 'aes-128-gcm2',
    salt: '',
    encryptionKey: '',
    destChannelName: '',
    destChannelToken: '',
    destUID: 2,
    secondChannel: '',
    secondChannelToken: '',
    secondChannelUID: 2,
    selectedProduct: 'rtc',
    joined: false,
};

export type configType = {
    uid: UID | null;
    appId: string;
    channelName: string;
    rtcToken: string | null;
    serverUrl: string;
    proxyUrl: string;
    tokenExpiryTime: number;
    token: string;
    encryptionMode: EncryptionMode;
    salt: '';
    encryptionKey: string;
    destUID: number;
    destChannelName: string;
    destChannelToken: string;
    secondChannel: string;
    secondChannelToken: string;
    secondChannelUID: number;
    selectedProduct: SDK_MODE;
    joined: boolean;
};

export default config;
