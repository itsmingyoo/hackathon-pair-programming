import config from '../AgoraManager/config';

// Fetch Token from Server - Use an HTTP request to retrieve an authentication token for a specific channel from the token server.
export async function fetchRTCToken(channelName: string) {
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
