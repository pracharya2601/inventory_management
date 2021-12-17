/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
// import React from 'react';
// import ComponentWrapper from '@/components/layout/ComponentWrapper';

// const Privacy = () => {
//     return <ComponentWrapper></ComponentWrapper>;
// };
// export default Privacy;

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
// import { Socket } from 'socket.io-client';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import ComponentWrapper from '@/components/layout/ComponentWrapper';
import { apiPOST } from '@/hooks/middleware/api';
import { socket } from 'socket/client';

type TT = {
    workplaceName: string;
    workplaceCode: string;
    logoUrl: string;
};
const Privacy = () => {
    const [data, setData] = useState({
        workplaceName: '',
        workplaceCode: '',
        logoUrl: '',
    });
    const [comp, setComp] = useState([]);

    useEffect(() => {
        // const socket = io(process.env.NEXT_PUBLIC_API_HOST, {
        //     path: '/api/socketio',
        // });
        // props.socket.on('connect', () => {
        //     console.log('Socket Connected', props.socket.id);
        // });

        socket.on('index', (message: TT) => {
            setComp((prevState) => [...prevState, message]);
        });
        return () => {
            socket.disconnect();
        };
    }, []);
    const onChangeHandle = (e) => {
        const { value, name } = e.target;
        setData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    const onSubmit = (e) => {
        e.preventDefault();
        console.log(data);
        apiPOST<string, TT>(`/workplaces`, data);
    };
    return (
        <ComponentWrapper>
            <div className="bg-gray-100 text-gray-900 p-20 mt-20">
                <form onSubmit={onSubmit}>
                    <input placeholder="1" value={data.workplaceName} onChange={onChangeHandle} name="workplaceName" />
                    <input placeholder="1" value={data.workplaceCode} onChange={onChangeHandle} name="workplaceCode" />
                    <input placeholder="1" value={data.logoUrl} onChange={onChangeHandle} name="logoUrl" />
                    <button type="submit">Submit</button>
                </form>
            </div>
            <div>
                {comp.length > 0 &&
                    comp.map(({ workplaceName, workplaceCode, logoUrl }) => (
                        <div key={workplaceName}>
                            {workplaceName}, {workplaceCode}, {logoUrl}
                        </div>
                    ))}
            </div>
        </ComponentWrapper>
    );
};

export default Privacy;
