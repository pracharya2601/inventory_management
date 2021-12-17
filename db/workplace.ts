import { CompanyTypes, CompanyVariants, EmployeeType } from '@/interface/Workplace/Company';
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
        if (data && data.workplacesIds.includes(workplaceId)) {
            return true;
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
                    workplacesIds: workplaceData._id.toString(),
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
                    workplacesIds: ObjectId(workplaceId),
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
