/**
 * @parameter hooks take form data and company variant
 * @return hook return handleChange, handleOnChangeArray, da as data, onDropdownChange, addItem, deleteItem, colors, sizes
 * @handleChange takes e as a parameter with type name and value
 * @handleOnChangeArray takes e as a parameter with type name and value with . seperation
 * @data return data object
 * @onDropdownChange takes value and name as a paramerer
 * @addItem takes name and empty schema obect as parameter ## name separate with dot
 * @deleteItem takes name as a parameter separated with dot
 */

import { CreateDataType, ProductType } from '@/interface/Product/ProductInterface';
import { appContext } from '@context/appcontext';
import { useContext, useEffect, useState } from 'react';

export const useProductForm = (formData: ProductType | CreateDataType) => {
    const {
        state: {
            workplace: { variant },
        },
    } = useContext(appContext);

    const [data, setData] = useState<ProductType | CreateDataType>(formData);
    const [colors, setColors] = useState<string[] | []>(variant.colorVariants);
    const [sizes, setSizes] = useState<string[] | []>(variant.sizeVariants);

    useEffect(() => {
        setColors(variant.colorVariants);
        setSizes(variant.sizeVariants);
    }, [variant]);

    const handleOnChange = (e) => {
        const { name, value, type } = e.target;
        setData((prevState) => ({
            ...prevState,
            [name]: type === 'number' ? parseInt(value) : value,
        }));
    };
    const handleOnChangeArray = (e) => {
        const { value, name, type } = e.target;
        onChangeCustomHandeler(value, name, type);
    };

    const onDropdownChange = (value, name) => {
        onChangeCustomHandeler(value, name, 'string');
        if (name.includes('skus')) {
            console.log('Hello, This is skus');
        }
    };

    const onChangeCustomHandeler = (value, name, type) => {
        const a = name.split('.');
        if (a.legth == 2) {
            //has string of array
        } else if (a.length === 3) {
            //has array of object
            const arrOfData = data[a[0]];
            const rowIndex = +a[1];
            arrOfData[rowIndex] = {
                ...arrOfData[rowIndex],
                [a[2]]: type === 'number' ? parseInt(value) : value,
            };
            setData((prevState) => ({
                ...prevState,
                [a[0]]: arrOfData,
            }));
        } else if (a.length === 1) {
            //something
        }
    };

    const addItem = (name, valueObj) => {
        const a = name.split('.');
        if (a.length == 1) {
            const arrOfData = data[a[0]];
            const newData = [...arrOfData, valueObj];
            setData((prevState) => ({
                ...prevState,
                [a[0]]: newData,
            }));
        }
    };

    const deleteItem = (name) => {
        const a = name.split('.');
        if (a.length == 2) {
            const arrOfData = data[a[0]];
            const rowIndex = +a[1];
            if (rowIndex !== -1) {
                const obj = arrOfData[rowIndex];
                arrOfData.splice(rowIndex, 1);
                if (arrOfData.length === 0 && a[0] !== 'images') {
                    Object.keys(obj).map((k) => {
                        if (k === 'id') {
                            obj['id'] = 1;
                        } else {
                            obj[k] = typeof obj[k] === 'number' ? 0 : '';
                        }
                    });
                    arrOfData.push(obj);
                }
                setData((prevState) => ({
                    ...prevState,
                    [a[0]]: arrOfData,
                }));
            }
        }
    };

    return {
        handleOnChange,
        handleOnChangeArray,
        da: data,
        onDropdownChange,
        addItem,
        deleteItem,
        colors,
        sizes,
        setColors,
        setSizes,
    };
};
