import React, { useRef, useEffect } from 'react';
import AgoraRTC, { useJoin, usePublish, useLocalScreenTrack, useTrackEvent, LocalVideoTrack } from 'agora-rtc-react';
import config from './config';
import { AgoraRTCScreenShareProvider } from '../context/Screenshare';

const ShareScreenComponent: React.FC<{ setScreenSharing: React.Dispatch<React.SetStateAction<boolean>> }> = ({
    setScreenSharing,
}) => {
    const screenShareClient = useRef(AgoraRTC.createClient({ codec: 'vp8', mode: 'rtc' }));

    // Use the useLocalScreenTrack hook to get the screen sharing track
    const { screenTrack, isLoading, error } = useLocalScreenTrack(true, {}, 'disable', screenShareClient.current);

    // Join the channel using the screen share client
    useJoin(
        {
            appid: config.appId,
            channel: config.channelName,
            token: config.rtcToken,
            uid: 0,
        },
        true,
        screenShareClient.current
    );

    // Handle the 'track-ended' event to stop screen sharing when the track ends
    useTrackEvent(screenTrack, 'track-ended', () => {
        setScreenSharing(false);
    });

    // Handle errors by stopping screen sharing
    useEffect(() => {
        if (error) setScreenSharing(false);
    }, [error, setScreenSharing]);

    // Publish the screen share track
    usePublish([screenTrack], screenTrack !== null, screenShareClient.current);

    if (isLoading) {
        return <p>Sharing screen...</p>;
    }
    return null;
    return (
        <div id="videos">
            <AgoraRTCScreenShareProvider client={screenShareClient.current}>
                <LocalVideoTrack play style={{ width: '1920px', height: '1080px' }} track={screenTrack} />
            </AgoraRTCScreenShareProvider>
        </div>
    );
};

export default ShareScreenComponent;

// OTHER COMPONENTS - https://docs.agora.io/en/video-calling/develop/product-workflow?platform=react-js

// const MuteVideoComponent: React.FC = () => {
//     const agoraContext = useAgoraContext();
//     const [isMuteVideo, setMuteVideo] = useState(false);

//     const toggleMuteVideo = () => {
//         agoraContext.localCameraTrack
//             ?.setEnabled(isMuteVideo)
//             .then(() => setMuteVideo((prev) => !prev))
//             .catch((error) => console.error(error));
//     };

//     return <button onClick={toggleMuteVideo}>{isMuteVideo ? 'Unmute Video' : 'Mute Video'}</button>;
// };

// const OnMicrophoneChangedHook: React.FC = () => {
//     const agoraContext = useAgoraContext();

//     useEffect(() => {
//         const onMicrophoneChanged = (changedDevice: DeviceInfo) => {
//             if (changedDevice.state === 'ACTIVE') {
//                 agoraContext.localMicrophoneTrack
//                     ?.setDevice(changedDevice.device.deviceId)
//                     .catch((error: IAgoraRTCError) => console.error(error));
//             } else if (changedDevice.device.label === agoraContext.localMicrophoneTrack?.getTrackLabel()) {
//                 AgoraRTC.getMicrophones()
//                     .then((devices) => agoraContext.localMicrophoneTrack?.setDevice(devices[0].deviceId))
//                     .catch((error) => console.error(error));
//             }
//         };
//         AgoraRTC.onMicrophoneChanged = onMicrophoneChanged;

//         return () => {
//             AgoraRTC.onMicrophoneChanged = undefined;
//         };
//     }, [agoraContext.localMicrophoneTrack]);
//     return null;
// };

// const OnCameraChangedHook: React.FC = () => {
//     const agoraContext = useAgoraContext();

//     useEffect(() => {
//         const onCameraChanged = (changedDevice: DeviceInfo) => {
//             if (changedDevice.state === 'ACTIVE') {
//                 agoraContext.localCameraTrack
//                     ?.setDevice(changedDevice.device.deviceId)
//                     .catch((error) => console.error(error));
//             } else if (changedDevice.device.label === agoraContext.localCameraTrack?.getTrackLabel()) {
//                 AgoraRTC.getCameras()
//                     .then((devices) => agoraContext.localCameraTrack?.setDevice(devices[0].deviceId))
//                     .catch((error) => console.error(error));
//             }
//         };

//         AgoraRTC.onCameraChanged = onCameraChanged;
//         return () => {
//             AgoraRTC.onCameraChanged = undefined;
//         };
//     }, [agoraContext.localCameraTrack]);
//     return null;
// };
