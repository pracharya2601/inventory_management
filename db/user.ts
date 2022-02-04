/* eslint-disable prettier/prettier */
import { encrypt } from '@/hooks/middleware/encrypt';
import { WorkplaceTypes } from '@/interface/Workplace/WorkplaceListTypes';
import { Db, ObjectId } from 'mongodb'

export const getUserById = async (db: Db, id: string) => {
  try {
    const data = await db.collection('users').findOne({ _id: ObjectId(id) });
    return { ...data, workplaces: data.workplaces?.map((item) => ({
      ...item,
      secret: encrypt({ workplaceId: item.workplaceId, positionLabel: item.positionLabel, workplaceName: item.workplaceName })
    }))};

  } catch (e) {
    console.log("this is the error", e)
    return;
  }
}

export const updateUserInfo = async (db:Db, userId: string, data: any) => {
  try {
    await db.collection('users').updateOne(
      {
        _id: ObjectId(userId),
      }, {
        $set: {
          "name": data.name,
          "image": data.image,
          "address": data.address,
          "hasUpdated": true,
        }
      }
    )
    return true;
  } catch(error) {
    return;
  }
}

export const updateWorkplaces = async (db: Db, userId: string, data: WorkplaceTypes) => {
  try {
    await db.collection('users').updateOne(
      {
        _id: ObjectId(userId),
      },
      {
        $push: {
          workplaces: data,
        },
      },
    );
  } catch (error) {
    return;
  }
}

export const addWorkPlace = async (db: Db, id: string, workplace: { id: string, name: string }) => {
  try {
    const data = await db.collection('users').updateOne({ _id: ObjectId(id) }, {
      $push: {
        workplaces: workplace
      }
    });
    return JSON.stringify(data)
  } catch (e) {
    console.log("this is the error", e)
    return;
  }

}
