import { useState, useEffect, useCallback } from "react";
import AgoraRTC, { AgoraRTCProvider, useRTCClient } from "agora-rtc-react";
import config from "../../AgoraManager/config";
import { useAppSelector } from "../../hooks";
import { useSocket } from "../../hooks/socket";
import { fetchRTCToken } from "../../utility/fetchRTCToken";
import PairedChat from "../PairedChat";
import PairedVideos from "../PairedVideos";
import { useAppDispatch } from "../../hooks";
import { clearUser, receiveUser } from "../../store/pairedUser";
import CatImage from "/src/assets/images/devpair-loading-screen.png";
import "./index.css";
import Footer from "../Footer";

const VideoCall: React.FC = () => {
  const { socket } = useSocket();
  const user = useAppSelector((state) => state.session.user);
  const agoraEngine = useRTCClient(
    AgoraRTC.createClient({ codec: "vp8", mode: config.selectedProduct })
  );
  const [joined, setJoined] = useState<boolean>(false);
  const [channelName, setChannelName] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (socket) {
      // Listen for the 'joined' event when successfully paired with a room
      socket.on("joined", (data) => {
        if (!config.channelName) {
          setChannelName(data.room);
        }
        if (user && data.users.length > 1) {
          const pair = data.users.filter((duser) => duser.id !== user.id)[0];
          dispatch(receiveUser(pair));
        }
      });

      socket.on("user_left", (data) => {
        dispatch(clearUser())
      });
    }

    return () => {
      if (socket && joined) {
        // Clean up all event listeners when component unmounts
        socket.removeAllListeners("joined");
        socket.removeAllListeners("user_left");
        socket.emit("leave_room", { room: channelName });
        dispatch(clearUser())
        config.channelName = "";
        config.joined = false;
      }
    };
  }, [user, socket, channelName, dispatch, joined]);

  useEffect(() => {
    const fetchTokenFunction = async () => {
      if (config.serverUrl && channelName && !config.joined) {
        try {
          const token = (await fetchRTCToken(channelName)) as string;
          config.rtcToken = token;
          config.channelName = channelName;
          setJoined(true);
        } catch (error) {
          console.error(error);
        }
      } else {
        console.log(
          "Please make sure you specified the token server URL in the configuration file"
        );
      }
    };

    fetchTokenFunction();
  }, [channelName]);

  const handleJoinClick = () => {
    // console.log("You are pressing the join button.", socket);
    setLoading(true); // Start loading
    if (socket) {
      // console.log("You are now joining a room", socket);
      socket.emit("join_room");
    }
  };

  const leaveRoomHandler = useCallback(() => {
    if (joined && socket) {
      socket.emit("leave_room", { room: channelName });
      setJoined(false);
      setChannelName("");
      dispatch(clearUser())
      config.channelName = "";
      setLoading(false);
    }
  }, [joined, socket, channelName]);

  return (
    <>
      {joined ? (
        <main id="video-main-wrapper">
          <AgoraRTCProvider client={agoraEngine}>
            <div className="video-wrapper">
              <PairedVideos
                channelName={config.channelName}
                leaveRoomHandler={leaveRoomHandler}
              />
            </div>
            <div id="paired-chat-container">
              <PairedChat channelName={config.channelName} />
            </div>
          </AgoraRTCProvider>
        </main>
      ) : (
        <>
          <main id="video-main-wrapper">
            <div className="not-joined-wrapper">
              <h1>Get Started with Video Calling</h1>
              <div id="join-call-cat-image">
                <img src={CatImage} alt="loading-screen" />
              </div>
              <div id="join-channel-button-container">
                <button
                  onClick={handleJoinClick}
                  disabled={loading}
                  className="join-channel-button"
                >
                  {loading ? (
                    <div className="spinner"></div>
                  ) : (
                    <p className="join-channel-button-text">Pair Up!</p>
                  )}
                </button>
              </div>
            </div>
          </main>
          <Footer />
        </>
      )}
    </>
  );
};

export default VideoCall;
