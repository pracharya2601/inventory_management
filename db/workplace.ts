import { StaffType } from '@/interface/Workplace/StaffType';
import { Db, ObjectId } from 'mongodb';

export const getOneWorkPlace = async (db: Db, id: string, userType: StaffType, userId: string) => {
    const hex = /[0-9A-Fa-f]{6}/g;
    const checkedId = hex.test(id) ? ObjectId(id) : id;
    console.log('dklsjdlksjdlk...........................', id, checkedId);
    try {
        const data = await db
            .collection('workplaces')
            .find({ _id: ObjectId(id) }, { [`${userType}`]: { $elemMatch: { userId: userId } } })
            .toArray();
        return JSON.stringify(data);
    } catch (e) {
        console.log('get one workplace error', e);
        return;
    }
};

export const createWorkPlace = async (
    db: Db,
    workplace: { workplaceName: string; workplaceCode: string },
    user: { userId: string; fullName: string; email: string },
    productCatagory,
) => {
    const newDate = new Date().toDateString();
    const _id = new ObjectId();
    const data = {
        _id: _id,
        ...workplace,
        createdAt: newDate,
        section: productCatagory || ['draft', 'stock', 'processing', 'delivered'],
        admin: [
            {
                ...user,
                joined: true,
                joinedDate: newDate,
            },
        ],
        staffs: [],
    };
    try {
        await db.collection('workplaces').insertOne(data);
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
    if (userType == 'admin') {
        try {
            await db.collection('workplaces').updateOne(
                {
                    _id: workspaceId,
                },
                {
                    $push: {
                        admin: data,
                    },
                },
            );
            return data;
            // send email to user here
        } catch (e) {
            return;
        }
    } else {
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
    }
};

export const deleteUnverifiedStaff = async (db: Db, workspaceId: string, userType: StaffType, email: string) => {
    if (userType == 'admin') {
        try {
            await db.collection('workplaces').updateOne(
                {
                    _id: workspaceId,
                },
                {
                    $pull: {
                        admin: { email: email },
                    },
                },
            );
            return email;
        } catch (e) {
            return;
        }
    } else {
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
    }
};
export const deleteVerifiedStaff = async (db: Db, workspaceId: string, userType: StaffType, userId: string) => {
    if (userType == 'admin') {
        try {
            await db.collection('workplaces').updateOne(
                {
                    _id: workspaceId,
                },
                {
                    $pull: {
                        admin: { userId: userId },
                    },
                },
            );
            return userId;
        } catch (e) {
            return;
        }
    } else {
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
    }
};
