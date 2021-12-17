import { Db, MongoClient } from 'mongodb';
// import { Storage } from '@google-cloud/storage';

/**
 * We have to cache the DB connection
 * when used in a serverless environment otherwise
 * we may encounter performance loss due to
 * time to connect. Also, depending on your DB,
 * you might night be able to have many concurrent
 * DB connections. Most traditional DBs were not made for a stateless
 * environment like serverless. A serverless DB (HTTP based DB) whould work
 * better.
 */
global.mongo = global.mongo || {};
// global.gcloud = global.gcloud || {};

export const connectToDB = async () => {
    if (!global.mongo.client) {
        global.mongo.client = new MongoClient(process.env.DATABASE_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            bufferMaxEntries: 0,
            connectTimeoutMS: 10000,
        });

        console.log('connecting to DB');
        await global.mongo.client.connect();
        console.log('connected to DB');
    }
    // if (!global.gcloud.storage) {
    //     global.gcloud.storage = new Storage({
    //         projectId: process.env.PROJECT_ID,
    //         credentials: {
    //             client_email: process.env.CLIENT_EMAIL,
    //             private_key: process.env.PRIVATE_KEY,
    //         },
    //     });
    // }

    const db: Db = global.mongo.client.db('inventory');
    // const storage: Storage = global.gcloud;

    return { db, dbClient: global.mongo.client };
};
