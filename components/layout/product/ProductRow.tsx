/* eslint-disable react/prop-types */
import Button from '@/components/elements/Button';
import { useOpen } from '@/hooks/useOpen';
import { useItem } from '@/hooks/useItem';
import { productcontext } from '@context/data';
import { useContext, useState } from 'react';
import SideBoard from '../sideboard';
import { useRouter } from 'next/router';
import { uicontext } from '@context/ui';

const ProductRow = ({ item, viewItem }) => {
    const router = useRouter();
    const id = router.query.id as string[];
    const dataType = id && id[2];
    const { setViewingItem, productCatagoryURL } = useContext(productcontext);
    const { previewItm, setPreviewItm } = useContext(uicontext);
    const {
        count,
        cartIdenty,
        addToCart,
        errorMessage,
        setErrorMessage,
        c,
        s,
        setC,
        setS,
        colors,
        sizes,
        activeImage,
        setActiveImage
    } = useItem(item);

    const goto = productCatagoryURL(dataType);

    const handelClick = () => {
        setViewingItem(item);
        setPreviewItm(true);
    }

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
                    {colors.map(({ color, stat }, index) => (
                        <div
                            key={`${color}-${index}`} className={`h-7 w-7 flex justify-center content-center border-2 rounded-full border-opposite-100 hover:border-primary-500 ${c == color && stat ? 'border-blue-900 px-1' : 'px-3'} ${!stat && 'opacity-40 cursor-not-allowed hover:border-opposite-100'} m-1 cursor-pointer text-sm`} style={{ background: color }}
                            onClick={() => setC({ color, index, stat })}
                        >
                            {c == color && stat && <CheckMark color={color} />}
                        </div>
                    ))}
                </div>
            </td>
            <td className="px-5 py-3 border-b border-gray-700 dark:border-gray-200 text-sm">
                {sizes.map(({ size, stat }, index) => (
                    <span
                        key={`${size}-${index}`}
                        onClick={() => setS({ size, index, stat })}
                        className={`relative m-px inline-block px-3 py-1 font-semibold text-green-100 leading-tight cursor-pointer ${!stat ? 'opacity-60 cursor-not-allowed hover:border-opposite-100' : 'hover:border-green-900'}`}
                    >
                        <span aria-hidden className={`absolute inset-0 ${s == size && stat ? 'bg-green-600' : 'bg-green-100'}  opacity-50 rounded-full`}></span>
                        <span className="relative">{size}</span>
                    </span>
                ))}
            </td>
            <td className="px-5 py-3 border-b border-gray-700 dark:border-gray-200 bg-gray-500 text-center text-sm">
                <p className="whitespace-no-wrap">{count}</p>
            </td>
            <td
                className="px-5 py-3 border-b border-gray-700 dark:border-gray-200 text-sm"
            >
                <Button label="View" size="sm" rounded color="green" onClick={() => handelClick()} />
            </td>
        </tr>
    );
};

export default ProductRow;

const CheckMark = ({ color }: { color: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" filter="invert(1)" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke={`${color == 'black' ? "white" : 'black'}`}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
)
