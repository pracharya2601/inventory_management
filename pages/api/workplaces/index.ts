import nc from 'next-connect';
import database from 'middlware/db';
import onError from 'middlware/error';
import middleware from 'middlware/all';

import { Db, MongoClient } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { addWorkPlace } from 'db/user';
import firebase from 'db/firebase';


export interface Request extends NextApiRequest {
  db: Db
  dbClient: MongoClient
  user: { email: string; id: string }
}

const handeler = nc({ onError });
handeler.use(middleware);
handeler.post(async (req: Request, res) => {
  await addWorkPlace(req.db, req.user.id, req.body)
  await firebase.firestore().collection('workplaces').doc(req.user.id).set({
    id: req.body.id,
    changeType: "added",
    changeTime: new Date().toISOString(),
  })
  res.send({ data: 'success' })
})
export default handeler;