import nc from 'next-connect';
import onError from 'middlware/error';
import middleware from 'middlware/all';
import { Request } from '@/interface/Request';
import { storage, storageDeleteResponse, storageUploadResponse } from 'db/storage';

const handeler = nc({ onError });
handeler.use(middleware);

handeler.get(async (req: Request, res) => {
    try {
        const file = req.query.file as string;
        const isShared = req.query?.isShared as string;
        const response = await storageUploadResponse(file);
        if (isShared === 'true') {
            //update info to firebase
            console.log({
                id: req.query.filename,
                url: `${response.url}${req.query.filename}`,
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json(JSON.stringify({ errors: 'Error' }));
    }
});

handeler.delete(async (req: Request, res) => {
    const file = req.query.file as string;
    const deleteResponse = await storageDeleteResponse(file);
    if (deleteResponse) {
        res.status(200).json(JSON.stringify({ data: file }));
    } else {
        res.status(400).json(JSON.stringify({ errors: 'Error' }));
    }
});

export default handeler;
