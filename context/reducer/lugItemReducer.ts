
import { LugActions } from '@/interface/ActionType/LugActions';
import { LugItemType } from '@/interface/Context/InitialStateType';
import { Types } from '@/interface/Dispatch';
import { ProcessProductInfo } from '@/interface/Product/ProcessProductType';

export const lugItemReducer = (state: LugItemType, action: LugActions) => {
  switch (action.type) {
    case Types.ProcessAddItem:
      const arr: ProcessProductInfo[] = state.items;
      arr.push(action.payload.item);
      const subT = state.orderDetail.subtotal + action.payload.item.total;
      const txamt = (state.orderDetail.taxPercent / 100) * subT;
      const orderD = {
        subtotal: subT,
        taxAmt: txamt,
        total: subT + txamt + state.orderDetail.shipping - state.orderDetail.coupon,
      }
      return {
        ...state,
        items: arr,
        orderDetail: {
          ...state.orderDetail,
          ...orderD
        }
      };

    case Types.RemoveItem:
      let newArr: ProcessProductInfo[] = state.items;
      let subtotal: number;
      let taxA: number;
      if (action.payload.stat === 'all') {
        newArr = [];
        subtotal = 0;
        taxA = 0
      } else {
        subtotal = state.orderDetail.subtotal - state.items[action.payload.index].total;
        taxA = (state.orderDetail.taxPercent / 100) * subtotal;
      }
      const newObjDetail = {
        subtotal,
        taxAmt: taxA,
        total: subtotal + taxA + state.orderDetail.shipping - state.orderDetail.coupon
      }
      newArr.splice(action.payload.index, 1);
      return {
        ...state,
        items: newArr,
        orderDetail: {
          ...state.orderDetail,
          ...newObjDetail,
        },
      };

    case Types.UpdateItem:
      const updatingArr: ProcessProductInfo[] = state.items;
      const prevItemTotal: number = updatingArr[action.payload.index]?.total;
      const newSupTotal: number = state.orderDetail.subtotal - prevItemTotal + action.payload.item.total;
      const txAmt = (state.orderDetail.taxPercent / 100) * newSupTotal;
      updatingArr[action.payload.index] = action.payload.item;
      return {
        ...state,
        items: updatingArr,
        orderDetail: {
          ...state.orderDetail,
          subtotal: newSupTotal,
          taxAmt: txAmt,
          total: newSupTotal + txAmt + state.orderDetail.shipping - state.orderDetail.coupon,
        }
      };

    case Types.UpdateOrderDetail:
      const subTtl = state.orderDetail.subtotal;
      let data = state.orderDetail;
      if (action.payload.id === 'taxPercent') {
        data.taxPercent = action.payload.val;
        data.taxAmt = subTtl === 0 ? 0 : (action.payload.val / 100) * subTtl;
        data.total = subTtl + data.taxAmt - state.orderDetail.coupon + state.orderDetail.shipping;
      }
      if (action.payload.id === 'discount') {
        data.coupon = action.payload.val;
        data.total = subTtl + state.orderDetail.taxAmt - action.payload.val + state.orderDetail.shipping;
      };
      if (action.payload.id === 'shipping') {
        data.shipping = action.payload.val;
        data.total = subTtl + data.taxAmt - state.orderDetail.coupon + action.payload.val;
      };
      console.log(data);
      return {
        ...state,
        orderDetail: data,
      }
    case Types.SetCustomerInfo:
      return {
        ...state,
        customerInfo: action.payload.customerInfo
      };

    case Types.SetCustomerAddress:
      return {
        ...state,
        customerInfo: action.payload.customerAddress
      };

    default:
      return state;
  }
}