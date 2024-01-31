import { User } from './user';
export interface FollowingObject {
    id: number;
    follower_id: number;
    followed_id: number;
    followed: BasicUserInfo;
    follower: BasicUserInfo;
}

export interface BasicUserInfo {
    id: number;
    username: string;
    picUrl: string;
}

export interface Following {
    id?: number;
    followers: FollowingObject[];
    follows: FollowingObject[];
}

export interface FollowingPayload {
    data: Following;
    user: User;
}

// Define the type for the initial state
export interface FollowingState {
    user: User | null;
    followers: FollowingObject[] | null;
    following: FollowingObject[] | null;
    justFollowed: FollowingObject | null;
    justUnfollowed: FollowingObject | number | null;
}
