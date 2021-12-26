import { CustomerAddress, StatChange } from '@/interface/Product/ProcessProductType';
import { Db, ObjectId } from 'mongodb';
import { getProductLists } from './products';

export const getStaticProducts = async (db: Db, workplaceId: string, productType: string, skipVal: number) => {
  try {
    const query = {
      productType: productType,
      'soldBy.businessId': workplaceId,
    };
    const [listResult, countResult] = await Promise.all([
      db.collection('static_products').find(query).skip(skipVal).limit(10).toArray(),
      db.collection('static_products').countDocuments(query),
    ]);
    return {
      totalCount: countResult,
      data: listResult,
    };
  } catch (e) {
    console.log('Single product error', e);
    return;
  }
}

export const getItems = async (db: Db, workplaceId: string, productType: string, skipVal: number): Promise<{ data: any[] | []; totalCount: number }> => {
  switch (productType) {
    case 'inventory':
    case 'draft':
      return await getProductLists(db, workplaceId, productType, skipVal);
    case 'processing':
    case 'shipped':
    case 'delivered':
    case 'canceled':
      return await getStaticProducts(db, workplaceId, productType, skipVal);
    default:
      return {
        data: [],
        totalCount: 0
      }
  }
}

export const addressChangeStaticProduct = async (db: Db, productId: string, addressData: CustomerAddress, statVal: StatChange) => {
  try {
    await db.collection('static_products').updateOne(
      {
        _id: ObjectId(productId),
      }, {
      $set: {
        'customerAddress': addressData
      },
      $push: {
        stat: statVal
      }
    }
    )
    console.log('address change success addressChangeStaticProduct')
    return true;

  } catch (error) {
    console.log('address change', error);
    return;
  }

}