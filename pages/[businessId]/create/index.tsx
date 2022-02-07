import { getSession } from 'next-auth/client';
import ComponentWrapper from '@/components/layout/ComponentWrapper';
import { connectToDB } from 'db/connect';
import { getWorkplaceVariant } from 'db/workplace';
import React, { useContext, useEffect } from 'react';
import { appContext } from '@context/appcontext';
import { useRouter } from 'next/router';
import Dashboard from '@/components/layout/company/Dashboard';
import BusinessNavbar from '@/components/layout/company/BusinessNavbar';
import { CompanyVariants } from '@/interface/Workplace/Company';
import { CreateDataType } from '@/interface/Product/ProductInterface';
import Button from '@/components/elements/Button';
import { action } from '@context/action';
import { apiPOST } from '@/hooks/middleware/api';
import ProductForm from '@/components/layout/product/kit/ProductForm';
import { useProductForm } from '@/hooks/useProductForm';
import Modal from '@/components/elements/Modal';
import Input from '@/components/elements/Input';
import { encrypt } from '@/hooks/middleware/encrypt';
import CreateQrCode from '@/components/layout/product/kit/CreateQrCode';
import { useProduceImageUpload } from '@/hooks/useProductForm/useProductImageUpload';
import { UploadImageForm } from '@/components/layout/product/kit/UploadImageForm';

const initialData: CreateDataType = {
    name: '',
    description: '',
    listDescription: [{ id: 0, desckey: '', desc: '' }],
    guide: [{ id: 0, type: '', link: '' }],
    images: [],
    productdetail: [{ id: 0, detailkey: '', detail: '' }],
    catagory: [],
    skus: [{ id: 0, color: '', size: '', price: 0, count: 0 }],
    productType: 'inventory',
};

const CreateData = ({
    variant,
    imageuploadId,
    mobileImageUpload,
}: {
    variant: CompanyVariants;
    imageuploadId: string;
    mobileImageUpload: { url: string; pin: string };
}) => {
    const router = useRouter();
    const {
        state: {
            user: { userdata },
        },
        dispatch,
    } = useContext(appContext);
    const {
        handleOnChange,
        handleOnChangeArray,
        onDropdownChange,
        da,
        deleteItem,
        addItem,
        colors,
        sizes,
        error,
        validate,
        searchVal,
        onchangeSearchHandle,
    } = useProductForm<CreateDataType>(initialData);

    const { images, uploadPhoto, deleteImage, changeImgColor } = useProduceImageUpload(imageuploadId, []);

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
                        colorVariants: [],
                        sizeVariants: [],
                    },
                }),
            );
        };
    }, []);
    const business = userdata?.workplaces.find(({ workplaceId }) => workplaceId === router.query?.businessId);
    const createProductSubmit = async () => {
        const { data, errors } = await apiPOST<{ data: string; errors: string }, CreateDataType>(
            `/products?businessId=${router.query?.businessId}`,
            { ...da, images: [] },
        );
        if (data) {
            dispatch(
                action.setAlert({
                    type: 'success',
                    value: `Successfully Uploaded`,
                }),
            );
            window.localStorage.removeItem(router.query?.businessId as string);
            router.push(`/${router.query?.businessId}/view/${data}`);
        } else {
            dispatch(
                action.setAlert({
                    type: 'danger',
                    value: errors,
                }),
            );
        }
    };
    console.log(images, '...................');

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
                        <ProductForm
                            data={da}
                            handleOnChange={handleOnChange}
                            handleOnChangeArray={handleOnChangeArray}
                            onDropdownChange={onDropdownChange}
                            deleteItem={deleteItem}
                            addItem={addItem}
                            colors={colors}
                            imageComponent={
                                <UploadImageForm
                                    mobileShareComponent={
                                        <CreateQrCode value={mobileImageUpload?.url} pin={mobileImageUpload?.pin} />
                                    }
                                    uploadPhoto={uploadPhoto}
                                    images={images}
                                    colors={colors}
                                    onDropdownChange={changeImgColor}
                                    deleteImage={deleteImage}
                                />
                            }
                            colorSearchBox={
                                <div className="p-2">
                                    <Input
                                        placeholder="Search"
                                        square
                                        id="color"
                                        value={searchVal.color}
                                        onChange={onchangeSearchHandle}
                                    />
                                </div>
                            }
                            sizes={sizes}
                            sizeSearchBox={
                                <div className="p-2">
                                    <Input
                                        placeholder="Search"
                                        square
                                        id="size"
                                        value={searchVal.size}
                                        onChange={onchangeSearchHandle}
                                    />
                                </div>
                            }
                            uploadPhoto={uploadPhoto}
                            deleteImage={deleteImage}
                            submitButton={
                                <Modal
                                    heading="Are you sure you want to submit the form?"
                                    onClick={() => createProductSubmit()}
                                    label={
                                        <Button
                                            type="button"
                                            label="Submit"
                                            color="green"
                                            customClass="w-52"
                                            size="sm"
                                        />
                                    }
                                    taskWhileOpening={() => {
                                        validate(da);
                                    }}
                                    error={error ? true : false}
                                >
                                    <div>Item Preview: Number of Items: 123123 Total Price: 123123</div>
                                </Modal>
                            }
                        />
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
    const connectId = Math.floor(1000 + Math.random() * 9000).toString();
    const storeId = `${businessId}${session.user.id}-${connectId}`;
    const token = encrypt(storeId);
    const scanUrl = `${process.env.NEXT_PUBLIC_API_HOST}/imageupload/${token}`;
    //instead of company data we have to get variants data and other studff
    const variantData = await getWorkplaceVariant(db, businessId as string);
    const companydata = JSON.parse(JSON.stringify(variantData));
    console.log('scanning url ................................', scanUrl);
    // company variant data need to be render for creating purpose
    return {
        props: {
            variant: companydata,
            imageuploadId: `${businessId}${session.user.id}`,
            mobileImageUpload: {
                url: scanUrl,
                pin: connectId,
            },
        },
    };
}
export default CreateData;
