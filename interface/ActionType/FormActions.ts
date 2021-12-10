import { ActionMap } from '.';
import { FormPayloadType } from '../Dispatch';

export type FormActions = ActionMap<FormPayloadType>[keyof ActionMap<FormPayloadType>];
