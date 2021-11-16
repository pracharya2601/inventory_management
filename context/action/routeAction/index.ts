import { Types, RoutePayloadType } from '@/interface/Dispatch';
import { createActionPayload } from '../createActionPayload';

export const routeAction = {
    setPath: createActionPayload<typeof Types.PathName, RoutePayloadType[Types.PathName]>(Types.PathName),
    setAsPath: createActionPayload<typeof Types.AsPath, RoutePayloadType[Types.AsPath]>(Types.AsPath),
};
