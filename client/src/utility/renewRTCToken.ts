import { useClientEvent, useRTCClient } from 'agora-rtc-react';
import config from '../AgoraManager/config';
import { fetchRTCToken } from './fetchRTCToken';

// A token expires either after the expire time specified in the call to the token server or, if the time is not specified, after 24 hours. When the token is about to expire your app receives an event notification. To continue the current session, fetch a new token and call renewToken.
export const useTokenWillExpire = () => {
    const agoraEngine = useRTCClient();
    useClientEvent(agoraEngine, 'token-privilege-will-expire', () => {
        if (config.serverUrl !== '') {
            fetchRTCToken(config.channelName)
                .then((token) => {
                    // console.log('RTC token fetched from server: ', token);
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
