import React from 'react';
import { createRoot } from 'react-dom/client';
import AgoraRTC from 'agora-rtc-sdk-ng';
import { AgoraRTCProvider } from 'agora-rtc-react';
import { IAgoraRTCClient as IAgoraRTCClientSDK } from 'agora-rtc-sdk-ng';
import { IAgoraRTCClient as IAgoraRTCClientReact } from 'agora-rtc-react';

interface ClientProps {
    children?: React.ReactNode;
}

export const Client: React.FC<ClientProps> = ({ children }) => {
    const client: IAgoraRTCClientSDK = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });
    return <AgoraRTCProvider client={client as unknown as IAgoraRTCClientReact}>{children}</AgoraRTCProvider>;
};

const container = document.getElementById('container');
if (container) {
    const root = createRoot(container);
    root.render(<Client />);
}
