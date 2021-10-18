import { UserSession } from '../AuthSession';
import { WorkplaceTypes } from '../Workplace/WorkplaceListTypes';

export interface UserContextType {
    user: UserSession;
    workplaces: WorkplaceTypes[] | [];
    setUser: (obj: UserSession) => void;
    setWorkplaces: (arr: WorkplaceTypes[]) => void;
}
