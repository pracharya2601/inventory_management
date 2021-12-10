import Button from '@/components/elements/Button';
import { ProductType } from '@/interface/Product/ProductInterface';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Description } from '../kit';
import ImageHolder from './ImageHolder';

const ProductPreviewDetail = ({ data }: { data?: ProductType }) => {
    const router = useRouter();
    const [img, setImg] = useState<string>('');
    const onClickHandle = () => {
        router.push(`/${router.query.businessId}/view/${data._id}/edit`);
    };

    return (
        <div className="h-full relative pb-20 pt-5 md:pt-2">
            <div className="flex flex-wrap max-w-7xl">
                <div className="block md:hidden pb-3 px-2 dark:text-gray-100 w-full">
                    <div className="text-lg md:text-3xl font-semibold capatalize">
                        {data?.name}
                        <div className="float-right text-sm">
                            <Button label="Edit" size="xs" color="yellow" onClick={onClickHandle} />
                        </div>
                    </div>
                </div>
                {data?.images && (
                    <ImageHolder
                        images={data?.images}
                        activeImage={img || data?.images[0].url}
                        setActiveImage={setImg}
                        name={data?.name}
                    />
                )}
                <div className="flex flex-col w-full pl-1 pr-1 md:pr-2 flex-1 max-w-screen-sm md:pl-3">
                    <div className="hidden md:block mt-10">
                        <div className="text-lg md:text-3xl m-1 font-semibold capatalize">
                            {data?.name}
                            <div className="float-right text-sm">
                                <Button label="Edit" size="xs" color="yellow" onClick={onClickHandle} />
                            </div>
                        </div>
                    </div>
                    <div className="p-1 mt-2 bg-gray-800 px-3 mr-1 w-max rounded-r-lg text-sm">
                        Seller:{' '}
                        <span className="hover:text-blue-500 hover:underline cursor-pointer">
                            {data?.createdBy?.name}
                        </span>
                    </div>
                    <p className="p-2 mt-3">Product Detail</p>
                    <div className="border mt-1 bold">
                        {data?.productdetail?.map(({ id, detailkey, detail }) => (
                            <DiscriptionList border leftVal={detailkey} value={detail} key={`${detailkey}-${id}`} />
                        ))}
                    </div>
                </div>
            </div>
            <div className="px-3 max-w-5xl mt-5">
                <p className="mt-3 text-lg p-2">Description</p>
                <Description>{data?.description}</Description>
                {data?.listDescription?.map(({ desckey, desc, id }) => (
                    <DiscriptionList leftVal={desckey} value={desc} key={`${desckey}-${id}`} />
                ))}
                {data?.listDescription?.map(({ desckey, desc, id }) => (
                    <DiscriptionList leftVal={desckey} value={desc} key={`${desckey}-${id}`} />
                ))}
            </div>
        </div>
    );
};

export default ProductPreviewDetail;

export const DiscriptionList = ({ leftVal, value, border }: { leftVal?: string; value?: string; border?: boolean }) => {
    return (
        <div className="flex border-b gap-2 p-2">
            <div className={`w-3/12 overflow-ellipsis ${border && 'border-r'}`}>{leftVal}</div>
            <div className="flex-1">{value}</div>
        </div>
    );
};
