import Button from '@/components/elements/Button';
import Modal from '@/components/elements/Modal';
import { apiPOST } from '@/hooks/middleware/api';
import { createStaff } from '@/hooks/useCreateWorkplace/createStaff';
import { CreateStaffFormType } from '@/interface/Workplace/Company';
import { action } from '@context/action';
import { appContext } from '@context/appcontext';
import { staffFormError } from 'middlware/validation';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import CreateStaffForm from './CreateStaffForm';

const CreateEmployee = ({ secret, position }: { secret?: string; position?: string }) => {
    const router = useRouter();
    const { staffs, createstaffError, onStaffsHandleChange, onStaffDropdown, addMoreStaff, deleteStaff } = createStaff();
    const { dispatch } = useContext(appContext);
    const [error, setError] = useState(null);

    useEffect(() => {
        for (const key in error) {
            dispatch(action.setAlert({
                type: 'warning',
                value: error[key]
            }))
        }
    }, [error])

    const onSubmitHandle = async () => {
        if (position === 'admin') {
            const resDta = await apiPOST<{ data?: string; errors?: string }, CreateStaffFormType[]>(
                `/staffs/${router.query?.businessId}?secret=${secret}`,
                staffs,
            );
            if (resDta.data) {
                dispatch(
                    action.setAlert({
                        type: 'success',
                        value: 'Successfully added',
                    }),
                );
            }
        } else {
            dispatch(
                action.setAlert({
                    type: 'warning',
                    value: 'You are not an admin',
                }),
            );
        }
    };

    const validate = () => {
        const staffformerror = staffFormError(staffs);
        setError(staffformerror);
    }

    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <div className="mt-2 max-w-md pb-10 mb-10">
                <div className="text-lg">Add Employee</div>
                <p className="text-red-500 text-xs">&#x26A0; You should be Admin to add Employee.</p>
                <p className="text-yellow-500 text-xs mb-2">Add new Employees.</p>
                <CreateStaffForm
                    staffs={staffs}
                    onHandleChange={onStaffsHandleChange}
                    onDropDownChange={onStaffDropdown}
                    addMore={addMoreStaff}
                    remove={deleteStaff}
                />
                {staffs?.length > 0 && <Modal
                    heading='Confirming adding new Employee.'
                    label={
                        <Button
                            fullwidth
                            label="Submit"
                            customClass="w-full mt-5 mb-16"
                            size="sm"
                            color="green"
                            type="button"
                        />
                    }
                    onClick={() => onSubmitHandle()}
                    taskWhileOpening={() => validate()}
                    error={error ? true : false}
                >
                    {error && <div className='text-red-500'>
                        Make sure fill out all the form.
                    </div>}
                </Modal>}
            </div>

        </form>
    );
};

export default CreateEmployee;
