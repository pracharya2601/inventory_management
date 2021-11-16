/* eslint-disable @typescript-eslint/no-unused-vars */
import { getOneWorkPlace } from 'db/workplace';
import datas from '../db.json';

export const getProduct = async ({ session, query, db, ...rest }) => {
    let productList = {};
    let company = null;

    if (session && query && query.id) {
        const userId = session.user.id;
        const workPlaceId = query.id[0];
        const staffPosition = query.id[1];
        const dataType = (query.id[2] as string) || '';
        const page = parseInt(query.id[3]);
        const compdata = JSON.parse(await getOneWorkPlace(db, workPlaceId, staffPosition, userId));
        company = compdata ? compdata[0] : null;
        productList = { dataType, data: datas, initialData: datas };
    }
    console.log('RUnning');
    return {
        session,
        query,
        db,
        productList,
        company,
        ...rest,
    };
};
