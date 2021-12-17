import { getSession } from 'next-auth/client';
import ComponentWrapper from '@/components/layout/ComponentWrapper';
import { connectToDB } from 'db/connect';
import datas from 'db.json';
import { checkWorkplace } from 'db/workplace';
import { ProductType } from '@/interface/Product/ProductInterface';
import React, { useContext, useEffect, useState } from 'react';
import { appContext } from '@context/appcontext';
import { useRouter } from 'next/router';
import Dashboard from '@/components/layout/company/Dashboard';
import BusinessNavbar from '@/components/layout/company/BusinessNavbar';
import ProductPreviewDetail from '@/components/layout/product/ProductPreview/ProductPreviewDetail';
import { socket } from 'socket/client';

const ProductView = ({ data, error }: { data: ProductType; error: { type: string; message: string } | null }) => {
    const [singleProduct, setSingleProduct] = useState<ProductType>(data);
    const router = useRouter();
    const businessId = router.query?.businessId;
    const productId = router.query?.productId;
    const eventListern = `${businessId}-${productId}`;
    const {
        state: {
            user: { userdata },
        },
    } = useContext(appContext);

    useEffect(() => {
        /**
         * @info useeffect is for socket and to update on realtime
         */

        socket.on(eventListern, (data: ProductType) => {
            console.log('sdsssd');
            if (singleProduct?._id === data._id) {
                setSingleProduct(data);
            }
        });
        return () => {
            setSingleProduct(null);
        };
    }, []);

    const business = userdata?.workplaces.find(({ workplaceId }) => workplaceId === router.query?.businessId);
    return (
        <ComponentWrapper>
            <Dashboard
                businessHeading={
                    <BusinessNavbar
                        name={business?.workplaceName}
                        id={business?.workplaceId}
                        position={business?.positionLabel}
                    />
                }
            >
                <ProductPreviewDetail data={singleProduct} />
            </Dashboard>
        </ComponentWrapper>
    );
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
    const businessId = context.query.businessId;
    const productId = context.query.productId;
    const { db } = await connectToDB();
    const isUserRelatedtoCompany = await checkWorkplace(db, session.user.id, businessId);
    if (!isUserRelatedtoCompany) {
        return {
            redirect: {
                permanent: false,
                destination: `/`,
            },
        };
    }
    const data = datas.find(({ _id, createdBy }) => _id === productId && createdBy.id === businessId);
    return {
        props: {
            data: data ? data : null,
            error: data
                ? null
                : {
                      type: 'NOT_FOUND',
                      message: 'Data not found',
                  },
        },
    };
}
export default ProductView;
