import { MouseEvent, useState } from 'react';
import { RootState } from '../../store';
import { TargetUserProps } from '../../interfaces/user';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { postFollow } from '../../store/userFollowing';

function TargetUserHeader(props: TargetUserProps) {
    if (props.targetUser) {
        const { username } = props.targetUser;
        const dispatch = useAppDispatch();
        const [isFollowed, setIsFollowed] = useState<boolean>(false);
        const following = useAppSelector((state: RootState) => state.userFollowing);
        const sessionUser = useAppSelector((state: RootState) => state.session.user);
        const handleFollow = async (e: MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            const response = await dispatch(postFollow(+props?.targetUser?.id!));
            if (response.payload && response.payload.followed_id === props.targetUser?.id && response.payload.follower_id === sessionUser?.id) {
                console.log('hello')
            }

            console.log('post follow response', response);
            console.log('data', data);
        };

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
                </div>
            </>
        );
    }
}

export default TargetUserHeader;
