import React, { SetStateAction, useState } from "react";
import { useAgoraContext } from "./agoraManager";
import { useRemoteUsers } from "agora-rtc-react";
import "./volumeControl.css";
import { useAppSelector } from "../hooks";

function RemoteAndLocalVolumeComponent(props: {
  screenSharing: boolean;
  setScreenSharing: React.Dispatch<SetStateAction<boolean>>;
}) {
  const agoraContext = useAgoraContext();
  const remoteUsers = useRemoteUsers();
  const { screenSharing, setScreenSharing } = props;
  const [checked, setChecked] = useState<boolean>(true);
  const pairInfo = useAppSelector((state) => state.pairedUser.user);

  const handleLocalAudioToggle = () => {
    const newVolume = checked === false ? 100 : 0;
    console.log("newvolume", newVolume);
    agoraContext.localMicrophoneTrack?.setVolume(newVolume);
    setChecked(!checked);
  };

  const handleRemoteAudioVolumeChange = (
    evt: React.ChangeEvent<HTMLInputElement>
  ) => {
    console.log("🤬🤬🤬🤬🤬🤬🤬🤬🤬", remoteUsers);
    const remoteUser = remoteUsers.find(
      (rUser) => rUser.uid === pairInfo?.videoUid
    );
    if (remoteUser && remoteUser.audioTrack) {
      const volume = parseInt(evt.target.value, 10);
      remoteUser.audioTrack.setVolume(volume);
    }
  };

  return (
    <div className="controls">
      <div id="volume-slider" className="PB-range-slider-div">
        <label htmlFor="remote-audio-volume">Adjust User's Volume</label>
        <input
          type="range"
          id="remote-audio-volume"
          className="PB-range-slider"
          min="0"
          max="100"
          step="1"
          onChange={handleRemoteAudioVolumeChange}
        />
      </div>
      <label className="container" htmlFor="toggle-mute">
        <input
          onClick={handleLocalAudioToggle}
          checked={checked}
          type="checkbox"
          onChange={(e) => setChecked(e.target.checked)} // Add onChange handler
          id="toggle-mute"
          aria-label="Toggle Audio Mute"
        />
        <svg
          viewBox="0 0 640 512"
          height="24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
          className="microphone-slash"
        >
          <path
            fill="currentColor"
            d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L472.1 344.7c15.2-26 23.9-56.3 23.9-88.7V216c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 21.2-5.1 41.1-14.2 58.7L416 300.8V96c0-53-43-96-96-96s-96 43-96 96v54.3L38.8 5.1zM344 430.4c20.4-2.8 39.7-9.1 57.3-18.2l-43.1-33.9C346.1 382 333.3 384 320 384c-70.7 0-128-57.3-128-128v-8.7L144.7 210c-.5 1.9-.7 3.9-.7 6v40c0 89.1 66.2 162.7 152 174.4V464H248c-13.3 0-24 10.7-24 24s10.7 24 24 24h72 72c13.3 0 24-10.7 24-24s-10.7-24-24-24H344V430.4z"
          ></path>
        </svg>
        <svg
          viewBox="0 0 384 512"
          height="24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
          className="microphone"
        >
          <path
            fill="currentColor"
            d="M192 0C139 0 96 43 96 96V256c0 53 43 96 96 96s96-43 96-96V96c0-53-43-96-96-96zM64 216c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 89.1 66.2 162.7 152 174.4V464H120c-13.3 0-24 10.7-24 24s10.7 24 24 24h72 72c13.3 0 24-10.7 24-24s-10.7-24-24-24H216V430.4c85.8-11.7 152-85.3 152-174.4V216c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 70.7-57.3 128-128 128s-128-57.3-128-128V216z"
          ></path>
        </svg>
      </label>

      <button
        onClick={() => setScreenSharing(!screenSharing)}
        id={screenSharing? "stop-screen-share" :"share-screen-button"}
        aria-label={screenSharing ? "Stop Screen Share": "Share Your Screen"}
      >
        {screenSharing ? (
          <svg
            className="controlIcon__25700 centerIcon__6075a"
            aria-hidden="true"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="red"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              fill-rule="evenodd"
              d="M2 5a3 3 0 0 1 3-3h14a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V5Zm6.3.3a1 1 0 0 1 1.4 0L12 7.58l2.3-2.3a1 1 0 1 1 1.4 1.42L13.42 9l2.3 2.3a1 1 0 0 1-1.42 1.4L12 10.42l-2.3 2.3a1 1 0 0 1-1.4-1.42L10.58 9l-2.3-2.3a1 1 0 0 1 0-1.4Z"
              clip-rule="evenodd"
              className=""
            ></path>
            <path
              fill="currentColor"
              d="M13 19.5c0 .28.22.5.5.5H15a1 1 0 1 1 0 2H9a1 1 0 1 1 0-2h1.5a.5.5 0 0 0 .5-.5v-2c0-.28.22-.5.5-.5h1c.28 0 .5.22.5.5v2Z"
              className=""
            ></path>
          </svg>
        ) : (
          <svg
            className="screenshare-icon"
            aria-hidden="true"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              fill-rule="evenodd"
              d="M2 5a3 3 0 0 1 3-3h14a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V5Zm16 3a1 1 0 0 0-.3-.7l-3-3a1 1 0 1 0-1.4 1.4L14.58 7H13a6 6 0 0 0-6 6 1 1 0 1 0 2 0 4 4 0 0 1 4-4h1.59l-1.3 1.3a1 1 0 0 0 1.42 1.4l3-3A1 1 0 0 0 18 8Z"
              clip-rule="evenodd"
              className=""
            ></path>
            <path
              fill="currentColor"
              d="M13 19.5c0 .28.22.5.5.5H15a1 1 0 1 1 0 2H9a1 1 0 1 1 0-2h1.5a.5.5 0 0 0 .5-.5v-2c0-.28.22-.5.5-.5h1c.28 0 .5.22.5.5v2Z"
              className=""
            ></path>
          </svg>
        )}
      </button>
      <button
        onClick={agoraContext.leaveRoomHandler}
        style={{ backgroundColor: "red" }}
        id="leave-room"
        aria-label="Leave the room"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            fill="var(--text)"
            d="M8 13.4782v-.6165s0-1.4654 4-1.4654 4 1.4654 4 1.4654v.3883c0 .9564.7227 1.7692 1.7004 1.9125l2 .2931C20.9105 15.6329 22 14.7267 22 13.5429v-2.1246c0-.587-.1838-1.1641-.6297-1.56229C20.2296 8.83732 17.4208 7 12 7c-5.74859 0-8.55973 2.58269-9.55917 3.7889C2.1247 11.1704 2 11.6525 2 12.1414v1.9229c0 1.298 1.29561 2.2277 2.57997 1.8513l2-.5861C7.42329 15.0823 8 14.3305 8 13.4782Z"
          />
        </svg>
      </button>
      {/* <p className="PB-range-slidervalue">{userVolume}</p> */}
    </div>
  );
}

export default RemoteAndLocalVolumeComponent;
