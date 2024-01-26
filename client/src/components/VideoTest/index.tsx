import { useState, useEffect } from 'react';
import AgoraRTC, { AgoraRTCProvider, useRTCClient } from 'agora-rtc-react';
import AgoraManager from '../../AgoraManager/agoraManager';
import config from '../../AgoraManager/config';
import { useAppSelector, useSocket } from '../../hooks';
import { fetchRTCToken } from '../../utility/fetchRTCToken';
import { useNavigation } from '../../context/Navigation';
import PairedChat from '../PairedChat';
import IDE from '../CodeMirror';
import './index.css';

const VideoTest: React.FC = () => {
    const { socket } = useSocket();
    const user = useAppSelector((state) => state.session.user);
    const agoraEngine = useRTCClient(AgoraRTC.createClient({ codec: 'vp8', mode: config.selectedProduct }));
    const [joined, setJoined] = useState<boolean>(false);
    const [channelName, setChannelName] = useState<string>('');
    const { navigationState } = useNavigation();

    const handleLeaveRoom = () => {
        if (joined && socket) {
            socket.emit('leave_room', { room: channelName });
            setJoined(false);
        }
    };

    // Handle when a user navigates to a different page
    useEffect(() => {
        if (navigationState.currentPath !== '/video-test') {
            console.log('User Navigated Elsewhere.');
            handleLeaveRoom();
        }
    }, [navigationState]);

    useEffect(() => {
        if (socket) {
            // Listen for the 'joined' event when successfully paired with a room
            socket.on('joined', (data) => {
                console.log("🍍🍍🍍🍍🍍🍍🍍🍍🍍🍍🍍 user", data)
                if (user && +data.user.id === +user.id) {
                    setChannelName(data.room);
                }
                console.log('socket "joined" activated -- user joined room: ', data.room);
            });

            socket.on('user_left', (data) => {
                console.log(data);
            });
        }
    }, [user, socket]);

    useEffect(() => {
        const fetchTokenFunction = async () => {
            if (config.serverUrl !== '' && channelName !== '') {
                try {
                    const token = (await fetchRTCToken(channelName)) as string;
                    config.rtcToken = token;
                    config.channelName = channelName;
                    setJoined(true);
                } catch (error) {
                    console.error(error);
                }
            } else {
                console.log('Please make sure you specified the token server URL in the configuration file');
            }
        };

        fetchTokenFunction();

        console.log('😎channelName😎😎😎isJoined😎: ', channelName ? channelName : 'No Channel Name', joined);
    }, [channelName]);

    const handleJoinClick = () => {
        console.log('You are pressing the join button.', socket);
        if (socket) {
            console.log('You are now joining a room', socket);
            socket.emit('join_room');
            // setJoined(true); //!! dont change state here, it breaks the webcam
        }
    };

    const handleLeaveClick = () => {
        if (socket) {
            socket.emit('leave_room', { room: channelName });
            setJoined(false);
        }
    };

    const renderActionButton = () => {
        return joined ? (
            <>
                <button onClick={handleLeaveClick}>Leave</button>
            </>
        ) : (
            <button onClick={handleJoinClick}>Join</button>
        );
    };

    return (
        <>
            <div id="video-main-wrapper">
                <h1>Get Started with Video Calling</h1>
                {renderActionButton()}
                {joined && (
                    <>
                        <div id="main-wrapper">
                            <div id="video-wrapper">
                                <div id="video-container">
                                    <AgoraRTCProvider client={agoraEngine}>
                                        <AgoraManager config={config} children={undefined}></AgoraManager>
                                    </AgoraRTCProvider>
                                </div>
                            </div>

                            <div id="ide-container">
                                <IDE
                                    problemId="1"
                                    problemTitle="Testing IDE & Screen Sharing"
                                    channelName={channelName}
                                />
                            </div>

                            <div id="paired-chat-container">
                                <PairedChat channelName={channelName} />
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default VideoTest;
