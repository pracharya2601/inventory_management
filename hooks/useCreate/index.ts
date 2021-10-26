import { useState } from 'react';

export const useCreate = () => {
    const [catagory, setCatagory] = useState([]);
    const [color, setColor] = useState([]);
    const [size, setSize] = useState([]);

    const onSubmitHandle = () => {
        console.log('Hello');
    };

    return {
        catagory,
        color,
        size,
        setCatagory,
        setColor,
        setSize,
    };
};
