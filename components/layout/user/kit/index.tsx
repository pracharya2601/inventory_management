import Avatar from '@/components/elements/Avatar';
import Button from '@/components/elements/Button';
import { appContext } from '@context/appcontext';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { signOut } from 'next-auth/client';
import { action } from '@context/action';
import Input from '@/components/elements/Input';
import { UserData } from '@/interface/AuthSession';
import { apiPOST } from '@/hooks/middleware/api';
import { signIn } from 'next-auth/client';
import { useUpdateUser } from '@/hooks/useUpdateUser';
import Alert from '@/components/elements/Alert';

type Ut = Omit<UserData, 'workplaces' | 'id'>;

export const UserHeading = () => {
    const { handleSubmit, uploadPhoto, onChangeHandle, handleEdit, removeEdit, state, userdata, type, alertUser } =
        useUpdateUser();
    const router = useRouter();
    const onUpload = () => {
        const fileImp = document.getElementById('avatarInput');
        fileImp.click();
    };

    return (
        <>
            {alertUser.text && (
                <Alert
                    title={alertUser.type === 'success' ? 'Congratulation! ' : 'Ops! Sorry!'}
                    text={alertUser.text}
                    type={alertUser.type as 'success' | 'danger'}
                />
            )}
            <div className="flex flex-col items-center mb-5 mt-2 relative">
                {state === null ? (
                    <Button
                        onClick={() => handleEdit()}
                        icon={
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                                <path
                                    fillRule="evenodd"
                                    d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        }
                        size="md"
                        customClass="absolute -top-5 right-0 md:-right-5"
                    />
                ) : type === 'edit' ? (
                    <Button
                        color="red"
                        onClick={() => removeEdit()}
                        icon={
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        }
                        size="md"
                        customClass="absolute -top-5 right-0 md:-right-5"
                    />
                ) : (
                    <></>
                )}
                <input type="file" hidden={true} id="avatarInput" onChange={uploadPhoto} />
                <Avatar
                    img={userdata?.image || '/user.png'}
                    size="monster"
                    isEdit={state === null ? false : true}
                    type="rounded"
                    onUpload={() => onUpload()}
                />
                {type === 'new' || type == 'edit' ? (
                    <div className="mt-5">
                        <Input
                            id="fullName"
                            placeholder="Full Name"
                            name="name"
                            onChange={onChangeHandle}
                            icon={
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    />
                                </svg>
                            }
                        />
                    </div>
                ) : (
                    <div className="text-3xl mt-5">{userdata?.name}</div>
                )}
                <div className="text-xl mt-2 mb-2">{userdata?.email}</div>
                {type === 'new' || type === 'edit' ? (
                    <div className="w-64 sm:w-96 my-5">
                        <div className="mt-2">
                            <Input
                                id="address.address"
                                placeholder="Street Address"
                                onChange={onChangeHandle}
                                name="address.address"
                                icon={
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                }
                            />
                        </div>
                        <div className="mt-2 flex flex-col sm:flex-row gap-2">
                            <div className="sm:w-40">
                                <Input
                                    id="address.ward"
                                    name="address.ward"
                                    icon={
                                        <>
                                            Ward <span className="md:hidden"> No.</span>
                                        </>
                                    }
                                    placeholder="Ward No."
                                    onChange={onChangeHandle}
                                />
                            </div>
                            <div className="grow">
                                <Input
                                    id="address.city"
                                    name="address.city"
                                    helper="City"
                                    placeholder="City Name"
                                    onChange={onChangeHandle}
                                />
                            </div>
                        </div>
                        <div className="mt-2">
                            <Input
                                id="address.district"
                                name="address.district"
                                helper="District"
                                placeholder="District Name"
                                onChange={onChangeHandle}
                            />
                        </div>
                        <div className="mt-2 flex flex-col sm:flex-row gap-2">
                            <div className="grow">
                                <Input
                                    id="address.state"
                                    name="address.state"
                                    helper="State"
                                    placeholder="State Name"
                                    onChange={onChangeHandle}
                                />
                            </div>
                            <div className="sm:w-40">
                                <Input
                                    id="address.zip"
                                    name="address.zip"
                                    helper="Zip"
                                    placeholder="Zip Code"
                                    onChange={onChangeHandle}
                                />
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="my-5 text-center text-gray-400">
                        <div className="text-purple-500 text-sm">Address </div>
                        <div>
                            {userdata?.address?.address} {userdata?.address?.ward}
                        </div>
                        <div>
                            {userdata?.address?.city}, {userdata?.address?.state} {userdata?.address?.zip}
                        </div>
                    </div>
                )}
                {(type === 'new' || type === 'edit') && (
                    <Button
                        label="Update"
                        size="sm"
                        color="green"
                        onClick={() => handleSubmit()}
                        customClass="mb-4 w-64"
                    />
                )}
                <Button label="Logout" size="sm" color="red" onClick={() => signOut()} />
            </div>
        </>
    );
};
