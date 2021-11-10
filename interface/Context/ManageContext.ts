/* eslint-disable @typescript-eslint/no-explicit-any */
export type Props = {
    productList?: any;
    company?: any;
    authenticated?: boolean;
    workplaces?: any;
    user?: any;
    productCatagory?: any;
};

export interface ManageContextType {
    updateData: (props: Props) => void;
    removeData: () => void;
}
