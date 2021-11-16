import { Types } from '.';

export type UiPayloadType = {
    [Types.ToggleOpen]: {
        open: boolean;
        id: string;
    };
};
