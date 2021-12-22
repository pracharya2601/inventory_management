/* eslint-disable @typescript-eslint/no-explicit-any */
import { Types, WorkplacePayloadType } from '@/interface/Dispatch';
import { createActionPayload } from '../createActionPayload';

export const workplaceAction = {
    setVariant: createActionPayload<typeof Types.SetVariant, WorkplacePayloadType[Types.SetVariant]>(Types.SetVariant),
    getProductCatagory: createActionPayload<
        typeof Types.GetProductCatagory,
        WorkplacePayloadType[Types.GetProductCatagory]
    >(Types.GetProductCatagory),
};
