import { Db, ObjectId } from 'mongodb';

export const cancelOrder = async (db: Db, staticDataId: string, workplaceId: string, statData: { stat: string; by: string; date: string }) => {
  try {
    const data = await db.collection('static_products').findOneAndUpdate(
      {
        _id: ObjectId(staticDataId),
        "soldBy.businessId": workplaceId,
      },
      {
        $set: {
          'productType': 'canceled',

        },
        $push: {
          stat: statData
        },
      },
      {
        returnNewDocument: true
      }
    );
    if (!data) {
      return;
    }
    return data.value;

  } catch (error) {
    console.log('Error while order cancel function', error);
    return;
  }
}