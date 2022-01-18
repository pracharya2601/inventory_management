import nc from 'next-connect';
import onError from 'middlware/error';
import middleware from 'middlware/all';
import { ProductType } from '@/interface/Product/ProductInterface';
import { Request } from '@/interface/Request';
import { decrypt } from '@/hooks/middleware/encrypt';
import { updateProduct } from 'db/products';

const handeler = nc({ onError });
handeler.use(middleware);

handeler.post(async (req: Request, res) => {
    const body: ProductType = req.body;
    const businessId = req.query.businessId;
    const productId = req.query.productId;
    const eventNameI = `${businessId}-${productId}`;
    const eventNameII = `update.${businessId}-${body.productType}`;
    const userId = req.user?.id;
    const secret = req.query.secret as string;
    const updatedAt = {
        date: new Date().toISOString(),
        updatedBy: userId,
    };
    const newBody = {
        ...body,
        updatedAt: [...body.updatedAt, updatedAt],
    };

    const positionData = decrypt<{ positionLabel: string; workplaceId: string }>(secret);
    if (positionData.workplaceId != body.createdBy.id) {
        return res.status(400).json({ errors: 'Not Authorize' });
    }
    if (positionData.positionLabel === 'staff') {
        return res.status(400).json({ errors: 'Not Authorize to edit data.' });
    }
    try {
        console.log('Is this here...................................')
        const data = await updateProduct(req.db, newBody);
        res?.socket?.server?.io?.emit(eventNameI, data);
        res?.socket?.server?.io?.emit(eventNameII, data);
        res.status(200).json(JSON.stringify({ data: 'Success' }));
    } catch (e) {
        res.status(400).json({ errors: 'Something went wrong' });
    }
});

export default handeler;
