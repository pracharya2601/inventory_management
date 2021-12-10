import { Skus } from '@/interface/Product/ProductInterface';

type Val = {
    count: number;
    price: number;
    minPrice: number;
    maxPrice: number;
    color: string;
    size: string;
    currentSelect: 'color' | 'size';
};

const reducerHandeler = (prevObj: Val, newObj: Val): Val => {
    prevObj['count'] = prevObj.count + newObj.count;
    prevObj['price'] = newObj.price;
    prevObj['minPrice'] =
        prevObj['minPrice'] === 0 || prevObj['minPrice'] > newObj.price ? newObj.price : prevObj['minPrice'];
    prevObj['maxPrice'] =
        prevObj['maxPrice'] === 0 || prevObj['maxPrice'] < newObj.price ? newObj.price : prevObj['minPrice'];

    return prevObj;
};

const withColorAndSizeReducer = (prevObj, newObj): Val => {
    return newObj.color === prevObj.color && newObj.size === prevObj.size ? reducerHandeler(prevObj, newObj) : prevObj;
};
const withColorReducer = (prevObj, newObj) => {
    return newObj.color === prevObj.color ? reducerHandeler(prevObj, newObj) : prevObj;
};
const withSizeReducer = (prevObj, newObj) => {
    return newObj.size === prevObj.size ? reducerHandeler(prevObj, newObj) : prevObj;
};

const colAndSizeFilterReducer = ({ colors, sizes, price, minPrice, maxPrice, count }, newObj) => {
    const c = colors.find((item) => item.color === newObj.color);
    const s = sizes.find((item) => item.size === newObj.size);
    const newData = {
        colors: !c ? colors.concat([{ color: newObj.color, stat: true }]) : colors,
        sizes: !s ? sizes.concat([{ size: newObj.size, stat: true }]) : sizes,
        price: newObj.price,
        maxPrice: maxPrice === 0 || maxPrice < newObj.price ? newObj.price : maxPrice,
        minPrice: minPrice === 0 || minPrice > newObj.price ? newObj.price : minPrice,
        count: count + newObj.count,
    };
    return newData;
};

export const colorSizeSeparation = (skus: Skus[]) => {
    return skus.reduce(colAndSizeFilterReducer, {
        colors: [],
        sizes: [],
        price: 0,
        maxPrice: 0,
        minPrice: 0,
        count: 0,
    });
};

export const newVariantCalculate = (
    skus: Skus[],
    size: string,
    color: string,
    currentSelect: 'color' | 'size',
): Val => {
    const initialData: Val = {
        count: 0,
        price: 0,
        minPrice: 0,
        maxPrice: 0,
        color: color,
        size: size,
        currentSelect: currentSelect,
    };
    if (color && size) {
        return skus.reduce(withColorAndSizeReducer, initialData);
    } else if (currentSelect === 'color' && color) {
        return skus.reduce(withColorReducer, initialData);
    } else if (currentSelect === 'size' && size) {
        return skus.reduce(withSizeReducer, initialData);
    } else {
        return initialData;
    }
};

export const returnArr = (
    arr: Skus[],
    checkType: 'size' | 'color',
    getType: 'size' | 'color',
    checkVal: string,
): string[] => {
    const newArr: string[] = [];
    arr.forEach((itm) => {
        if (itm[checkType] == checkVal) {
            if (!newArr.includes(itm[getType])) {
                newArr.push(itm[getType]);
            }
        }
    });
    return newArr;
};
