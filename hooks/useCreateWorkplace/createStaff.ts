import { CreateStaffFormType } from '@/interface/Workplace/Company';
import { useState } from 'react';

export const createStaff = () => {
    const [staffs, setStaffs] = useState<CreateStaffFormType[]>([{ email: '', positionLabel: '', fullName: '' }]);

    const onStaffsHandleChange = (e) => {
        const { name, value } = e.target;
        handler(name, value);
    };
    const onStaffDropdown = (name, value) => {
        handler(name, value);
    };

    const handler = (name, value) => {
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

    return { staffs, onStaffsHandleChange, onStaffDropdown, addMoreStaff, deleteStaff };
};
