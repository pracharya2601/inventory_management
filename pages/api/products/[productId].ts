import nc from 'next-connect';
import onError from 'middlware/error';
import middleware from 'middlware/all';

import { Db, MongoClient } from 'mongodb';
import { NextApiRequest } from 'next';

import datas from '../../../db.json';

export interface Request extends NextApiRequest {
    db: Db;
    dbClient: MongoClient;
    user: { email: string; id: string };
}

const handeler = nc({ onError });
handeler.use(middleware);

handeler.get(async (req: Request, res) => {
    const productId = req.query.productId;
    const companyId = req.query.companyId;
    const newData = datas.find(({ _id, createdBy }) => _id === productId && createdBy.id === companyId);
    console.log(newData);

    const data = newData;
    if (data) {
        res.status(200).json(JSON.stringify({ data }));
    } else {
        res.status(400).json({ errors: 'Not Authorize' });
    }
});

export default handeler;
