import { ProductType } from '@/interface/Product/ProductInterface';
import { Db, ObjectId } from 'mongodb';

export const getSingleProduct = async (db: Db, workplaceId: string, productId: string) => {
    try {
        const data = await db.collection('products').findOne({
            $and: [
                { _id: ObjectId(productId) },
                {
                    'createdBy.id': workplaceId,
                },
            ],
        });
        return data;
    } catch (e) {
        console.log('Single product error', e);
        return;
    }
};

export const getProductLists = async (db: Db, workplaceId: string, productType: string, skipVal: number) => {
    try {
        const query = {
            productType: productType,
            'createdBy.id': workplaceId,
        };
        const [listResult, countResult] = await Promise.all([
            db.collection('products').find(query).skip(skipVal).limit(10).toArray(),
            db.collection('products').countDocuments(query),
        ]);
        return {
            totalCount: countResult,
            data: listResult,
        };
    } catch (e) {
        console.log('Single product error', e);
        return;
    }
};

export const getSearchProductList = async (
    db: Db,
    workplaceId: string,
    productType: string,
    skipVal: number,
    searchTerm: string,
) => {
    try {
        await db.collection('products').createIndex({ name: 'text', description: 'text' });
        const query = {
            $text: { $search: searchTerm },
            productType: productType,
            'createdBy.id': workplaceId,
        };
        const [listResult, countResult] = await Promise.all([
            await db.collection('products').find(query).skip(skipVal).limit(10).toArray(query),
            await db.collection('products').countDocuments(query),
        ]);
        return {
            totalCount: countResult,
            data: listResult,
        };
    } catch (error) {
        console.log('Error on get search product list', error);
        return;
    }
};

export const createProduct = async (db: Db, product: ProductType) => {
    try {
        await db.collection('products').insertOne(product);
        return product;
    } catch (e) {
        console.log('create product Error', e);
        return;
    }
};

export const updateProduct = async (db: Db, product: ProductType) => {
    try {
        await db.collection('products').updateOne(product);
        return product;
    } catch (error) {
        console.log('error on update product', error);
    }
};

export const deleteProduct = async () => {
    try {
        const data = await Math.random();
        return data;
    } catch (e) {
        console.log('Single product error', e);
        return;
    }
};
