import { ActionsTypes } from '@/interface/ActionType';
import { RouteType } from '@/interface/Context/InitialStateType';

import { Types } from '@/interface/Dispatch';

const renderingPage = (item: string[]): string => {
    if (item.length === 0) return '';
    return item.length === 1 ? 'companydashboard' : item.length >= 2 ? 'productlist' : '';
};
export const routeReducer = (state: RouteType, action: ActionsTypes) => {
    switch (action.type) {
        case Types.PathName:
            const key = action.payload.key;
            return {
                ...state,
                pathName: {
                    ...state.pathName,
                    [action.payload.key]: action.payload.val,
                },
                renderingPage: key === 'id' ? renderingPage(action.payload.val as string[]) : '',
            };
        case Types.AsPath:
            return {
                ...state,
                asPath: action.payload.asPath,
                renderingPage: '',
            };
        default:
            return state;
    }
};
