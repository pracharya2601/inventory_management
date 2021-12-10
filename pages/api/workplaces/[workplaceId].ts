import nc from 'next-connect';
import onError from 'middlware/error';
import middleware from 'middlware/all';

import { Db, MongoClient } from 'mongodb';
import { NextApiRequest } from 'next';
import { getOneWorkPlace } from 'db/workplace';

export interface Request extends NextApiRequest {
    db: Db;
    dbClient: MongoClient;
    user: { email: string; id: string };
}

const handeler = nc({ onError });
handeler.use(middleware);

handeler.get(async (req: Request, res) => {
    const data = await getOneWorkPlace(req.db, req.query.workplaceId as string, req.user.id);
    if (data) {
        res.status(200).json(JSON.stringify({ data }));
    } else {
        res.status(400).json({ errors: 'Not Authorize' });
    }
});

export default handeler;
