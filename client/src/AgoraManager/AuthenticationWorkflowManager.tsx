import { useEffect, useState } from 'react';
import { useClientEvent, useRTCClient } from 'agora-rtc-react';
import { AgoraManager } from './agoraManager';
import config from './config';

// Fetch Token from Server - Use an HTTP request to retrieve an authentication token for a specific channel from the token server.
async function fetchRTCToken(channelName: string) {
    if (config.serverUrl !== '') {
        try {
            // /rtc/:channelName/:role/:tokenType/:rtcuid/
            const response = await fetch(
                `${config.proxyUrl}${config.serverUrl}/rtc/${channelName}/publisher/uid/${config.uid}/?expiry=${config.tokenExpiryTime}`
            );

            const data = (await response.json()) as { rtcToken: string };
            console.log('RTC token fetched from server: ', data.rtcToken);
            return data.rtcToken;
        } catch (error) {
            console.error(error);
            throw error;
        }
    } else {
        return config.rtcToken;
    }
}

// A token expires either after the expire time specified in the call to the token server or, if the time is not specified, after 24 hours. When the token is about to expire your app receives an event notification. To continue the current session, fetch a new token and call renewToken.
const useTokenWillExpire = () => {
    const agoraEngine = useRTCClient();
    useClientEvent(agoraEngine, 'token-privilege-will-expire', () => {
        if (config.serverUrl !== '') {
            fetchRTCToken(config.channelName)
                .then((token) => {
                    console.log('RTC token fetched from server: ', token);
                    if (token) return agoraEngine.renewToken(token);
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            console.log('Please make sure you specified the token server URL in the configuration file');
        }
    });
};

// Retrieve a token from the token server and use it to join the channel.
function AuthenticationWorkflowManager(props: { children?: React.ReactNode }) {
    const [channelName, setChannelName] = useState<string>('');
    const [joined, setJoined] = useState(false);

    useTokenWillExpire();

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
    useEffect(() => {
        console.log('isJoined in AuthenticationWFM: ', joined);
    });

    return (
        <div>
            {!joined ? (
                <>
                    <input
                        type="text"
                        value={channelName}
                        onChange={(e) => setChannelName(e.target.value)}
                        placeholder="Channel name"
                    />
                    <button onClick={() => void fetchTokenFunction()}>Join</button>
                    {props.children}
                </>
            ) : (
                <>
                    <button onClick={() => setJoined(false)}>Leave</button>
                    <AgoraManager config={config}>{props.children}</AgoraManager>
                </>
            )}
        </div>
    );
}

export default AuthenticationWorkflowManager;
