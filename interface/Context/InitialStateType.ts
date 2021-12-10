import { UserData } from '../AuthSession';
import { WorkplaceTypes } from '../Workplace/WorkplaceListTypes';
import { FormDataType, Images, ProductType, Skus } from '../Product/ProductInterface';
import { CompanyTypes, CompanyVariants } from '../Workplace/Company';
import { ProductCatagoryType } from '../Product/ProductCatagory';

export interface UserDataType {
    authenticated: boolean;
    userdata: UserData;
    workplaces: WorkplaceTypes[] | [];
}

export interface ProductDispatchType {
    dataType: string;
    data: ProductType[] | [];
    initialData?: ProductType[] | [];
}

export interface ActiveColorType {
    color: string;
    index: number;
    stat: boolean;
}
export interface ActiveSizeType {
    size: string;
    index: number;
    stat: boolean;
}

export interface PreviewColors {
    color: string;
    stat: boolean;
}
export interface PreviewSizes {
    size: string;
    stat: boolean;
}

export interface PreviewDataType {
    activeImage: string;
    colors: PreviewColors[] | [];
    sizes: PreviewSizes[] | [];
    activeColor: ActiveColorType;
    activeSize: ActiveSizeType;
    count: number;
    skews: Skus[];
    images: Images[];
}

export interface PreviewType {
    [key: string]: PreviewDataType;
}
export interface WorkplaceDataType {
    companydata: CompanyTypes | null;
    variant: CompanyVariants;
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
    formData: FormDataType;
}
