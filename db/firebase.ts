import { initializeApp } from 'firebase/app';
import { getFirestore, setDoc, deleteDoc, doc, getDoc } from 'firebase/firestore';

const clientCredentials = {
    apiKey: process.env.SHARING_IMAGE_API_KEY,
    authDomain: process.env.SHARING_IMAGE_AUTH_DOMAIN,
    projectId: process.env.SHARING_IMAGE_PROJECT_ID,
};

try {
    initializeApp(clientCredentials);
} catch (err) {
    if (!/already exists/.test(err.message)) {
        console.error('Firebase initialization error', err.stack);
    }
}
export const getImage = (storeId: string) => doc(getFirestore(), 'image_upload_mobile', storeId);

export const addDocument = async (id: string, data: any) => {
    try {
        await setDoc(doc(getFirestore(), 'image_upload_mobile', id), data);
        return 'success';
    } catch (error) {
        console.error('Error adding document: ', error);
        return;
    }
};

export const clearFormSharing = async (storeId: string) => {
    await deleteDoc(doc(getFirestore(), 'image_upload_mobile', storeId));
};

export const checkIfExist = async (storeId: string) => {
    const docRef = doc(getFirestore(), 'image_upload_mobile', storeId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists) {
        return true;
    } else {
        return false;
    }
};
