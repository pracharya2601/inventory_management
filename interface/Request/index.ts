import { NextApiRequest } from 'next';
import { Db, MongoClient } from 'mongodb';

export interface Request extends NextApiRequest {
    db: Db;
    dbClient: MongoClient;
    storage: Storage;
    user: { email: string; id: string; name: string; picture: string };
}
