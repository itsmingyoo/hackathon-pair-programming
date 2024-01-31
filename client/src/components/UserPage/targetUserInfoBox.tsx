import { TargetUserProps } from '../../interfaces/user';
import { RootState } from '../../store';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect } from 'react';
import { getFollowing } from '../../store/userFollowing';

function TargetUserInfoBox(props: TargetUserProps) {
    const { picUrl, username, id } = props.targetUser;
    const dispatch = useAppDispatch();

    const followers = useAppSelector((state: RootState) => state.userFollowing.followers);
    const following = useAppSelector((state: RootState) => state.userFollowing.following);

    useEffect(() => {
        dispatch(getFollowing(props.targetUser));
    }, [id, dispatch]);

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
                    <span>
                        {following?.length ?? 0} Following /{followers?.length ?? 0} Followers
                    </span>
                </div>
            </div>
        </>
    );
}

export default TargetUserInfoBox;
