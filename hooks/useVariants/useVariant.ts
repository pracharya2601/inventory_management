import { useEffect, useState } from 'react';

export const useVariant = (prevVariant: string[] | [], type: string) => {
    const [state, setState] = useState<string[]>(prevVariant || []);

    useEffect(() => {
        setState(prevVariant);
        return () => {
            setState([]);
        };
    }, [prevVariant]);

    const add = (val: string) => {
        const list = [...state];
        list.push(val);
        setState(list);
    }

    const remove = (i: number, all: boolean) => {
        if (all) {
            setState(prevVariant);
        } else {
            const list = [...state];
            list.splice(i, 1);
            setState(list);
        }
    };

    const variant = {
        colors: type === 'colors' ? state : undefined,
        sizes: type === 'sizes' ? state : undefined,
        addColor: add,
        addSize: add,
        removeColor: remove,
        removeSize: remove,
    }

    return variant;
};
