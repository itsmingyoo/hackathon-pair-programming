import { useState, useEffect } from "react";
import { AgoraRTCProvider, useRTCClient } from "agora-rtc-react";
import AgoraRTC from "agora-rtc-react";
import AgoraManager from "../../AgoraManager/agoraManager";
import config from "../../AgoraManager/config";
import { fetchRTCToken } from "../../utility/fetchRTCToken";
import { useAppSelector, useSocket } from "../../hooks";

const VideoTest: React.FC = () => {
  const { socket } = useSocket();
  const user = useAppSelector((state) => state.session.user);
  const agoraEngine = useRTCClient(
    AgoraRTC.createClient({ codec: "vp8", mode: config.selectedProduct })
  );
  const [joined, setJoined] = useState(false);
  const [channelName, setChannelName] = useState<string>("");

  useEffect(() => {
    if (socket) {
      // Listen for the 'joined' event when successfully paired with a room
      socket.on("joined", (data) => {
        console.log(data);
        if (user && data.user === +user.id) {
          setChannelName(data.room);
        }
      });
    }
  }, [user, socket]); // Only run once on component mount

  useEffect(() => {
    const fetchTokenFunction = async () => {
      if (config.serverUrl !== "" && channelName !== "") {
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
    if (socket) {
      socket.emit("join_room");
    }
  };

  const handleLeaveClick = () => {
    setJoined(false);
  };

  const renderActionButton = () => {
    return joined ? (
      <button onClick={handleLeaveClick}>Leave</button>
    ) : (
      <button onClick={handleJoinClick}>Join</button>
    );
  };

  return (
    <div>
      <h1>Get Started with Video Calling</h1>
      {renderActionButton()}
      {joined && (
        <AgoraRTCProvider client={agoraEngine}>
          <AgoraManager config={config} children={undefined}></AgoraManager>
        </AgoraRTCProvider>
      )}
    </div>
  );
};

export default VideoTest;
