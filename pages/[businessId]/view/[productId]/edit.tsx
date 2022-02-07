import { getSession } from 'next-auth/client';
import ComponentWrapper from '@/components/layout/ComponentWrapper';
import { connectToDB } from 'db/connect';
import { getWorkplaceVariant } from 'db/workplace';
import { useRouter } from 'next/router';
import React, { useContext, useEffect } from 'react';
import { appContext } from '@context/appcontext';
import Dashboard from '@/components/layout/company/Dashboard';
import BusinessNavbar from '@/components/layout/company/BusinessNavbar';
import { CompanyVariants } from '@/interface/Workplace/Company';
import { ProductType } from '@/interface/Product/ProductInterface';
import { action } from '@context/action';
import Button from '@/components/elements/Button';
import { apiPOST } from '@/hooks/middleware/api';
import { getSingleProduct } from 'db/products';
import { useProductForm } from '@/hooks/useProductForm';
import ProductForm from '@/components/layout/product/kit/ProductForm';
import Modal from '@/components/elements/Modal';
import { encrypt } from '@/hooks/middleware/encrypt';
import CreateQrCode from '@/components/layout/product/kit/CreateQrCode';
import Input from '@/components/elements/Input';
import { useProduceImageUpload } from '@/hooks/useProductForm/useProductImageUpload';
import { UploadImageForm } from '@/components/layout/product/kit/UploadImageForm';

type EditProductProps = {
    variant: CompanyVariants;
    itemData: ProductType;
    imageuploadId: string;
    mobileImageUpload: { url: string; pin: string };
};

const EditProduct = ({ itemData, variant, mobileImageUpload, imageuploadId }: EditProductProps) => {
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
    } = useProductForm<ProductType>(itemData);
    const { images, uploadPhoto, deleteImage, changeImgColor } = useProduceImageUpload(imageuploadId, itemData.images);

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

    const updateProductInformation = async () => {
        await apiPOST<string, ProductType>(
            `/products/${da._id}?businessId=${router.query?.businessId}&&secret=${business.secret}`,
            { ...da, images },
        );
        setTimeout(() => router.push(`/${router.query?.businessId}/view/${itemData._id}`), 2000);
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
                                    onClick={() => updateProductInformation()}
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
                                ></Modal>
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
    const businessId = context.query.businessId as string;
    const productId = context.query.productId as string;
    const connectId = Math.floor(1000 + Math.random() * 9000).toString();
    const storeId = `${businessId}${session.user.id}-${connectId}`;
    const token = encrypt(storeId);
    const scanUrl = `${process.env.NEXT_PUBLIC_API_HOST}/imageupload/${token}`;
    //instead of company data we have to get variants data and other studff
    const variantData = JSON.parse(JSON.stringify(await getWorkplaceVariant(db, businessId as string)));
    let itemData = null;
    let error = null;
    const newData = await getSingleProduct(db, businessId, productId);

    if (newData === null) {
        error = {
            type: 'NOT_FOUND',
            message: 'Data not Available',
        };
    }
    itemData = JSON.parse(JSON.stringify(newData));
    return {
        props: {
            itemData: itemData,
            error: error,
            variant: variantData,
            imageuploadId: `${businessId}${session.user.id}`,
            mobileImageUpload: {
                url: scanUrl,
                pin: connectId,
            },
        },
    };
}
export default EditProduct;
