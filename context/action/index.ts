import { workplaceAction } from './workplaceAction';
import { userAction } from './userAction';
import { uiAction } from './uiAction';
import { routeAction } from './routeAction';
export const action = { ...userAction, ...workplaceAction, ...uiAction, ...routeAction };
