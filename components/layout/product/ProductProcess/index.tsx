/* eslint-disable @typescript-eslint/no-explicit-any */
import { appContext } from '@context/appcontext';
import { useContext, useEffect, useState } from 'react';
import Button from '@/components/elements/Button';
import Image from 'next/image';
import { action } from '@context/action';
import { ProcessProductInfo } from '@/interface/Product/ProcessProductType';
import { HiddenForm } from './kit';
import UserForm from './kit/UserForm';

const ProductProcess = () => {
    const {
        dispatch,
        state: {
            lugItem: {
                items,
                orderDetail: { subtotal, taxPercent, taxAmt, coupon, shipping, total },
            },
        },
    } = useContext(appContext);
    // const ct = items.reduce((total, { numberOfItem }) => total + numberOfItem, 0);
    const apple = (val: number, id: string) => {
        dispatch(
            action.updateOrderDetail({
                id: id,
                val: val,
            }),
        );
    };
    return (
        <div className="px-2">
            <form className="max-w-lg md:max-w-4xl mx-auto" autoComplete="off">
                <div className="max-w-lg md:max-w-4xl mx-auto">
                    <div className="border p-2 rounded">
                        <div>
                            Subtotal: <span className="text-lg font-semibold">{subtotal}.00</span>
                        </div>
                        <HiddenForm
                            label="Tax and Tax"
                            value={taxAmt}
                            taxItem={`${taxPercent} % of ${subtotal}.00`}
                            id="taxPercent"
                            onClick={apple}
                        />
                        <HiddenForm label="Discount" value={`-${coupon}`} taxItem={''} id="discount" onClick={apple} />
                        <HiddenForm label="Shipping Cost" value={shipping} taxItem={''} id="shipping" onClick={apple} />
                        <hr className="mt-2 mb-1" />
                        <div className="text-xl text-right py-1 pr-2 ">
                            <div className="text-sm">Total Number of Items: {'10'}</div>
                            Total: <span className="font-semibold">{total}.00</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap flex-col md:flex-row md:justify-between gap-2">
                    <div className="w-full max-w-lg">
                        {items.length > 0 ? (
                            <>
                                {items.map((item: ProcessProductInfo, index: number) => (
                                    <div className="mt-4 border rounded bg-gray-700" key={`${index}-${item.name}`}>
                                        <div className="flex">
                                            <div className="h-32 sm:h-48 w-32 sm:w-48 relative m-1">
                                                <Image
                                                    src={item.imageUrl}
                                                    layout="fill"
                                                    objectFit="cover"
                                                    objectPosition="center"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <div className="p-2 h-10 mb-1 overflow-hidden text-lg font-semibold capitalize">
                                                    {item.name}
                                                </div>
                                                <div className="px-2">
                                                    Price रू:{' '}
                                                    <span className="text-lg font-extrabold ">{item.price}.00</span>
                                                </div>
                                                {item.color && (
                                                    <div className="px-2">
                                                        Color:{' '}
                                                        <span className="text-lg font-semibold">{item.color}</span>
                                                    </div>
                                                )}
                                                {item.size && (
                                                    <div className="px-2">
                                                        Size: <span className="text-lg font-semibold">{item.size}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex gap-2 justify-between w-full md:w-80 ml-auto pr-2 pl-2 md:pl-4 md:-mt-11 mb-1 items-center">
                                            <div className="flex gap-2 items-center">
                                                <Button
                                                    size="xs"
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
                                                                d="M20 12H4"
                                                            />
                                                        </svg>
                                                    }
                                                    onClick={() => {
                                                        if (item.numberOfItem > 1) {
                                                            const newUp = {
                                                                ...item,
                                                                numberOfItem: item.numberOfItem - 1,
                                                                total: (item.numberOfItem - 1) * item.price,
                                                            };
                                                            dispatch(
                                                                action.updateItem({
                                                                    index: index,
                                                                    item: newUp,
                                                                }),
                                                            );
                                                        } else {
                                                            dispatch(
                                                                action.removeItem({
                                                                    index: index,
                                                                    stat: '',
                                                                }),
                                                            );
                                                        }
                                                    }}
                                                />
                                                <span className="px-4 py-2 bg-gray-900 rounded">
                                                    {item.numberOfItem}
                                                </span>
                                                <Button
                                                    size="xs"
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
                                                                d="M12 4v16m8-8H4"
                                                            />
                                                        </svg>
                                                    }
                                                    onClick={() => {
                                                        const newUp = {
                                                            ...item,
                                                            numberOfItem: item.numberOfItem + 1,
                                                            total: (item.numberOfItem + 1) * item.price,
                                                        };
                                                        dispatch(
                                                            action.updateItem({
                                                                index: index,
                                                                item: newUp,
                                                            }),
                                                        );
                                                    }}
                                                />
                                            </div>
                                            <Button
                                                label={'Delete'}
                                                size="xs"
                                                customClass="float-right"
                                                color="red"
                                                onClick={() => {
                                                    dispatch(
                                                        action.removeItem({
                                                            index: index,
                                                            stat: '',
                                                        }),
                                                    );
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </>
                        ) : (
                            <div className="border mt-4 py-10 px-2 text-center rounded">
                                <p>Select item before continue.</p>
                            </div>
                        )}
                        <div className="flex">
                            <Button
                                label={items.length > 0 ? 'Add More Items' : 'Select Item'}
                                customClass="mt-2"
                                size="sm"
                                color="yellow"
                                onClick={() => {
                                    dispatch(
                                        action.toggleAction({
                                            id: 'processProduct',
                                            open: false,
                                        }),
                                    );
                                }}
                            />
                            {items.length > 1 && (
                                <Button
                                    label={'Remove All'}
                                    customClass="mt-2 ml-auto"
                                    size="sm"
                                    color="yellow"
                                    onClick={() => {
                                        dispatch(
                                            action.removeItem({
                                                index: 0,
                                                stat: 'all',
                                            }),
                                        );
                                    }}
                                />
                            )}
                        </div>
                    </div>
                    <UserForm />
                </div>
            </form>
        </div>
    );
};

export default ProductProcess;
