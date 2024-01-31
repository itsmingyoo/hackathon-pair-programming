import { RootState } from '../../store';
import { TargetUserProps } from '../../interfaces/user';
import { useAppSelector } from '../../hooks';

function TargetUserInfoBox(props: TargetUserProps) {
    const { picUrl, username } = props.targetUser;
    const followings = useAppSelector((state: RootState) => state.userFollowing);
    console.log('followings', followings);
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
                    <span>{} Following / {} Followers</span>
                </div>
            </div>
        </>
    );
}

export default TargetUserInfoBox;
