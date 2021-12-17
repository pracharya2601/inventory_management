/* eslint-disable @typescript-eslint/no-unused-vars */
import nc from 'next-connect';
import database from 'middlware/db';
import onError from 'middlware/error';
import middleware from 'middlware/all';

import { Db, MongoClient } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { getOneWorkPlace } from 'db/workplace';
import { getUserById } from 'db/user';
import { Request } from '@/interface/Request';

const handeler = nc({ onError });
handeler.use(middleware);
handeler.post(async (req: Request, res) => {
    const message = req.body;
    const mypath = req.query.id as string;

    res?.socket?.server?.io?.emit(mypath, message);
    res.status(201).json(message);
});
handeler.get(async (req: Request, res) => {
    const data = await getUserById(req.db, req.query.id as string);
    console.log('Inside data', data);
    res.status(200).json({ data: data });
});
export default handeler;
