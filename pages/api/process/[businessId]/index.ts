import nc from 'next-connect';
import onError from 'middlware/error';
import middleware from 'middlware/all';

import { Request } from '@/interface/Request';
import { processOrder } from 'db/processOrder';
import { decrypt } from '@/hooks/middleware/encrypt';

const handeler = nc({ onError });
handeler.use(middleware);

handeler.post(async (req: Request, res) => {
    const businessId = req.query.businessId as string;
    const secret = req.query.secret as string;
    const customerAddress = req.body.customerAddress;
    const orderCreatedBy = {
        name: req.user.name,
        userId: req.user.id,
    };
    const stat = [
        {
            stat: 'processed',
            by: req.user.id,
        },
    ];
    const orderDetail = req.body.orderDetail;
    const items = req.body.items;

    const positionData = decrypt<{ positionLabel: string; workplaceId: string; workplaceName: string }>(secret);
    //check email and update user info and address
    //generate customerId
    let customerInfo = req.body.customerInfo;
    if (customerInfo.customerId === '') {
        //create customer here if no customer id,
        // creat customer one here
        const data = {
            ...customerInfo,
            _id: 'generated id',
        };
        customerInfo = data;
        //post here
    }

    const soldBy = {
        name: positionData.workplaceName,
        busnessId: businessId,
    };

    await processOrder(req.db, items, businessId, 'process');
    //

    try {
        res.status(200).json(JSON.stringify({ data: 'Success' }));
    } catch (error) {
        res.status(400).json({ errors: 'Not Authorize' });
    }
});

export default handeler;
