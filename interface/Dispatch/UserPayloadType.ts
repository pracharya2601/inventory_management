import { Types } from '.';
import { UserData } from '../AuthSession';
import { WorkplaceTypes } from '../Workplace/WorkplaceListTypes';

export type UserPayloadType = {
    [Types.Authenticated]: {
        authenticated: boolean;
    };
    [Types.GetUser]: {
        userdata: UserData;
    };
    [Types.GetUserWorkplaces]: {
        workplaces: WorkplaceTypes[] | [];
    };
};
