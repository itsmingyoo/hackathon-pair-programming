import { TargetUserProps } from "../../interfaces/user";

function TargetUserInfoBox(props: TargetUserProps) {
  const { picUrl, username, followers, following } = props.targetUser;
  const {isFollowed, handleFollow} = props

  return (
    <>
      <div id="targetuser-info-container">
        <div id="targetuser-pfp">
          <img
            src={
              picUrl
                ? picUrl
                : "https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg?w=740"
            }
            alt="targetuser-pfp"
          ></img>
        </div>
        <div id="targetuser-info">
          <span>{username}</span>
          <span>Joined July 2022</span>
          <span>
            {following?.length ?? 0} Following / {followers?.length ?? 0}{" "}
            Followers
          </span>
          <div className="profile-buttons-container">
            <button
            className="profile-buttons"
              onClick={() => alert("Feature coming soon!")}
            >
              Direct Message
            </button>
            <button  className="profile-buttons"onClick={(e) => handleFollow!(e)}>
              {isFollowed ? "Unfollow" : "Follow"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default TargetUserInfoBox;
