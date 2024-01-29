import ShareScreenComponent from '../../AgoraManager/screenShare';
import config from '../../AgoraManager/config';
import { fetchRTCToken } from '../../utility/fetchRTCToken';
import { useEffect } from 'react';
import { RemoteVideoTrack, useRemoteUsers, useRemoteVideoTracks } from 'agora-rtc-react';
import { useAppSelector } from '../../hooks';

function ScreenShare(props: {
    channelName: string;
    screenSharing: boolean;
    setScreenSharing: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const { channelName } = props;
    const remoteUsers = useRemoteUsers();
    useRemoteVideoTracks(remoteUsers);
    const pairInfo = useAppSelector((state) => state.pairedUser.user);
    console.log(remoteUsers);

    useEffect(() => {
        const fetchTokenFunction = async () => {
            if (config.serverUrl !== '' && channelName !== '') {
                try {
                    const token = (await fetchRTCToken(channelName)) as string;
                    config.rtcToken = token;
                    config.channelName = channelName;
                } catch (error) {
                    console.error(error);
                }
            } else {
                console.log('Please make sure you specified the token server URL in the configuration file');
            }
        };

        fetchTokenFunction();

        console.log('😎screenSharing😎: ', props.screenSharing ? props.screenSharing : props.screenSharing);
    }, [channelName, props.screenSharing]);

    // Conditional rendering based on screen sharing state
    const renderContent = () => {
        if (props.screenSharing === true) {
            return (
                <>
                    <h1>Screen Sharing</h1>
                    <ShareScreenComponent setScreenSharing={props.setScreenSharing} />
                </>
            );
        }
    };
    useEffect(() => {
        console.log('😁😁😁 state', props.screenSharing);
    });

    return (
        <>
            {renderContent()}
            {remoteUsers.map((remoteUser) => {
                if (remoteUser.uid === pairInfo?.screenUid) {
                    return <RemoteVideoTrack track={remoteUser.videoTrack} key={remoteUser.uid} play />;
                } else {
                    return null;
                }
            })}
        </>
    );
}
export default ScreenShare;
