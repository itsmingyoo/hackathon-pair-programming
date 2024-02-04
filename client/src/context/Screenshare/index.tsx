// MODIFIED CONTEXT
import React, { createContext, useContext, useState } from 'react';
import AgoraRTC, { IAgoraRTCClient, ILocalVideoTrack, ILocalAudioTrack } from 'agora-rtc-react';

// Define the context structure including screen sharing functions and tracks
interface AgoraRTCScreenShareContextType {
    client: IAgoraRTCClient | null;
    screenTrack: ILocalVideoTrack | null;
    audioTrack: ILocalAudioTrack | null;
    startScreenShare: () => Promise<void>;
    stopScreenShare: () => Promise<void>;
}

// Initialize the context with the correct type
const AgoraRTCScreenShareContext = createContext<AgoraRTCScreenShareContextType>({
    client: null,
    screenTrack: null,
    audioTrack: null,
    startScreenShare: async () => {},
    stopScreenShare: async () => {},
});

export interface AgoraRTCScreenShareProviderProps {
    readonly client: IAgoraRTCClient;
    readonly children?: React.ReactNode;
}

export function AgoraRTCScreenShareProvider({ client, children }: AgoraRTCScreenShareProviderProps) {
    const [screenTrack, setScreenTrack] = useState<ILocalVideoTrack | null>(null);
    const [audioTrack, setAudioTrack] = useState<ILocalAudioTrack | null>(null);

    const startScreenShare = async () => {
        try {
            const screenShareConfig = {}; // Add your screen share configuration here
            const withAudio = 'auto'; // or 'enable' or 'disable'

            // Create the screen sharing track with type assertion
            const screenVideoTrackResult = await AgoraRTC.createScreenVideoTrack(screenShareConfig, withAudio);

            let videoTrack: ILocalVideoTrack;
            let audioTrack: ILocalAudioTrack | null = null;

            // Handle different return types based on withAudio parameter
            if (Array.isArray(screenVideoTrackResult)) {
                // If an array is returned, it contains both video and audio tracks
                [videoTrack, audioTrack] = screenVideoTrackResult as [ILocalVideoTrack, ILocalAudioTrack];
            } else {
                // If a single value is returned, it's the video track
                videoTrack = screenVideoTrackResult as ILocalVideoTrack;
            }

            await client.publish(videoTrack);
            // console.log('ScreenVideoTrackResult', screenVideoTrackResult);
            // console.log('Screen Track Before Setting State:', videoTrack);
            setScreenTrack(videoTrack);
            // console.log('Screen Track After Setting State:', screenTrack);
            setAudioTrack(audioTrack); // Set this only if audio track is available
        } catch (error) {
            console.error('Failed to start screen sharing:', error);
        }
    };

    const stopScreenShare = async () => {
        try {
            if (screenTrack) {
                await client.unpublish(screenTrack);
                screenTrack.close();
                setScreenTrack(null);
            }
            if (audioTrack) {
                audioTrack.close();
                setAudioTrack(null);
            }
        } catch (error) {
            console.error('Failed to stop screen sharing:', error);
        }
    };

    return (
        <AgoraRTCScreenShareContext.Provider
            value={{ client, screenTrack, audioTrack, startScreenShare, stopScreenShare }}
        >
            {children}
        </AgoraRTCScreenShareContext.Provider>
    );
}

export function useRTCScreenShareClient() {
    return useContext(AgoraRTCScreenShareContext);
}

// ORIGINAL IMPLEMENTATION
// import type { IAgoraRTCClient } from "agora-rtc-sdk-ng";
// import type { ReactNode } from "react";
// import { createContext, useContext } from "react";

// const AgoraRTCScreenShareContext = /* @__PURE__ */ createContext<IAgoraRTCClient | null>(null);

// export interface AgoraRTCScreenShareProviderProps {
//   readonly client: IAgoraRTCClient;
//   readonly children?: ReactNode;
// }

// export function AgoraRTCScreenShareProvider({
//   client,
//   children,
// }: AgoraRTCScreenShareProviderProps) {
//   return (
//     <AgoraRTCScreenShareContext.Provider value={client}>
//       {children}
//     </AgoraRTCScreenShareContext.Provider>
//   );
// }

// export function useRTCScreenShareClient(client?: IAgoraRTCClient | null): IAgoraRTCClient | null {
//   const clientFromContext = useContext(AgoraRTCScreenShareContext);
//   return client || clientFromContext;
// }
