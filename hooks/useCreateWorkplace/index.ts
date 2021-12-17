import { CreateCompanyType } from '@/interface/Workplace/Company';
import { useState } from 'react';

export const useCreateWorkplaces = () => {
    const [state, setState] = useState<CreateCompanyType>({
        workplaceData: {
            workplaceName: '',
            workplaceCode: '',
            productCatagroy: [],
            logoUrl: '',
            variantColors: [],
            variantSizes: [],
            staffs: [{ email: '', positionLabel: '', fullName: '' }],
        },
        workplaceVariant: {
            colorVariants: ['red', 'blue', 'green', 'yellow', 'white', 'teal', 'purple'],
            sizeVariants: ['x-small', 'small', 'medium', 'large', 'x-large'],
        },
    });
    //workplaceData.workplaceName -- 0, 1
    //workplaceData.staffs.${index}.email -- 0, 1, 2, 3

    //workplaceVariant.colorVariants.${index}; -- 0, 1, 2
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        handeler(name, value);
    };

    const onHandleDropdown = (name, value) => {
        handeler(name, value);
    };

    const handeler = (name, value) => {
        // const { name, value } = e.target;
        const a = name.split('.');
        if (a.length === 2) {
            setState((prevState) => ({
                ...prevState,
                [a[0]]: {
                    ...prevState[a[0]],
                    [a[1]]: value,
                },
            }));
        } else if (a.length === 3) {
            //array of string
            const arrOfStr = state[a[0]][a[1]];
            const rowIndex = +a[2];
            arrOfStr[rowIndex] = value;
            setState((prevState) => ({
                ...prevState,
                [a[0]]: {
                    ...prevState[a[0]],
                    [a[1]]: arrOfStr,
                },
            }));
        } else if (a.length === 4) {
            const arrOfObj = state[a[0]][a[1]];
            const rowIndex = +a[2];
            arrOfObj[rowIndex] = {
                ...arrOfObj[rowIndex],
                [a[3]]: value,
            };
            setState((prevState) => ({
                ...prevState,
                [a[0]]: {
                    ...prevState[a[0]],
                    [a[1]]: arrOfObj,
                },
            }));
        }
    };

    const addItem = <T>(name: string, valueorObj: T) => {
        const a = name.split('.');
        if (a.length === 2) {
            const arrofData = state[a[0]][a[1]];
            const newArr = [...arrofData, valueorObj];
            setState((prevState) => ({
                ...prevState,
                [a[0]]: {
                    ...prevState[a[0]],
                    [a[1]]: newArr,
                },
            }));
        }
    };

    const deleteItem = (name: string) => {
        const a = name.split('.');
        if (a.length > 2) {
            const arrofData = state[a[0]][a[1]];
            const rowIndex = +a[2];
            if (rowIndex !== -1) {
                arrofData.splice(rowIndex, 1);
            }
            setState((prevState) => ({
                ...prevState,
                [a[0]]: {
                    ...prevState[a[0]],
                    [a[1]]: arrofData,
                },
            }));
        }
    };
    return { data: state, handleOnChange, addItem, deleteItem, onHandleDropdown };
};
