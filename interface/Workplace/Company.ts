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
    positionLabel: string;
    fullName: string;
    joined: boolean;
    joinedDate: string;
    userId: string;
    addBy: string;
}

export type VerifiedDataPayloadType = Omit<EmployeeType, 'positionLabel' | 'addBy'>;

export interface CompanyTypes {
    _id: string;
    workplaceName: string;
    workplaceCode: string;
    productCatagroy: ProductCatagory[] | [];
    createdAt: string;
    logoUrl: string;
    staffs: EmployeeType[];
    variantColors: string[];
    variantSizes: string[];
}
export interface CompanyVariants {
    colorVariants: string[] | [];
    sizeVariants: string[] | [];
}

export type CreateStaffFormType = Omit<EmployeeType, 'joined' | 'joinedDate' | 'userId' | 'addBy'>;

export interface WorkplaceDataType extends Omit<CompanyTypes, 'staffs'> {
    staffs: CreateStaffFormType[];
}

export interface CreateCompanyType {
    workplaceData: Omit<WorkplaceDataType, '_id' | 'createdAt'>;
    workplaceVariant: Omit<CompanyVariants, '_id'>;
}
