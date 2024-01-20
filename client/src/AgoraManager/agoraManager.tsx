// Import necessary components and hooks from Agora SDK and React
import {
    LocalVideoTrack,
    RemoteUser,
    useJoin,
    useLocalCameraTrack,
    useLocalMicrophoneTrack,
    usePublish,
    useRTCClient,
    useRemoteUsers,
    useClientEvent,
    IMicrophoneAudioTrack,
    ICameraVideoTrack,
    AgoraRTCProvider
} from 'agora-rtc-react';

import React, { createContext, useState, useEffect } from 'react';
// import { IMicrophoneAudioTrack, ICameraVideoTrack } from 'agora-rtc-sdk-ng';
import { configType } from './config';


// Define the shape of the Agora context
interface AgoraContextType {
    localCameraTrack: ICameraVideoTrack | null;
    localMicrophoneTrack: IMicrophoneAudioTrack | null;
    children: React.ReactNode;
}

// Create the Agora context
export const AgoraContext = createContext<AgoraContextType | null>(null);

// AgoraProvider component to provide the Agora context to its children
export const AgoraProvider: React.FC<AgoraContextType> = ({ children, localCameraTrack, localMicrophoneTrack }) => (
    <AgoraContext.Provider value={{ localCameraTrack, localMicrophoneTrack, children }}>
        {children}
    </AgoraContext.Provider>
);


// AgoraManager component responsible for handling Agora-related logic and rendering UI
export const AgoraManager = ({ config, children }: { config: configType; children: React.ReactNode }) => {
    // Retrieve local camera and microphone tracks and remote users
    const agoraEngine = useRTCClient();
    const { isLoading: isLoadingCam, localCameraTrack } = useLocalCameraTrack();
    const { isLoading: isLoadingMic, localMicrophoneTrack } = useLocalMicrophoneTrack();
    const remoteUsers = useRemoteUsers();
    const [role, setRole] = useState('host'); // Default role is host

    // Publish local tracks
    usePublish([localMicrophoneTrack, localCameraTrack]);

    // Join the Agora channel with the specified configuration
    useJoin({
        appid: config.appId,
        channel: config.channelName,
        token: config.rtcToken,
        uid: config.uid,
    });

    useClientEvent(agoraEngine, 'user-joined', (user) => {
        console.log('The user', user.uid, ' has joined the channel');
    });

    useClientEvent(agoraEngine, 'user-left', (user) => {
        console.log('The user', user.uid, ' has left the channel');
    });

    // mediaType replaced with _
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    useClientEvent(agoraEngine, 'user-published', (user, _) => {
        console.log('The user', user.uid, ' has published media in the channel');
    });

    const handleRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRole(event.target.value);
        if (event.target.value === 'host') {
            agoraEngine
                .setClientRole('host')
                .then(() => {
                    // Your code to handle the resolution of the promise
                    console.log('Client role set to host successfully');
                })
                .catch((error) => {
                    // Your code to handle any errors
                    console.error('Error setting client role:', error);
                });
        } else {
            agoraEngine
                .setClientRole('audience')
                .then(() => {
                    // Your code to handle the resolution of the promise
                    console.log('Client role set to host successfully');
                })
                .catch((error) => {
                    // Your code to handle any errors
                    console.error('Error setting client role:', error);
                });
        }
    };

    useEffect(() => {
        return () => {
            localCameraTrack?.close();
            localMicrophoneTrack?.close();
        };
    }, [localCameraTrack, localMicrophoneTrack]);

    // Check if devices are still loading
    const deviceLoading = isLoadingMic || isLoadingCam;
    if (deviceLoading) return (<div>Loading devices...</div>);

    // Render the AgoraProvider and associated UI components
    return (
        <AgoraProvider localCameraTrack={localCameraTrack} localMicrophoneTrack={localMicrophoneTrack}>
            {children}
            <>
                {config.selectedProduct === 'live' && (
                    <div>
                        <label>
                            <input type="radio" value="host" checked={role === 'host'} onChange={handleRoleChange} />
                            Host
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="audience"
                                checked={role === 'audience'}
                                onChange={handleRoleChange}
                            />
                            Audience
                        </label>
                    </div>
                )}
            </>
            <div id="videos">
                {/* Render the local video track */}
                <div className="vid" style={{ height: 300, width: 600 }}>
                    <LocalVideoTrack track={localCameraTrack} play={true} />
                </div>
                {/* Render remote users' video and audio tracks */}
                {remoteUsers.map((remoteUser) => (
                    <div className="vid" style={{ height: 300, width: 600 }} key={remoteUser.uid}>
                        <RemoteUser user={remoteUser} playVideo={true} playAudio={true} />
                    </div>
                ))}
            </div>
        </AgoraProvider>
    );
};

// Export the AgoraManager component as the default export
export default AgoraManager;
