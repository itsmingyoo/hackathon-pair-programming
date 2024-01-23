import React, { createContext, useEffect, useState, ReactNode } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAppSelector } from '../../hooks';
import { ServerToClientEvents, ClientToServerEvents } from '../../interfaces/socket';

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

// Create the provider component
export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
    const user = useAppSelector((state) => state.session.user);

    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        if (user && user.id && !socket) {
            const newSocket: Socket<ServerToClientEvents, ClientToServerEvents> = io();

            setSocket(newSocket);

            // Handle browser tab close or refresh
            // const handleBeforeUnload = () => {
            //     if (newSocket && newSocket.connected) {
            //         // newSocket.emit('user_leaving', { userId: user.id });
            //         newSocket.disconnect();
            //         setSocket(null);
            //     }
            // };

            // window.addEventListener('beforeunload', handleBeforeUnload);

            // Clean up on component unmount or user change
            return () => {
                // window.removeEventListener('beforeunload', handleBeforeUnload);

                if (newSocket.connected) {
                    console.log('Disconnecting new socket...');
                    newSocket.disconnect();
                }
                setSocket(null);
            };
        }
    }, [user]);

    // useEffect(() => {
    //     // Disconnect the socket if the user logs out or their session ends
    //     if (!user && socket && socket.connected) {
    //         console.log('User logged out, disconnecting socket...');
    //         socket.disconnect();
    //         setSocket(null);
    //     }
    // }, [user, socket]);

    return <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>;
};
