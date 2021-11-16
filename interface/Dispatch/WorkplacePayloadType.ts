import { Types } from '.';
import { ProductCatagoryType } from '../Product/ProductCatagory';
import { ProductList, ProductType } from '../Product/ProductInterface';
import { CompanyTypes } from '../Workplace/Company';

export type WorkplacePayloadType = {
    [Types.GetCompanyData]: {
        companydata: CompanyTypes | null;
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
};
