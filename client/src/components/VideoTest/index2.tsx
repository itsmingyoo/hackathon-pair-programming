import { AgoraRTCProvider, useRTCClient } from 'agora-rtc-react';
import AgoraRTC from 'agora-rtc-react';
import config from '../../AgoraManager/config';
import AuthenticationWorkflowManager from '../../AgoraManager/AuthenticationWorkflowManager';

const VideoTest2: React.FC = () => {
    const agoraEngine = useRTCClient(AgoraRTC.createClient({ codec: 'vp8', mode: config.selectedProduct }));

    return (
        <div>
            <h1>Join a Channel</h1>

            <AgoraRTCProvider client={agoraEngine}>
                <AuthenticationWorkflowManager />
            </AgoraRTCProvider>
        </div>
    );
};

export default VideoTest2;
