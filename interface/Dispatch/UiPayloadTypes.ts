import { Types } from '.';

export type UiPayloadType = {
    [Types.ToggleOpen]: {
        open: boolean;
        id: string;
    };
    [Types.SetAlert]: {
        type: 'danger' | 'notification' | 'warning' | 'success';
        value: string;
    };
    [Types.DeleteAlert]: {
        index: number;
    };
};
