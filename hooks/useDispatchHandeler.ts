import { appContext } from '@context/appcontext';
import { useContext } from 'react';

export const useDispatchHandeler = (...arg) => {
    const { dispatch } = useContext(appContext);
    for (const key in arg) {
        if (arg.hasOwnProperty(key)) {
            dispatch(arg[key]);
        }
    }
    return;
};
