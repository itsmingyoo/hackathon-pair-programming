import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { RootState } from "../../store";
import { getFollowing } from "../../store/userFollowing";
import { getUser } from "../../store/user";
import TargetUserSocials from "./targetUserSocials";
import { MouseEvent } from "react";
import { FollowingObject } from "../../interfaces/following";
import { unfollow, postFollow } from "../../store/userFollowing";
import TargetUserInfoBox from "./targetUserInfoBox";
import TargetUserAbout from "./targetUserAbout";
import "./index.css";
import Footer from "../Footer";
import EditUserPage from "./editProfile";
import PreviewProfile from "./PreviewProfile";

function UserPage() {
  const { userId } = useParams();
  const dispatch = useAppDispatch();
  const [isFollowed, setIsFollowed] = useState<boolean>(false);
  const [action, setAction] = useState<number>(0);
  const [editMode, setEditMode] = useState<boolean>(false);
  const sessionUser = useAppSelector((state: RootState) => state.session.user);
  const targetUser = useAppSelector(
    (state: RootState) => state.user.targetUser
  );
  const following = useAppSelector((state: RootState) => state.userFollowing);
  //   console.log("User's page: ", targetUser);
  //   console.log("Session User", sessionUser);
  //   console.log("following", following);
  // useEffect(() => {
  //     console.log('editMode', editMode);
  // }, [editMode]);

  useEffect(() => {
    async function fetchData() {
      if (userId) {
        const userFetched = await dispatch(getUser(+userId)).unwrap();
        if (userFetched) {
          await dispatch(getFollowing(userFetched));
        }
      }
      if (sessionUser) {
        await dispatch(getFollowing(sessionUser));
      }
    }
    fetchData();
  }, [userId, sessionUser, dispatch]);

  useEffect(() => {
    if (sessionUser && targetUser) {
      const isFollowingTarget =
        following?.following?.some(
          (obj) =>
            +obj.followed_id === +targetUser.id &&
            +obj.follower_id === +sessionUser.id
        ) ?? false;

      setIsFollowed(isFollowingTarget);
    }
  }, [following, sessionUser, targetUser, isFollowed]);

  const handleFollow = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (sessionUser?.errors) {
      alert("You must be logged in to follow this user.");
      return;
    }

    if (sessionUser?.id === targetUser?.id) {
      alert("You may not follow yourself");
      return;
    }

    try {
      if (!isFollowed) {
        await dispatch(postFollow(+userId!)).unwrap();
        setIsFollowed(true);
      } else {
        const followingTarget = following?.following?.find(
          (follow: FollowingObject) =>
            +follow.follower_id === +sessionUser?.id! &&
            +follow.followed_id === +userId!
        );

        if (followingTarget) {
          await dispatch(unfollow(followingTarget.id)).unwrap();
          setIsFollowed(false);
        } else {
          console.log("No matching following target found");
        }
      }
    } catch (error) {
      console.error("Error in handleFollow:", error);
    }

    updateFollowState();
  };

  const updateFollowState = async () => {
    if (sessionUser) {
      await dispatch(getFollowing(sessionUser));
      await dispatch(getUser(+userId!));
    }
  };

  const isCurrentUserProfile =
    userId && sessionUser && +sessionUser.id === +userId;

  return (
    <>
      {isCurrentUserProfile ? (
        <>
          <main id="user-profile-main">
            <div id="user-profile-header">
              <span>Dashboard</span>
            </div>
            <div id="user-profile-container">
              <div id="user-profile-sidebar">
                <button id="db-button" onClick={() => setAction(0)}>
                  Start
                </button>
                <button
                  id="db-button"
                  onClick={() => {
                    setAction(1);
                    setEditMode(false);
                  }}
                >
                  Profile
                </button>
                <button id="db-button" onClick={() => setAction(2)}>
                  Following
                </button>
                <button id="db-button" onClick={() => setAction(3)}>
                  Followers
                </button>
              </div>
              <div id="user-profile-content-container">
                {action === 0 && (
                  <>
                    <div className="container2">
                      <div className="container_terminal"></div>

                      <a href="/code-collab">
                        <div className="terminal_toolbar">
                          <div className="butt2">
                            <button className="btn btn-color"></button>
                            <button className="btn"></button>
                            <button className="btn"></button>
                          </div>
                          <p className="user">
                            {sessionUser.username}@admin: ~
                          </p>
                        </div>

                        <div className="terminal_body">
                          <div>
                            <div className="terminal_promt">
                              <span className="terminal_user">
                                {sessionUser.username}@admin:
                              </span>
                              <span className="terminal_location">~</span>
                              <span className="terminal_bling">
                                $ Welcome back, {sessionUser.username}!
                              </span>
                            </div>
                            <div className="terminal_promt">
                              <span className="terminal_user">
                                {sessionUser.username}@admin:
                              </span>
                              <span className="terminal_location">~</span>
                              <span className="terminal_bling">
                                $ Start Pairing by clicking this terminal
                              </span>
                              <span className="terminal_cursor"></span>
                            </div>
                          </div>
                        </div>
                      </a>
                    </div>
                  </>
                )}
                {action === 1 && editMode ? (
                  <EditUserPage setEditMode={setEditMode} />
                ) : (
                  action == 1 &&
                  !editMode && <PreviewProfile setEditMode={setEditMode} />
                )}
                {action === 2 && (
                  <div id="user-friends">
                    {following && following.following!.length > 0 ? (
                      following.following!.map((follow) => {
                        // console.log('follow', follow);
                        return (
                          <a href={`/users/${follow?.followed.id}`}>
                            <div id="each-friend">
                              <div>{follow?.followed.username}</div>
                              <img
                                src={
                                  follow?.followed.picUrl
                                    ? follow.followed.picUrl
                                    : "https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg?w=740"
                                }
                                style={{ height: "150px", width: "150px" }}
                              />
                            </div>
                          </a>
                        );
                      })
                    ) : (
                      <div>Currently not following anyone...</div>
                    )}
                  </div>
                )}
                {action === 3 && (
                  <div id="user-friends">
                    {following && following.followers!.length > 0 ? (
                      following.followers!.map((follower) => {
                        // console.log('follow', follower);
                        return (
                          <>
                            <a href={`/users/${follower.follower.id}`}>
                              <div id="each-friend">
                                <div>{follower?.follower.username}</div>
                                <img
                                  src={
                                    follower?.follower.picUrl
                                      ? follower.follower.picUrl
                                      : "https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg?w=740"
                                  }
                                  style={{ height: "150px", width: "150px" }}
                                />
                              </div>
                            </a>
                          </>
                        );
                      })
                    ) : (
                      <div>You have no new followers...</div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </main>
          <Footer />
        </>
      ) : (
        //!!! RENDER OTHER USER'S PROFILE !!!
        <>
          <main id="target-profile-main">
            <div id="target-profile-container">
              <div id="targetuser-profile-split">
                <div id="user-profile-content">
                  {targetUser && (
                    <TargetUserInfoBox
                      {...{
                        targetUser,
                        sessionUser,
                        following,
                        isFollowed,
                        setIsFollowed,
                        handleFollow,
                      }}
                    />
                  )}
                  {targetUser && (
                    <TargetUserAbout
                      {...{
                        targetUser,
                        sessionUser,
                        following,
                        isFollowed,
                        setIsFollowed,
                      }}
                    />
                  )}
                  {targetUser && (
                    <TargetUserSocials
                      {...{
                        targetUser,
                        sessionUser,
                        following,
                        isFollowed,
                        setIsFollowed,
                      }}
                    />
                  )}
                </div>
                <div id="targetuser-friends-container">
                  {/* <h1>Friends</h1> */}

                  <div id="targetuser-following">
                    <div id="targetuser-following-container">
                      <h2>Following</h2>
                      <div className="hr-line-primary"></div>
                      <div className="follow-scroll">
                      {targetUser &&
                        targetUser.following.length > 0 &&
                        targetUser.following.map((follow, i) => {
                          return (
                            <>
                              <a href={`/users/${follow.followed.id}`}>
                                <div
                                  key={follow.followed.username + i}
                                  id="following-container"
                                >
                                  <div id="follower-image-container">
                                    <img
                                      src={
                                        follow?.followed?.picUrl
                                          ? follow?.followed?.picUrl
                                          : "https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg?w=740"
                                      }
                                      alt="followed-user-pic"
                                    />
                                  </div>
                                  <div id="friends-username">
                                    {follow.followed.username}
                                  </div>
                                </div>
                              </a>
                            </>
                          );
                        })}
                        </div>
                    </div>
                    <div id="targetuser-followers-container">
                      <h2>Followers</h2>
                      <div className="hr-line-primary"></div>
                      <div className="follow-scroll">

                      {targetUser &&
                        targetUser.followers.length > 0 &&
                        targetUser.followers.map((follower, i) => {
                          return (
                            <>
                              <a href={`/users/${follower.follower.id}`}>
                                <div
                                  key={follower.follower.username + i}
                                  id="following-container"
                                >
                                  <div id="follower-image-container">
                                    <img
                                      src={
                                        follower?.follower?.picUrl
                                          ? follower?.follower?.picUrl
                                          : "https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg?w=740"
                                      }
                                      alt="follower-user-pic"
                                    />
                                  </div>
                                  <div id="friends-username">
                                    {follower.follower.username}
                                  </div>
                                </div>
                              </a>
                            </>
                          );
                        })}
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
          <Footer />
        </>
      )}
    </>
  );
}

export default UserPage;
