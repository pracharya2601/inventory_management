import { ActionsTypes } from '@/interface/ActionType';
import { UiType } from '@/interface/Context/InitialStateType';
import { Types } from '@/interface/Dispatch';

export const uiReducer = (state: UiType, action: ActionsTypes) => {
    switch (action.type) {
        case Types.ToggleOpen:
            return {
                ...state,
                toggleOpen: {
                    ...state.toggleOpen,
                    [action.payload.id]: action.payload.open,
                },
            };
        case Types.SetAlert:
            return {
                ...state,
                alert: [...state.alert, { type: action.payload.type, value: action.payload.value }],
            };
        case Types.DeleteAlert:
            let arr = [...state.alert];
            if (action.payload.index > -1) {
                arr.splice(action.payload.index, 1);
            } else {
                arr = [];
            }
            return {
                ...state,
                alert: arr,
            };
        default:
            return state;
    }
};
