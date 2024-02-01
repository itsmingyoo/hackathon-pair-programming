import { FollowingObject, FollowingState } from './following';

export interface User {
    id: string;
    username: string;
    email: string;
    videoUid: string;
    screenUid: string;

    // Add other user fields here
    picUrl: string;
    about: string;
    link1: string;
    link2: string;
    link3: string;

    following: FollowingObject[];
    followers: FollowingObject[];

    errors: string;
}

export interface TargetUserProps {
    targetUser: User;
    sessionUser: User | null;
    following: FollowingState;
    isFollowed: boolean;
    setIsFollowed?: React.Dispatch<React.SetStateAction<boolean>>;
    userId?: string;
}
