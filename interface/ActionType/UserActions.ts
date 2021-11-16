import { ActionMap } from '.';
import { UserPayloadType } from '../Dispatch';

export type UserActions = ActionMap<UserPayloadType>[keyof ActionMap<UserPayloadType>];
