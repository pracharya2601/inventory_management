import { ActionsWithoutPayload, ActionsWithPayload } from '@/interface/ActionType/ActionWIthWIthoutPayloadType';

export function createActionPayload<TypeAction, TypePayload>(
    actionType: TypeAction,
): (payload: TypePayload) => ActionsWithPayload<TypeAction, TypePayload> {
    return (p: TypePayload): ActionsWithPayload<TypeAction, TypePayload> => {
        return {
            payload: p,
            type: actionType,
        };
    };
}

export function createAction<TypeAction>(actionType: TypeAction): () => ActionsWithoutPayload<TypeAction> {
    return (): ActionsWithoutPayload<TypeAction> => {
        return {
            type: actionType,
        };
    };
}
