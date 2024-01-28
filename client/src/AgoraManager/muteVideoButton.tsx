import { useState } from 'react';
import { useAgoraContext } from './agoraManager';

const MuteVideoComponent: React.FC = () => {
    const agoraContext = useAgoraContext();
    const [isMuteVideo, setMuteVideo] = useState<boolean>(false);

    const toggleMuteVideo = () => {
        agoraContext.localCameraTrack
            ?.setEnabled(isMuteVideo)
            .then(() => setMuteVideo((prev) => !prev))
            .catch((error) => console.error(error));
    };

    return (
        <button onClick={toggleMuteVideo} style={{ color: 'black' }}>
            {isMuteVideo ? 'Unmute Video' : 'Mute Video'}
        </button>
    );
};

export default MuteVideoComponent;
