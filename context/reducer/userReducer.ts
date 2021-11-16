import { ActionsTypes } from '@/interface/ActionType';
import { UserDataType } from '@/interface/Context/InitialStateType';
import { Types } from '@/interface/Dispatch';

export const userReducer = (state: UserDataType, action: ActionsTypes) => {
    switch (action.type) {
        case Types.Authenticated:
            return {
                ...state,
                authenticated: action.payload.authenticated,
            };

        case Types.GetUser:
            return {
                ...state,
                userdata: action.payload.userdata,
            };

        case Types.GetUserWorkplaces:
            return {
                ...state,
                workplaces: action.payload.workplaces,
            };
        default:
            return state;
    }
};
