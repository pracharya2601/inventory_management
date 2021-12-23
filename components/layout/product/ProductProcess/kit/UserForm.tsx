import Button from '@/components/elements/Button';
import Input from '@/components/elements/Input';
import { action } from '@context/action';
import { appContext } from '@context/appcontext';
import { useContext } from 'react';
import { ProcessOrderButton } from '.';

const UserForm = () => {
    const {
        state: {
            lugItem: { customerInfo, customerAddress },
        },
        dispatch,
    } = useContext(appContext);

    const onUserInfoChange = (e) => {
        const { value, name, id } = e.target;
        if (name === 'customerInfo') {
            dispatch(
                action.setCustomerInfo({
                    customerInfo: {
                        ...customerInfo,
                        [id]: value,
                    },
                }),
            );
        } else if (name === 'customerAddress') {
            dispatch(
                action.setCustomerAddress({
                    customerAddress: {
                        ...customerAddress,
                        [id]: value,
                    },
                }),
            );
        } else {
            console.log(name);
            const a = name.split('.');
            if (a.length === 2) {
                const ind = +a[1];
                const arr = [...customerAddress.nearByPlaces];
                arr[ind] = value;
                dispatch(
                    action.setCustomerAddress({
                        customerAddress: {
                            ...customerAddress,
                            nearByPlaces: arr,
                        },
                    }),
                );
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
        dispatch(
            action.setCustomerAddress({
                customerAddress: {
                    ...customerAddress,
                    nearByPlaces: arr,
                },
            }),
        );
    };

    return (
        <div className="max-w-lg">
            <div className="mt-4 border pt-2 pb-3 px-2 flex flex-col gap-2 rounded">
                <div className="py-1 text-lg">Customer Info</div>
                <Input helper="Full Name" name="customerInfo" id="name" onChange={onUserInfoChange} />
                <Input helper="Contact Number" name="customerInfo" id="contaceNo" onChange={onUserInfoChange} />
                <Input helper="Email" name="customerInfo" id="email" onChange={onUserInfoChange} />
            </div>
            <div className="mt-2 border pt-2 pb-3 px-2 flex flex-col gap-2 rounded">
                <div className="py-1 text-lg">Customer Address</div>
                <Input name="customerAddress" id="address" helper="Home Address" onChange={onUserInfoChange} />
                <Input name="customerAddress" id="tol" helper="Tol" onChange={onUserInfoChange} />
                <Input name="customerAddress" id="city" helper="City" onChange={onUserInfoChange} />
                <Input name="customerAddress" id="state" helper="State" onChange={onUserInfoChange} />
                <div className="flex flex-col gap-1">
                    <div className="my-2 p-1">Nearby Address helps to deliver package easily.</div>
                    {customerAddress.nearByPlaces?.map((val, index) => (
                        <Input
                            key={`places-${index}`}
                            helper={`Address- ${index + 1}`}
                            name={`nearByPlaces.${index}`}
                            onClear={() => addRemove('remove', index)}
                            onChange={onUserInfoChange}
                        />
                    ))}
                    <div>
                        <Button
                            size="xs"
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
                {/* <Button label={`Submit`} customClass="mb-20 mt-2" fullwidth color="green" /> */}
                <ProcessOrderButton />
            </div>
        </div>
    );
};

export default UserForm;
