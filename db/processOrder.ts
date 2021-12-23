import { ProcessProductInfo } from '@/interface/Product/ProcessProductType';
import { getSingleProduct } from './products';
import { Db, ObjectId } from 'mongodb';
import { Skus } from '@/interface/Product/ProductInterface';

type ActionType = 'process' | 'cancel';
const convertArrayToObject = (array, key) =>
    array.reduce((acc, curr) => {
        const arr = acc[curr[key]] || [];
        acc[curr[key]] = [...arr, curr];
        return acc;
    }, {});

const updateLenthyData = async (
    db: Db,
    productId: string,
    workplaceId: string,
    datas: ProcessProductInfo[],
    type: ActionType,
) => {
    const storedData = await getSingleProduct(db, workplaceId, productId);
    const newSkus = storedData?.skus.map((sku: Skus) => {
        const itm = datas.find((d: ProcessProductInfo) => d.color === sku.color && d.size === sku.size);
        if (itm) {
            const count =
                type === 'process'
                    ? sku.count - itm.numberOfItem
                    : type === 'cancel'
                    ? sku.count + itm.numberOfItem
                    : sku.count;
            return {
                ...sku,
                count: count,
            };
        } else {
            return sku;
        }
    });
    try {
        await db.collection('products').updateOne(
            {
                _id: ObjectId(productId),
                'createdBy.id': workplaceId,
            },
            {
                $set: {
                    skus: newSkus,
                },
            },
        );
    } catch (error) {
        console.log(error);
    }
};

const updateSingleData = async (
    db: Db,
    productId: string,
    workplaceId: string,
    data: ProcessProductInfo,
    type: ActionType,
) => {
    const count = type === 'process' ? -data.numberOfItem : type === 'cancel' ? data.numberOfItem : 0;
    try {
        await db.collection('products').updateOne(
            {
                _id: ObjectId(productId),
                'skus.color': data.color,
                'skus.size': data.size,
            },
            {
                $inc: {
                    'skus.$.count': count,
                },
            },
        );
    } catch (error) {
        console.log(error);
    }
};

export const processOrder = async (db: Db, items: ProcessProductInfo[], businessId: string, type: ActionType) => {
    const newData = convertArrayToObject(items, 'referenceId');
    for (const key in newData) {
        if (newData.hasOwnProperty(key)) {
            if (newData[key].length > 1) {
                // in this case get the data and update it at once
                await updateLenthyData(db, key, businessId, newData[key], type);
            } else {
                //in this case update without getting data
                await updateSingleData(db, key, businessId, newData[key][0], type);
            }
        }
    }
};
