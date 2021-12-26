import { CustomerAddress } from "@/interface/Product/ProcessProductType";
import { action } from "@context/action";
import { appContext } from "@context/appcontext"
import { useContext } from "react"
import { apiPOST } from "../middleware/api";

export const useProcessUser = () => {
  const { dispatch, state: { lugItem: { customerAddress, customerInfo } } } = useContext(appContext);

  const onUserInfoChange = (e) => {
    const { value, name, id } = e.target;
    if (name === 'customerInfo') {
      uploadData('customerInfo', {
        ...customerInfo,
        [id]: value,
      })
    } else if (name === 'customerAddress') {
      uploadData('customerAddress', {
        ...customerAddress,
        [id]: value,
      })
    } else {
      const a = name.split('.');
      if (a.length === 2) {
        const ind = +a[1];
        const arr = [...customerAddress.nearByPlaces];
        arr[ind] = value;
        uploadData('customerAddress', {
          ...customerAddress,
          nearByPlaces: arr,
        })
      }
    }
  };
  const addRemove = (type, index) => {
    const arr = [...customerAddress.nearByPlaces];
    console.log(arr);
    if (type === 'remove') {
      arr.splice(index, 1);
    } else {
      arr.push('');
    }
    uploadData('customerAddress', {
      ...customerAddress,
      nearByPlaces: arr,
    })
  };
  const clearAll = (type: string) => {
    if (type === 'customerAddress') {
      uploadData('customerAddress', {
        address: '',
        tol: '',
        city: '',
        state: '',
        nearByPlaces: [''],
        addressDescription: ''
      })
    }
    if (type === 'customerInfo') {
      uploadData('customerInfo', {
        customerId: '',
        name: '',
        email: '',
        contactNo: '',
      })
    }
  }
  const uploadData = (type: string, data) => {
    if (type === 'customerAddress') {
      dispatch(
        action.setCustomerAddress({
          customerAddress: data
        }),
      );
    }
    if (type === 'customerInfo') {
      dispatch(
        action.setCustomerInfo({
          customerInfo: data,
        }),
      );
    }
  }
  const handleSubmit = async (businessId: string, dataId: string, secret: string) => {
    const { data, errors } = await apiPOST<{ data: string; errors: string }, CustomerAddress>(`/process/${businessId}/${dataId}?secret=${secret}`, customerAddress);
    if (data) {
      dispatch(action.setAlert({
        type: 'success',
        value: data,
      }))
    } else {
      dispatch(action.setAlert({
        type: 'danger',
        value: errors,
      }))
    }
  }
  return {
    onUserInfoChange,
    addRemove,
    uploadData,
    clearAll,
    customerAddress,
    customerInfo,
    handleSubmit
  }
}