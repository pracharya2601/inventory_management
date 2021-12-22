import { ActionMap } from '.';
import { LugPayloadTypes } from '../Dispatch';

export type LugActions = ActionMap<LugPayloadTypes>[keyof ActionMap<LugPayloadTypes>];
