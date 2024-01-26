import ShareScreenComponent from "../../AgoraManager/screenShare";
import config from "../../AgoraManager/config";
import { fetchRTCToken } from "../../utility/fetchRTCToken";
import { useEffect, useState } from "react";
import { RemoteVideoTrack, useRemoteUsers, useRemoteVideoTracks } from "agora-rtc-react";
import { useAppSelector } from "../../hooks";

function ScreenShare(props: { channelName: string }) {
  const [screenSharing, setScreenSharing] = useState<boolean>(false);
  const { channelName } = props;
  const remoteUsers = useRemoteUsers();
  useRemoteVideoTracks(remoteUsers)
  const pairInfo = useAppSelector((state) => state.pairedUser.user);
  console.log(remoteUsers)

  const toggleScreenShare = () => {
    setScreenSharing(!screenSharing);
  };
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

  // Conditional rendering based on screen sharing state
  const renderContent = () => {
    if (screenSharing === true) {
      return (
        <>
          <h1>Screen Sharing</h1>
          <ShareScreenComponent setScreenSharing={setScreenSharing} />
        </>
      );
    }
  };

  useEffect(() => {
    console.log("😁😁😁 state", screenSharing);
  });

  return (
    <>
      <div>
        <button onClick={toggleScreenShare}>
          {screenSharing ? "Stop Sharing" : "Start Sharing"}
        </button>
        {renderContent()}
        {remoteUsers.map((remoteUser) => {
          if (remoteUser.uid === pairInfo?.screenUid) {
            
            return (
              <div
                className="vid"
                style={{ height: '1920px', width: '1080px', objectFit: 'contain' }}
                key={remoteUser.uid}
              >
                <RemoteVideoTrack style={{ width: '1920px', height: '1080px' }} track={remoteUser.videoTrack} play/>
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>
    </>
  );
}
export default ScreenShare;
