import { workplaceAction } from './workplaceAction';
import { userAction } from './userAction';
import { uiAction } from './uiAction';
import { lugAction } from './lugAction';
export const action = { ...userAction, ...workplaceAction, ...uiAction, ...lugAction };
