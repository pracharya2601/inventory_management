import { Skus } from '@/interface/Product/ProductInterface';

/**
 * @hastodo get skus and check with all check both sides
 * @colorandsize get color and size form companydata
 * @first check color with size and viceversa
 */

type ReturnedArrrays = {
    filteredColors: string[] | [];
    filteredSizes: string[] | [];
    colorObj: {
        [id: string]: number;
    };
    sizeObj: {
        [id: string]: number;
    };
};

const filterReducer = ({ colors, sizes, colorObj, sizeObj }, newObj) => {
    /**
     * @info we have single object of skus
     * @needtodo check size and color skus with multi direction
     * @filter check for the
     * @checkcolor and put it on colorObj with name of color as a key with value number of count
     * @checkcolorandreturncolorarray if colorObj of key with value is equal to the lenght of size array pop out the color from array
     * @checksize same with the sizeObje
     */
    return { colors, sizes, colorObj, sizeObj };
};

const colorSizeFilteration = (skus: Skus, colors: string[], sizes: string[]): ReturnedArrrays => {
    const initialVal = {
        colors: colors,
        sizes: sizes,
        colorObj: {},
        sizeObj: {},
    };
    return {
        filteredColors: [],
        filteredSizes: [],
        colorObj: {
            red: 100,
        },
        sizeObj: {
            small: 2,
        },
    };
};
