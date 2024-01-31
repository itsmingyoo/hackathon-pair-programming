import { TargetUserProps } from '../../interfaces/user';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect } from 'react';
import { getFollowing } from '../../store/userFollowing';

function TargetUserFollowing(props: TargetUserProps) {
    const dispatch = useAppDispatch();
    const targetFollowing = useAppSelector((state) => state.userFollowing.following);
    const targetFollowers = useAppSelector((state) => state.userFollowing.followers);
    // console.log('following, followers', targetFollowing, targetFollowers); // array of obj

    useEffect(() => {
        if (props.targetUser) dispatch(getFollowing(props.targetUser));
    }, []);

    return (
        <>
            <div id="targetuser-friends-container">
                <h1>Friends</h1>

                <div id="targetuser-following">
                    <div>
                        <div>Following</div>
                        <div className="hr-line"></div>
                        {targetFollowing &&
                            targetFollowing.map((follow, i) => {
                                return (
                                    <>
                                        <div key={i} id="following-container">
                                            <div id="followed-image-container">
                                                <img
                                                    src={
                                                        follow.followed.picUrl
                                                            ? follow.followed.picUrl
                                                            : 'https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg?w=740'
                                                    }
                                                    alt="followed-user-pic"
                                                />
                                            </div>
                                            <div>{follow.followed.username}</div>
                                        </div>
                                    </>
                                );
                            })}
                    </div>
                    <div>
                        <div>Followers</div>
                        <div className="hr-line"></div>
                        {targetFollowers &&
                            targetFollowers.map((follow, i) => {
                                return (
                                    <>
                                        <div key={i} id="follower-container">
                                            <div id="follower-image-container">
                                                <img
                                                    src={
                                                        follow.follower.picUrl
                                                            ? follow.follower.picUrl
                                                            : 'https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg?w=740'
                                                    }
                                                    alt="follower-user-pic"
                                                />
                                            </div>
                                            <div>{follow.follower.username}</div>
                                        </div>
                                    </>
                                );
                            })}
                    </div>
                </div>
            </div>
        </>
    );
}

export default TargetUserFollowing;
