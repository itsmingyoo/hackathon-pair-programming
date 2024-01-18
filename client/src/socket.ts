import { io, Socket } from "socket.io-client";

interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
}

interface ClientToServerEvents {
  hello: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io();

export default socket;
