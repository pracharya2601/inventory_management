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

import { action } from '@context/action';
import { appContext } from '@context/appcontext';
import { productFormValidation } from 'middlware/validation';
import { useRouter } from 'next/router';
import { useContext, useEffect, useRef, useState } from 'react';

export function useProductForm<T>(formData: T) {
    const router = useRouter();
    const firstRender = useRef(true);
    const productId = router.query?.productId;
    const businessId = router.query?.businessId as string;
    const {
        state: {
            workplace: { variant },
        },
        dispatch,
    } = useContext(appContext);

    const [data, setData] = useState<T>(formData);
    const [colors, setColors] = useState<string[] | []>(variant.colorVariants);
    const [sizes, setSizes] = useState<string[] | []>(variant.sizeVariants);
    const [error, setError] = useState(null);
    const [searchVal, setSearch] = useState({
        color: '',
        size: '',
    });

    const onchangeSearchHandle = (e) => {
        const { value, id } = e.target;
        setSearch((prevState) => ({
            ...prevState,
            [id]: value,
        }));
        const cleanString = value.replace(/[|&;$%@"<>()+,]/g, '').toLowerCase();
        const lists = id === 'color' ? variant.colorVariants : variant.sizeVariants;
        const filteredData = lists.filter((data: any) => {
            return data.toLowerCase().search(cleanString) != -1;
        });
        if (id === 'color') setColors(filteredData.length > 0 ? filteredData : variant.sizeVariants);
        else setSizes(filteredData.length > 0 ? filteredData : variant.sizeVariants);
    };

    useEffect(() => {
        setColors(variant.colorVariants);
        setSizes(variant.sizeVariants);
    }, [variant]);

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
    useEffect(() => {
        if (productId) return;
        const data = window.localStorage.getItem(businessId);
        if (data === 'null') return;
        setData(JSON.parse(data));
    }, []);

    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }
        if (productId) {
            return;
        }
        window.localStorage.setItem(businessId, JSON.stringify(data));
    }, [data]);

    const validate = (data) => {
        const itemError = productFormValidation(data);
        setError(itemError);
    };

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

    const deleteItem = async (name) => {
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
        error,
        validate,
        searchVal,
        onchangeSearchHandle,
    };
}
