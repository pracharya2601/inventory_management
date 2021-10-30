import { StaffType } from './StaffType';

export interface SType {
    email: string;
    positionLabel: StaffType;
    joined: boolean;
}

export interface CompanyTypes {
    _id: string;
    workplaceName: string;
    createdAt: string;
    logoUrl: string;
    admin: SType;
    staffs: SType;
}
