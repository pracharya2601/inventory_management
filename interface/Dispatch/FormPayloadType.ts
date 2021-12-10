import { Types } from '.';
import { CreateDataType, ProductType } from '../Product/ProductInterface';
export type FormPayloadType = {
    [Types.UpdateProduct]: {
        updateData: ProductType;
    };
    [Types.CreateProduct]: {
        createData: CreateDataType;
    };
};
