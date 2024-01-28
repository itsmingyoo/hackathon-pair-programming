import React, { useEffect, useRef } from 'react';
import AgoraRTC, { useJoin, usePublish, useLocalScreenTrack, useTrackEvent, LocalVideoTrack } from 'agora-rtc-react';
import config from './config';
import { useAppSelector } from '../hooks';

const ShareScreenComponent: React.FC<{ setScreenSharing: React.Dispatch<React.SetStateAction<boolean>> }> = ({
    setScreenSharing,
}) => {
    const screenShareClient = useRef(AgoraRTC.createClient({ codec: 'vp8', mode: 'rtc' }));
    const user = useAppSelector((state) => state.session.user);

    // Use the useLocalScreenTrack hook to get the screen sharing track
    const { screenTrack, isLoading, error } = useLocalScreenTrack(true, {}, 'disable', screenShareClient.current);

    // Join the channel using the screen share client
    useJoin(
        {
            appid: config.appId,
            channel: config.channelName,
            token: config.rtcToken,
            uid: user?.screenUid,
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
    return (
        <div id="videos">
            <LocalVideoTrack play style={{ width: '1920px', height: '1080px' }} track={screenTrack} />
        </div>
    );
};

export default ShareScreenComponent;

// OTHER COMPONENTS - https://docs.agora.io/en/video-calling/develop/product-workflow?platform=react-js
