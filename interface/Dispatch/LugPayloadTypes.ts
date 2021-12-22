import { Types } from "."
import { CustomerAddress, ProcessingOrderDetail, ProcessProductInfo } from "../Product/ProcessProductType"
export type LugPayloadTypes = {
  [Types.ProcessAddItem]: {
    item: ProcessProductInfo
  };
  [Types.RemoveItem]: {
    index: number,
    stat: 'all' | '',
  };
  [Types.UpdateItem]: {
    index: number,
    item: ProcessProductInfo,
  };
  [Types.SetCustomerInfo]: {
    customerInfo: { name: string; email: string; contactNo: string }
  }
  [Types.SetCustomerAddress]: {
    customerAddress: CustomerAddress,
  };
  [Types.UpdateOrderDetail]: {
    id: string;
    val: number;
  };
}