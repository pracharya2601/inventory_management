import { Types, UserPayloadType } from '@/interface/Dispatch';
import { createActionPayload } from '../createActionPayload';

export const userAction = {
    checkAuthenticated: createActionPayload<typeof Types.Authenticated, UserPayloadType[Types.Authenticated]>(
        Types.Authenticated,
    ),
    getUser: createActionPayload<typeof Types.GetUser, UserPayloadType[Types.GetUser]>(Types.GetUser),
    getUserWorkplaces: createActionPayload<typeof Types.GetUserWorkplaces, UserPayloadType[Types.GetUserWorkplaces]>(
        Types.GetUserWorkplaces,
    ),
};
