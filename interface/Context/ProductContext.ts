import { ProductCatagoryType } from '../Product/ProductCatagory';
import { ProductType } from '../Product/ProductInterface';
import { CompanyTypes } from '../Workplace/Company';

export interface ProductContextType {
    isDataFetched: boolean;
    productList: ProductType[] | [];
    initialData: ProductType[] | [];
    authenticated: boolean;
    company: CompanyTypes | null;
    productCatagoryList: ProductCatagoryType[];
    whichDataToFetched: string;
    viewingItem: ProductType | null;
    setProductList: (items: ProductType[]) => void;
    setInitialData: (items: ProductType[]) => void;
    setCompany: (company: CompanyTypes[]) => void;
    setAuthenticated: (auth: boolean) => void;
    productCatagoryURL: (ctName: string) => string;
    isActiveCatagory: (ctName: string) => boolean;
    setProductCatagoryList: (cat: ProductCatagoryType[]) => void;
    setViewingItem: (item: ProductType) => void;
}
