import { ActionMap } from '.';
import { RoutePayloadType } from '../Dispatch';

export type RouteActions = ActionMap<RoutePayloadType>[keyof ActionMap<RoutePayloadType>];
