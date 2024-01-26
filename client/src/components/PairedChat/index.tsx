import React, { FormEvent, useCallback, useEffect, useState } from 'react';
import { useSocket, useAppDispatch, useAppSelector } from '../../hooks';
import { clearChatMessages, receiveChatMessage } from '../../store/pairedChatLog';
import { PairedChatMessage } from '../../interfaces/socket';
import './index.css';

// Define the props interface for the PairedChat component
interface PairedChatProps {
    channelName: string;
}

const PairedChat: React.FC<PairedChatProps> = ({ channelName }) => {
    const { socket } = useSocket();
    const messages = useAppSelector((state) => state.pairedChatLog.messages);
    const [chatInput, setChatInput] = useState<string>('');
    const dispatch = useAppDispatch();

    // Memoized callback for handling received chat messages
    const handleTempMessageReceived = useCallback(
        (data: PairedChatMessage) => {
            // Format the date for user's local time
            const transformedMessage: PairedChatMessage = {
                ...data,
                created_at: new Date(data.created_at + ' UTC').toLocaleString(),
            };
            // Dispatch the transformed message to the Redux store
            dispatch(receiveChatMessage(transformedMessage));
        },
        [dispatch]
    );

    // Memoized callback for sending chat messages
    const sendChat = useCallback(
        (e: FormEvent) => {
            e.preventDefault();

            socket?.emit('temp_chat_message', { message: chatInput, room: channelName });
            setChatInput('');
        },
        [socket, chatInput, channelName]
    );

    useEffect(() => {
        if (socket && !socket.hasListeners('temp_message_received')) {
            socket.on('temp_message_received', handleTempMessageReceived);

            // Clean up: Detach the event listener and dispatch action to clear states messages when unmounting
            return () => {
                socket.off('temp_message_received', handleTempMessageReceived);
                dispatch(clearChatMessages());
            };
        }
    }, [dispatch, handleTempMessageReceived, socket]);

    return (
        <>
            <h1>CHAT LOGS</h1>
            <div id='messages-container'>
                {messages &&
                    messages.map((message, index) => {
                        return (
                            <div key={index}>
                                {message.from.username} sent at {message.created_at} : {message.message}
                            </div>
                        );
                    })}
            </div>

            <form className="channel-message-input-form" onSubmit={sendChat}>
                <textarea
                    className="message-input"
                    placeholder={`send message`}
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                ></textarea>
                <button type="submit">send chat</button>
            </form>
        </>
    );
};

export default PairedChat;
