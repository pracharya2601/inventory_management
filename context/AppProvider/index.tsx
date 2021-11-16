import React, { useReducer } from 'react';
import { initialState } from '@context/initialState';
import { reducer } from '@context/reducer';
import { appContext } from '@context/appcontext';

const AppProvider: React.FC = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return <appContext.Provider value={{ state, dispatch }}>{children}</appContext.Provider>;
};

export default AppProvider;
