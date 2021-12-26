import nc from 'next-connect';
import onError from 'middlware/error';
import middleware from 'middlware/all';

import { Request } from '@/interface/Request';
import { processOrder, uploadProcessedData } from 'db/processOrder';
import { decrypt } from '@/hooks/middleware/encrypt';

import { ObjectId } from 'mongodb';

const handeler = nc({ onError });
handeler.use(middleware);
//during proces do not use socket for business update

handeler.post(async (req: Request, res) => {
    const businessId = req.query.businessId as string;
    const secret = req.query.secret as string;
    const customerAddress = req.body.customerAddress;
    const processItemId = new ObjectId();
    const createdAt = new Date().toISOString();
    const userId = req.user.id as string;
    const userName = req.user.name as string;
    const orderCreatedBy = {
        name: userName,
        userId: userId,
    };
    const paymentStatus = req.body.paymentStatus;
    const orderDetail = req.body.orderDetail;
    const items = req.body.items;

    const positionData = decrypt<{ positionLabel: string; workplaceId: string; workplaceName: string }>(secret);

    const eventI = `processItem-${businessId}`;

    let customerInfo = req.body.customerInfo;
    // if (customerInfo.customerId === '') {
    //     //create customer here if no customer id,
    //     // creat customer one here
    //     const data = {
    //         ...customerInfo,
    //         _id: 'generated id',
    //     };
    //     customerInfo = data;
    //     //post here
    // }
    // this is later task
    const soldBy = {
        name: positionData.workplaceName,
        businessId: businessId,
    };
    try {
        const uploadedData = await uploadProcessedData(req.db, {
            _id: processItemId,
            businessId: businessId,
            productType: 'processing',
            createdAt: createdAt,
            customerInfo: customerInfo,
            customerAddress: customerAddress,
            items: items,
            orderDetail: orderDetail,
            soldBy: soldBy,
            stat: [{
                stat: 'processed',
                by: userId,
                date: createdAt,
                name: userName,
            }],
            orderCreatedBy: orderCreatedBy,
            paymentStatus: paymentStatus,
        })
        if (uploadedData) {
            await processOrder(req.db, items, businessId, 'process');
            res?.socket?.server?.io?.emit(eventI, uploadedData);
            res.status(200).json(JSON.stringify({ data: `Successfully processed items to ${customerInfo.name} ` }));
            return;
        }
        res.status(400).json({ errors: 'Server Error Please try again later' });
    } catch (error) {
        res.status(400).json({ errors: 'Not Authorize' });
    }
});

export default handeler;
