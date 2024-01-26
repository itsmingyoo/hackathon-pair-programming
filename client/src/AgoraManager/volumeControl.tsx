import { useAgoraContext } from './agoraManager';
import { useRemoteUsers } from 'agora-rtc-react';

const RemoteAndLocalVolumeComponent: React.FC = () => {
    const agoraContext = useAgoraContext();
    const remoteUsers = useRemoteUsers();
    const numberOfRemoteUsers = remoteUsers.length;
    const remoteUser = remoteUsers[numberOfRemoteUsers - 1];

    const handleLocalAudioVolumeChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const volume = parseInt(evt.target.value);
        console.log('Volume of local audio:', volume);
        agoraContext.localMicrophoneTrack?.setVolume(volume);
    };

    const handleRemoteAudioVolumeChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        if (remoteUser) {
            const volume = parseInt(evt.target.value);
            console.log('Volume of remote audio:', volume);
            remoteUser.audioTrack?.setVolume(volume);
        } else {
            console.log('No remote user in the channel');
        }
    };

    return (
        <>
            <div>
                <label id="volume-label">Local Audio Level:</label>
                <input type="range" min="0" max="100" step="1" onChange={handleLocalAudioVolumeChange} />
            </div>
            <div>
                <label id="volume-label">Remote Audio Level:</label>
                <input type="range" min="0" max="100" step="1" onChange={handleRemoteAudioVolumeChange} />
            </div>
        </>
    );
};

export default RemoteAndLocalVolumeComponent;
