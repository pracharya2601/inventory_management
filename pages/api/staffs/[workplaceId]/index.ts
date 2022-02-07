import nc from 'next-connect';
import onError from 'middlware/error';
import middleware from 'middlware/all';

import { Db, MongoClient } from 'mongodb';
import { NextApiRequest } from 'next';
import { addNewStaffs, deleteUnverifiedStaff, getOneWorkPlace, verifyWorkplace } from 'db/workplace';
import { WorkplaceTypes } from '@/interface/Workplace/WorkplaceListTypes';
import { updateWorkplaces } from 'db/user';
import { VerifiedDataPayloadType } from '@/interface/Workplace/Company';
import { Request } from '@/interface/Request';
import { decrypt } from '@/hooks/middleware/encrypt';

const handeler = nc({ onError });
handeler.use(middleware);

handeler.post(async (req: Request, res) => {
    const workplaceId = req.query.workplaceId as string;
    const secret = req.query.secret as string;
    const staffs = req.body;
    const userId = req.user?.id;
    const joinedDate = new Date().toISOString();
    const eventI = `create-employee-${workplaceId}`;
    const positionData = decrypt<{ positionLabel: string; workplaceId: string }>(secret);

    if (positionData.workplaceId === workplaceId && positionData.positionLabel === 'admin') {
        const newStaffs = staffs.map((st) => ({
            ...st,
            joined: false,
            joinedDate: joinedDate,
            userId: '',
            addBy: userId,
        }));
        try {
            await addNewStaffs(req.db, newStaffs, workplaceId);
        } catch (error) {
            return res.status(400).json({ errors: 'Server error! Please try again later!!' });
        }
        res?.socket?.server?.io?.emit(eventI, newStaffs);
        res.status(200).json(JSON.stringify({ data: 'Success' }));
    } else {
        res.status(403).json({ errors: 'Not authorize to create employee.' });
    }
});

handeler.delete(async (req: Request, res) => {
    const workplaceId = req.query.workplaceId as string;
    const secret = req.query.secret as string;
    const userId = req.user?.id;
    const email = req.query.email as string;
    const deletedDate = new Date().toISOString();
    const eventI = `delete-employee-${workplaceId}`;
    const positionData = decrypt<{ positionLabel: string; workplaceId: string }>(secret);

    console.log(workplaceId, email);
    if (positionData.workplaceId === workplaceId && positionData.positionLabel === 'admin') {
        try {
            // await deleteUnverifiedStaff(req.db, workplaceId, userId);
        } catch (error) {
            return res.status(400).json({ errors: 'Server error! Please try again later!!' });
        }
        res?.socket?.server?.io?.emit(eventI, email);
        res.status(200).json(JSON.stringify({ data: 'Success' }));
    } else {
        res.status(403).json({ errors: 'Not authorize to Update employee.' });
    }
});
export default handeler;
