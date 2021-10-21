/* eslint-disable @typescript-eslint/no-unused-vars */
import { getOneWorkPlace } from 'db/workplace';
import datas from '../db.json';

export const getProduct = async ({ session, query, db, ...rest }) => {
    let productList = [];
    let company = null;
    let productCatagory = [];
    if (session && query && query.id) {
        const userId = session.user.id;
        const workPlaceId = query.id[0];
        const staffPosition = query.id[1];
        const productType = query.id[2];
        const page = parseInt(query.id[3]);
        const compdata = JSON.parse(await getOneWorkPlace(db, workPlaceId, staffPosition, userId));
        company = compdata ? compdata[0] : null;
        productList = datas;
        productCatagory = [
            { label: 'Inventory', id: 'inventory' },
            { label: 'Stock', id: 'stock' },
            { label: 'Processing', id: 'processing' },
            { label: 'Delivered', id: 'delivered' },
        ];
    }
    return {
        session,
        productList,
        productCatagory,
        company,
        ...rest,
    };
};
