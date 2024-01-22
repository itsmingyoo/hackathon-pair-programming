interface UserDict {
  id: string;
  username: string;
  email: string;
}

export interface TempChatMessage {
  from: UserDict;
  message: string;
  created_at: string;
}

// Type for information received from the server
export interface ServerToClientEvents {
  joined: (data: { user: UserDict; room: string }) => void;
  user_left: (data: string) => void;
  temp_message_received: (data: TempChatMessage) => void;
}

// Type for information sent to the server
export interface ClientToServerEvents {
  join_room: () => void;
  leave_room: (data: { room: string }) => void;
}
