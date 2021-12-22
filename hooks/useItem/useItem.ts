/* eslint-disable @typescript-eslint/no-unused-vars */
import { ProcessProductInfo } from '@/interface/Product/ProcessProductType';
import { ProductType, Skus } from '@/interface/Product/ProductInterface';
import { action } from '@context/action';
import { appContext } from '@context/appcontext';
import { useContext, useState } from 'react';
import { colorSizeSeparation, newVariantCalculate, returnArr } from './helper';

import { SType, CType } from './types';

export const useItem = (items: ProductType) => {
    const colAndSize = colorSizeSeparation(items.skus);
    const [colors, setColors] = useState<Array<{ color: string; stat: boolean }>>(colAndSize.colors);
    const [sizes, setSizes] = useState<Array<{ size: string; stat: boolean }>>(colAndSize.sizes);
    const [count, setCount] = useState<number>(colAndSize.count);
    const [price, setPrice] = useState<number>(colAndSize.price);
    const [lowPrice, setLowPrice] = useState<number>(colAndSize.minPrice);
    const [highPrice, setHignPrice] = useState<number>(colAndSize.maxPrice);

    const [activeImage, setActiveImage] = useState(items.images[0].url);
    const [activeColor, setCC] = useState<string>('');
    const [activeSize, setSS] = useState<string>('');
    const { dispatch } = useContext(appContext);
    const setColorrr = (c: CType) => {
        //update color if it is false so that tick mark is over there;
        setCC(c.color);
        const imgPrv = items?.images.find(({ color }) => color === c.color)?.url;
        if (imgPrv) {
            setActiveImage(imgPrv);
        }
        if (!c.stat) {
            const newArr = [...colors];
            const rowIndex = newArr.findIndex(({ color }) => color === c.color);
            newArr[rowIndex] = { color: c.color, stat: true };
            // if stat is false that means size is selected so remove the size
            setSS('');
            setColors(newArr);
        }
        const newSS = c.stat ? activeSize : '';
        const { count, price, minPrice, maxPrice } = newVariantCalculate(items.skus, newSS, c.color, 'color');
        setCount(count);
        setPrice(price);
        setLowPrice(minPrice);
        setHignPrice(maxPrice);
        const checkingArr = returnArr(items.skus, 'color', 'size', c.color);
        setSizes(sizes.map(({ size }) => ({ size: size, stat: checkingArr.includes(size) ? true : false })));
    };

    const setSizess = (s: SType) => {
        setSS(s.size);
        if (!s.stat) {
            const newArr = [...sizes];
            const rowIndex = newArr.findIndex(({ size }) => size === s.size);
            newArr[rowIndex] = { size: s.size, stat: true };
            setCC('');
            setSizes(newArr);
        }
        const newCC = s.stat ? activeColor : '';
        const { count, price, minPrice, maxPrice } = newVariantCalculate(items.skus, s.size, newCC, 'size');
        setCount(count);
        setPrice(price);
        setLowPrice(minPrice);
        setHignPrice(maxPrice);
        const checkingArr = returnArr(items.skus, 'size', 'color', s.size);
        setColors(colors.map(({ color }) => ({ color, stat: checkingArr.includes(color) ? true : false })));
        // setSizes(filteredSizes);
    };

    const addToCart = (open: boolean) => {
        if (activeColor && activeSize) {
            const data: ProcessProductInfo = {
                imageUrl: items.images?.[0].url,
                referenceId: items._id,
                name: items.name,
                color: activeColor,
                size: activeSize,
                price: price,
                numberOfItem: 1,
                total: price * 1,
            }
            dispatch(action.setProcessItem({
                item: data
            }));
            if (open) {
                dispatch(
                    action.toggleAction({
                        id: 'processProduct',
                        open: true,
                    }),
                );
            }
        }
    };

    return {
        count,
        addToCart,
        activeColor,
        activeSize,
        setC: setColorrr,
        setS: setSizess,
        price,
        lowPrice,
        highPrice,
        colors,
        sizes,
        activeImage,
        setActiveImage,
    };
};
