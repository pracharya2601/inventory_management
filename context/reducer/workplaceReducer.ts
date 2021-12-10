import { ActionsTypes } from '@/interface/ActionType';
import { WorkplaceDataType } from '@/interface/Context/InitialStateType';
import { Types } from '@/interface/Dispatch';

export const workplaceReducer = (state: WorkplaceDataType, action: ActionsTypes) => {
    switch (action.type) {
        case Types.GetCompanyData:
            return {
                ...state,
                companydata: action.payload.companydata,
            };
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
        case Types.GetProduct:
            return {
                ...state,
                productList: {
                    ...state.productList,
                    dataType: action.payload.dataType,
                    data: action.payload.data,
                    initialData: action.payload.data,
                },
            };
        case Types.GetSearchFilter:
            return {
                ...state,
                productList: {
                    ...state.productList,
                    dataType: action.payload.dataType || state.productList.dataType,
                    data: action.payload.filteredData,
                },
            };

        case Types.GetSingleProduct:
            console.log('This is running', action.payload);
            return {
                ...state,
                singleData: action.payload.singleData,
            };
        default:
            return state;
    }
};
