import { useContext, useEffect, useState } from 'react';
import { addDocument, checkIfExist, clearFormSharing, getImage } from 'db/firebase';
import { onSnapshot } from 'firebase/firestore';
import { appContext } from '@context/appcontext';
import { action } from '@context/action';
import { useRouter } from 'next/router';

export const useProduceImageUpload = (
    imageuploadId: string,
    initialImage: [] | Array<{ id: string; url: string; color: string }>,
) => {
    const router = useRouter();
    const productId = router.query?.productId as string;
    const iamId = router.query?.iam as string;
    const shareId = router.query?.share as string;
    const isMobile = iamId && shareId ? true : false;
    const [images, setImages] = useState(initialImage);
    const {
        state: {
            user: { authenticated },
        },
        dispatch,
    } = useContext(appContext);

    useEffect(() => {
        if (!isMobile) {
            addDocument(imageuploadId, {
                device: 'desktop',
                sharedImage: initialImage,
                type: 'Scan the barcode near upload image button to upload image from another mobile phone',
            });
        }
        const unsub = onSnapshot(getImage(imageuploadId), (doc) => {
            const data = doc.data();
            if (isMobile && !data) {
                router.push('/');
            }
            setImages(data?.sharedImage || []);
            if (doc.data()?.device === 'cellphone') {
                dispatch(
                    action.setAlert({
                        type: 'success',
                        value: doc.data()?.type,
                    }),
                );
            }
        });
        return () => {
            unsub();
            clearFormSharing(imageuploadId);
        };
    }, []);

    const changeImgColor = (index: number, value: string) => {
        const newArr = [...images];
        newArr[index] = {
            ...newArr[index],
            color: value,
        };
    };

    const addImageData = async (valueObj) => {
        const newData = [valueObj, ...images];
        await addDocument(imageuploadId, {
            device: 'desktop',
            sharedImage: newData,
            type: 'Scan the barcode near upload image button to upload image from another mobile phone',
        });
    };
    const uploadPhoto = async (e) => {
        const a = Date.now();
        const file = e.target.files[0];
        const filename = `${a}-${encodeURIComponent(file.name)}`;
        let res;
        if (!authenticated) {
            res = await fetch(
                `${process.env.NEXT_PUBLIC_API_HOST}/api/file/externalfile?file=${filename}&&token=${iamId}`,
            );
        } else {
            res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/file?file=${filename}`);
        }
        const { errors, url, fields } = await res.json();

        if (!errors) {
            const formData = new FormData();
            Object.entries({ ...fields, file }).forEach(([key, value]) => {
                formData.append(key, value as string);
            });
            const upload = await fetch(url, {
                method: 'POST',
                body: formData,
            });
            if (upload.ok) {
                addImageData({
                    id: filename,
                    url: `${upload.url}${filename}`,
                    color: 'default',
                });
            } else {
                console.error('Upload failed.');
            }
        }
    };

    const deleteImage = async (index: number, filename: string) => {
        const nwarr = [...images];
        nwarr.splice(index, 1);
        await addDocument(imageuploadId, {
            device: 'desktop',
            sharedImage: nwarr,
            type: 'Scan the barcode near upload image button to upload image from another mobile phone',
        });
        if (!productId) {
            //not delete image while updating
            if (!authenticated) {
                await fetch(
                    `${process.env.NEXT_PUBLIC_API_HOST}/api/file/externalfile?file=${filename}&&token=${iamId}`,
                    {
                        method: 'DELETE',
                    },
                );
            } else {
                await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/file?file=${filename}`, {
                    method: 'DELETE',
                });
            }
        }
    };

    return {
        images,
        uploadPhoto,
        deleteImage,
        changeImgColor,
    };
};
