// import { MouseEvent, useEffect } from 'react';
// // import { RootState } from '../../store';
// // import { useSelector } from 'react-redux';
// import { TargetUserProps } from '../../interfaces/user';
// import { useAppDispatch } from '../../hooks';
// import { getFollowing, postFollow, unfollow } from '../../store/userFollowing';
// import { FollowingObject } from '../../interfaces/following';

// function TargetUserHeader(props: TargetUserProps) {
//     const { username, id } = props.targetUser;
//     const { sessionUser, following, setIsFollowed, isFollowed } = props;
//     const dispatch = useAppDispatch();
// const [isFollowed, setIsFollowed] = useState<boolean>(false);
// const followings = useSelector((state: RootState) => state.userFollowing);
// const sessionUser = useAppSelector((state: RootState) => state.session.user);

// useEffect(() => {
//     if (sessionUser) {
//         dispatch(getFollowing(sessionUser));
//     }
// }, [sessionUser, dispatch]);

// useEffect(() => {
//     if (sessionUser) {
//         const isFollowingTarget =
//             following?.following?.some(
//                 (obj) => +obj.followed_id === +id && +obj.follower_id === +sessionUser?.id
//             ) ?? false; // The '?? false' ensures that if 'some' is undefined, it defaults to false

//         const isTargetsFollower =
//             following?.followers?.some(
//                 (obj) => +obj.followed_id === +sessionUser?.id && +obj.follower_id === +id
//             ) ?? false; // The '?? false' ensures that if 'some' is undefined, it defaults to false

//         const isActuallyFollowing = isFollowingTarget || isTargetsFollower;

//         // console.log('isactuallyfollowing', isFollowingTarget, isTargetsFollower, isActuallyFollowing);
//         setIsFollowed(isActuallyFollowing);
//     }
// }, [following, sessionUser, id, dispatch]);

// const updateFollowState = async () => {
//     if (sessionUser) {
//         await dispatch(getFollowing(sessionUser));
//     }
// };

// const handleFollow = async (e: MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();
//     if (!sessionUser) {
//         alert('You must be logged in to follow this user.');
//         return;
//     }

//     try {
//         if (!isFollowed) {
//             await dispatch(postFollow(+id)).unwrap();
//             setIsFollowed(true);
//         } else {
//             const followingTarget = following?.following?.find(
//                 (follow: FollowingObject) => +follow.follower_id === +sessionUser.id && +follow.followed_id === +id
//             );

//             if (followingTarget) {
//                 await dispatch(unfollow(followingTarget.id)).unwrap();
//                 setIsFollowed(false);
//             } else {
//                 console.log('No matching following target found');
//             }
//         }
//     } catch (error) {
//         console.error('Error in handleFollow:', error);
//     }

//     updateFollowState();
// };

//     return (
//         <>
//             <div id="target-profile-header">
//                 <span id="targetuser-username">{username}'s </span>
//                 <span id="target-profile-text">Profile</span>
//                 <button id="dm-button" onClick={() => alert('Feature coming soon!')}>
//                     Direct Message
//                 </button>
//                 <button id="dm-button" onClick={handleFollow}>
//                     {isFollowed ? 'Unfollow' : 'Follow'}
//                 </button>
//             </div>
//         </>
//     );
// }

// export default TargetUserHeader;
