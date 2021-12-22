import { Types } from '.';
import { ProductCatagoryType } from '../Product/ProductCatagory';
import { CompanyVariants } from '../Workplace/Company';

export type WorkplacePayloadType = {
    [Types.SetVariant]: {
        variant: CompanyVariants;
    };
    [Types.GetProductCatagory]: {
        productCatagory: ProductCatagoryType[];
    };
};
