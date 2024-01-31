import { MouseEvent, useEffect, useState } from 'react';
import { RootState } from '../../store';
import { TargetUserProps } from '../../interfaces/user';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { getFollowing, postFollow, unfollow } from '../../store/userFollowing';

function TargetUserHeader(props: TargetUserProps) {
    const { username, id } = props.targetUser;
    let isFollowingTarget: boolean = false;
    let followingTargetId;
    const dispatch = useAppDispatch();
    const [isFollowed, setIsFollowed] = useState<boolean>(isFollowingTarget);
    // const [followTableId, setFollowTableId] = useState<number>(0);
    const followings = useAppSelector((state: RootState) => state.userFollowing?.following?.follows);
    const sessionUser = useAppSelector((state: RootState) => state.session.user);

    const handleFollow = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (sessionUser) {
            if (isFollowed === false && isFollowingTarget === false) {
                const response = await dispatch(postFollow(+props?.targetUser?.id!));
                console.log('post follow response', response);
                setIsFollowed(true);
            } else {
                console.log('Followings', followings);
                followingTargetId = followings?.filter(
                    (follow) => +follow.follower_id === +sessionUser.id && +follow.followed_id === +id
                );
                if (followingTargetId && followingTargetId.length > 0) {
                    console.log('followingTargetId', followingTargetId[0].id);
                    // setFollowTableId(+followingTargetId[0].id);
                    const response = await dispatch(unfollow(+followingTargetId[0].id));
                    console.log('unfollow response', response);
                    setIsFollowed(false);
                } else {
                    console.log('No matching following target found');
                }
            }
        } else {
            alert('You must be logged in to follow this user.');
        }
    };

    // Helper Fn for debug
    const handleGetFollowing = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        await dispatch(getFollowing(+sessionUser?.id!));
        // console.log('get following response', response);
    };

    useEffect(() => {
        // console.log('isFollowed UE', isFollowed);

        // Async function to dispatch getFollowing
        async function fetchFollowing() {
            if (sessionUser && !sessionUser.errors) {
                await dispatch(getFollowing(+sessionUser.id));
                const isFollowing =
                    followings?.some(
                        (follow) => follow.follower_id === +sessionUser.id && +follow.followed_id === +id
                    ) || false;
                // console.log('isFollowingTarget', isFollowing);
                setIsFollowed(isFollowing);
                // console.log('Done dispatching getFollowing in UE');
            }
        }

        fetchFollowing().catch(console.error);

        // Fallback in case sessionUser is null
        if (!sessionUser || sessionUser.errors) {
            setIsFollowed(false);
        }
    }, [sessionUser, isFollowed, dispatch]);

    return (
        <>
            <div id="target-profile-header">
                <span id="targetuser-username">{username}'s </span>
                <span id="target-profile-text"> Profile</span>
                <button id="dm-button" onClick={() => alert('Feature coming soon!')}>
                    Direct Message
                </button>
                <button id="dm-button" onClick={handleFollow}>
                    {isFollowed ? 'Unfollow' : 'Follow'}
                </button>
                <button id="dm-button" onClick={handleGetFollowing}>
                    Get Following
                </button>
                <button id="dm-button" onClick={() => setIsFollowed(!isFollowed)}>
                    Re-Render Logs
                </button>
            </div>
        </>
    );
}

export default TargetUserHeader;
