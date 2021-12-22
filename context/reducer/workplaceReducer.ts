import { ActionsTypes } from '@/interface/ActionType';
import { WorkplaceDataType } from '@/interface/Context/InitialStateType';
import { Types } from '@/interface/Dispatch';

export const workplaceReducer = (state: WorkplaceDataType, action: ActionsTypes) => {
    switch (action.type) {
        case Types.SetVariant:
            return {
                ...state,
                variant: action.payload.variant,
            };
        case Types.GetProductCatagory:
            return {
                ...state,
                productCatagory: action.payload.productCatagory,
            };
        default:
            return state;
    }
};
