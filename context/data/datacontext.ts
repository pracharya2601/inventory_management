/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext } from 'react';

type DataContextType = {
    data: any;
    // stateInitialize: (data: any) => void;
    // addDataList: (companyId: string, dataType: string, data: any, pageNumber: number) => void;
    addDataList: (dataId: string, data: any) => void;
    // addOrUpdateSingleData: (companyId: string, dataType: string, data: any) => void;
    // deleteData: (companyId: string, dataType: string, dataId: string) => void;
};

const contextDefaultValue: DataContextType = {
    data: {},
    // stateInitialize: () => { },
    addDataList: () => {},
    // addOrUpdateSingleData: () => { },
    // deleteData: () => { },
};

export const datacontext = createContext<DataContextType>(contextDefaultValue);
