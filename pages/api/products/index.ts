import nc from 'next-connect';
import onError from 'middlware/error';
import middleware from 'middlware/all';

import { Db, MongoClient } from 'mongodb';
import { NextApiRequest } from 'next';

import datas from '../../../db.json';
import dbdelivered from '../../../dbdelevered.json';
import dbprocessing from '../../../dbprocessing.json';

export interface Request extends NextApiRequest {
    db: Db;
    dbClient: MongoClient;
    user: { email: string; id: string };
}

const handeler = nc({ onError });
handeler.use(middleware);

handeler.get(async (req: Request, res) => {
    const productType = req.query.productType;
    const page = req.query.productType;
    const companyId = req.query.companyId;
    const search = req.query.search;
    console.log('This is here', search);

    const data = datas;
    if (data) {
        res.status(200).json(JSON.stringify({ data }));
    } else {
        res.status(400).json({ errors: 'Not Authorize' });
    }
});

export default handeler;
