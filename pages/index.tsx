import React, { useContext } from 'react';
import ComponentWrapper from '@/components/layout/ComponentWrapper';
import { getSession } from 'next-auth/client';
import { appContext } from '@context/appcontext';
import Button from '@/components/elements/Button';
import { action } from '@context/action';
import { useRouter } from 'next/router';

const reasons = [
    {
        heading: 'Manage Order',
        description: 'Manage your offline and online orders with our efficient order management system. Also, you can create purchase orders, backorders and drop shipments, all in a single inventory management application.',
    },
    {
        heading: 'Shipping Integration',
        description: 'Get real-time shipping rates and in-transit details of major shipping carriers and choose a shipping partner for your business, wisely. A much-needed feature for a complete inventory management system.'
    },
    {
        heading: 'Accounting and CRM integrations',
        description: 'Comming Soon!'
    }
]

const Home = () => {
    const {
        dispatch,
    } = useContext(appContext);
    const router = useRouter();


    return (
        <ComponentWrapper>
            <div className='w-full mt-10 p-5 sm:p-10 gap-3'>
                <div className=' rounded p-5 sm:p-10'>
                    <div className='text-2xl md:text-3xl my-2'>Why Creating your own Company dashboard?</div>
                    {reasons.map(({ heading, description }) => (
                        <div className='bg-gray-700 rounded px-3 py-5 my-4' key={`${heading}-reason`}>
                            <div className="text-xl md:text-2xl mb-2 font-semibold">
                                {heading}
                            </div>
                            <div>
                                {description}
                            </div>
                        </div>
                    ))}
                    <Button label={'Create Company Dashboard'}
                        onClick={() => {
                            dispatch(
                                action.toggleAction({
                                    id: 'createworkplace',
                                    open: true,
                                }),
                            );
                        }}
                    />
                </div>
                <div className='rounded p-5 sm:p-10'>
                    <div className='text-2xl md:text-3xl my-2'>Inventory Management makes easier for user who work on multiple workplaces. The only thing you have to do is veryfy the workplace you have been added from and start managing the inventory.</div>
                    <div className='bg-gray-700 rounded px-3 py-5 my-4'>
                        <div className="text-xl md:text-2xl mb-2 font-semibold">
                            Join The Company
                        </div>
                        <div>
                            Be sure to ask Join Code from the Company you will be working on. Also make sure your email.
                        </div>
                    </div>
                    <Button label={'Join Company'} onClick={() => router.push('/verify')} />
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
