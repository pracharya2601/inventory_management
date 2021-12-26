import Button from '@/components/elements/Button';
import Input from '@/components/elements/Input';
import { useProcessUser } from '@/hooks/useProcess';
import { ProcessOrderButton } from '.';

const UserForm = () => {
    const { onUserInfoChange,
        addRemove,
        customerInfo,
        customerAddress
    } = useProcessUser()

    return (
        <div className="max-w-lg">
            <div className="mt-4 border pt-2 pb-3 px-2 flex flex-col gap-2 rounded">
                <div className="py-1 text-lg">Customer Info</div>
                <Input value={customerInfo.name} helper="Full Name" name="customerInfo" id="name" onChange={onUserInfoChange} />
                <Input value={customerInfo.contactNo} helper="Contact Number" name="customerInfo" id="contactNo" onChange={onUserInfoChange} />
                <Input value={customerInfo.email} helper="Email" name="customerInfo" id="email" onChange={onUserInfoChange} />
            </div>
            <div className="mt-2 border pt-2 pb-3 px-2 flex flex-col gap-2 rounded">
                <div className="py-1 text-lg">Customer Address</div>
                <Input name="customerAddress" value={customerAddress.address} id="address" helper="Home Address" onChange={onUserInfoChange} />
                <Input name="customerAddress" value={customerAddress.tol} id="tol" helper="Tol" onChange={onUserInfoChange} />
                <Input name="customerAddress" value={customerAddress.city} id="city" helper="City" onChange={onUserInfoChange} />
                <Input name="customerAddress" value={customerAddress.state} id="state" helper="State" onChange={onUserInfoChange} />
                <div className="flex flex-col gap-1">
                    <div className="my-2 p-1">Nearby Address helps to deliver package easily.</div>
                    {customerAddress.nearByPlaces?.map((val: string, index: number) => (
                        <Input
                            key={`places-${index}`}
                            helper={`Address- ${index + 1}`}
                            name={`nearByPlaces.${index}`}
                            value={val}
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
            <div className="mt-2 pt-2 pb-3 px-2 flex flex-col gap-2 rounded w-full">
                <ProcessOrderButton />
            </div>
        </div>
    );
};

export default UserForm;
