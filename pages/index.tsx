/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Head from 'next/head';
import React, { useContext, useEffect, useState } from 'react';
import ComponentWrapper from '@/components/layout/ComponentWrapper';
import { getSession } from 'next-auth/client';
import Input from '@/components/elements/Input';
import { socket } from '@socket/client';
import { appContext } from '@context/appcontext';
import { apiPOST } from '@/hooks/middleware/api';
import Button from '@/components/elements/Button';

const Home = () => {
    const [apple, setApple] = useState<string>('');
    const [data, setData] = useState([]);

    const {
        state: {
            user: { userdata },
        },
    } = useContext(appContext);
    const eventCreate = `create-product-${userdata?.id}`;

    useEffect(() => {
        socket.on(eventCreate, (value) => {
            console.log('val', value);
            const neD = data;
            neD.push(value);
            setData(neD);
            setApple('');
        });
        return () => {
            socket.disconnect();
        };
    }, []);

    const handleSubmit = (e) => {
        console.log('subbimtteed');
        e.preventDefault();
        apiPOST<{ data: string; errors: string }, string>(`/file/file-from-location`, apple);
    };

    const handleChange = (e) => {
        setApple(e.target.value);
    };

    return (
        <ComponentWrapper>
            <div className="mt-10">
                <form onSubmit={handleSubmit}>
                    <Input value={apple} type="text" onChange={handleChange} />
                    <Button label="Submit" type="submit" />
                </form>
                <div className="flex flex-col">
                    {data.map((item) => (
                        <div key={item} className="border">
                            {item}
                        </div>
                    ))}
                </div>
            </div>
        </ComponentWrapper>
    );
};

export async function getServerSideProps(context: any) {
    const session = await getSession(context);
    if (!session || !session.user) {
        return {
            redirect: {
                permanent: false,
                destination: '/signin',
            },
        };
    }
    return { props: { callbackUrl: context.query.callbackUrl || '' } };
}
export default Home;
