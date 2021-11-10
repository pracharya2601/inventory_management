/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react/prop-types */
import { createContext, useEffect, useContext } from 'react';
import { usercontext } from '@context/user';
import { productcontext } from '@context/data';
import { ManageContextType, Props } from '@/interface/Context/ManageContext';

const initialManageData: ManageContextType = {
    updateData: (props) => {},
    removeData: () => {},
};

export const managecontext = createContext(initialManageData);

const ManageDataProvider = ({ children }: { children: JSX.Element }) => {
    const { setUser, setWorkplaces } = useContext(usercontext);
    const { setProductList, setInitialData, setCompany, setAuthenticated, setProductCatagoryList } =
        useContext(productcontext);

    const updateData = (props: Props) => {
        setUser(props?.user);
        setWorkplaces(props?.workplaces);
        setProductList(props?.productList);
        setInitialData(props?.productList);
        setCompany(props?.company);
        setAuthenticated(props?.authenticated);
        setProductCatagoryList(props?.productCatagory);
    };

    const removeData = () => {
        setUser(null);
        setWorkplaces([]);
        setProductList([]);
        setInitialData([]);
        setCompany(null);
        setAuthenticated(false);
        setProductCatagoryList([]);
    };

    return <managecontext.Provider value={{ updateData, removeData }}>{children}</managecontext.Provider>;
};

export default ManageDataProvider;
