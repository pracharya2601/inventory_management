import { ActionMap } from '.';
import { WorkplacePayloadType } from '../Dispatch';

export type WorkplaceActions = ActionMap<WorkplacePayloadType>[keyof ActionMap<WorkplacePayloadType>];
