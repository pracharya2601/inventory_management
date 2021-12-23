/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/prop-types */
import Button from '@/components/elements/Button';
import DropDownMenu, { DropDownItem } from '@/components/elements/ddm/DropDownMenu';
import Input from '@/components/elements/Input';
import Modal from '@/components/elements/Modal';
import { apiPOST } from '@/hooks/middleware/api';
import { OrderPaymentStatus, ProcessProductPayloadType } from '@/interface/Product/ProcessProductType';
import { action } from '@context/action';
import { appContext } from '@context/appcontext';
import { useRouter } from 'next/router';
import { useContext, useEffect, useRef, useState } from 'react';

type ProcessProductPost = Omit<
    ProcessProductPayloadType,
    'soldBy' | 'stat' | 'orderCreatedBy' | '_id' | 'productType' | 'businessId'
>;

export const ProcessOrderButton = () => {
    const router = useRouter();
    const companyId = router.query?.businessId;
    const {
        state: {
            lugItem,
            user: { userdata },
        },
        dispatch,
    } = useContext(appContext);
    const [state, setState] = useState<OrderPaymentStatus>({
        status: false,
        method: '',
        delivery: '',
        paymentId: '',
        amount: 0,
    });

    const firstRender = useRef(null);
    useEffect(() => {
        if (!firstRender.current) {
            firstRender.current = true;
            return;
        }
        if (lugItem.items?.length === 0) {
            //no item selected
            dispatch(
                action.setAlert({
                    type: 'danger',
                    value: 'Please select Item before Continue',
                }),
            );
            close();
            return;
        }
    }, [state]);
    const close = () => {
        const a = document.getElementById('modal_wrapper');
        a.click();
    };
    const onChangeHandle = (name: string, value: string | boolean) => {
        setState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const business = userdata?.workplaces.find(({ workplaceId }) => workplaceId === companyId);

    const handleSubmit = async () => {
        const { businessId, ...other } = lugItem;
        const newData = {
            ...other,
            paymentStatus: state,
        };
        const { data, errors } = await apiPOST<{ data: string; errors: string }, ProcessProductPost>(
            `/process/${companyId}?secret=${business?.secret}`,
            newData,
        );
        if (data) {
            dispatch(
                action.removeItem({
                    index: 0,
                    stat: 'all',
                }),
            );
        } else {
            console.log(errors);
        }
    };

    return (
        <Modal
            heading="Are you sure You want to Procced?"
            onClick={() => {
                handleSubmit();
            }}
            label={
                <div className="py-2 px-4 rounded bg-green-600 hover:bg-green-700 cursor-pointer w-full text-center">
                    Submit
                </div>
            }
        >
            <div className="text-sm text-yellow-500">Before Continue make sure the payment method.</div>
            <div className="mt-2">
                <div className="flex justify-between items-center">
                    <div>Payment Status</div>
                    <DropDownMenu label={`${state.status}` || 'Select'}>
                        <DropDownItem label="false" onClick={() => onChangeHandle('status', false)} />
                        <DropDownItem label="true" onClick={() => onChangeHandle('status', true)} />
                    </DropDownMenu>
                </div>
                <div className="text-xs text-yellow-500">
                    Make sure to do false on payment status if it is cash on delivery.
                </div>
                <div className="flex justify-between items-center mt-2">
                    <div>Payment Method</div>
                    <DropDownMenu label={state.method || 'Select'}>
                        <DropDownItem label="Online Transfer" onClick={() => onChangeHandle('method', 'online')} />
                        <DropDownItem label="Mercant" onClick={() => onChangeHandle('method', 'mercant')} />
                        <DropDownItem
                            label="Cash on Delivery"
                            onClick={() => onChangeHandle('method', 'cashondelivery')}
                        />
                    </DropDownMenu>
                </div>
                <div className="flex justify-end items-center mt-3">
                    TOTAL AMT: <span className="font-bold ml-2"> {lugItem?.orderDetail?.total}</span>{' '}
                </div>
            </div>
        </Modal>
    );
};

export const HiddenForm = ({ label, value, taxItem, onClick, id }) => {
    const [active, setActive] = useState(false);
    const [val, setVal] = useState(0);
    if (active) {
        return (
            <div className="flex gap-2 items-center flex-wrap">
                <div className="w-48">
                    <Input
                        helper={label}
                        min="0"
                        max="100"
                        type="number"
                        square
                        onChange={(e) => {
                            const { value } = e.target;
                            setVal(parseInt(value));
                        }}
                    />
                </div>
                <Button
                    size="sm"
                    label={'Update'}
                    onClick={() => {
                        onClick && onClick(val, id);
                        setActive(false);
                    }}
                />
            </div>
        );
    }
    return (
        <div className="flex items-center">
            <span>{label} : </span>
            {taxItem && <span className="text-sm text-yellow-500 ml-3">{taxItem}</span>}
            <span className="text-lg font-semibold ml-2">{value}.00</span>
            <span className="ml-2 cursor-pointer" onClick={() => setActive(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                    <path
                        fillRule="evenodd"
                        d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                        clipRule="evenodd"
                    />
                </svg>
            </span>
        </div>
    );
};
