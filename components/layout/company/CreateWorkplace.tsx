import Button from '@/components/elements/Button';
import Input from '@/components/elements/Input';
import Modal from '@/components/elements/Modal';
import { apiPOST } from '@/hooks/middleware/api';
import { useCreateWorkplaces } from '@/hooks/useCreateWorkplace';
import { createStaff } from '@/hooks/useCreateWorkplace/createStaff';
import { useVariant } from '@/hooks/useVariants';
import { CreateCompanyType } from '@/interface/Workplace/Company';
import { WorkplaceTypes } from '@/interface/Workplace/WorkplaceListTypes';
import { action } from '@context/action';
import { appContext } from '@context/appcontext';
import { createWorkplaceFormValidation } from 'middlware/validation';
import Image from 'next/dist/client/image';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import CreateStaffForm from './Staffs/CreateStaffForm';
import ColorVariantComponent from './Variant/kit/ColorVariantComponent';

//workplaceData.staffs.${index}.email
const prevColors = ['red', 'blue', 'green', 'yellow', 'white', 'teal', 'purple'];
const CreateWorkplace = () => {
    const {
        dispatch,
        state: {
            user: { userdata },
        },
    } = useContext(appContext);
    const router = useRouter();
    const { data, handleOnChange } = useCreateWorkplaces();
    const { staffs, createstaffError, onStaffsHandleChange, onStaffDropdown, addMoreStaff, deleteStaff } =
        createStaff();
    const { colors, addColor, removeColor } = useVariant(prevColors, 'colors');
    const { sizes, addSize, removeSize } = useVariant(prevColors, 'sizes');
    const [error, setError] = useState(null);

    useEffect(() => {
        for (const key in error) {
            dispatch(
                action.setAlert({
                    type: 'warning',
                    value: error[key],
                }),
            );
        }
    }, [error]);

    const errorValidator = () => {
        const newData = {
            ...data,
            workplaceData: {
                ...data.workplaceData,
                staffs: staffs,
            },
            workplaceVariant: {
                ...data.workplaceVariant,
                colorVariants: colors,
                sizeVariants: sizes,
            },
        };
        const formerror = createWorkplaceFormValidation(newData);
        setError(formerror);
    };

    const handleSubmit = async () => {
        const newData = {
            ...data,
            workplaceData: {
                ...data.workplaceData,
                staffs: staffs,
            },
            workplaceVariant: {
                ...data.workplaceVariant,
                colorVariants: colors,
                sizeVariants: sizes,
            },
        };
        console.log(newData);
        const resData = await apiPOST<{ data?: WorkplaceTypes; errors?: string }, CreateCompanyType>(
            `/workplaces`,
            newData,
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
            <form className="flex flex-wrap" onSubmit={(e) => e.preventDefault()}>
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
                                required
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
                    <p className="text-yellow-500 text-xs mb-px">
                        &#x26A0; When you create a Workpacse you dont need to add yourself as a staff. You will
                        automatically be an admin.
                    </p>
                    <p className="text-red-500 text-xs mb-2">&#x26A0; Please add minimum of one employee.</p>
                    <CreateStaffForm
                        staffs={staffs}
                        onHandleChange={onStaffsHandleChange}
                        onDropDownChange={onStaffDropdown}
                        addMore={addMoreStaff}
                        remove={deleteStaff}
                    />
                </div>
                <div className="mt-2">
                    <div className="text-lg">Workspace Variant</div>
                    <p className="text-yellow-500 text-xs mb-5">
                        You can add preference size and color for your worspaces. So that you can determine on your own.
                        Other variants options feature will be added in the future
                    </p>
                    <div className="text-lg mb-2">Color Variants</div>
                    <ColorVariantComponent colors={colors} addColor={addColor} removeColor={removeColor} w="w-80">
                        <p className="text-yellow-500 text-xs mt-1">To add color type on the typebox.</p>
                        <p className="text-yellow-500 text-xs mt-px mb-2">To remove color click on cross sign.</p>
                    </ColorVariantComponent>
                </div>
                <Modal
                    heading="Confirmation"
                    label={
                        <Button
                            label="Submit Form"
                            color="green"
                            type="button"
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
                    }
                    taskWhileOpening={() => errorValidator()}
                    error={error ? true : false}
                    onClick={() => handleSubmit()}
                >
                    <div className="h-20 flex justify-center items-center px-3">
                        {error ? (
                            <span className="text-yellow-500">
                                Make sure to fill out all the forms before continue!
                            </span>
                        ) : (
                            <span className="text-purple-500">
                                Well Done! Congratulation you are creating a workplace
                            </span>
                        )}
                    </div>
                </Modal>
            </form>
        </div>
    );
};

export default CreateWorkplace;
