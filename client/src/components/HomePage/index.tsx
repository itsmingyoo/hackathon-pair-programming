import { useState, useEffect, useCallback } from "react";
import config from "../../AgoraManager/config";
import { useAppSelector } from "../../hooks";
import { useSocket } from "../../hooks/socket";
import { fetchRTCToken } from "../../utility/fetchRTCToken";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks";
import { receiveUser } from "../../store/pairedUser";
import "./homePage.css";

function HomePage() {
  const user = useAppSelector((state) => state.session.user);
  const [channelName, setChannelName] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [joined, setJoined] = useState<boolean>(false);
  const navigate = useNavigate();

  const { socket } = useSocket();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (socket) {
      // Listen for the 'joined' event when successfully paired with a room
      socket.on("joined", (data) => {
        console.log("🤬🤬🤬🤬🤬🤬🤬🤬🤬🤬🤬🤬🤬🤬🤬🤬🤬🤬🤬🤬🤬🤬🤬",data)
        if (!channelName) {
          setChannelName(data.room);
        }
        if (user && data.users.length > 1) {
          const pair = data.users.filter((duser) => duser.id !== user.id)[0];
          dispatch(receiveUser(pair));
        }
      });

      socket.on("user_left", (data) => {
        console.log(data);
      });
    }

    return () => {
      if (socket) {
        // Clean up all event listeners when component unmounts
        socket.removeAllListeners("joined");
        socket.removeAllListeners("user_left");
      }
    };
  }, [user, socket, channelName, dispatch]);

  useEffect(() => {
    const fetchTokenFunction = async () => {
      if (config.serverUrl && channelName) {
        try {
          const token = (await fetchRTCToken(channelName)) as string;
          config.rtcToken = token;
          config.channelName = channelName;
          config.joined = true;
          navigate('/code-collab')
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
  }, [channelName]);

  const handleJoinClick = () => {
    console.log("You are pressing the join button.", socket);
    setLoading(true); // Start loading
    if (socket) {
      console.log("You are now joining a room", socket);
      socket.emit("join_room");
    }
  };

  return (
    <>
      <main className="landing-page">
        <div id="join-channel-button-container">
          <button
            onClick={handleJoinClick}
            disabled={loading}
            id="join-channel-button"
          >
            {loading ? (
              <div className="spinner"></div>
            ) : (
              <p className="join-channel-button-text">Pair Up!</p>
            )}
          </button>
        </div>
      </main>
    </>
  );
}

export default HomePage;
