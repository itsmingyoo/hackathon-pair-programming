export interface UserDict {
    picUrl: string | undefined;
    id: string;
    username: string;
    email: string;
    videoUid: string;
    screenUid: string;
}

export interface JoinedEventData {
    users: UserDict[];
    room: string;
}

export interface PairedChatMessage {
    from: UserDict;
    message: string;
    created_at: string;
}

// Type for information received from the server
export interface ServerToClientEvents {
    joined: (data: JoinedEventData) => void;
    user_left: (data: string) => void;
    temp_message_received: (data: PairedChatMessage) => void;
}

// Type for information sent to the server
export interface ClientToServerEvents {
    join_room: () => void;
    leave_room: (data: { room: string }) => void;
    temp_chat_message: (data: { message: string; room: string }) => void;
    user_leaving: (data: { userId: string }) => void;
}
