import Button from '@/components/elements/Button';
import Input from '@/components/elements/Input';
import { action } from '@context/action';
import { appContext } from '@context/appcontext';
import React, { useContext, useEffect, useState } from 'react';

const SizeVariant = () => {
    const {
        state: {
            workplace: { variant },
        },
        dispatch,
    } = useContext(appContext);
    const [state, setState] = useState<string[]>(variant?.sizeVariants || []);
    const [sizeVal, setSizeVal] = useState<string>('');
    useEffect(() => {
        setState(variant?.sizeVariants);
        return () => {
            setState([]);
        };
    }, [variant]);

    const submitHandle = () => {
        const list = [...state];
        list.push(sizeVal.toLowerCase());
        setState(list);
        setSizeVal('');
    };
    const handleRemove = (i) => {
        const list = [...state];
        list.splice(i, 1);
        setState(list);
    };

    const resetHandle = () => {
        setState(variant?.sizeVariants);
    };

    const updateHandle = () => {
        const arrayEquals = () => {
            return (
                Array.isArray(state) &&
                Array.isArray(variant.sizeVariants) &&
                state.every((val, index) => val === variant.sizeVariants[index])
            );
        };
        if (!arrayEquals() || state.length === variant.sizeVariants.length) {
            dispatch(
                action.setVariant({
                    variant: {
                        ...variant,
                        sizeVariants: state,
                    },
                }),
            );
        }
    };

    return (
        <>
            <div className="flex flex-col px-3 relative mt-2">
                <Input
                    square
                    value={sizeVal}
                    placeholder="Type Name of Size"
                    onChange={(e) => setSizeVal(e.target.value)}
                />
                <Button
                    label="Add"
                    size="sm"
                    customClass="mt-4 mb-2"
                    type="button"
                    onClick={submitHandle}
                    disabled={variant && !state.includes(sizeVal.toLowerCase()) ? false : true}
                />
                <div className="flex justify-between mt-2 mb-2">
                    <Button
                        label="Reset"
                        color="yellow"
                        size="xs"
                        customClass="w-36 mt-1 mb-2"
                        type="button"
                        onClick={resetHandle}
                    />
                    <Button label="Update" customClass="w-36 mt-1 mb-2" size="xs" onClick={updateHandle} />
                </div>
                {state?.map((size, index) => (
                    <div
                        key={`${size}-${index}`}
                        className="border w-full rounded hover:bg-gray-800 cursor-pointer mb-px p-2 flex space-between gap-4"
                    >
                        <span>{size}</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 cursor-pointer ml-auto"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            onClick={() => handleRemove(index)}
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                ))}
            </div>
        </>
    );
};

export default SizeVariant;
