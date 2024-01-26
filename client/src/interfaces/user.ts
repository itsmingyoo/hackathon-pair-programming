export interface User {
    id: string;
    username: string;
    email: string;
    videoUid: string;
    screenUid: string;
    // Add other user fields here
    errors: string[];
}
