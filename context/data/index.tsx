/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { ProductContextType } from '@/interface/Context/ProductContext';
import { CompanyTypes } from '@/interface/Workplace/Company';
import { useRouter } from 'next/router';
import { createContext, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const initialProductContext: ProductContextType = {
    isDataFetched: false,
    productList: [],
    initialData: [],
    authenticated: false,
    company: null,
    productCatagoryList: [],
    whichDataToFetched: '',
    viewingItem: null,
    setProductList: (items) => {},
    setInitialData: (items) => {},
    setCompany: (company) => {},
    setAuthenticated: (auth) => {},
    productCatagoryURL: (ctName) => '',
    isActiveCatagory: (ctName) => false,
    setProductCatagoryList: (cat) => {},
    setViewingItem: (item) => {},
};
export const productcontext = createContext(initialProductContext);

const DataProvider = ({ children }: { children: JSX.Element }) => {
    const router = useRouter();
    const id = router.query.id as string[];
    const companyId = id && id[0];
    const position = id && id[1];
    const dataType = id && id[2];
    const page = (id && id[3]) || 1;
    const isDataFetched = companyId && position && dataType && page;
    const whichDataToFetched = !id ? 'dashboard' : id && id.length === 1 ? 'company' : '';

    const [productList, setProductList] = useState([]);
    const [company, setCompany] = useState(null);
    const [authenticated, setAuthenticated] = useState(false);
    const [productCatagoryList, setProductCatagoryList] = useState([]);

    const [initialData, setInitialData] = useState(productList);
    const [viewingItem, setViewingItem] = useState(null);

    const productCatagoryURL = (catagoryName: string): string => {
        return `http://localhost:3000/dashboards/${companyId}/${position}/${catagoryName}/1`;
    };

    const isActiveCatagory = (ctName: string): boolean => {
        return dataType === ctName && true;
    };

    return (
        <productcontext.Provider
            value={{
                isDataFetched: isDataFetched && true,
                productList,
                initialData,
                setProductList,
                setInitialData,
                authenticated,
                setAuthenticated,
                company,
                setCompany,
                productCatagoryURL,
                isActiveCatagory,
                productCatagoryList,
                setProductCatagoryList,
                whichDataToFetched,
                viewingItem,
                setViewingItem,
            }}
        >
            {children}
        </productcontext.Provider>
    );
};

export default DataProvider;
