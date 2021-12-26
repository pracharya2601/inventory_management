import nc from 'next-connect';
import onError from 'middlware/error';
import middleware from 'middlware/all';

import { Request } from '@/interface/Request';
import { processOrder, uploadProcessedData } from 'db/processOrder';
import { decrypt } from '@/hooks/middleware/encrypt';

import { ObjectId } from 'mongodb';
import { cancelOrder } from 'db/staticData';
import { ProcessProductPayloadType } from '@/interface/Product/ProcessProductType';
import { addressChangeStaticProduct } from 'db/items';

const handeler = nc({ onError });
handeler.use(middleware);

handeler.get(async (req: Request, res) => {
  const businessId = req.query.businessId as string;
  const secret = req.query.secret as string;
  const userId = req.user.id as string;
  const userName = req.user.name as string;
  const staticDataId = req.query.staticId as string;
  const createdAt = new Date().toISOString();

  const newStat = {
    stat: 'canceled',
    by: userId,
    date: createdAt,
    name: userName
  }
  const positionData = decrypt<{ positionLabel: string; workplaceId: string, workplaceName: string }>(secret);
  if (positionData.workplaceId !== businessId) {
    res.status(403).json({ errors: 'Not authorize ' });
    return;
  }
  //cancel the item find and update
  //need to get other detail about it
  try {
    const updatedData: ProcessProductPayloadType = await cancelOrder(req.db, staticDataId, businessId, newStat);
    if (!updatedData) {
      return res.status(403).json({ errors: 'Not authorize ' });
    }
    await processOrder(req.db, updatedData.items, businessId, 'cancel');
    const data = 'Successfully canceled order';
    res.status(200).json(JSON.stringify({ data }));
  } catch (error) {
    res.status(403).json({ errors: 'Not authorize ' });
  }
});

handeler.post(async (req: Request, res) => {
  const businessId = req.query.businessId as string;
  const secret = req.query.secret as string;
  const userId = req.user.id as string;
  const userName = req.user.name as string;
  const customerAddressData = req.body;
  const staticDataId = req.query.staticId as string;
  const createdAt = new Date().toISOString();

  const eventaddresschangeEvent = `addresschange-${businessId}-processing`

  const newStat = {
    stat: 'addresschange',
    by: userId,
    date: createdAt,
    name: userName
  }

  const positionData = decrypt<{ positionLabel: string; workplaceId: string, workplaceName: string }>(secret);
  if (positionData.workplaceId !== businessId) {
    res.status(403).json({ errors: 'Not authorize ' });
    return;
  };
  try {
    await addressChangeStaticProduct(req.db, staticDataId, customerAddressData, newStat);
    const data = 'success'
    res?.socket?.server?.io?.emit(eventaddresschangeEvent, { dataId: staticDataId, customerAddressData });
    res.status(200).json(JSON.stringify({ data }));
    return;
  } catch (error) {
    res.status(403).json({ errors: 'Not authorize ' });
  }

})

export default handeler;