import { Types } from '.';
import { UserSession } from '../AuthSession';
import { WorkplaceTypes } from '../Workplace/WorkplaceListTypes';

export type UserPayloadType = {
    [Types.Authenticated]: {
        authenticated: boolean;
    };
    [Types.GetUser]: {
        userdata: UserSession;
    };
    [Types.GetUserWorkplaces]: {
        workplaces: WorkplaceTypes[] | [];
    };
};
