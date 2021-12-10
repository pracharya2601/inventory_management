import { getSession } from 'next-auth/client';
import ComponentWrapper from '@/components/layout/ComponentWrapper';
import { connectToDB } from 'db/connect';
import { getOneWorkPlace } from 'db/workplace';
import React, { useContext, useEffect, useState } from 'react';
import { appContext } from '@context/appcontext';
import { useRouter } from 'next/router';
import Dashboard from '@/components/layout/company/Dashboard';
import BusinessNavbar from '@/components/layout/company/BusinessNavbar';
import { CompanyTypes, CompanyVariants } from '@/interface/Workplace/Company';
import { FormComponent } from '@/components/layout/product/kit/FormComponent';
import { CreateDataType } from '@/interface/Product/ProductInterface';
import Button from '@/components/elements/Button';
import { action } from '@context/action';

const initialData = {
    name: '',
    description: '',
    listDescription: [{ id: 0, desckey: '', desc: '' }],
    guide: [{ id: 0, type: '', link: '' }],
    images: [{ id: 0, url: '', color: '' }],
    productdetail: [{ id: 0, detailkey: '', detail: '' }],
    catagory: [],
    skus: [{ id: 0, color: '', size: '', price: 0, count: 0 }],
    productType: '',
};

const CreateData = ({ variant }: { variant: CompanyVariants }) => {
    /**
     * @needhook move this state and usestate to the hooks and useeffect for realtime data fetching
     */
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
    const createProductSubmit = (item: CreateDataType) => {
        console.log(item);
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
                        <FormComponent data={initialData} onSubmit={createProductSubmit} />
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
    //instead of company data we have to get variants data and other studff
    const companyData: CompanyTypes = await getOneWorkPlace(db, businessId as string, userId);

    if (!companyData) {
        return {
            redirect: {
                permanent: false,
                destination: `/`,
            },
        };
    }

    const companydata = JSON.parse(JSON.stringify(companyData));
    // company variant data need to be render for creating purpose
    return {
        props: {
            companydata,
            variant: {
                colorVariants: companyData.variantColors,
                sizeVariants: companyData.variantSizes,
            },
        },
    };
}
export default CreateData;
