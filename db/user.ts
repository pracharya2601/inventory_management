/* eslint-disable prettier/prettier */
import { Db, ObjectId } from 'mongodb'
export const getUserById = async (db: Db, id: string) => {
  try {
    const data = await db.collection('users').findOne({ _id: ObjectId(id) });
    return JSON.stringify(data)
  } catch (e) {
    console.log("this is the error", e)
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
