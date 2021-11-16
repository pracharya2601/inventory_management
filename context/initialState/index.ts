export const initialState = {
    user: {
        authenticated: false,
        userdata: null,
        workplaces: [],
    },
    workplace: {
        companydata: null,
        productCatagory: [],
        productList: {
            dataType: '',
            data: [],
            initialData: [],
        },
        singleData: null,
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
