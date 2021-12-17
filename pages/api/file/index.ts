import nc from 'next-connect';
import onError from 'middlware/error';
import middleware from 'middlware/all';
import { Request } from '@/interface/Request';
import { Storage } from '@google-cloud/storage';

const storage = new Storage({
    projectId: process.env.PROJECT_ID,
    credentials: {
        client_email: process.env.CLIENT_EMAIL,
        private_key: process.env.PRIVATE_KEY,
    },
});

const handeler = nc({ onError });
handeler.use(middleware);

handeler.get(async (req: Request, res) => {
    try {
        const bucket = storage.bucket(`product-files-v1`);
        const file = bucket.file(req.query.file as string);
        const options = {
            version: 'v4',
            action: 'write',
            expires: Date.now() + 1 * 60 * 1000, //  1 minute,
            contentType: 'application/octet-stream',
            origin: ['*'],
            fields: { 'x-goog-meta-test': 'data' },
        };

        const [response] = await file.generateSignedPostPolicyV4(options);
        console.log(response);
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(200).json(JSON.stringify({ errors: 'Error' }));
    }
});

handeler.delete(async (req: Request, res) => {
    //keep track of name of the file and record if got error on deleting
    // send it on database;
    try {
        const bucket = storage.bucket(`product-files-v1`);
        await bucket.file(req.query.file as string).delete();
        res.status(200).json(JSON.stringify({ data: req.query.file }));
    } catch (error) {
        console.log(error);
        res.status(200).json(JSON.stringify({ errors: 'Error' }));
    }
});

// export default async function handler(req: Request, res) {
//     const bucket = req.storage.bucket(process.env.BUCKET_NAME);
//     const file = bucket.file(req.query.file);
//     const options = {
//         expires: Date.now() + 1 * 60 * 1000, //  1 minute,
//         fields: { 'x-goog-meta-test': 'data' },
//     };

//     const [response] = await file.generateSignedPostPolicyV4(options);
//     res.status(200).json(response);
// }

export default handeler;
