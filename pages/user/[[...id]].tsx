import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

const mypath = 'helloasjdkljsdkljskdljsd';
const User = () => {
    const [data, setData] = useState([{ name: 'sjksldjksdj', email: 'prakash@gmail.com' }]);
    const [fields, setFields] = useState({
        name: '',
        email: '',
    });

    useEffect(() => {
        const socket = io(process.env.NEXT_PUBLIC_API_HOST, {
            path: '/api/socketio',
        });
        socket.on('connect', () => {
            console.log('Socket Connected', socket.id);
        });

        socket.on(mypath, (message: { name: string; email: string }) => {
            setData((prevState) => [...prevState, message]);
        });
        return () => {
            socket.disconnect();
        };
    }, []);

    const onChange = (e) => {
        const { name, value } = e.target;
        setFields((prevstate) => ({
            ...prevstate,
            [name]: value,
        }));
    };

    const onClickHandle = async () => {
        if (fields.email !== '' && fields.name !== '') {
            const resp = await fetch(`api/workplaces/${mypath}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(fields),
            });
            if (resp.ok) setFields({ name: '', email: '' });
        }
    };
    return (
        <div>
            Hello This is User Page
            <div className="bg-blue-100 p-2">
                <input name="name" onChange={onChange} value={fields.name} className="border-2" />
                <input name="email" onChange={onChange} value={fields.email} className="border-2" />
                <button className="bg-green-500 text-white p-2 rounded" onClick={onClickHandle}>
                    Submit
                </button>
            </div>
            <div>
                {data &&
                    data.map((item, index) => (
                        <div key={index} className="mt-3">
                            <strong className="p-2 border-2">{item.name}</strong>
                            <strong className="p-2 border-2">{item.email}</strong>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default User;
