import React, {
  JSXElementConstructor,
  ReactElement,
  ReactNode,
  ReactPortal,
  Dispatch, 
  SetStateAction,
} from "react";
import { useAppSelector } from "../../hooks";
import "./PreviewProfile.css"

interface PreviewProfileProps {
    setEditMode: Dispatch<SetStateAction<boolean>>
}

function PreviewProfile({ setEditMode }: PreviewProfileProps) {
  const sessionUser = useAppSelector((state) => state.session.user);

  return (
    <div id="profile-main">
      <div id="profile-header">
        <span id="username">{sessionUser?.username}'s </span>
        <span id="profile-text">Profile</span>
        <button id="dm-button" onClick={() => alert("Feature coming soon!")}>
          Direct Message
        </button>
        <button
          id="dm-button"
          onClick={() => alert("This is a preview, you cannot follow yourself")}
        >
          "Follow"
        </button>
        <button id="edit-profile-mode" onClick={() => setEditMode(true)}>Edit Profile</button>
      </div>

      <div className="hr-line-primary"></div>
      
        <div id="profile-split">
          <div id="profile-content">
            {sessionUser && (
              <div id="info-container">
                <div id="pfp">
                  <img
                    src={
                      sessionUser.picUrl
                        ? sessionUser.picUrl
                        : "https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg?w=740"
                    }
                    alt="pfp"
                  ></img>
                </div>
                <div id="info">
                  <span>{sessionUser.username}</span>
                  <span>Joined July 2022</span>
                  <span>
                    {sessionUser.following?.length ?? 0} Following /{" "}
                    {sessionUser.followers?.length ?? 0} Followers
                  </span>
                </div>
              </div>
            )}
            {sessionUser && (
              <div id="profile-about">
                <h3>About Me: </h3>
                <p>
                  {sessionUser.about
                    ? sessionUser.about
                    : "This is a default description about me."}
                </p>
              </div>
            )}
            {/* {targetUser && (
                <TargetUserSocials
                  {...{
                    targetUser,
                    sessionUser,
                    following,
                    isFollowed,
                    setIsFollowed,
                  }}
                />
            )} */}
        </div>
        
        {/* <div id="targetuser-friends-container">
            <div id="targetuser-following">
              <div id="targetuser-following-container">
                <h2>Following</h2>
                <div className="hr-line-primary"></div>
                {sessionUser &&
                  sessionUser.following.length > 0 &&
                  sessionUser.following.map((follow: { followed: { id: any; username: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; picUrl: string | undefined; }; }, i: any) => {
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
              <div id="targetuser-followers-container">
                <h2>Followers</h2>
                <div className="hr-line-primary"></div>
                {sessionUser &&
                  sessionUser.followers.length > 0 &&
                  sessionUser.followers.map((follower: { follower: { id: any; username: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; picUrl: string | undefined; }; }, i: any) => {
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
          </div>*/}
        </div> 
    </div>
  );
}

export default PreviewProfile;
