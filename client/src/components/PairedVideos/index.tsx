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
import userWaiting from "../../assets/images/user-waiting.svg";

function PairedVideos(props: {
  channelName: string;
  leaveRoomHandler: () => void;
}) {
  const user = useAppSelector((state) => state.session.user);
  const pairInfo = useAppSelector((state) => state.pairedUser.user);
  const agoraEngine = useRTCClient();
  const { channelName, leaveRoomHandler } = props;
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
          <div className="videos" style={{ height: 300, width: 300 }}>
            Loading Devices...
          </div>
        ) : (
          <div className="videos" style={{ height: 300, width: 300 }}>
            <p className="video-username">{user.username}</p>
            <LocalVideoTrack track={localCameraTrack} play={true} />
          </div>
        )}
        {remoteUsers.length > 0  && remoteUsers.find(user => user.uid === pairInfo?.videoUid) ? (
          remoteUsers.map((remoteUser) => {
            if (remoteUser.uid === pairInfo?.videoUid) {
              return (
                <div
                  className="videos"
                  style={{ height: 300, width: 300 }}
                  key={remoteUser.uid}
                >
                  <p className="video-username">{pairInfo.username}</p>
                  <RemoteUser
                    user={remoteUser}
                    playVideo={true}
                    playAudio={true}
                  />
                  <button id="follow-user">Follow</button>
                </div>
              );
            }
          })
        ) : (
          <>
            <div
              className="videos cat-waiting"
              style={{ height: 300, width: 300 }}
            >
              <img
                src={userWaiting}
                alt="Cat informing we are waiting for a user to join"
              />
              <p>Waiting for user...</p>
            </div>
          </>
        )}
      </div>
      <div id="screen-share-container">
        <AgoraProvider
          localCameraTrack={localCameraTrack}
          localMicrophoneTrack={localMicrophoneTrack}
          leaveRoomHandler={leaveRoomHandler}
        >
          <AgoraRTCScreenShareProvider
            client={AgoraRTC.createClient({ codec: "vp8", mode: "rtc" })}
          >
            <ScreenShare channelName={config.channelName} />
          </AgoraRTCScreenShareProvider>
        </AgoraProvider>
      </div>
    </>
  );
}

export default PairedVideos;
