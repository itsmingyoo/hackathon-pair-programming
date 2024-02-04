// AgoraManager Renders Video Calling.
// Requirements: Wrap this component in AgoraRTCProvider
/* Example:
import AgoraRTC, { AgoraRTCProvider, useRTCClient } from 'agora-rtc-react';
const agoraEngine = useRTCClient(AgoraRTC.createClient({ codec: 'vp8', mode: config.selectedProduct }));
<AgoraRTCProvider client={agoraEngine}>
    <AgoraManager config={config} children={undefined}></AgoraManager>
</AgoraRTCProvider>;
*/

import {
  // LocalVideoTrack,
  // RemoteUser,
  // useJoin,
  // useLocalCameraTrack,
  // useLocalMicrophoneTrack,
  // usePublish,
  // useRTCClient,
  // useRemoteUsers,
  // useClientEvent,
  IMicrophoneAudioTrack,
  ICameraVideoTrack,
} from "agora-rtc-react";

import React, { createContext, useContext } from "react";
// import { configType } from "./config";
import "./agoraManager.css";

// Define the shape of the Agora context
interface AgoraContextType {
  localCameraTrack: ICameraVideoTrack | null;
  localMicrophoneTrack: IMicrophoneAudioTrack | null;
  children: React.ReactNode;
  leaveRoomHandler: () => void;
}

// Create the Agora context
const AgoraContext = createContext<AgoraContextType | null>(null);

// AgoraProvider component to provide the Agora context to its children
export const AgoraProvider: React.FC<AgoraContextType> = ({ children, localCameraTrack, localMicrophoneTrack, leaveRoomHandler }) => (
  <AgoraContext.Provider value={{ localCameraTrack, localMicrophoneTrack, children, leaveRoomHandler }}>
      {children}
  </AgoraContext.Provider>
);


// Custom hook to access the Agora context
export const useAgoraContext = () => {
  const context = useContext(AgoraContext);
  if (!context)
    throw new Error("useAgoraContext must be used within an AgoraProvider");
  return context;
};
