import { Types } from '.';
import {
    ActiveColorType,
    ActiveSizeType,
    PreviewColors,
    PreviewDataType,
    PreviewSizes,
} from '../Context/InitialStateType';
import { ProductCatagoryType } from '../Product/ProductCatagory';
import { ProductList, ProductType } from '../Product/ProductInterface';
import { CompanyTypes, CompanyVariants } from '../Workplace/Company';

export type WorkplacePayloadType = {
    [Types.GetCompanyData]: {
        companydata: CompanyTypes | null;
    };
    [Types.SetVariant]: {
        variant: CompanyVariants;
    };
    [Types.GetProductCatagory]: {
        productCatagory: ProductCatagoryType[];
    };
    [Types.GetProduct]: {
        dataType: string;
        data: ProductType[] | [];
        initialData: ProductType[] | [];
    };
    [Types.GetSearchFilter]: {
        filteredData: ProductList;
        dataType: string;
    };
    [Types.GetSingleProduct]: {
        singleData: ProductType | null;
    };
    [Types.EditProduct]: {
        editData: ProductType | null;
    };
    // [Types.SetPreviewSingleProduct]: {
    //     id: string;
    //     data: PreviewDataType;
    // };
    // [Types.SetActiveImage]: {
    //     id: string;
    //     activeImage: string;
    // };
    // [Types.SetColors]: {
    //     id: string;
    //     colors: PreviewColors;
    // };
    // [Types.SetSizes]: {
    //     id: string;
    //     sizes: PreviewSizes;
    // };
    // [Types.SetActiveColor]: {
    //     id: string;
    //     activeColor: ActiveColorType;
    // };
    // [Types.SetActiveSize]: {
    //     id: string;
    //     activeSize: ActiveSizeType;
    // };
    // [Types.SetCount]: {
    //     id: string;
    //     count: number;
    // };
};
