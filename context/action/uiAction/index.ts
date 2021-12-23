import { Types, UiPayloadType } from '@/interface/Dispatch';
import { createActionPayload } from '../createActionPayload';

export const uiAction = {
    toggleAction: createActionPayload<typeof Types.ToggleOpen, UiPayloadType[Types.ToggleOpen]>(Types.ToggleOpen),
    setAlert: createActionPayload<typeof Types.SetAlert, UiPayloadType[Types.SetAlert]>(Types.SetAlert),
    deleteAlert: createActionPayload<typeof Types.DeleteAlert, UiPayloadType[Types.DeleteAlert]>(Types.DeleteAlert),
};
