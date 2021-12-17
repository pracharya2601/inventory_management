/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/prop-types */
import Button from '@/components/elements/Button';
import { useItem } from '@/hooks/useItem';
import { ProductType } from '@/interface/Product/ProductInterface';
import { action } from '@context/action';
import { appContext } from '@context/appcontext';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { Colors, Sizes } from './kit';

const ProductRow = ({ item, onView }: { item: ProductType; onView: () => void }) => {
    const {
        count,
        cartIdenty,
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
    } = useItem(item);
    return (
        <tr>
            <td className="px-5 py-3 border-b border-gray-700 dark:border-gray-200 text-sm">
                <div className="flex items-center">
                    <div className="flex-shrink-0"></div>
                    <div className="ml-3">
                        <p className=" whitespace-no-wrap">{item.name}</p>
                    </div>
                </div>
            </td>
            <td className=" px-5 py-3 border-b border-gray-700 dark:border-gray-200 text-sm">
                <div className="whitespace-no-wrap flex">
                    <Colors activeColor={activeColor} colors={colors} setColor={setC} noHeading />
                </div>
            </td>
            <td className="px-5 py-3 border-b border-gray-700 dark:border-gray-200 text-sm">
                <Sizes sizes={sizes} activeSize={activeSize} setSize={setS} noHeading />
            </td>
            <td className="px-5 py-3 border-b border-gray-700 dark:border-gray-200 bg-gray-500 text-center text-sm">
                <p className="whitespace-no-wrap">{count}</p>
            </td>
            <td className="px-5 py-3 border border-gray-700 dark:border-gray-200 text-sm">
                {lowPrice === highPrice ? (
                    <p className="whitespace-no-wrap text-center">{price}</p>
                ) : lowPrice < highPrice ? (
                    <div className="min-w-max text-center">
                        <p className="whitespace-no-wrap">
                            {lowPrice} - {highPrice}
                        </p>
                    </div>
                ) : (
                    <p className="whitespace-no-wrap text-center">{price}</p>
                )}
            </td>
            <td className="px-5 py-3 border-b border-gray-700 dark:border-gray-200 text-sm">
                <Button label="View" size="sm" rounded color="green" onClick={() => onView()} />
            </td>
        </tr>
    );
};

export default ProductRow;
