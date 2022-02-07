import Button from '@/components/elements/Button';
import { useVariant } from '@/hooks/useVariants';
import { action } from '@context/action';
import { appContext } from '@context/appcontext';
import React, { useContext } from 'react';
import ColorVariantComponent from './kit/ColorVariantComponent';

const ColorVariant = () => {
    const {
        state: {
            workplace: { variant },
        },
        dispatch,
    } = useContext(appContext);

    const { colors, addColor, removeColor } = useVariant(variant.colorVariants, 'colors');

    const updateHandle = () => {
        const arrayEquals = () => {
            return (
                Array.isArray(colors) &&
                Array.isArray(variant.colorVariants) &&
                colors.every((val, index) => val === variant.colorVariants[index])
            );
        };
        if (!arrayEquals() || colors.length === variant.colorVariants.length) {
            dispatch(
                action.setVariant({
                    variant: {
                        ...variant,
                        colorVariants: colors,
                    },
                }),
            );
        }
    };

    return (
        <>
            <div className="flex flex-col px-3 mt-2">
                <ColorVariantComponent colors={colors} addColor={addColor} removeColor={removeColor} w="w80">
                    <div className="flex justify-between mt-2">
                        <Button
                            label="Reset"
                            color="yellow"
                            size="xs"
                            customClass="w-36 mt-1 mb-2"
                            type="button"
                            onClick={() => removeColor(0, true)}
                        />
                        <Button
                            label="Update"
                            color="purple"
                            customClass="w-36 mt-1 mb-2"
                            size="xs"
                            onClick={updateHandle}
                        />
                    </div>
                </ColorVariantComponent>
            </div>
        </>
    );
};

export default ColorVariant;
