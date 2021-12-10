export const initialState = {
    user: {
        authenticated: false,
        userdata: null,
        workplaces: [],
    },
    workplace: {
        companydata: null,
        variant: {
            _id: '',
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
        productList: {
            dataType: '',
            data: [],
            initialData: [],
        },
        singleData: null,
    },
    formData: {
        updateData: null,
        createData: {
            name: '',
            description: '',
            listDescription: [{ id: 0, desckey: '', desc: '' }],
            guide: [{ id: 0, type: '', link: '' }],
            images: [{ id: 0, url: '', color: '' }],
            productdetail: [{ id: 0, detailkey: '', detail: '' }],
            catagory: [],
            skus: [{ id: 0, color: '', size: '', price: 0, count: 0 }],
            productType: '',
        },
    },
    ui: {
        toggleOpen: null,
    },
    route: {
        pathName: null,
        renderingPage: '',
        locale: '',
        asPath: '',
    },
};
