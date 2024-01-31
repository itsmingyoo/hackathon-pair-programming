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
// import { User } from '../../interfaces/user';
// import TargetUserHeader from './targetUserHeader';
import './index.css';

function UserPage() {
    const { userId } = useParams();
    const dispatch = useAppDispatch();
    const [isFollowed, setIsFollowed] = useState<boolean>(false);
    const sessionUser = useAppSelector((state: RootState) => state.session.user);
    const targetUser = useAppSelector((state: RootState) => state.user.targetUser);
    const following = useAppSelector((state: RootState) => state.userFollowing);

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
    }, [following, sessionUser, targetUser]);

    // useEffect(() => {
    //     if (sessionUser && userId) {
    //         const isFollowingTarget =
    //             following?.following?.some(
    //                 (obj) => +obj.followed_id === +userId && +obj.follower_id === +sessionUser?.id
    //             ) ?? false;

    //         const isTargetsFollower =
    //             following?.followers?.some(
    //                 (obj) => +obj.followed_id === +sessionUser?.id && +obj.follower_id === +userId
    //             ) ?? false;

    //         const isActuallyFollowing = isFollowingTarget || isTargetsFollower;

    //         console.log('isactuallyfollowing', isFollowingTarget, isTargetsFollower, isActuallyFollowing);
    //         setIsFollowed(isActuallyFollowing);
    //     }
    // }, [following, sessionUser, userId, dispatch]);

    const handleFollow = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!sessionUser) {
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
                        +follow.follower_id === +sessionUser.id && +follow.followed_id === +userId!
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
        }
    };

    const isCurrentUserProfile = userId && sessionUser && +sessionUser.id === +userId;

    return (
        <>
            {isCurrentUserProfile ? (
                <div id="user-page-wrapper">
                    {/* Your Current User Profile JSX here */}
                    <div className="user-page">
                        <div className="user-page-content">{/* Your user page content */}</div>
                    </div>
                </div>
            ) : (
                <div id="target-profile-main">
                    <div id="target-profile-container">
                        {/* {targetUser && (
                            <TargetUserHeader {...{ targetUser, sessionUser, following, isFollowed, setIsFollowed }} />
                        )} */}
                        <div id="target-profile-header">
                            <span id="targetuser-username">{targetUser?.username}'s </span>
                            <span id="target-profile-text">Profile</span>
                            <button id="dm-button" onClick={() => alert('Feature coming soon!')}>
                                Direct Message
                            </button>
                            <button id="dm-button" onClick={handleFollow}>
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
                            <div id="targetuser-friends-container">{/* Additional content if needed */}</div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default UserPage;
