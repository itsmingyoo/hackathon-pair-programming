import { io, Socket } from 'socket.io-client';

interface ServerToClientEvents {
    noArg: () => void;
    basicEmit: (a: number, b: string, c: Buffer) => void;
    withAck: (d: string, callback: (e: number) => void) => void;
    response_back: (image: string) => void;
}

interface ClientToServerEvents {
    image: (data: string) => void;
}

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io();

export default socket;