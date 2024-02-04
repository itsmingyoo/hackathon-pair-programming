// import { useEffect, useState } from 'react';
// // import { AgoraManager } from './agoraManager';
// import config from './config';
// import { fetchRTCToken } from '../utility/fetchRTCToken';
// import { useTokenWillExpire } from '../utility/renewRTCToken';

// // Retrieve a token from the token server and use it to join the channel.
// function AuthenticationWorkflowManager(props: { children?: React.ReactNode }) {
//     const [channelName, setChannelName] = useState<string>('');
//     const [joined, setJoined] = useState(false);

//     // renew token
//     useTokenWillExpire();

//     // fetch token for channel
//     const fetchTokenFunction = async () => {
//         if (config.serverUrl !== '' && channelName !== '') {
//             try {
//                 const token = (await fetchRTCToken(channelName)) as string;
//                 config.rtcToken = token;
//                 config.channelName = channelName;
//                 setJoined(true);
//             } catch (error) {
//                 console.error(error);
//             }
//         } else {
//             console.log('Please make sure you specified the token server URL in the configuration file');
//         }
//     };
//     useEffect(() => {
//         console.log('isJoined in AuthenticationWFM: ', joined);
//     });

//     return (
//         <div>
//             {!joined ? (
//                 <>
//                     <input
//                         type="text"
//                         value={channelName}
//                         onChange={(e) => setChannelName(e.target.value)}
//                         placeholder="Channel name"
//                     />
//                     <button onClick={() => void fetchTokenFunction()}>Join</button>
//                     {props.children}
//                 </>
//             ) : (
//                 <>
//                     <button onClick={() => setJoined(false)}>Leave</button>
//                     <AgoraManager config={config}>{props.children}</AgoraManager>
//                 </>
//             )}
//         </div>
//     );
// }

// export default AuthenticationWorkflowManager;
