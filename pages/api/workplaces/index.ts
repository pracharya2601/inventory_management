/* eslint-disable @typescript-eslint/no-unused-vars */
import nc from 'next-connect';
import onError from 'middlware/error';
import middleware from 'middlware/all';

import { Db, MongoClient, ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { createNewWorkPlace, createWorkplaceVariant } from 'db/workplace';
import { connectToDB } from 'db/connect';
import { CompanyTypes, CompanyVariants } from '@/interface/Workplace/Company';
import { WorkplaceTypes } from '@/interface/Workplace/WorkplaceListTypes';
import { updateWorkplaces } from 'db/user';
import { Request } from '@/interface/Request';

const handeler = nc({ onError });
handeler.use(middleware);

handeler.get(async (req: Request, res) => {
    // const { workplaceName, workplaceCode, productCatagory } = req.body;
    const { db } = await connectToDB();
    const user = {
        fullName: req.user?.name,
        email: req.user?.email,
        userId: req.user?.id,
        imgUrl: req.user?.picture,
    };
    // const data = await createWorkPlace(db, req.body, user);
    res.send({ data: user });
});

handeler.post(async (req: Request, res) => {
    const body: { workplaceData: CompanyTypes; workplaceVariant: CompanyVariants } = req.body;
    const _id = new ObjectId();
    const createdAt = new Date().toISOString();
    const userId = req.user?.id;
    const creator = {
        fullName: req.user?.name,
        email: req.user?.email,
        joined: true,
        joinedDate: createdAt,
        userId: userId,
        positionLabel: 'admin',
        addBy: userId,
    };
    const newStafffs = body?.workplaceData?.staffs?.map((st) => ({
        ...st,
        joined: false,
        joinedDate: createdAt,
        userId: '',
        addBy: userId,
    }));
    const workplaceData: CompanyTypes = {
        ...body.workplaceData,
        _id: _id,
        createdAt: createdAt,
        staffs: [...newStafffs, creator],
    };
    //should have workplaceName, workplaceId,  workplaceCode, logoUrl, staffs
    const addedWorkplace = await createNewWorkPlace(req.db, workplaceData, userId);
    if (!addedWorkplace) {
        //send message to me with error
        return res.status(400).json({ errors: 'Server error! Please try again later!!' });
    }
    const updateOnUserDocument: WorkplaceTypes = {
        joinedDate: createdAt,
        positionLabel: 'admin',
        workplaceId: workplaceData._id,
        workplaceName: workplaceData.workplaceName,
    };
    try {
        await updateWorkplaces(req.db, userId, updateOnUserDocument);
    } catch (error) {
        console.log('error from addone user workplace', error);
    }
    //should havew variantColor variantSizes
    try {
        const workplaceVariant = { ...body.workplaceVariant, _id: addedWorkplace._id };
        await createWorkplaceVariant(req.db, workplaceVariant);
        //update on user workplaces
        //send email to user
        //send email to each user

        //return wworkplace type that goes on useraccount ##WorkplaceTypes
        res.status(200).json(JSON.stringify({ data: updateOnUserDocument }));
    } catch (error) {
        console.log('error inside workplace route', error);
        res.status(400).json(JSON.stringify({ errors: 'Server error! Please try again later!!' }));
    }
});

export default handeler;
