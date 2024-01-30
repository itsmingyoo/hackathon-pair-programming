import { TargetUserProps } from '../../interfaces/user';

function TargetUserInfoBox(props: TargetUserProps) {
    if (props.targetUser) {
        const { picUrl, username } = props.targetUser;
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
                            alt="targetuser-pfp"
                        ></img>
                    </div>
                    <div id="targetuser-info">
                        <span>{username}</span>
                        <span>Example: Joined July 2022</span>
                        <span>0 Following / 0 Follwers</span>
                    </div>
                </div>
            </>
        );
    }
}

export default TargetUserInfoBox;
