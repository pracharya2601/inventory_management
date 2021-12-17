import ComponentWrapper from '@/components/layout/ComponentWrapper';
import { getSession } from 'next-auth/client';
import { useContext, useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';
import Button from '@/components/elements/Button';
import { useRouter } from 'next/router';
import Input from '@/components/elements/Input';
import { apiPOST } from '@/hooks/middleware/api';
import { WorkplaceTypes } from '@/interface/Workplace/WorkplaceListTypes';
import { appContext } from '@context/appcontext';
import { action } from '@context/action';

interface VerifyProps {
    verifyInfo: {
        code: string;
        name: string;
        position: 'admin' | 'staff';
    };
    status: 'Success' | 'Error' | '';
    workplaceId: string;
}
const VerifyCompany = ({ verifyInfo, status, workplaceId }: VerifyProps) => {
    const [stat, setStat] = useState<string>('loading');
    const [loadingInfo, setLoadingInfo] = useState('Loading...');
    const [timer, setTimer] = useState(null);
    const [keyCode, setKeyCode] = useState('');
    const router = useRouter();

    const {
        dispatch,
        state: {
            user: { userdata },
        },
    } = useContext(appContext);

    useEffect(() => {
        if (!router.query?.keyCode) {
            setTimer(setTimeout(() => setLoadingInfo('Getting Info...'), 100));
            setTimer(setTimeout(() => setStat('askcode'), 2000));
        } else {
            setLoadingInfo('Verifying Info...');
            setStat('loading');
            if (status === 'Success') {
                (async function myfunc() {
                    const resData = await apiPOST<{ data?: WorkplaceTypes; errors?: string }, string>(
                        `/workplaces/${workplaceId}?positionLabel=${verifyInfo?.position}`,
                        verifyInfo.name,
                    );
                    if (resData.data) {
                        dispatch(
                            action.getUser({
                                userdata: {
                                    ...userdata,
                                    workplaces: [resData.data],
                                },
                            }),
                        );
                        setLoadingInfo('Success');
                        setTimer(setTimeout(() => router.push('/'), 1000));
                    } else {
                        setLoadingInfo('Error');
                    }
                })();
            } else {
                setLoadingInfo(status);
            }
        }
        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        };
    }, [router.asPath]);
    const handleSubmit = (e) => {
        e.preventDefault();
        router.push(`/verify/${verifyInfo.code}?keyCode=${keyCode}`);
    };
    console.log(userdata);

    return (
        <ComponentWrapper>
            <div className="h-full flex px-5 justify-center items-center">
                {stat === 'loading' ? (
                    <div
                        className={`bg-gray-800 px-3 py-10 h-96 flex-1 flex flex-col justify-center items-center sm:flex-none sm:w-96 rounded ${
                            loadingInfo == 'Error' && 'text-red-500'
                        } ${loadingInfo === 'Success' && 'text-green-500'} `}
                    >
                        <div className="text-3xl mb-3">
                            {loadingInfo == 'Error' && <span>&#x26A0;</span>}
                            {loadingInfo == 'Success' && <span>&#10004;</span>}
                            {loadingInfo}
                        </div>
                        {loadingInfo == 'Success' && (
                            <Button label="Go back to home" size="sm" onClick={() => router.push('/')} />
                        )}
                        {loadingInfo == 'Error' && (
                            <Button label="Enter Code" size="sm" onClick={() => setStat('askcode')} />
                        )}
                    </div>
                ) : (
                    <div className="bg-gray-800 px-3 py-10 h-96 flex-1 sm:flex-none sm:w-2/4 rounded ">
                        <div className="text-3xl p-1 mb-3">{verifyInfo?.name}</div>
                        <div className="p-1">
                            <form onSubmit={handleSubmit}>
                                <p className="text-yellow-500 text-xs mb-1">
                                    &#9432; Please Enter the code that employer provide you.
                                </p>
                                <Input
                                    placeholder="Hello"
                                    square
                                    helper="Code"
                                    onChange={(e) => setKeyCode(e.target.value)}
                                />
                                <p className="text-red-500 text-xs mt-2">&#9432; Code is Case Sensative</p>
                                <Button
                                    type="submit"
                                    label="Verify"
                                    size="sm"
                                    color="green"
                                    customClass="mt-4 float-right"
                                />
                                <p className="text-green-500 text-xs mt-36">
                                    Buckle up!! Your are about to join the workforce.
                                </p>
                            </form>
                        </div>
                    </div>
                )}
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
                destination: `/signin?callbackUrl=${context.resolvedUrl}`,
            },
        };
    }
    const secret = process.env.COMPANY_JWT_SECRET;
    const code = context.query?.code as string;
    const decode = jwt.verify(code, secret);
    const data = {
        name: decode.name,
        code: code,
        position: decode.yourinfo?.positionLabel,
    };
    let status = '';
    let workplaceId = '';
    if (context.query?.keyCode) {
        status = context.query?.keyCode === decode.workplaceCode ? 'Success' : 'Error';
        workplaceId = decode._id;
    }
    return {
        props: {
            verifyInfo: data,
            status: status,
            workplaceId: workplaceId,
        },
    };
}

export default VerifyCompany;
