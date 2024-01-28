export interface Following {
    id: number;
    followed: number[];
    follower: number[];
}

// Define the type for the initial state
export interface FollowingState {
    following: Following | null;
    followed: Following | null;
    unfollowed: string | null;
}
