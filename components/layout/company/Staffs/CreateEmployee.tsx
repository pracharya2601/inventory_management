import Button from '@/components/elements/Button';
import DropDownMenu, { DropDownItem } from '@/components/elements/ddm/DropDownMenu';
import Input from '@/components/elements/Input';
import { apiPOST } from '@/hooks/middleware/api';
import { createStaff } from '@/hooks/useCreateWorkplace/createStaff';
import { CreateStaffFormType } from '@/interface/Workplace/Company';
import { action } from '@context/action';
import { appContext } from '@context/appcontext';
import { useRouter } from 'next/router';
import { useContext } from 'react';

const CreateEmployee = ({ secret, position }: { secret?: string; position?: string }) => {
    const router = useRouter();
    const { staffs, error, onStaffsHandleChange, onStaffDropdown, addMoreStaff, deleteStaff } = createStaff();
    const { dispatch } = useContext(appContext);
    const onSubmitHandle = async (e) => {
        e.preventDefault();
        if (error) {
            dispatch(
                action.setAlert({
                    type: 'danger',
                    value: 'Please fillout all the form',
                }),
            );
        } else {
            if (position === 'admin') {
                const resDta = await apiPOST<{ data?: string; errors?: string }, CreateStaffFormType[]>(
                    `/staffs/${router.query?.businessId}?secret=${secret}`,
                    staffs,
                );
                if (resDta.data) {
                    console.log(resDta);
                }
            } else {
                dispatch(
                    action.setAlert({
                        type: 'warning',
                        value: 'You are not an admin',
                    }),
                );
            }
        }
    };
    return (
        <div className="mt-2 max-w-md pb-10">
            <form onSubmit={onSubmitHandle}>
                <div className="text-lg">Add Employee</div>
                <p className="text-red-500 text-xs">&#x26A0; You should be Admin to add Employee.</p>
                <p className="text-yellow-500 text-xs mb-2">Add new Employees.</p>
                {staffs?.map(({ fullName, email, positionLabel }, index) => (
                    <div
                        key={`staffs-${index}-createstaffform`}
                        className={`border-2 ${!positionLabel && 'border-red-500'}  mt-2 p-2 rounded`}
                    >
                        <div className="py-1 flex justify-between align-center mb-2 pr-1">
                            <div className="text-lg">Staff - 1</div>
                            <DropDownMenu label={positionLabel || 'Position'} dropSide="left">
                                <DropDownItem
                                    label="Staff"
                                    onClick={() => onStaffDropdown(`staffs.${index}.positionLabel`, 'staff')}
                                />
                                <DropDownItem
                                    label="Admin"
                                    onClick={() => onStaffDropdown(`staffs.${index}.positionLabel`, 'admin')}
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
                                name={`staffs.${index}.fullName`}
                                onChange={onStaffsHandleChange}
                            />
                            <Input
                                square
                                helper="Email"
                                type="email"
                                value={email}
                                placeholder={`Staff-${index + 1} Email`}
                                name={`staffs.${index}.email`}
                                onChange={onStaffsHandleChange}
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
                                type="button"
                                size="xs"
                                color="red"
                                onClick={() => deleteStaff(`staffs.${index}`)}
                                customClass=""
                            />
                        </div>
                    </div>
                ))}
                <Button
                    label="Add More Employee"
                    size="xs"
                    type="button"
                    color="gray"
                    onClick={() => addMoreStaff()}
                    customClass="mt-2"
                />
                <Button
                    fullwidth
                    label="Submit"
                    customClass="w-full mt-5 mb-16"
                    size="sm"
                    color="green"
                    type="submit"
                />
            </form>
        </div>
    );
};

export default CreateEmployee;
