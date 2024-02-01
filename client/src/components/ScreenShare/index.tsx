import { useState } from 'react';
import ShareScreenComponent from '../../AgoraManager/screenShare';
import config from '../../AgoraManager/config';
import { fetchRTCToken } from '../../utility/fetchRTCToken';
import { useEffect } from 'react';
import { RemoteVideoTrack, useRemoteUsers, useRemoteVideoTracks } from 'agora-rtc-react';
import { useAppSelector } from '../../hooks';
import RemoteAndLocalVolumeComponent from '../../AgoraManager/volumeControl';
// import IDE from '../CodeMirror';

function ScreenShare(props: {
    channelName: string;
    screenSharing: boolean;
    setScreenSharing: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const { channelName } = props;
    const [screenSharing, setScreenSharing] = useState<boolean>(false);
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

        console.log('😎screenSharing😎: ', screenSharing ? screenSharing : screenSharing);
    }, [channelName, screenSharing]);

    // If User starts screen share with the button, it will trigger an event asking them what screen they will share and render it
    const renderContent = () => {
        if (screenSharing === true) {
            return (
                <>
                    {/* <h1>Screen Sharing</h1> */}

                    <ShareScreenComponent setScreenSharing={setScreenSharing} />
                </>
            );
        }
    };
    // const renderContent = () => {
    //     return screenSharing === true ? (
    //         <>
    //             <ShareScreenComponent setScreenSharing={setScreenSharing} />
    //         </>
    //     ) : (
    //         <>
    //             <IDE problemId="1" problemTitle="Two-Sum" />
    //         </>
    //     );
    // };

    useEffect(() => {
        console.log('😁😁😁 state', screenSharing);
    });

    return (
        <>

            {renderContent()}
            {remoteUsers.map((remoteUser) => {
                if (remoteUser.uid === pairInfo?.screenUid) {
                    return (
                        <RemoteVideoTrack
                            track={remoteUser.videoTrack}
                            key={remoteUser.uid}
                            play
                            style={{ width: '192', height: '108' }}
                        />
                    );
                } else {
                    return null;
                }
            })}
            <RemoteAndLocalVolumeComponent screenSharing={screenSharing}
                        setScreenSharing={setScreenSharing} />
        </>
    );
}
export default ScreenShare;
