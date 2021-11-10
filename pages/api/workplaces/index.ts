/* eslint-disable @typescript-eslint/no-unused-vars */
import nc from 'next-connect';
import database from 'middlware/db';
import onError from 'middlware/error';
import middleware from 'middlware/all';

import { Db, MongoClient } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { addWorkPlace } from 'db/user';
import firebase from 'db/firebase';
import { createWorkPlace } from 'db/workplace';
import { connectToDB } from 'db/connect';

export interface Request extends NextApiRequest {
    db: Db;
    dbClient: MongoClient;
    user: { email: string; id: string; name: string; picture: string };
}

const handeler = nc({ onError });
handeler.use(middleware);

handeler.get(async (req: Request, res) => {
    const { workplaceName, workplaceCode, productCatagory } = req.body;
    const { db } = await connectToDB();
    const user = {
        fullName: req.user?.name,
        email: req.user?.email,
        userId: req.user?.id,
        imgUrl: req.user?.picture,
    };
    const data = await createWorkPlace(db, req.body, user);
    // await firebase.firestore().collection('workplaces').doc(req.user.id).set({
    //     id: req.body.id,
    //     changeType: 'added',
    //     changeTime: new Date().toISOString(),
    // });
    res.send({ data: data });
});
export default handeler;
