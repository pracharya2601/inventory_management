import Avatar from '@/components/elements/Avatar';
import Button from '@/components/elements/Button';
import { action } from '@context/action';
import { appContext } from '@context/appcontext';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { signOut } from 'next-auth/client';
import { UserHeading } from './kit';

const AccountInfo = () => {
    const router = useRouter();
    const {
        state: {
            user: { userdata },
        },
        dispatch,
    } = useContext(appContext);
    if (!userdata) {
        return null;
    }
    return (
        <>
            <div className="mx-auto w-full max-w-lg mt-5">
                <UserHeading />
            </div>
            <div className="flex-1 max-w-2xl mx-auto mt-3 shadow-lg p-3 bg-gray-900 rounded mb-5">
                <div className="text-2xl">Workplaces:</div>
                {userdata.workplaces?.length > 0 ? (
                    <>
                        {userdata.workplaces?.map(
                            ({ workplaceId, workplaceName, positionLabel, joinedDate }, index) => (
                                <div
                                    key={`${workplaceId}-${index}-${joinedDate}`}
                                    className="border p-2 mt-2 rounded hover:bg-gray-800"
                                    onClick={() => {
                                        dispatch(
                                            action.toggleAction({
                                                id: 'account',
                                                open: false,
                                            }),
                                        );
                                        router.push(`/${workplaceId}`);
                                    }}
                                >
                                    <div className="text-xl">{workplaceName}</div>
                                    <div>Position: {positionLabel}</div>
                                    <div>JoinedDate: {joinedDate}</div>
                                </div>
                            ),
                        )}
                        <p className="mt-5 -mb-2">Want to create or join new workplace?</p>
                    </>
                ) : (
                    <div className="mt-2">
                        <p>You are not associate with any workplaces</p>
                    </div>
                )}
                <div className="flex flex-wrap justify-left gap-3 mt-2 py-2">
                    <Button
                        label="Create Workplace"
                        size="sm"
                        color="green"
                        onClick={() => {
                            dispatch(
                                action.toggleAction({
                                    id: 'account',
                                    open: false,
                                }),
                            );
                            dispatch(
                                action.toggleAction({
                                    id: 'createworkplace',
                                    open: true,
                                }),
                            );
                        }}
                    />
                    <Button
                        label="Join Workplace"
                        size="sm"
                        color="green"
                        onClick={() => {
                            dispatch(
                                action.toggleAction({
                                    id: 'account',
                                    open: false,
                                }),
                            );
                            router.push('/verify');
                        }}
                    />
                </div>
            </div>
        </>
    );
};

export default AccountInfo;
