/* eslint-disable @typescript-eslint/no-unused-vars */
import Button from '@/components/elements/Button';
import DropDownMenu, { DropDownItem } from '@/components/elements/ddm/DropDownMenu';
import Input from '@/components/elements/Input';
import { useItem } from '@/hooks/useItem';
import { ProductType } from '@/interface/Product/ProductInterface';
import { action } from '@context/action';
import { appContext } from '@context/appcontext';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import SideboardOutline from '../../sideboard/SideboardOutline';
import { Colors, Description, Sizes } from '../kit';
import ImageHolder from './ImageHolder';

const ProductPreview = ({ data, staffPosition }: { data: ProductType; staffPosition?: string }) => {
    const {
        dispatch,
        state: {
            ui: { toggleOpen },
        },
    } = useContext(appContext);

    const router = useRouter();
    const {
        count,
        addToCart,
        activeColor,
        activeSize,
        price,
        lowPrice,
        highPrice,
        setC,
        setS,
        colors,
        sizes,
        activeImage,
        setActiveImage,
    } = useItem(data);
    const a = false;

    return (
        <>
            <div className="h-full relative">
                <div className="flex flex-wrap max-w-7xl p-3">
                    <div className="block md:hidden pb-3 dark:text-gray-100 w-full">
                        <ProductPreviewName name={data?.name} id={data?._id} staffPosition={staffPosition} />
                    </div>
                    <ImageHolder
                        images={data.images}
                        activeImage={activeImage}
                        setActiveImage={setActiveImage}
                        name={data.name}
                    />
                    <div className="flex flex-col w-full pl-1 max-w-screen-sm md:w-1/2 md:pl-3">
                        <div className="hidden md:block mt-10">
                            <ProductPreviewName name={data?.name} id={data?._id} staffPosition={staffPosition} />
                        </div>
                        <Colors activeColor={activeColor} colors={colors} setColor={setC} />
                        <Sizes activeSize={activeSize} sizes={sizes} setSize={setS} />
                        <div className="m-1">Item in Stock: {count}</div>
                        <Button
                            label="Process Order"
                            size="sm"
                            onClick={() => {
                                addToCart(true);
                            }}
                            icon={
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                                    />
                                </svg>
                            }
                        />
                        <Description>{data.description}</Description>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductPreview;

export const ProductPreviewName = ({
    name,
    id,
    staffPosition = 'staff',
}: {
    name: string;
    id: string;
    staffPosition: string;
}) => {
    const router = useRouter();

    const { dispatch } = useContext(appContext);
    const handleClose = (path: string) => {
        dispatch(
            action.toggleAction({
                id: 'previewProduct',
                open: false,
            }),
        );
        router.push(path);
    };
    return (
        <div className="text-lg md:text-3xl m-1 font-semibold capatalize">
            {name && name}
            <div className="float-right text-sm">
                <DropDownMenu
                    label={
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-8 rounded border w-6 cursor-pointer hover:bg-gray-900"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                            />
                        </svg>
                    }
                >
                    <DropDownItem
                        label="View Detail"
                        onClick={() => handleClose(`/${router.query?.businessId}/view/${id}`)}
                    />
                    {staffPosition === 'admin' && (
                        <DropDownItem
                            label="Edit Item"
                            onClick={() => handleClose(`/${router.query?.businessId}/view/${id}/edit`)}
                        />
                    )}
                </DropDownMenu>
            </div>
        </div>
    );
};
