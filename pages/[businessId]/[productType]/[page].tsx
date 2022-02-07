import { getSession } from 'next-auth/client';
import { connectToDB } from 'db/connect';
import { checkWorkplace } from 'db/workplace';
import React from 'react';
import { ProductType } from '@/interface/Product/ProductInterface';
import { getSearchProductList } from 'db/products';
import { getItems } from 'db/items';
import { ProcessProductPayloadType } from '@/interface/Product/ProcessProductType';
import Inventory from '@/components/layout/product/Inventory';
import Other from '@/components/layout/product/Other';

const PAGE_LIMIT = 10;

interface OtherType extends Omit<ProcessProductPayloadType, 'businessId'> {
    deliveryAttempt?: 'failed';
}

const ProductList = ({ data, count, dataType }: { data: any[] | []; count: number; dataType: string }) => {
    if (dataType === 'inventory' || dataType === 'draft') {
        return <Inventory data={data as ProductType[]} count={count as number} />;
    } else {
        return <Other data={data as Array<OtherType>} count={count as number} />;
    }
};

export async function getServerSideProps(context: any) {
    const session = await getSession(context);
    if (!session || !session.user) {
        return {
            redirect: {
                permanent: false,
                destination: `/signin?callbackUrl=${context.resolvedUrl}`,
            },
        };
    }
    const { db } = await connectToDB();
    const businessId = context.query.businessId;
    const productType = context.query.productType as string;
    if (['inventory', 'processing', 'shipped', 'delivered', 'canceled', 'draft'].indexOf(productType) === -1) {
        return {
            redirect: {
                permanent: false,
                destination: `/${businessId}`,
            },
        };
    }
    const pageNumber = context.query.page as string;
    const skipNumber = pageNumber === '1' ? 0 : +pageNumber - 1 * PAGE_LIMIT;
    const searchTerm = context.query.search as string;
    const userId = session.user.id;
    const isUserRelatedtoCompany = await checkWorkplace(db, userId, businessId);
    if (!isUserRelatedtoCompany) {
        return {
            redirect: {
                permanent: false,
                destination: `/`,
            },
        };
    }
    let count = 0;
    let itemlist = [];
    if (searchTerm) {
        const { data, totalCount } = await getSearchProductList(db, businessId, productType, skipNumber, searchTerm);
        if (totalCount > 0) {
            itemlist = JSON.parse(JSON.stringify(data));
            count = totalCount;
        }
    } else {
        const { data, totalCount } = await getItems(db, businessId, productType, skipNumber);
        if (totalCount > 0) {
            itemlist = JSON.parse(JSON.stringify(data));
            count = totalCount;
        }
    }
    return {
        props: {
            data: itemlist,
            count: count,
            dataType: productType,
        },
    };
}
export default ProductList;
