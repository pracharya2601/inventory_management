export const initialState = {
    user: {
        authenticated: false,
        userdata: null,
        workplaces: [],
    },
    workplace: {
        variant: {
            sizeVariants: [],
            colorVariants: [],
        },
        productCatagory: [
            { label: 'Inventory', id: 'inventory' },
            { label: 'Stock', id: 'stock' },
            { label: 'Processing', id: 'processing' },
            { label: 'Delivered', id: 'delivered' },
            { label: 'Canceled', id: 'canceled' },
        ],
    },
    lugItem: {
        items: [],
        customerInfo: {
            customerId: '',
            name: '',
            email: '',
            contactNo: '',
        },
        customerAddress: {
            address: '',
            tol: '',
            city: '',
            state: '',
            nearByPlaces: [],
            addressDescription: '',
        },
        orderDetail: {
            subtotal: 0,
            taxPercent: 10,
            taxAmt: 0,
            coupon: 0,
            shipping: 100,
            total: 0,
        },
    },
    ui: {
        toggleOpen: null,
    },
};
