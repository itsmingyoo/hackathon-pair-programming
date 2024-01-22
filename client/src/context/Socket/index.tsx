import React, { createContext, useEffect, useState, ReactNode } from "react";
import { io, Socket } from "socket.io-client";

// Define the context type
interface SocketContextProps {
  socket: Socket<ServerToClientEvents, ClientToServerEvents> | null;
}

// Create the context
export const SocketContext = createContext<SocketContextProps | undefined>(undefined);

// Define socket provider props type 
interface SocketProviderProps {
    children: ReactNode;
}

// Type for information received from the server
interface ServerToClientEvents {
    joined: (data: { user: {id: number, username: string, email: string}; room: string}) => void;
    user_left: (data: string) => void;

}

// Type for information sent to the server
interface ClientToServerEvents {
    join_room: () => void;
    leave_room: (data: {room: string}) => void;
}

// Create the provider component
export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    // Initialize socket connection
  
    const newSocket: Socket<ServerToClientEvents, ClientToServerEvents> = io();

    // Set up any event listeners or other configurations here

    setSocket(newSocket);

    // Clean up the socket connection on unmount
    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
