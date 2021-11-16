import { ActionMap } from '.';
import { UiPayloadType } from '../Dispatch';

export type UiActions = ActionMap<UiPayloadType>[keyof ActionMap<UiPayloadType>];
