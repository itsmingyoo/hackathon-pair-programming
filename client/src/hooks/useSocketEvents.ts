// Future Implementation for Modularity
import { useEffect } from 'react';
import { useSocket } from './socket';
import { useAppDispatch, useAppSelector } from '.';
import { receiveUser } from '../store/pairedUser';
import { JoinedEventData } from '../interfaces/socket';

export const useSocketEvents = (
    joined: boolean,
    channelName: string,
    setJoined: React.Dispatch<React.SetStateAction<boolean>>,
    setChannelName: React.Dispatch<React.SetStateAction<string>>
) => {
    const { socket } = useSocket();
    const user = useAppSelector((state) => state.session.user);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!socket) return;

        const handleJoined = (data: JoinedEventData) => {
            if (!channelName) {
                setChannelName(data.room);
            }
            if (user && data.users.length > 1) {
                const pair = data.users.find((duser) => duser.id !== user.id);
                if (pair) {
                    dispatch(receiveUser(pair));
                }
            }
        };

        socket.on('joined', handleJoined);
        socket.on('user_left', (data: any) => console.log(data));

        return () => {
            if (socket && joined) {
                socket.removeAllListeners('joined');
                socket.removeAllListeners('user_left');
                socket.emit('leave_room', { room: channelName });
            }
        };
    }, [user, socket, channelName, dispatch, joined, setChannelName, setJoined]);

    return { socket };
};
