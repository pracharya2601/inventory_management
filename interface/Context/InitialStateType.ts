import { UserSession } from '../AuthSession';
import { WorkplaceTypes } from '../Workplace/WorkplaceListTypes';
import { ProductType } from '../Product/ProductInterface';
import { CompanyTypes } from '../Workplace/Company';
import { ProductCatagoryType } from '../Product/ProductCatagory';

export interface UserDataType {
    authenticated: boolean;
    userdata: UserSession;
    workplaces: WorkplaceTypes[] | [];
}

export interface ProductDispatchType {
    dataType: string;
    data: ProductType[] | [];
    initialData?: ProductType[] | [];
}

export interface WorkplaceDataType {
    companydata: CompanyTypes | null;
    productCatagory: ProductCatagoryType[] | [];
    productList: ProductDispatchType;
    singleData: ProductType | null;
}

export interface ToggleOpenType {
    [id: string]: boolean;
}

export interface UiType {
    toggleOpen: ToggleOpenType | null;
}

export interface PathNameType {
    [key: string]: string | string[];
}

export interface RouteType {
    pathName: PathNameType | null;
    renderingPage: string;
    locale: string;
    asPath: string;
}

export interface InitialStateType {
    user: UserDataType;
    workplace: WorkplaceDataType;
    ui: UiType;
    route: RouteType;
}
