import nc from 'next-connect';
import onError from 'middlware/error';
import middleware from 'middlware/all';

import { getUserById } from 'db/user';
import { Request } from '@/interface/Request';
const handeler = nc({ onError });
handeler.use(middleware);

handeler.get(async (req: Request, res) => {
    const data = await getUserById(req.db, req.query.userId as string);
    res.status(200).json(JSON.stringify({ data }));
});

export default handeler;
