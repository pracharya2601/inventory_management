import nc from 'next-connect';
import onError from 'middlware/error';
import middleware from 'middlware/all';

import { Db, MongoClient, ObjectId } from 'mongodb';
import { NextApiRequest } from 'next';

import datas from '../../../db.json';
import { CreateDataType, ProductType } from '@/interface/Product/ProductInterface';
import { getOneWorkPlace } from 'db/workplace';
import { CompanyTypes } from '@/interface/Workplace/Company';
import { Request } from '@/interface/Request';
import { createProduct } from 'db/products';
const handeler = nc({ onError });
handeler.use(middleware);

handeler.get(async (req: Request, res) => {
    const productType = req.query.productType;
    const page = req.query.productType;
    const companyId = req.query.companyId;
    const search = req.query.search;

    const data = datas;
    if (data) {
        res.status(200).json(JSON.stringify({ data }));
    } else {
        res.status(400).json({ errors: 'Not Authorize' });
    }
});
handeler.post(async (req: Request, res) => {
    const body: CreateDataType = req.body;
    const businessId = req.query.businessId;
    const userId = req.user?.id;

    //for socket event
    const eventI = `add.${businessId}-${body.productType}`;
    try {
        const compData: CompanyTypes = await getOneWorkPlace(req.db, businessId as string, userId);
        //check user is admin or not to post data
        const updatedAt = {
            date: new Date().toISOString(),
            updatedBy: userId,
        };
        const postedBy = {
            id: userId,
            imageUrl: req.user?.picture,
            name: req.user.name,
        };
        const createdBy = {
            name: compData.workplaceName,
            imageUrl: compData.logoUrl,
            id: businessId as string,
        };
        const postedAt = new Date().toISOString();
        const newData: ProductType = {
            ...body,
            _id: new ObjectId(),
            updatedAt: [updatedAt],
            createdBy: createdBy,
            postedAt: postedAt,
            postedBy: postedBy,
        };
        const data = await createProduct(req.db, newData);
        console.log('created data', data);
        // new data need to add on database before response sending
        res?.socket?.server?.io?.emit(eventI, data);
        res.status(200).json(JSON.stringify({ data: 'success' }));
    } catch (e) {
        res.status(400).json({ errors: 'Something went wrong' });
    }
});

export default handeler;
