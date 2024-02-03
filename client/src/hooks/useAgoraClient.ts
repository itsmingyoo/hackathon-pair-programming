// Future Implementation for Modularity
import { useEffect, useState } from 'react';
import AgoraRTC from 'agora-rtc-react';
import config from '../AgoraManager/config'; // Adjust path
import { fetchRTCToken } from '../utility/fetchRTCToken'; // Adjust path

export const useAgoraClient = (channelName: string) => {
    const [joined, setJoined] = useState<boolean>(false);
    const agoraClient = AgoraRTC.createClient({ codec: 'vp8', mode: config.selectedProduct });

    useEffect(() => {
        const joinChannel = async () => {
            if (!channelName || joined) return;

            try {
                const token = (await fetchRTCToken(channelName)) as string;
                // Initialize and join the channel with agoraClient here
                // Example: agoraClient.join(token, channelName, null)
                config.rtcToken = token;
                config.channelName = channelName;
                setJoined(true);
                // Set the token and channelName in your config here
            } catch (error) {
                console.error('Failed to fetch token or join channel:', error);
            }
        };

        joinChannel();

        return () => {
            // Cleanup logic for leaving the channel and agoraClient
        };
    }, [channelName, joined]);

    return { agoraClient, joined, setJoined };
};
