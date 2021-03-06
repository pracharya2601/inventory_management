import { CreateStaffFormType } from '@/interface/Workplace/Company';
import { useEffect, useState } from 'react';

export const createStaff = () => {
    const [staffs, setStaffs] = useState<CreateStaffFormType[]>([{ email: '', positionLabel: '', fullName: '' }]);
    const [createstaffError, setError] = useState<boolean>(true);

    useEffect(() => {
        staffs.forEach((staff) => {
            for (const key in staff) {
                if (staff[key] == '') {
                    return setError(true);
                } else if (staffs[key] !== '') {
                    setError(false);
                } else {
                    setError(true);
                }
            }
        });
    }, [staffs]);

    const onStaffsHandleChange = (e) => {
        const { name, value } = e.target;
        handler(name, value);
    };
    const onStaffDropdown = (name: string, value: string) => {
        handler(name, value);
    };

    const handler = (name: string, value: string) => {
        const a = name.split('.');
        if (a.length === 3) {
            const arrDta = [...staffs];
            const rowInd = +a[1];
            arrDta[rowInd] = {
                ...arrDta[rowInd],
                [a[2]]: value,
            };
            setStaffs(arrDta);
        }
    };

    const addMoreStaff = () => {
        setStaffs([...staffs, { email: '', positionLabel: '', fullName: '' }]);
    };
    const deleteStaff = (name) => {
        const a = name.split('.');
        if (a.length === 2) {
            const arrDta = [...staffs];
            const rowIndex = +a[1];
            arrDta.splice(rowIndex, 1);
            setStaffs(arrDta);
        }
    };

    return { staffs, createstaffError, onStaffsHandleChange, onStaffDropdown, addMoreStaff, deleteStaff };
};
