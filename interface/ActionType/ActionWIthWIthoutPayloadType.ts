export interface ActionsWithPayload<TypeAction, TypePayload> {
    type: TypeAction;
    payload: TypePayload;
}

export interface ActionsWithoutPayload<TypeAction> {
    type: TypeAction;
}
