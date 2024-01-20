import { useState } from "react";
import { AgoraRTCProvider, useRTCClient } from "agora-rtc-react";
import AgoraRTC from "agora-rtc-react"
import AgoraManager from "../../AgoraManager/agoraManager";
import config from "../../AgoraManager/config";

// Define types for your props and state if needed
// interface Props {}

// Since you're not using props or state, we don't need to define them here

const VideoTest: React.FC = () => {
    const agoraEngine = useRTCClient(AgoraRTC.createClient({ codec: "vp8", mode: config.selectedProduct }));
    const [joined, setJoined] = useState(false);
  
    const handleJoinClick = () => {
      setJoined(true);
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
            <AgoraManager config={config} children={undefined} >
            </AgoraManager>
          </AgoraRTCProvider>
        )}
      </div>
    );
};

export default VideoTest;
