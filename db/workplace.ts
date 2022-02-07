import { CompanyTypes, CompanyVariants, EmployeeType } from '@/interface/Workplace/Company';
import { Db, ObjectId } from 'mongodb';

export const getOneWorkPlace = async (db: Db, id: string, userId: string) => {
    try {
        const data = await db.collection('workplaces').findOne({
            $and: [
                { _id: new ObjectId(id.trim()) },
                {
                    staffs: {
                        $elemMatch: { userId: userId },
                    },
                },
            ],
        });
        return data;
    } catch (e) {
        console.log('get one workplace error', e);
        return;
    }
};

export const getUnverifiedWorkplaces = async (db: Db, staffEmail: string) => {
    try {
        const data = await db
            .collection('workplaces')
            .find({
                staffs: { $elemMatch: { email: staffEmail, joined: false, userId: '' } },
            })
            .toArray();
        return data;
    } catch (error) {
        return;
    }
};

export const checkWorkplace = async (db: Db, id: string, workplaceId: string) => {
    try {
        const data = await db.collection('userworkplaces').findOne({ _id: ObjectId(id) });
        const a = data.workplacesIds.find((item) => item.workplaceId === workplaceId);
        if (data) {
            return data;
        } else {
            return;
        }
    } catch (e) {
        return false;
    }
};

export const createNewWorkPlace = async (db: Db, workplaceData: CompanyTypes, userId: string) => {
    try {
        await db.collection('workplaces').insertOne(workplaceData);
        await db.collection('userworkplaces').updateOne(
            {
                _id: ObjectId(userId),
            },
            {
                $push: {
                    workplacesIds: {
                        workplacesIds: workplaceData._id.toString(),
                        positionLabel: 'admin',
                    },
                },
            },
        );
        return workplaceData;
    } catch (error) {
        return;
    }
};

export const verifyWorkplace = async (
    db: Db,
    workplaceId: string,
    userEmail: string,
    userName: string,
    userId: string,
    joinedDate: string,
    positionLabel: string,
) => {
    try {
        await db.collection('workplaces').updateOne(
            {
                _id: ObjectId(workplaceId),
                staffs: { $elemMatch: { email: userEmail } },
            },
            {
                $set: {
                    'staffs.$.userId': userId,
                    'staffs.$.fullName': userName,
                    'staffs.$.joinedDate': joinedDate,
                    'staffs.$.joined': true,
                },
            },
        );
        await db.collection('userworkplaces').updateOne(
            {
                _id: ObjectId(userId),
            },
            {
                $push: {
                    workplacesIds: { workplaceId, positionLabel },
                },
            },
        );
        return true;
    } catch (error) {
        return;
    }
};

export const createWorkplaceVariant = async (db: Db, variantData: CompanyVariants) => {
    try {
        await db.collection('workplaceVariant').insertOne(variantData);
        //return data and return the returned data
        return variantData;
    } catch (error) {
        console.log('wrror inside workplaceVariant', error);
        return;
    }
};

export const getWorkplaceVariant = async (db: Db, workplaceId: string) => {
    try {
        const data = await db.collection('workplaceVariant').findOne({
            _id: ObjectId(workplaceId),
        });
        return data;
    } catch (error) {
        console.log(' Error form get workplace variant', error);
        return;
    }
};

export const addNewStaffs = async (db: Db, staffs: EmployeeType[], workplaceId: string) => {
    try {
        await db.collection('workplaces').updateOne(
            { _id: ObjectId(workplaceId) },
            {
                $push: {
                    staffs: {
                        $each: staffs,
                    },
                },
            },
        );
        return true;
    } catch (error) {
        console.log(error);
        return;
    }
};

export const deleteUnverifiedStaff = async (db: Db, workspaceId: string, email: string) => {
    try {
        await db.collection('workplaces').updateOne(
            {
                _id: ObjectId(workspaceId),
            },
            {
                $pull: {
                    staffs: { email: email, joined: false },
                },
            },
        );
        return email;
    } catch (e) {
        return;
    }
};

export const deleteVerifiedStaff = async (db: Db, workspaceId: string, userId: string) => {
    try {
        await db.collection('workplaces').updateOne(
            {
                _id: ObjectId(workspaceId),
            },
            {
                $pull: {
                    staffs: { userId: userId, joined: true },
                },
            },
        );
        await db.collection('userworkplaces').updateOne(
            {
                _id: ObjectId(userId),
            },
            {
                $pull: {
                    workplacesIds: { workplaceId: workspaceId },
                },
            },
        );
        await db.collection('users').updateOne(
            {
                _id: ObjectId(userId),
            },
            {
                $pull: {
                    workplaces: { workplaceId: workspaceId },
                },
            },
        );
        return userId;
    } catch (e) {
        return;
    }
};
