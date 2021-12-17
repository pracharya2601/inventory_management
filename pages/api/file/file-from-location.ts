import nc from 'next-connect';
import onError from 'middlware/error';
import middleware from 'middlware/all';

import { Db, MongoClient, ObjectId } from 'mongodb';
import { NextApiRequest } from 'next';

import datas from '../../../db.json';
import dbdelivered from '../../../dbdelevered.json';
import dbprocessing from '../../../dbprocessing.json';
import { CreateDataType, ProductType } from '@/interface/Product/ProductInterface';
import { getOneWorkPlace } from 'db/workplace';
import { CompanyTypes } from '@/interface/Workplace/Company';
import { Request } from '@/interface/Request';

const handeler = nc({ onError });
handeler.use(middleware);

handeler.post(async (req: Request, res) => {
    const userId = req.user?.id;
    const data = req.body;
    const eventCreate = `create-product-${userId}`;
    try {
        console.log(eventCreate);
        res?.socket?.server?.io?.emit(eventCreate, data);
        res.status(200).json(JSON.stringify({ data: 'success' }));
    } catch (error) {
        res.status(400).json({ errors: 'Something went wrong' });
    }
});

export default handeler;
