import React, { useState } from 'react';
import { useAgoraContext } from './agoraManager';
import { useRemoteUsers } from 'agora-rtc-react';

const RemoteAndLocalVolumeComponent: React.FC = () => {
    const agoraContext = useAgoraContext();
    const remoteUsers = useRemoteUsers();
    const [isLocalMuted, setIsLocalMuted] = useState(false);
    const [isRemoteMuted, setIsRemoteMuted] = useState(false);

    const handleLocalAudioToggle = () => {
        const newVolume = isLocalMuted ? 100 : 0;
        agoraContext.localMicrophoneTrack?.setVolume(newVolume);
        setIsLocalMuted(!isLocalMuted);
    };

    const handleRemoteAudioToggle = () => {
        const remoteUser = remoteUsers[remoteUsers.length - 1];
        if (remoteUser && remoteUser.audioTrack) {
            const newVolume = isRemoteMuted ? 100 : 0;
            remoteUser.audioTrack.setVolume(newVolume);
            setIsRemoteMuted(!isRemoteMuted);
        }
    };

    return (
        <>
            <div>
                <button onClick={handleLocalAudioToggle} style={{ color: 'black' }}>
                    {isLocalMuted ? 'Unmute Local Audio' : 'Mute Local Audio'}
                </button>
            </div>
            <div>\
                <button onClick={handleRemoteAudioToggle} style={{ color: 'black' }}>
                    {isRemoteMuted ? 'Unmute Remote Audio' : 'Mute Remote Audio'}
                </button>
            </div>
        </>
    );
};

export default RemoteAndLocalVolumeComponent;
