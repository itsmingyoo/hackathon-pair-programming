import {
    LocalVideoTrack,
    RemoteUser,
    useJoin,
    useLocalCameraTrack,
    useLocalMicrophoneTrack,
    usePublish,
    useRTCClient,
    useRemoteUsers,
    useClientEvent,
    // IMicrophoneAudioTrack,
    // ICameraVideoTrack,
    // useRemoteAudioTracks,
} from 'agora-rtc-react';

import { useEffect } from 'react';
import config from '../../AgoraManager/config';
import { useAppSelector } from '../../hooks';
import RemoteAndLocalVolumeComponent from '../../AgoraManager/volumeControl';

function PairedVideos(props: { channelName: string }) {
    const user = useAppSelector((state) => state.session.user);
    const pairInfo = useAppSelector((state) => state.pairedUser.user);
    const agoraEngine = useRTCClient();
    const { channelName } = props;
    const { isLoading: isLoadingMic, localMicrophoneTrack } = useLocalMicrophoneTrack();
    const { isLoading: isLoadingCam, localCameraTrack } = useLocalCameraTrack();
    const remoteUsers = useRemoteUsers();
    //   const { audioTracks } = useRemoteAudioTracks(remoteUsers);

    usePublish([localMicrophoneTrack, localCameraTrack]);

    useJoin({
        appid: config.appId,
        channel: channelName,
        token: config.rtcToken,
        uid: user?.videoUid,
    });

    useClientEvent(agoraEngine, 'user-joined', (user) => {
        console.log('🤬🤬🤬🤬🤬🤬🤬🤬🤬 The user', user.uid, ' has joined the channel');
    });

    useClientEvent(agoraEngine, 'user-left', (user) => {
        console.log('🦄🦄🦄🦄🦄🦄🦄🦄🦄 The user', user.uid, ' has left the channel');
    });

    //mediaType replaced with _ for ts
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    useClientEvent(agoraEngine, 'user-published', (user, _) => {
        console.log('🍉🍉🍉🍉🍉🍉🍉🍉🍉 The user', user.uid, ' has published media in the channel');
    });

    useEffect(() => {
        return () => {
            localCameraTrack?.close();
            localMicrophoneTrack?.close();
        };
    }, []);

    const deviceLoading = isLoadingMic || isLoadingCam;
    if (deviceLoading) return <div>Loading devices...</div>;

    return (
        <div id="videos">
            <div className="vid" style={{ height: 300, width: 350 }}>
                <LocalVideoTrack track={localCameraTrack} play={true} />
                <div id="volume-control">{/* <RemoteAndLocalVolumeComponent /> */}</div>
            </div>
            {remoteUsers.map((remoteUser) => {
                if (remoteUser.uid === pairInfo?.videoUid) {
                    console.log('😁😀😎😍☺😙😑😶🙄🙄😏🤩🤩😍😂☺😏🤗😍🤣😃😍😶😑😎🙄🙄pairInfo video uid', pairInfo);
                    return (
                        <div className="vid" style={{ height: 300, width: 350 }} key={remoteUser.uid}>
                            <RemoteUser user={remoteUser} playVideo={true} playAudio={true} />
                            <button id="follow-user">Follow</button>
                            <div id="volume-control">
                                <RemoteAndLocalVolumeComponent />
                            </div>
                        </div>
                    );
                }
            })}
        </div>
    );
}

export default PairedVideos;
