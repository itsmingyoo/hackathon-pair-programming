import React, { useState } from 'react';
import { useAgoraContext } from './agoraManager';
import { useRemoteUsers } from 'agora-rtc-react';
import './volumeControl.css';

const RemoteAndLocalVolumeComponent: React.FC = () => {
    const agoraContext = useAgoraContext();
    const remoteUsers = useRemoteUsers();
    const [isLocalMuted, setIsLocalMuted] = useState(false);

    const handleLocalAudioToggle = () => {
        const newVolume = isLocalMuted ? 100 : 0;
        agoraContext.localMicrophoneTrack?.setVolume(newVolume);
        setIsLocalMuted(!isLocalMuted);
    };

    const handleRemoteAudioVolumeChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const remoteUser = remoteUsers[remoteUsers.length - 1];
        if (remoteUser && remoteUser.audioTrack) {
            const volume = parseInt(evt.target.value, 10);
            remoteUser.audioTrack.setVolume(volume);
        }
    };

    return (
        <>
            <div>
                <button onClick={handleLocalAudioToggle} id="toggle-mute">
                    {isLocalMuted ? 'Unmute Microphone' : 'Mute Microphone'}
                </button>
            </div>
            <div id='volume-slider'>
                <label htmlFor="remote-audio-volume">Adjust User's Volume</label>
                <input
                    type="range"
                    id="remote-audio-volume"
                    min="0"
                    max="100"
                    step="1"
                    onChange={handleRemoteAudioVolumeChange}
                />
            </div>
        </>
    );
};

export default RemoteAndLocalVolumeComponent;
