/* eslint-disable @typescript-eslint/no-explicit-any */
import { ActionsTypes } from '@/interface/ActionType';
import { InitialStateType } from '@/interface/Context/InitialStateType';
import { initialState } from '@context/initialState';
import React, { createContext } from 'react';

export const appContext = createContext<{ state: InitialStateType; dispatch: React.Dispatch<ActionsTypes> }>({
    state: initialState,
    dispatch: () => null,
});
