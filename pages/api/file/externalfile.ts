import nc from 'next-connect';
import onError from 'middlware/error';
import { decrypt } from '@/hooks/middleware/encrypt';
import { storageDeleteResponse, storageUploadResponse } from 'db/storage';
import { NextApiRequest, NextApiResponse } from 'next';
import middleware, { withoutAuthMiddleWere } from 'middlware/all';
import { Request } from '@/interface/Request';

const handeler = nc({ onError });

handeler.get(async (req: Request, res) => {
    const token = req.query.token as string;
    const newDateTime = new Date().getTime() + 3600000;
    const decryptVal = +decrypt<string>(token);

    if (newDateTime < decryptVal) {
        res.status(400).json(JSON.stringify({ errors: 'Timeout' }));
        return;
    }
    try {
        const file = req.query.file as string;
        const response = await storageUploadResponse(file);
        // if (isShared === 'true') {
        //     //update info to firebase
        //     console.log({
        //         id: req.query.filename,
        //         url: `${response.url}${req.query.filename}`,
        //     });
        // }

        res.status(200).json(response);
        return;
    } catch (error) {
        res.status(400).json(JSON.stringify({ errors: 'Error' }));
    }
});

handeler.delete(async (req: Request, res) => {
    const token = req.query.token as string;
    const newDateTime = new Date().getTime() + 3600000;
    const decryptVal = +decrypt<string>(token);

    if (newDateTime < decryptVal) {
        res.status(400).json(JSON.stringify({ errors: 'Timeout' }));
        return;
    }
    const file = req.query.file as string;
    const deleteResponse = await storageDeleteResponse(file);
    if (deleteResponse) {
        res.status(200).json(JSON.stringify({ data: file }));
    } else {
        res.status(400).json(JSON.stringify({ errors: 'Error' }));
    }
});

export default handeler;
