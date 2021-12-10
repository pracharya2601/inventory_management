import { getSession } from 'next-auth/client';
import ComponentWrapper from '@/components/layout/ComponentWrapper';
import { connectToDB } from 'db/connect';
import { getOneWorkPlace } from 'db/workplace';
import datas from 'db.json';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { appContext } from '@context/appcontext';
import Dashboard from '@/components/layout/company/Dashboard';
import BusinessNavbar from '@/components/layout/company/BusinessNavbar';
import { CompanyTypes, CompanyVariants } from '@/interface/Workplace/Company';
import { ProductType } from '@/interface/Product/ProductInterface';
import { action } from '@context/action';
import Button from '@/components/elements/Button';
import { FormComponent } from '@/components/layout/product/kit/FormComponent';

type EditProductProps = {
    variant: CompanyVariants;
    itemData: ProductType;
};

const EditProduct = ({ itemData, variant }: EditProductProps) => {
    const router = useRouter();
    const {
        state: {
            user: { userdata },
        },
        dispatch,
    } = useContext(appContext);
    useEffect(() => {
        dispatch(
            action.setVariant({
                variant: variant,
            }),
        );
        return () => {
            dispatch(
                action.setVariant({
                    variant: {
                        _id: '',
                        colorVariants: [],
                        sizeVariants: [],
                    },
                }),
            );
        };
    }, []);
    const business = userdata?.workplaces.find(({ workplaceId }) => workplaceId === router.query?.businessId);

    const updateProductInformation = (item: ProductType) => {
        console.log(item);
        router.push(`/${router.query?.businessId}/view/${itemData._id}`);
    };
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
                <>
                    {business?.positionLabel === 'staff' ? (
                        <div className="h-96 flex flex-col gap-4 justify-center items-center p-4">
                            You are Staff You need to be admin to post Product
                            <Button label="Request your Employerr to make admin" />
                        </div>
                    ) : (
                        <FormComponent data={itemData} onSubmit={updateProductInformation} />
                    )}
                </>
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
    const { db } = await connectToDB();
    const businessId = context.query.businessId;
    const userId = session.user.id;
    const productId = context.query.productId;
    //instead of company data we have to get variants data and other studff
    const companyData = await getOneWorkPlace(db, businessId as string, userId);

    if (!companyData) {
        return {
            redirect: {
                permanent: false,
                destination: `/`,
            },
        };
    }
    // const companydata = JSON.parse(JSON.stringify(companyData));
    // company variant data need to be render for creating purpose
    const data = datas.find(({ _id, createdBy }) => _id === productId && createdBy.id === businessId);
    //get product with product id
    if (!data) {
        return {
            redirect: {
                permanent: false,
                destination: `/${businessId}/`,
            },
        };
    }
    return {
        props: {
            itemData: data ? data : null,
            variant: {
                colorVariants: companyData.variantColors,
                sizeVariants: companyData.variantSizes,
            },
        },
    };
}
export default EditProduct;
