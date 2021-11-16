import { StaffType } from './StaffType';

export interface SType {
    email: string;
    positionLabel: StaffType;
    joined: boolean;
}

export interface ProductCatagory {
    label: string;
    id: string;
}

export interface EmployeeType {
    email: string;
    fullName: string;
    joined: boolean;
    joinedDate: string;
    userId: string;
}

export interface CompanyTypes {
    _id: string;
    workplaceName: string;
    workplaceCode: string;
    productCatagroy: ProductCatagory[] | [];
    createdAt: string;
    logoUrl: string;
    admin: EmployeeType[];
    staffs: EmployeeType[] | [];
}
