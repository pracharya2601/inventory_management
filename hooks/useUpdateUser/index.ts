import { UserData } from '@/interface/AuthSession';
import { action } from '@context/action';
import { appContext } from '@context/appcontext';
import { signIn, signOut } from 'next-auth/client';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { apiPOST } from '../middleware/api';

type Ut = Omit<UserData, 'workplaces' | '_id' | 'emailVerified' | 'createdAt' | 'updatedAt'>;
const initialDta = {
    image: '',
    email: '',
    name: '',
    address: {
        address: '',
        ward: '',
        city: '',
        district: '',
        state: '',
        zip: '',
    },
};
export const useUpdateUser = () => {
    const router = useRouter();
    const type = router.query?.type;
    const {
        state: {
            user: { userdata },
        },
    } = useContext(appContext);
    const [state, setState] = useState<Ut>(type === 'new' ? initialDta : null);
    const [alertUser, setAlertUser] = useState({
        text: '',
        type: '',
    });

    const onChangeHandle = (e) => {
        const { value, name } = e.target;
        handle(value, name);
    };
    const handle = (value: string, name: string) => {
        const a = name.split('.');
        if (a.length > 1) {
            setState((prevState) => ({
                ...prevState,
                [a[0]]: {
                    ...(prevState[a[0]] as Ut),
                    [a[1]]: value,
                },
            }));
        } else {
            setState((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    };
    const handleEdit = () => {
        const userdta = userdata as UserData;
        delete userdta['workplaces'];
        delete userdta['emailVerified'];
        delete userdta['createdAt'];
        delete userdta['updatedAt'];
        delete userdta['_id'];
        setState(userdta);
        router.push(`${router.asPath === '/' ? '' : router.asPath}?type=edit`, undefined, {
            shallow: true,
        });
    };

    const removeEdit = () => {
        setState(null);
        router.back();
    };
    const uploadPhoto = async (e) => {
        console.log('inside upload image');
        const a = Date.now();
        const file = e.target.files[0];
        const filename = `${a}-${encodeURIComponent(file.name)}`;
        const res = await fetch(`http://localhost:3000/api/file?file=${filename}`);
        const { url, fields } = await res.json();
        const formData = new FormData();
        Object.entries({ ...fields, file }).forEach(([key, value]) => {
            formData.append(key, value as string);
        });
        const upload = await fetch(url, {
            method: 'POST',
            body: formData,
        });
        if (upload.ok) {
            handle(`${upload.url}${filename}`, 'image');
            console.log('Uploaded successfully!');
        } else {
            console.error('Upload failed.');
        }
    };
    const handleSubmit = async () => {
        const { data, errors } = await apiPOST<{ data: string; errors: string }, Ut>(`/user`, state);
        if (data) {
            setAlertUser({
                text: 'Successfully updated your info',
                type: 'success',
            });
            setTimeout(
                () =>
                    setAlertUser({
                        text: 'Signing out now! You have to sign in again.',
                        type: 'success',
                    }),
                500,
            );
            setTimeout(() => signOut(), 500);
        } else {
            setAlertUser({
                text: errors,
                type: 'error',
            });
        }
    };

    return {
        handleSubmit,
        uploadPhoto,
        onChangeHandle,
        handleEdit,
        removeEdit,
        alertUser,
        state,
        userdata,
        type,
    };
};
