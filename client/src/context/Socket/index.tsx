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

    // const handleBeforeUnload = () => {
    //     if (user && socket && socket.connected) {
    //         socket.emit('user_leaving', { userId: user.id });
    //         socket.disconnect();
    //         setSocket(null);
    //     }
    // };

    useEffect(() => {
        if (user && user.id && !socket) {
            const newSocket: Socket<ServerToClientEvents, ClientToServerEvents> = io({
                transports: ['websocket', 'polling'],
                reconnection: true,
                reconnectionAttempts: 5,
                reconnectionDelay: 2000,
                reconnectionDelayMax: 5000,
                autoConnect: true,
            });
            setSocket(newSocket);
        }

        // window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            // window.removeEventListener('beforeunload', handleBeforeUnload);
            if (socket) {
                // console.log('Disconnecting new socket...');
                socket.disconnect();
                setSocket(null);
            }
        };
    }, [user, socket]);

    useEffect(() => {
        // Disconnect the socket if the user logs out or their session ends
        if (!user && socket && socket.connected) {
            // console.log('User logged out, disconnecting socket...');
            socket.disconnect();
            setSocket(null);
        }
    }, [user, socket]);

    return <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>;
};
