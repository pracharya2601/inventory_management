import nc from 'next-connect';
import onError from 'middlware/error';
import middleware from 'middlware/all';

import { updateUserInfo } from 'db/user';
import { Request } from '@/interface/Request';
const handeler = nc({ onError });
handeler.use(middleware);

handeler.post(async (req: Request, res) => {
    const userId = req.user?.id;
    const updatingData = req.body;
    try {
        await updateUserInfo(req.db, userId, updatingData);
        res.status(200).json(JSON.stringify({ data: 'Success' }));
    } catch (error) {
        res.status(403).json({ errors: 'Something Went Wrong Please try again later' });
    }
});

export default handeler;
