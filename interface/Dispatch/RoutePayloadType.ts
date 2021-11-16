import { Types } from '.';

export type RoutePayloadType = {
    [Types.PathName]: {
        val: string | string[];
        key: string;
    };
    [Types.AsPath]: {
        asPath: string;
    };
};
