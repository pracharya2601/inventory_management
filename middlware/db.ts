/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectToDB } from '../db/connect';

declare global {
    namespace NodeJS {
        interface Global {
            mongo: any;
            gcloud: any;
        }
    }
}

export default async function database(req, res, next) {
    const { db, dbClient, storage } = await connectToDB();
    req.db = db;
    req.storage = storage;
    req.dbClinet = dbClient;

    next();
}
