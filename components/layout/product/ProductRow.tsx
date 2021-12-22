/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/prop-types */
import Button from '@/components/elements/Button';
import { useItem } from '@/hooks/useItem';
import { ProductType } from '@/interface/Product/ProductInterface';
import { Colors, Sizes } from './kit';

const ProductRow = ({ item, onView }: { item: ProductType; onView: () => void }) => {
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
            <td className="border border-gray-900 bg-gray-700 dark:border-gray-200 text-sm hover:bg-gray-800 cursor-pointer" onClick={() => onView()}>
                <div className='w-full h-full px-3 flex justify-center items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                </div>
            </td>
            <td className=" border border-gray-700 bg-gray-800 dark:border-gray-200 text-sm hover:bg-gray-700 cursor-pointer" onClick={() => addToCart(false)}>
                <div className='w-full h-full px-3 flex justify-center items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                </div>
            </td>
        </tr>
    );
};

export default ProductRow;
