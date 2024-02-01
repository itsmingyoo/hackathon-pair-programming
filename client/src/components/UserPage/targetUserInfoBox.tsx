import { TargetUserProps } from '../../interfaces/user';

function TargetUserInfoBox(props: TargetUserProps) {
    const { picUrl, username, followers, following } = props.targetUser;

    return (
        <>
            <div id="targetuser-info-container">
                <div id="targetuser-pfp">
                    <img
                        src={
                            picUrl
                                ? picUrl
                                : 'https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg?w=740'
                        }
                        // src="https://cdn.pixabay.com/photo/2020/03/31/19/20/dog-4988985_640.jpg"
                        alt="targetuser-pfp"
                    ></img>
                </div>
                <div id="targetuser-info">
                    <span>{username}</span>
                    <span>Joined July 2022</span>
                    <span>
                        {following?.length ?? 0} Following / {followers?.length ?? 0} Followers
                    </span>
                </div>
            </div>
        </>
    );
}

export default TargetUserInfoBox;
