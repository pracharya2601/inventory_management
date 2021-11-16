import { ProductType, Skus } from '@/interface/Product/ProductInterface';
import { useState } from 'react';
import { calculateCount, calculateSpecificCount, returnArr } from './helper';

import { SType, CType } from './types';

export const useItem = (items: ProductType) => {
    const [activeImage, setActiveImage] = useState(items.images[0].url);
    const [colors, setColors] = useState(items.colors.map((item) => ({ color: item, stat: true })));
    const [sizes, setSizes] = useState(items.sizes.map((item) => ({ size: item, stat: true })));
    const [c, setC] = useState<CType>({ color: '', index: NaN, stat: false });
    const [s, setS] = useState<SType>({ size: '', index: NaN, stat: false });

    const [errorMessage, setErrorMessage] = useState<string>('This is error');
    const [count, setCount] = useState(items.skus.map((itm) => itm.count).reduce((prev, next) => prev + next));
    const [cartIdenty, setCartIdenty] = useState<Skus>({ color: '', size: '', count: NaN, price: NaN });

    const colorFunc = (c: CType) => {
        const checkingArr = returnArr(items.skus, 'color', 'size', c.color);
        if (checkingArr.length === 0) {
            setSizes(sizes.map(({ size }) => ({ size, stat: false })));
            setCount(0);
        } else {
            setSizes(sizes.map(({ size }) => ({ size, stat: checkingArr.includes(size) ? true : false })));
            setCount(calculateCount(items.skus, checkingArr, 'size', 'color', c.color));
        }
    };

    const sizeFunc = (s: SType) => {
        const checkingArr = returnArr(items.skus, 'size', 'color', s.size);
        if (checkingArr.length === 0) {
            setColors(colors.map(({ color }) => ({ color, stat: false })));
            setCount(0);
        } else {
            setColors(colors.map(({ color }) => ({ color, stat: checkingArr.includes(color) ? true : false })));
            setCount(calculateCount(items.skus, checkingArr, 'color', 'size', s.size));
        }
    };

    const setColor = (c: CType) => {
        setC(c);
        items.images.map(({ color, url }) => {
            if (color == c.color) setActiveImage(url);
        });
        if (s.size) {
            if (!c.stat) {
                setS({ size: '', index: NaN, stat: false });
                setColors(colors.map(({ color }) => ({ color, stat: true })));
                colorFunc(c);
                return;
            } else {
                setCount(calculateSpecificCount(items.skus, c.color, s.size));
                return;
            }
        } else {
            colorFunc(c);
        }
    };

    const setSize = (s: SType) => {
        console.log('asdksdjklj');
        setS(s);
        if (c.color) {
            console.log('up');
            if (!s.stat) {
                setC({ color: '', index: NaN, stat: false });
                setSizes(sizes.map(({ size }) => ({ size, stat: true })));
                sizeFunc(s);
                return;
            } else {
                setCount(calculateSpecificCount(items.skus, c.color, s.size));
                return;
            }
        } else {
            console.log('lksjdkljds');
            sizeFunc(s);
        }
    };

    const addToCart = () => {
        items.skus.forEach(({ color, size, count, price }) => {
            if (color == c.color && size == s.size && count !== 0) {
                console.log({
                    name: items.name,
                    id: items._id,
                    price: price,
                    cart_count: 1,
                });
                return;
            }
        });
    };

    return {
        count,
        cartIdenty,
        addToCart,
        errorMessage,
        setErrorMessage,
        c: c.color,
        s: s.size,
        setC: setColor,
        setS: setSize,
        colors,
        sizes,
        activeImage,
        setActiveImage,
    };
};
