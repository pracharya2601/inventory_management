import nc from 'next-connect';
import onError from 'middlware/error';
import middleware from 'middlware/all';

import { Db, MongoClient } from 'mongodb';
import { NextApiRequest } from 'next';

import datas from '../../../db.json';
import handler from '../hello';
import { ProductType } from '@/interface/Product/ProductInterface';
import { Request } from '@/interface/Request';

const handeler = nc({ onError });
handeler.use(middleware);

handeler.get(async (req: Request, res) => {
    const productId = req.query.productId;
    const companyId = req.query.companyId;
    const newData = datas.find(({ _id, createdBy }) => _id === productId && createdBy.id === companyId);
    const data = newData;
    if (data) {
        res.status(200).json(JSON.stringify({ data }));
    } else {
        res.status(400).json({ errors: 'Not Authorize' });
    }
});

handeler.post(async (req: Request, res) => {
    const body: ProductType = req.body;
    const businessId = req.query.businessId;
    const productId = req.query.productId;
    const eventNameI = `${businessId}-${productId}`;
    const eventNameII = `update.${businessId}-${body.productType}`;
    const updatedAt = {
        date: new Date().toISOString(),
        updatedBy: req.user?.id,
    };
    const newBody = {
        ...body,
        updatedAt: [...body.updatedAt, updatedAt],
    };
    //update to database;
    //after successs emit to
    try {
        res?.socket?.server?.io?.emit(eventNameI, newBody);
        res?.socket?.server?.io?.emit(eventNameII, newBody);
        res.status(200).json(JSON.stringify({ data: 'Success' }));
    } catch (e) {
        res.status(400).json({ errors: 'Something went wrong' });
    }
});

export default handeler;
