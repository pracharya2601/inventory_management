import nc from 'next-connect';
import onError from 'middlware/error';
import middleware from 'middlware/all';

import { Db, MongoClient } from 'mongodb';
import { NextApiRequest } from 'next';
import { getOneWorkPlace, verifyWorkplace } from 'db/workplace';
import { WorkplaceTypes } from '@/interface/Workplace/WorkplaceListTypes';
import { updateWorkplaces } from 'db/user';
import { VerifiedDataPayloadType } from '@/interface/Workplace/Company';
import { Request } from '@/interface/Request';

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

handeler.post(async (req: Request, res) => {
    const workplaceId = req.query.workplaceId as string;
    const workplaceName = req.body;
    const positionLabel = req.query.positionLabel as string;
    const userId = req.user?.id;
    const fullName = req.user?.name;
    const userEmail = req.user?.email;
    const joinedDate = new Date().toISOString();

    const compEvent = `staffverify-${workplaceId}`;

    const updateOnUserDocument: WorkplaceTypes = {
        joinedDate: joinedDate,
        positionLabel: positionLabel,
        workplaceId: workplaceId,
        workplaceName: workplaceName,
    };
    try {
        await verifyWorkplace(req.db, workplaceId, userEmail, fullName, userId, joinedDate, positionLabel);
    } catch (error) {
        return res.status(400).json({ errors: 'Server error! Please try again later!!' });
    }
    try {
        await updateWorkplaces(req.db, userId, updateOnUserDocument);
    } catch (error) {
        return res.status(400).json({ errors: 'Server error! Please try again later!!' });
    }
    const responseEventPayload: VerifiedDataPayloadType = {
        email: userEmail,
        fullName: fullName,
        joined: true,
        joinedDate: joinedDate,
        userId: userId,
    };
    res?.socket?.server?.io?.emit(compEvent, responseEventPayload);
    res.status(200).json(JSON.stringify({ data: updateOnUserDocument }));
});

export default handeler;
