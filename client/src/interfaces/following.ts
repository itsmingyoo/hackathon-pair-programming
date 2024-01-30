export interface FollowingObject {
    id: number;
    follower_id: number;
    followed_id: number;
}

export interface Following {
    id: number;
    followers: FollowingObject[];
    follows: FollowingObject[];
}

// Define the type for the initial state
export interface FollowingState {
    following: Following | null;
    followed: FollowingObject | null;
    unfollowed: string | null;
}
