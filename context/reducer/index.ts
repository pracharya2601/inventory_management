import { ActionsTypes } from '@/interface/ActionType';
import { LugActions } from '@/interface/ActionType/LugActions';
import { UiActions } from '@/interface/ActionType/UiActions';
import { UserActions } from '@/interface/ActionType/UserActions';
import { WorkplaceActions } from '@/interface/ActionType/WorkplaceActions';
import { lugItemReducer } from './lugItemReducer';
import { uiReducer } from './uiReducer';
import { userReducer } from './userReducer';
import { workplaceReducer } from './workplaceReducer';

export const reducer = ({ user, workplace, ui, lugItem }, action: ActionsTypes) => ({
    user: userReducer(user, action as UserActions),
    workplace: workplaceReducer(workplace, action as WorkplaceActions),
    ui: uiReducer(ui, action as UiActions),
    lugItem: lugItemReducer(lugItem, action as LugActions),
});
