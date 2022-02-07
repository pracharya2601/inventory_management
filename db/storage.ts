import { Storage } from '@google-cloud/storage';
export const storage = new Storage({
    projectId: process.env.PROJECT_ID,
    credentials: {
        client_email: process.env.CLIENT_EMAIL,
        private_key: process.env.PRIVATE_KEY,
    },
});

export const storageUploadResponse = async (fileName: string) => {
    const bucket = storage.bucket(`product-files-v1`);
    const file = bucket.file(fileName);
    const options = {
        version: 'v4',
        action: 'write',
        expires: Date.now() + 1 * 60 * 1000, //  1 minute,
        contentType: 'application/octet-stream',
        origin: ['*'],
        fields: { 'x-goog-meta-test': 'data' },
    };
    const [response] = await file.generateSignedPostPolicyV4(options);
    return response;
};

export const storageDeleteResponse = async (fileName: string) => {
    try {
        const bucket = storage.bucket(`product-files-v1`);
        await bucket.file(fileName).delete();
        return true;
    } catch (error) {
        return;
    }
};
