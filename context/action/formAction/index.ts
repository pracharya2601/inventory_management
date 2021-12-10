import { FormPayloadType, Types } from '@/interface/Dispatch';
import { createActionPayload } from '../createActionPayload';

export const formAction = {
    updateData: createActionPayload<typeof Types.UpdateProduct, FormPayloadType[Types.UpdateProduct]>(
        Types.UpdateProduct,
    ),
};
