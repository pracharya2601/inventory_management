import Button from '@/components/elements/Button';
import DropDownMenu, { DropDownItem } from '@/components/elements/ddm/DropDownMenu';
import Input from '@/components/elements/Input';
import { apiPOST } from '@/hooks/middleware/api';
import { useCreateWorkplaces } from '@/hooks/useCreateWorkplace';
import { CreateCompanyType } from '@/interface/Workplace/Company';
import { WorkplaceTypes } from '@/interface/Workplace/WorkplaceListTypes';
import { action } from '@context/action';
import { appContext } from '@context/appcontext';
import Image from 'next/dist/client/image';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import { DropDownInputColor } from './Variant/kit';

//workplaceData.staffs.${index}.email
const CreateWorkplace = () => {
    const {
        dispatch,
        state: {
            user: { userdata },
        },
    } = useContext(appContext);
    const router = useRouter();
    const { data, handleOnChange, addItem, deleteItem, onHandleDropdown } = useCreateWorkplaces();
    // const len = data?.workplaceData?.staffs?.length;
    // const lastObj = len - 1;
    // const disable = data?.workplaceData?.staffs?.[lastObj]?.positionLabel ? false : true;
    const handleSubmit = async (e) => {
        e.preventDefault();
        const resData = await apiPOST<{ data?: WorkplaceTypes; errors?: string }, CreateCompanyType>(
            `/workplaces`,
            data,
        );
        if (resData.data) {
            dispatch(
                action.getUser({
                    userdata: {
                        ...userdata,
                        workplaces: [...userdata.workplaces, resData.data],
                    },
                }),
            );
            router.push(`/${resData.data.workplaceId}`);
        }
    };
    return (
        <div className="h-full max-w-3xl mx-auto px-2">
            <form className="flex flex-wrap" onSubmit={handleSubmit}>
                <div>
                    <div className="border flex items-center justify-left bg-gray-900 rounded-r text-xl gap-4 h-10 mb-5 mt-5">
                        <div className="h-16 w-16 relative -ml-2 rounded-full border overflow-hidden ">
                            <Image src={`/businessIcon.jpg`} layout="fill" objectFit="cover" />
                        </div>
                        <div>{data.workplaceData.workplaceName || 'Business Name'}</div>
                        <Button label="Change Logo" size="xs" customClass="ml-auto mr-1" color="indigo" />
                    </div>
                    <div className="flex flex-wrap gap-1">
                        <div className="flex-none w-full md:flex-1">
                            <Input
                                square
                                helper="Name"
                                value={data.workplaceData.workplaceName}
                                name="workplaceData.workplaceName"
                                onChange={handleOnChange}
                            />
                        </div>
                        <div className="w-36">
                            <Input
                                square
                                helper="Code"
                                value={data.workplaceData.workplaceCode}
                                name="workplaceData.workplaceCode"
                                onChange={handleOnChange}
                            />
                        </div>
                    </div>
                    <p className="text-yellow-500 text-xs mt-1">
                        &#9432; Coode needed when your Employee want to join the workspaces.
                    </p>
                </div>

                <div className="mt-2">
                    <div className="text-lg">Employee</div>
                    <p className="text-yellow-500 text-xs mb-2">
                        &#x26A0; When you create a Workpacse you dont need to add yourself as a staff. You will
                        automatically be an admin.
                    </p>
                    {data?.workplaceData?.staffs?.map(({ fullName, email, positionLabel }, index) => (
                        <div
                            key={`staffs-${index}`}
                            className={`border-2 ${!positionLabel && 'border-red-500'}  mt-2 mb-2 p-2 rounded`}
                        >
                            <div className="py-1 flex justify-between align-center mb-2 pr-1">
                                <div className="text-lg">Staff - {index + 1}</div>
                                <DropDownMenu label={positionLabel || 'Position'} dropSide="left">
                                    <DropDownItem
                                        label="Staff"
                                        onClick={() =>
                                            onHandleDropdown(`workplaceData.staffs.${index}.positionLabel`, 'staff')
                                        }
                                    />
                                    <DropDownItem
                                        label="Admin"
                                        onClick={() =>
                                            onHandleDropdown(`workplaceData.staffs.${index}.positionLabel`, 'admin')
                                        }
                                    />
                                </DropDownMenu>
                            </div>
                            <div className="flex flex-col gap-1">
                                <Input
                                    square
                                    helper="Name"
                                    value={fullName}
                                    type="text"
                                    placeholder={`Staff-${index + 1} Name`}
                                    name={`workplaceData.staffs.${index}.fullName`}
                                    onChange={handleOnChange}
                                />
                                <Input
                                    square
                                    helper="Email"
                                    type="email"
                                    value={email}
                                    placeholder={`Staff-${index + 1} Email`}
                                    name={`workplaceData.staffs.${index}.email`}
                                    onChange={handleOnChange}
                                />
                                <div>
                                    <p className="text-yellow-500 text-xs mt-1">
                                        &#x26A0; Employee Name may be updated during verification.
                                    </p>
                                    <p className="text-yellow-500 text-xs mb-2">
                                        &#x26A0; Employee mush have account with same email.
                                    </p>
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <Button
                                    label="Delele"
                                    size="xs"
                                    color="red"
                                    onClick={() => deleteItem('workplaceData.staffs')}
                                    customClass=""
                                />
                            </div>
                        </div>
                    ))}
                    <Button
                        label="Add More Employee"
                        size="sm"
                        color="indigo"
                        onClick={() =>
                            addItem<{ email: string; positionLabel: string; fullName: string }>(
                                'workplaceData.staffs',
                                {
                                    email: '',
                                    positionLabel: '',
                                    fullName: '',
                                },
                            )
                        }
                    />
                </div>
                <div className="mt-2">
                    <div className="text-lg">Workspace Variant</div>
                    <p className="text-yellow-500 text-xs mb-5">
                        You can add preference size and color for your worspaces. So that you can determine on your own.
                        Other variants options feature will be added in the future
                    </p>
                    <div className="text-lg">Color Variants</div>
                    <DropDownInputColor
                        w="w-80"
                        setVal={(value) => {
                            addItem('workplaceVariant.colorVariants', value);
                        }}
                    />
                    <p className="text-yellow-500 text-xs mt-1">To add color type on the typebox.</p>
                    <p className="text-yellow-500 text-xs mt-px">To remove color click on cross sign.</p>
                    <div className="flex flex-wrap py-2 gap-2">
                        {data.workplaceVariant?.colorVariants?.map((color, index) => (
                            <div
                                key={`${color}-${index}`}
                                className="border py-1 pl-3 pr-1 rounded flex items-center space-between gap-4"
                            >
                                <div className="h-6 w-10 flex-1 ml-2" style={{ background: color }} />
                                {color}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 cursor-pointer"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    onClick={() => deleteItem(`workplaceVariant.colorVariants.${index}`)}
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                        ))}
                    </div>
                </div>
                <Button
                    label="Submit Form"
                    color="green"
                    type="submit"
                    size="sm"
                    customClass="mb-36 mt-5"
                    icon={
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                                clipRule="evenodd"
                            />
                            <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                        </svg>
                    }
                />
            </form>
        </div>
    );
};

export default CreateWorkplace;
