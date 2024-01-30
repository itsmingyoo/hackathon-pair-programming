import { MouseEvent, useEffect, useState } from 'react';
import { RootState } from '../../store';
import { TargetUserProps } from '../../interfaces/user';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { getFollowing, postFollow } from '../../store/userFollowing';

function TargetUserHeader(props: TargetUserProps) {
    const { username, id } = props.targetUser;
    const dispatch = useAppDispatch();
    const [isFollowed, setIsFollowed] = useState<boolean>(false);
    const followings = useAppSelector((state: RootState) => state.userFollowing?.following?.follows);
    const sessionUser = useAppSelector((state: RootState) => state.session.user);

    let isFollowingTarget;

    const handleFollow = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (isFollowed === false) {
            const response = await dispatch(postFollow(+props?.targetUser?.id!));
            console.log('post follow response', response);
            setIsFollowed(true);
        } else {
            console.log('You are already following this person');
        }
    };

    // Helper Fn for debug
    // const handleGetFollowing = async (e: MouseEvent<HTMLButtonElement>) => {
    //     e.preventDefault();
    //     const response = await dispatch(getFollowing(+sessionUser?.id!));
    //     console.log('get following response', response);
    // };

    useEffect(() => {
        console.log('isFollowed', isFollowed);
        if (!sessionUser?.errors) {
            async function once() {
                await dispatch(getFollowing(+sessionUser?.id!));
            }
            once();
        }
        if (sessionUser !== null) {
            // If undefined, default to false
            isFollowingTarget =
                followings?.some((follow) => +follow.follower_id === +sessionUser.id && +follow.followed_id === +id) ||
                false;
            console.log('isFollowingTarget', isFollowingTarget);
            setIsFollowed(isFollowingTarget);
        } else {
            setIsFollowed(false);
        }
    }, [sessionUser, isFollowed]);

    return (
        <>
            <div id="target-profile-header">
                <span id="targetuser-username">{username}'s </span>
                <span id="target-profile-text"> Profile</span>
                <button id="dm-button" onClick={() => alert('Feature coming soon!')}>
                    Direct Message
                </button>
                <button id="dm-button" disabled={isFollowed} onClick={handleFollow}>
                    Follow
                </button>
                {/* <button id="dm-button" onClick={handleGetFollowing}>
                    Get Following
                </button>
                <button id="dm-button" onClick={() => setIsFollowed(!isFollowed)}>
                    Re-Render Logs
                </button> */}
            </div>
        </>
    );
}

export default TargetUserHeader;
