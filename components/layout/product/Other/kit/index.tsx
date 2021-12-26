import Button from "@/components/elements/Button";
import Input from "@/components/elements/Input";
import Modal from "@/components/elements/Modal";
import { apiGET, apiPOST } from "@/hooks/middleware/api";
import { useProcessUser } from "@/hooks/useProcess";
import { CustomerAddress } from "@/interface/Product/ProcessProductType";
import { action } from "@context/action";
import { appContext } from "@context/appcontext";
import { useRouter } from "next/router";
import { useContext } from "react";

export const ChangeAddressButton = ({ dataId, customerName, label, customerData, secret }: { dataId: string; customerName: string; label: JSX.Element; customerData?: CustomerAddress, secret: string }) => {
  const { onUserInfoChange,
    addRemove,
    uploadData,
    clearAll,
    customerAddress,
    handleSubmit
  } = useProcessUser();
  const router = useRouter();
  const businessId = router.query?.businessId as string;

  return (
    <Modal
      heading={`Change Address of ${customerName}`}
      onClick={() => handleSubmit(businessId, dataId, secret)}
      label={label}
      taskWhileOpening={() => uploadData('customerAddress', customerData)}
      taskWhileClosing={() => clearAll('customerAddress')}
    >
      <div className="max-h-96 overflow-auto py-2 px-1">
        <div className="mt-2 border pt-2 pb-3 px-2 flex flex-col gap-2 rounded">
          <div className="py-1 text-lg">Customer Address</div>
          <Input name="customerAddress" value={customerAddress.address} id="address" helper="Home Address" onChange={onUserInfoChange} />
          <Input name="customerAddress" value={customerAddress.tol} id="tol" helper="Tol" onChange={onUserInfoChange} />
          <Input name="customerAddress" value={customerAddress.city} id="city" helper="City" onChange={onUserInfoChange} />
          <Input name="customerAddress" value={customerAddress.state} id="state" helper="State" onChange={onUserInfoChange} />
          <div className="flex flex-col gap-1">
            <div className="my-2 p-1">Nearby Address helps to deliver package easily.</div>
            {customerAddress.nearByPlaces?.map((val, index) => (
              <Input
                key={`places-${index}`}
                helper={`Address- ${index + 1}`}
                name={`nearByPlaces.${index}`}
                value={customerAddress.nearByPlaces[index]}
                onClear={() => addRemove('remove', index)}
                onChange={onUserInfoChange}
              />
            ))}
            <div>
              <Button
                size="xs"
                type="button"
                label={`Add Nearby Address`}
                customClass="mt-3 mb-3"
                onClick={() => addRemove('add', 0)}
              />
            </div>
            <Input
              name="customerAddress"
              id="addressDescription"
              helper="Description"
              onChange={onUserInfoChange}
            />
          </div>
        </div>
      </div>
    </Modal >
  )
};


export const CancelButton = ({ dataId, secret, label, removeItem }: { dataId: string; secret: string; label: JSX.Element; removeItem: () => void; }) => {
  const { dispatch } = useContext(appContext);
  const router = useRouter();
  const businessId = router.query?.businessId;
  const handleSubmit = async () => {
    const data = await apiGET<string>(`/process/${businessId}/${dataId}?secret=${secret}`)
    if (data) {
      removeItem();
      dispatch(action.setAlert({
        type: 'success',
        value: data,
      }))
    } else {
      dispatch(action.setAlert({
        type: 'danger',
        value: `Something went wrong. Please try again later`,
      }))
    }
  }
  return (
    <Modal
      heading={`Are you sure you want to cancel the order?`}
      onClick={() => handleSubmit()}
      label={label}
    >
      <div className="max-w-sm text-red-500">
        <p className="text-lg font-semibold">You are about to cancel the order. Click sumit to procced. Once you cancel the order you cannot revert back.</p>
        <p className="text-sm text-yellow-500">You dont need to ypdate it on inventory it will update automatically.</p>
      </div>
    </Modal>
  )
};