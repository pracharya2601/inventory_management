export interface ProcessProductInfo {
    imageUrl: string;
    referenceId: string;
    name: string;
    color: string;
    size: string;
    price: number;
    numberOfItem: number;
    total: number;
}
export interface ProcessingOrderDetail {
    subtotal: number;
    taxPercent: number;
    taxAmt: number;
    coupon: number;
    shipping: number;
    total: number;
}

export interface CustomerAddress {
    address: string;
    tol: string;
    city: string;
    state: string;
    nearByPlaces: string[] | [];
    addressDescription: string;
}

export interface OrderPaymentStatus {
    status: boolean;
    method: string;
    delivery: string;
    paymentId?: string;
    amount: number;
}

export interface ProcessProductPayloadType {
    _id?: string;
    businessId?: string;
    productType: 'processing';
    customerInfo: {
        customerId?: string;
        name: string;
        email: string;
        contactNo: string;
    };
    customerAddress: CustomerAddress;
    items: ProcessProductInfo[] | [];
    orderDetail: ProcessingOrderDetail;
    soldBy: {
        name: string;
        businessId: string;
    };
    stat: Array<{ stat: 'processed' | 'canceled'; by: string }>;
    orderCreatedBy: {
        name: string;
        userId: string;
    };
    paymentStatus: OrderPaymentStatus;
}
