import { io, Socket } from 'socket.io-client';

let initializeSocket: Socket;
export const clientConnect = () => {
    if (!initializeSocket) {
        initializeSocket = io(process.env.NEXT_PUBLIC_API_HOST, {
            path: '/api/socketio',
        });
        return initializeSocket;
    } else {
        return initializeSocket;
    }
};

export const socket = clientConnect();
