import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

export const useWorkplace = (workplaceData, spaceId) => {
    const [data, setData] = useState(workplaceData);

    useEffect(() => {
        const socket = io(process.env.NEXT_PUBLIC_API_HOST, {
            path: '/api/socketio',
        });
        socket.on('connect', () => {
            console.log('Socket Connected', socket.id);
        });

        socket.on(spaceId, (data: any) => {
            setData((prevState) => [...prevState, data]);
        });
        return () => {
            socket.disconnect();
        };
    }, []);

    return [data];
};
