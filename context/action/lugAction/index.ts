import { Types, LugPayloadTypes } from '@/interface/Dispatch';
import { createActionPayload } from '../createActionPayload';
export const lugAction = {
  setProcessItem: createActionPayload<typeof Types.ProcessAddItem, LugPayloadTypes[Types.ProcessAddItem]>(Types.ProcessAddItem),
  removeItem: createActionPayload<typeof Types.RemoveItem, LugPayloadTypes[Types.RemoveItem]>(Types.RemoveItem),
  updateItem: createActionPayload<typeof Types.UpdateItem, LugPayloadTypes[Types.UpdateItem]>(Types.UpdateItem),
  setCustomerInfo: createActionPayload<typeof Types.SetCustomerInfo, LugPayloadTypes[Types.SetCustomerInfo]>(Types.SetCustomerInfo),
  setCustomerAddress: createActionPayload<typeof Types.SetCustomerAddress, LugPayloadTypes[Types.SetCustomerAddress]>(Types.SetCustomerAddress),
  updateOrderDetail: createActionPayload<typeof Types.UpdateOrderDetail, LugPayloadTypes[Types.UpdateOrderDetail]>(Types.UpdateOrderDetail),
}