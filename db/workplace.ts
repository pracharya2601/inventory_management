import { StaffType } from '@/interface/Workplace/StaffType';
import { Db, ObjectId } from 'mongodb';

export const getOneWorkPlace = async (db: Db, id: string, userId: string) => {
    try {
        const data = await db
            .collection('workplaces')
            .find({
                $and: [
                    { _id: ObjectId(id) },
                    {
                        staffs: {
                            $elemMatch: { userId: userId },
                        },
                    },
                ],
            })
            .toArray();
        return data[0];
    } catch (e) {
        console.log('get one workplace error', e);
        return;
    }
};

export const checkWorkplace = async (db: Db, id: string, workplaceId: string) => {
    try {
        const data = await db.collection('userworkplaces').findOne({ _id: ObjectId(id) });
        if (data && data.workplacesIds.indexOf(workplaceId) !== -1) {
            return true;
        }
    } catch (e) {
        return false;
    }
};

export const createWorkPlace = async (
    db: Db,
    body: { workplaceName: string; workplaceCode: string; productCatagory },
    user: { userId: string; fullName: string; email: string; imgUrl: string },
) => {
    const newDate = new Date().toDateString();
    const _id = new ObjectId();
    const data = {
        _id: _id,
        ...body,
        createdAt: newDate,
        staffs: [
            {
                ...user,
                joined: true,
                joinedDate: newDate,
                positionLabel: 'admin',
            },
        ],
    };
    try {
        //await db.collection('workplaces').insertOne(data);
        //send email to user about work space creation
        return data;
    } catch (e) {
        return;
    }
};

export const addNewStaff = async (db: Db, workspaceId: string, userType: StaffType, email: string) => {
    //send email to the user
    const data = {
        email: email,
        positionLabel: userType,
        joined: false,
    };
    try {
        await db.collection('workplaces').updateOne(
            {
                _id: workspaceId,
            },
            {
                $push: {
                    staffs: data,
                },
            },
        );
        return data;
        // send email to user here
    } catch (e) {
        return;
    }
};

export const deleteUnverifiedStaff = async (db: Db, workspaceId: string, userType: StaffType, email: string) => {
    try {
        await db.collection('workplaces').updateOne(
            {
                _id: workspaceId,
            },
            {
                $pull: {
                    staffs: { email: email },
                },
            },
        );
        return email;
    } catch (e) {
        return;
    }
};

export const deleteVerifiedStaff = async (db: Db, workspaceId: string, userType: StaffType, userId: string) => {
    try {
        await db.collection('workplaces').updateOne(
            {
                _id: workspaceId,
            },
            {
                $pull: {
                    staffs: { userId: userId },
                },
            },
        );
        return userId;
    } catch (e) {
        return;
    }
};
