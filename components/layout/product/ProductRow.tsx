/* eslint-disable react/prop-types */
import Button from '@/components/elements/Button';
import { useOpen } from '@/hooks/useOpen';
import { productcontext } from '@context/data';
import { useContext } from 'react';
import SideBoard from '../sideboard';

const ProductRow = ({ item, viewItem }) => {
    const { setViewingItem } = useContext(productcontext);
    const { setOpen } = useOpen();
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
            <td className="px-5 py-3 border-b border-gray-700 dark:border-gray-200 text-sm">
                <p className=" whitespace-no-wrap">100</p>
            </td>
            <td className="px-5 py-3 border-b border-gray-700 dark:border-gray-200 text-sm">
                <p className=" whitespace-no-wrap">Red</p>
            </td>
            <td className="px-5 py-3 border-b border-gray-700 dark:border-gray-200 text-sm">
                <span
                    className="relative inline-block px-3 py-1 font-semibold text-green-100 leading-tight cursor-pointer"
                    onClick={viewItem}
                >
                    <span aria-hidden className="absolute inset-0 bg-green-500 opacity-50 rounded-full"></span>
                    <span className="relative">Small</span>
                </span>
            </td>
            <td
                className="px-5 py-3 border-b border-gray-700 dark:border-gray-200 text-sm "
                onClick={() => setViewingItem(item)}
            >
                <SideBoard label={'View'}>
                    <Button label="This is children" />
                </SideBoard>
            </td>
        </tr>
    );
};

export default ProductRow;
