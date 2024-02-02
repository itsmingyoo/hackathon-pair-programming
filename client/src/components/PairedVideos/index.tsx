import AgoraRTC, {
  LocalVideoTrack,
  RemoteUser,
  useJoin,
  useLocalCameraTrack,
  useLocalMicrophoneTrack,
  usePublish,
  useRTCClient,
  useRemoteUsers,
  useClientEvent,
  AgoraRTCScreenShareProvider,
} from "agora-rtc-react";

import { useEffect } from "react";
import config from "../../AgoraManager/config";
import { useAppSelector } from "../../hooks";
import "./index.css";
import { AgoraProvider } from "../../AgoraManager/agoraManager";
import ScreenShare from "../ScreenShare";

function PairedVideos(props: { channelName: string }) {
  const user = useAppSelector((state) => state.session.user);
  const pairInfo = useAppSelector((state) => state.pairedUser.user);
  const agoraEngine = useRTCClient();
  const { channelName } = props;
  const { isLoading: isLoadingMic, localMicrophoneTrack } =
    useLocalMicrophoneTrack();
  const { isLoading: isLoadingCam, localCameraTrack } = useLocalCameraTrack();
  const remoteUsers = useRemoteUsers();
  console.log("REMOTE USERS", remoteUsers);
  //   const { audioTracks } = useRemoteAudioTracks(remoteUsers);

  useJoin({
    appid: config.appId,
    channel: channelName,
    token: config.rtcToken,
    uid: user?.videoUid,
  });

  useClientEvent(agoraEngine, "user-joined", (user) => {
    console.log(
      "🤬🤬🤬🤬🤬🤬🤬🤬🤬 The user",
      user.uid,
      " has joined the channel"
    );
  });

  useClientEvent(agoraEngine, "user-left", (user) => {
    console.log(
      "🦄🦄🦄🦄🦄🦄🦄🦄🦄 The user",
      user.uid,
      " has left the channel"
    );
  });

  //mediaType replaced with _ for ts
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  useClientEvent(agoraEngine, "user-published", (user, _) => {
    console.log(
      "🍉🍉🍉🍉🍉🍉🍉🍉🍉 The user",
      user,
      " has published media in the channel",
      _
    );
  });

  useEffect(() => {
    return () => {
      localCameraTrack?.close();
      localMicrophoneTrack?.close();
    };
  }, []);

  usePublish([localMicrophoneTrack, localCameraTrack]);

  console.log(localCameraTrack);
  const deviceLoading = isLoadingMic || isLoadingCam;
  // if (deviceLoading) return <div>Loading devices...</div>;

  return (
    <>
      <div id="video-container">
        {deviceLoading ? (
          <div id="vid" style={{ height: 300, width: 350 }}>
            Loading Devices...
          </div>
        ) : (
          <div className="vid">
            <LocalVideoTrack track={localCameraTrack} play={true} />
          </div>
        )}
        {remoteUsers.length > 0 ? (
          remoteUsers.map((remoteUser) => {
            if (remoteUser.uid === pairInfo?.videoUid) {
              return (
                <div
                  className="vid"
                  style={{ height: 300, width: 350 }}
                  key={remoteUser.uid}
                >
                  <RemoteUser
                    user={remoteUser}
                    playVideo={true}
                    playAudio={true}
                  />
                  <button id="follow-user">Follow</button>
                </div>
              );
            }
            return null;
          })
        ) : (
          <>
            <div id="vid" style={{ height: 300, width: 350 }}>
              WAITING FOR USER
            </div>
          </>
        )}
      </div>
      <div id="screen-share-container">
      <AgoraProvider localCameraTrack={localCameraTrack} localMicrophoneTrack={localMicrophoneTrack}>
          <AgoraRTCScreenShareProvider client={AgoraRTC.createClient({ codec: 'vp8', mode: 'rtc' })}>
            <ScreenShare channelName={config.channelName} />
          </AgoraRTCScreenShareProvider>
        </AgoraProvider>
      </div>
    </>
  );
}

export default PairedVideos;
