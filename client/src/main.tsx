import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import store from './store/index';
import App from './App.tsx';
import { SocketProvider } from './context/Socket';
import { NavigationProvider } from './context/Navigation/index.tsx';
import { AgoraRTCScreenShareProvider } from './context/Screenshare/index.tsx';
import AgoraRTC, { IAgoraRTCClient } from 'agora-rtc-react';
import config from './AgoraManager/config';
import './main.css';

const agoraEngine: IAgoraRTCClient = AgoraRTC.createClient({ codec: 'vp8', mode: config.selectedProduct });

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <NavigationProvider>
                <SocketProvider>
                    <AgoraRTCScreenShareProvider client={agoraEngine}>
                        <App />
                    </AgoraRTCScreenShareProvider>
                </SocketProvider>
            </NavigationProvider>
        </Provider>
    </React.StrictMode>
);
