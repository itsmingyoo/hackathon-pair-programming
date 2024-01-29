import { useState, useEffect, useCallback } from 'react';
import AgoraRTC, { AgoraRTCProvider, useRTCClient, AgoraRTCScreenShareProvider } from 'agora-rtc-react';
import config from '../../AgoraManager/config';
import { useAppSelector, useSocket } from '../../hooks';
import { fetchRTCToken } from '../../utility/fetchRTCToken';
// import { useNavigation } from "../../context/Navigation";
import PairedChat from '../PairedChat';
import PairedVideos from '../PairedVideos';
import { useAppDispatch } from '../../hooks';
import './index.css';
import { receiveUser } from '../../store/pairedUser';
import ScreenShare from '../ScreenShare';

const VideoCall: React.FC = () => {
    const { socket } = useSocket();
    const user = useAppSelector((state) => state.session.user);
    const agoraEngine = useRTCClient(AgoraRTC.createClient({ codec: 'vp8', mode: config.selectedProduct }));
    const [joined, setJoined] = useState<boolean>(false);
    const [channelName, setChannelName] = useState<string>('');
    const [loading, setLoading] = useState(false);
    // const { navigationState } = useNavigation();
    const dispatch = useAppDispatch();

    // Handle when a user navigates to a different page
    // useEffect(() => {
    //   if (navigationState.currentPath !== "/video-test") {
    //     console.log("User Navigated Elsewhere.");
    //     leaveRoomHandler();
    //   }
    // }, [navigationState, leaveRoomHandler]);

    useEffect(() => {
        if (socket) {
            // Listen for the 'joined' event when successfully paired with a room
            socket.on('joined', (data) => {
                if (!channelName) {
                    setChannelName(data.room);
                }
                if (user && data.users.length > 1) {
                    const pair = data.users.filter((duser) => duser.id !== user.id)[0];
                    dispatch(receiveUser(pair));
                }
            });

            socket.on('user_left', (data) => {
                console.log(data);
            });
        }

        return () => {
            if (socket) {
                // Clean up all event listeners when component unmounts
                socket.removeAllListeners('joined');
                socket.removeAllListeners('user_left');
            }
        };
    }, [user, socket, channelName, dispatch]);

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
    }, [channelName]);

    const handleJoinClick = () => {
        console.log('You are pressing the join button.', socket);
        setLoading(true); // Start loading
        if (socket) {
            console.log('You are now joining a room', socket);
            socket.emit('join_room');
        }
    };

    // Handle leave room
    const leaveRoomHandler = useCallback(() => {
        if (joined && socket) {
            socket.emit('leave_room', { room: channelName });
            setJoined(false);
            setChannelName('');
            setLoading(false);
        }
    }, [joined, socket, channelName]);

    return (
        <>
            <div id="video-main-wrapper">
                <div id="button-wrapper">
                    {joined ? (
                        <button onClick={leaveRoomHandler}>Leave</button>
                    ) : (
                        <>
                            <h1>Get Started with Video Calling</h1>
                            <button onClick={handleJoinClick} disabled={loading}>
                                {loading ? <div className="spinner"></div> : 'Join'}
                            </button>
                        </>
                    )}
                </div>
                {joined && (
                    <>
                        <AgoraRTCProvider client={agoraEngine}>
                            <div id="main-wrapper">
                                <div id="video-wrapper">
                                    <div id="video-container">
                                        {/* <AgoraManager config={config} children={undefined}></AgoraManager> */}
                                        <PairedVideos channelName={channelName} />
                                    </div>
                                </div>
                                <div id="screen-share-container">
                                    <AgoraRTCScreenShareProvider client={agoraEngine}>
                                        <ScreenShare channelName={channelName} />
                                    </AgoraRTCScreenShareProvider>
                                </div>
                                <div id="paired-chat-container">
                                    <PairedChat channelName={channelName} />
                                </div>
                            </div>
                        </AgoraRTCProvider>
                    </>
                )}
            </div>
        </>
    );
};

export default VideoCall;
