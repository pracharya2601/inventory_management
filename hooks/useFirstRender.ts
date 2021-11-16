/* eslint-disable @typescript-eslint/no-unused-vars */
import { action } from '@context/action';
import { appContext } from '@context/appcontext';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
export const useFirstRender = (...argArr) => {
    const { dispatch } = useContext(appContext);
    const { asPath, query } = useRouter();

    useEffect(() => {
        updateToState(...argArr);
        dispatch(action.setAsPath({ asPath }));
        for (const key in query) {
            if (query.hasOwnProperty(key)) {
                dispatch(action.setPath({ key, val: query[key] as string | string[] }));
            }
        }
        return () => console.log('Returned form useEffect');
    }, [asPath]);

    useEffect(() => {
        if (query?.search) {
            dispatch(
                action.toggleAction({
                    id: 'viewSearchBar',
                    open: true,
                }),
            );
        }
    }, []);

    const updateToState = (...funcArg) => {
        for (const key in funcArg) {
            if (funcArg.hasOwnProperty(key)) {
                dispatch(funcArg[key]);
            }
        }
    };

    return;
};
