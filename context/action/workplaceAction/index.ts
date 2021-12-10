/* eslint-disable @typescript-eslint/no-explicit-any */
import { Types, WorkplacePayloadType } from '@/interface/Dispatch';
import { createActionPayload } from '../createActionPayload';

export const workplaceAction = {
    getCompanyData: createActionPayload<typeof Types.GetCompanyData, WorkplacePayloadType[Types.GetCompanyData]>(
        Types.GetCompanyData,
    ),
    setVariant: createActionPayload<typeof Types.SetVariant, WorkplacePayloadType[Types.SetVariant]>(Types.SetVariant),
    getProductCatagory: createActionPayload<
        typeof Types.GetProductCatagory,
        WorkplacePayloadType[Types.GetProductCatagory]
    >(Types.GetProductCatagory),
    getProduct: createActionPayload<typeof Types.GetProduct, WorkplacePayloadType[Types.GetProduct]>(Types.GetProduct),
    getSearchFilter: createActionPayload<typeof Types.GetSearchFilter, WorkplacePayloadType[Types.GetSearchFilter]>(
        Types.GetSearchFilter,
    ),
    getSingleProduct: createActionPayload<typeof Types.GetSingleProduct, WorkplacePayloadType[Types.GetSingleProduct]>(
        Types.GetSingleProduct,
    ),
};
