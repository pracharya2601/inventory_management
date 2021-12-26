/**
 * @delete  delete staff route - delete from users, userworkplaces, remove from staffs workplaces to keep it on deleted Staff
 * @suspand suspand staff route - delete from users, userworkplaces, remove from staffs push it on suspended staff also suspand by who and when
 * @revive revive staff route - add to users , userworkplaces,  remove from suspand staff and put it on staffs
 */

//delete handelers.delete workplaceId,  staffId
//suspand?type=revive||suspand handelers.get workplaceId, staffId, suspand by who and when

import nc from 'next-connect';
import onError from 'middlware/error';
import middleware from 'middlware/all';

import { Request } from '@/interface/Request';
import { decrypt } from '@/hooks/middleware/encrypt';
import { deleteUnverifiedStaff, deleteVerifiedStaff } from 'db/workplace';

const handeler = nc({ onError });
handeler.use(middleware);

handeler.delete(async (req: Request, res) => {
    const workplaceId = req.query.workplaceId as string;
    const secret = req.query.secret as string;
    const verified = req.query.verified as 'true' | 'false';
    const staffId = req.query.staffId as string;
    const userId = req.user?.id;

    //update in the future about who delete the text
    //const deletedDate = new Date().toISOString();


    const eventI = `delete-employee-${workplaceId}`;
    const eventII = `remove-from-workspace-${staffId}`;
    const positionData = decrypt<{ positionLabel: string; workplaceId: string }>(secret);
    if (positionData.workplaceId !== workplaceId) {
        return res.status(402).json({ errors: 'Not Authorize' });
    }
    if (positionData.positionLabel !== 'admin') {
        return res.status(402).json({ errors: 'You cannot remove staff from the company.' });
    }
    try {
        if (verified === 'true') {
            await deleteVerifiedStaff(req.db, workplaceId, staffId);
        }
        if (verified === 'false') {
            await deleteUnverifiedStaff(req.db, workplaceId, staffId);
        }
        res?.socket?.server?.io?.emit(eventI, { val: staffId, verified: verified === 'true' ? true : false });
        if (verified === 'true') {
            res?.socket?.server?.io?.emit(eventII, staffId);
        }
        res.status(200).json(JSON.stringify({ data: 'Success' }));
    } catch (error) {
        res.status(403).json({ errors: 'Not authorize to Update employee.' });
    }
});

export default handeler;
