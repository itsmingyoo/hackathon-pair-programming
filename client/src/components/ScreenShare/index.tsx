import { useState } from "react";
import ShareScreenComponent from "../../AgoraManager/screenShare";
import config from "../../AgoraManager/config";
import { fetchRTCToken } from "../../utility/fetchRTCToken";
import { useEffect } from "react";
import {
  RemoteVideoTrack,
  useClientEvent,
  useRTCClient,
  useRemoteUsers,
  useRemoteVideoTracks,
} from "agora-rtc-react";
import { useAppSelector } from "../../hooks";
import RemoteAndLocalVolumeComponent from "../../AgoraManager/volumeControl";
import shareScreenPlaceholder from "../../assets/images/share-screen-holder.webp"


function ScreenShare(props: { channelName: string }) {
  const { channelName } = props;
  const [screenSharing, setScreenSharing] = useState<boolean>(false);
  const [isRemoteScreen, setIsRemoteScreen] = useState<boolean>(false);
  const remoteUsers = useRemoteUsers();
  const agoraEngine = useRTCClient();

  useRemoteVideoTracks(remoteUsers);
  const pairInfo = useAppSelector((state) => state.pairedUser.user);
  console.log(remoteUsers);

  useEffect(() => {
    const fetchTokenFunction = async () => {
      if (config.serverUrl !== "" && channelName !== "") {
        try {
          const token = (await fetchRTCToken(channelName)) as string;
          config.rtcToken = token;
          config.channelName = channelName;
        } catch (error) {
          console.error(error);
        }
      } else {
        console.log(
          "Please make sure you specified the token server URL in the configuration file"
        );
      }
    };

    fetchTokenFunction();

    console.log(
      "😎screenSharing😎: ",
      screenSharing ? screenSharing : screenSharing
    );
  }, [channelName, screenSharing]);

  useClientEvent(agoraEngine, "user-left", (user) => {
    if (user.uid === pairInfo?.screenUid) {
        setIsRemoteScreen(false);
    }
    console.log(
      "🦄🦄🦄🦄🦄🦄🦄🦄🦄 The user",
      user.uid,
      " has left the channel"
    );
  });

  useClientEvent(agoraEngine, "user-published", (user, _) => {
    if (user.uid === pairInfo?.screenUid) {
        setIsRemoteScreen(true);
    }
  });

  // If User starts screen share with the button, it will trigger an event asking them what screen they will share and render it
  const renderContent = () => {
    if (screenSharing === true) {
      return (
        <>
          <ShareScreenComponent
            setScreenSharing={setScreenSharing}
            isRemoteScreen={isRemoteScreen}
          />
        </>
      );
    } else if (!screenSharing && !isRemoteScreen) {
        return (
            <div id="share-screen-placeholder">
                <p>Share your screen and start coding!</p>
                <img src={shareScreenPlaceholder} alt="Cats waiting for a user to share their screen"  className="share-screen-cats"/>
            </div>
        )
    }
  };

  return (
    <>
      {remoteUsers.map((remoteUser) => {
        if (remoteUser.uid === pairInfo?.screenUid) {
          return (
            <RemoteVideoTrack
              track={remoteUser.videoTrack}
              className="screen-share"
              style={{
                width: "100%",
                height: "108",
                objectFit: "contain",
              }}
              key={remoteUser.uid}
              play
            />
          );
        } else {
          return null;
        }
      })}
      {renderContent()}

      <RemoteAndLocalVolumeComponent
        screenSharing={screenSharing}
        setScreenSharing={setScreenSharing}
      />
    </>
  );
}
export default ScreenShare;
