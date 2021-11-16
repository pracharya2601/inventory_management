import { ActionsTypes } from '@/interface/ActionType';
import { RouteActions } from '@/interface/ActionType/RouteActions';
import { UiActions } from '@/interface/ActionType/UiActions';
import { UserActions } from '@/interface/ActionType/UserActions';
import { WorkplaceActions } from '@/interface/ActionType/WorkplaceActions';
import { routeReducer } from './routeReducer';
import { uiReducer } from './uiReducer';
import { userReducer } from './userReducer';
import { workplaceReducer } from './workplaceReducer';

export const reducer = ({ user, workplace, ui, route }, action: ActionsTypes) => ({
    user: userReducer(user, action as UserActions),
    workplace: workplaceReducer(workplace, action as WorkplaceActions),
    ui: uiReducer(ui, action as UiActions),
    route: routeReducer(route, action as RouteActions),
});
