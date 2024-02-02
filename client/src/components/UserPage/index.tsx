import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { RootState } from '../../store';
import { getFollowing } from '../../store/userFollowing';
import { getUser } from '../../store/user';
import TargetUserSocials from './targetUserSocials';
import { MouseEvent } from 'react';
import { FollowingObject } from '../../interfaces/following';
import { unfollow, postFollow } from '../../store/userFollowing';
import TargetUserInfoBox from './targetUserInfoBox';
import TargetUserAbout from './targetUserAbout';
import './index.css';

function UserPage() {
    const { userId } = useParams();
    const dispatch = useAppDispatch();
    const [isFollowed, setIsFollowed] = useState<boolean>(false);
    const sessionUser = useAppSelector((state: RootState) => state.session.user);
    const targetUser = useAppSelector((state: RootState) => state.user.targetUser);
    const following = useAppSelector((state: RootState) => state.userFollowing);
    console.log("User's page: ", targetUser);
    console.log('Session User', sessionUser);

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
                    (obj) => +obj.followed_id === +targetUser.id && +obj.follower_id === +sessionUser.id
                ) ?? false;

            setIsFollowed(isFollowingTarget);
        }
    }, [following, sessionUser, targetUser, isFollowed]);

    const handleFollow = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (sessionUser?.errors) {
            alert('You must be logged in to follow this user.');
            return;
        }

        try {
            if (!isFollowed) {
                await dispatch(postFollow(+userId!)).unwrap();
                setIsFollowed(true);
            } else {
                const followingTarget = following?.following?.find(
                    (follow: FollowingObject) =>
                        +follow.follower_id === +sessionUser?.id! && +follow.followed_id === +userId!
                );

                if (followingTarget) {
                    await dispatch(unfollow(followingTarget.id)).unwrap();
                    setIsFollowed(false);
                } else {
                    console.log('No matching following target found');
                }
            }
        } catch (error) {
            console.error('Error in handleFollow:', error);
        }

        updateFollowState();
    };

    const updateFollowState = async () => {
        if (sessionUser) {
            await dispatch(getFollowing(sessionUser));
            await dispatch(getUser(+userId!));
        }
    };

    const isCurrentUserProfile = userId && sessionUser && +sessionUser.id === +userId;

    return (
        <>
            {isCurrentUserProfile ? (
                <div id="user-profile-main">
                    <div id="user-profile-header">
                        <span>Dashboard</span>
                    </div>

                    <div className="hr-line"></div>

                    <div id="user-profile-container">
                        <div id="user-profile-sidebar">
                            <button id="db-button">Start a Session</button>
                            <button id="db-button">Profile</button>
                            <button id="db-button">Follows</button>
                            <button id="db-button">Followers</button>
                        </div>
                        <div id="user-profile-content-container">Render Content Here</div>
                    </div>
                </div>
            ) : (
                <div id="target-profile-main">
                    <div id="target-profile-container">
                        <div id="target-profile-header">
                            <span id="targetuser-username">{targetUser?.username}'s </span>
                            <span id="target-profile-text">Profile</span>
                            <button id="dm-button" onClick={() => alert('Feature coming soon!')}>
                                Direct Message
                            </button>
                            <button id="dm-button" onClick={(e) => handleFollow(e)}>
                                {isFollowed ? 'Unfollow' : 'Follow'}
                            </button>
                        </div>

                        <div className="hr-line"></div>

                        <div id="targetuser-profile-split">
                            <div id="user-profile-content">
                                {targetUser && (
                                    <TargetUserInfoBox
                                        {...{ targetUser, sessionUser, following, isFollowed, setIsFollowed }}
                                    />
                                )}
                                {targetUser && (
                                    <TargetUserAbout
                                        {...{ targetUser, sessionUser, following, isFollowed, setIsFollowed }}
                                    />
                                )}
                                {targetUser && (
                                    <TargetUserSocials
                                        {...{ targetUser, sessionUser, following, isFollowed, setIsFollowed }}
                                    />
                                )}
                            </div>

                            <div id="targetuser-friends-container">
                                <h1>Friends</h1>

                                <div id="targetuser-following">
                                    <div>
                                        <div>Following</div>
                                        <div className="hr-line"></div>
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
                                                                                : 'https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg?w=740'
                                                                        }
                                                                        alt="followed-user-pic"
                                                                    />
                                                                </div>
                                                                <div>{follow.followed.username}</div>
                                                            </div>
                                                        </a>
                                                    </>
                                                );
                                            })}
                                    </div>
                                    <div>
                                        <div>Followers</div>
                                        <div className="hr-line"></div>
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
                                                                                : 'https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg?w=740'
                                                                        }
                                                                        alt="follower-user-pic"
                                                                    />
                                                                </div>
                                                                <div>{follower.follower.username}</div>
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
            )}
        </>
    );
}

export default UserPage;
