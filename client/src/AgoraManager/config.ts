import { EncryptionMode, UID, SDK_MODE } from 'agora-rtc-sdk-ng';

const config: configType = {
    uid: 0,
    appId: '3529bafa11364f7bb72d422621709303',
    channelName: 'test',
    rtcToken: '806d0b1df0d947a8a9e938f583a1eb16',
    serverUrl: '',
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
};

export type configType = {
    uid: UID;
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
};

export default config;
