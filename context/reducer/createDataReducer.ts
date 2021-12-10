import { ActionsTypes } from '@/interface/ActionType';
import { FormDataType } from '@/interface/Product/ProductInterface';

import { Types } from '@/interface/Dispatch';

export const createDataReducer = (state: FormDataType, action: ActionsTypes) => {
    switch (action.type) {
        case Types.UpdateProduct:
            return {
                ...state,
                updateData: action.payload.updateData,
            };
        default:
            return state;
    }
};
