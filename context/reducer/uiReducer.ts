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
        default:
            return state;
    }
};
