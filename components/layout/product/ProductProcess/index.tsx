import { appContext } from "@context/appcontext"
import { useContext, useEffect, useState } from "react";
import Button from '@/components/elements/Button';
import Input from '@/components/elements/Input';
import Image from 'next/image';
import { action } from "@context/action";
import { ProcessProductInfo } from "@/interface/Product/ProcessProductType";

const ProductProcess = () => {
  const { dispatch, state: { lugItem: { items, orderDetail: { subtotal, taxPercent, taxAmt, coupon, shipping, total } } } } = useContext(appContext);
  const ct = items.reduce((total, { numberOfItem }) => total + numberOfItem, 0)
  const apple = (val: number, id: string) => {
    dispatch(action.updateOrderDetail({
      id: id,
      val: val
    }))
  }
  return (
    <div className="px-2">
      <form className="" autoComplete="off">
        <div className="max-w-4xl px-2 mx-auto">
          <div className="border p-2 rounded">
            <div>Subtotal: <span className="text-lg font-semibold">{subtotal}.00</span></div>
            <HiddenForm
              label="Tax and Tax"
              value={taxAmt}
              taxItem={`${taxPercent} % of ${subtotal}.00`}
              id="taxPercent"
              onClick={apple}
            />
            <HiddenForm
              label="Discount"
              value={`-${coupon}`}
              taxItem={''}
              id="discount"
              onClick={apple}
            />
            <HiddenForm
              label="Shipping Cost"
              value={shipping}
              taxItem={''}
              id="shipping"
              onClick={apple}
            />
            <hr className="mt-2 mb-1" />
            <div className="text-xl text-right py-1 pr-2 ">
              <div className="text-sm">Total Number of Items: {' '}{ct}</div>
              Total: <span className="font-semibold">{total}.00
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap flex-col md:flex-row gap-2">
          <div className="w-full max-w-lg mx-auto lg:mx-0 lg:ml-auto">
            {items.length > 0 ? (
              <>
                {items.map((item: ProcessProductInfo, index: number) => (
                  <div className="mt-4 border rounded bg-gray-700" key={`${index}-${item.name}`}>
                    <div className="flex">
                      <div className="h-32 sm:h-48 w-32 sm:w-48 relative m-1">
                        <Image src={item.imageUrl} layout="fill" objectFit="cover" objectPosition="center" />
                      </div>
                      <div className="flex-1">
                        <div className="p-2 h-10 mb-1 overflow-hidden text-lg font-semibold capitalize">
                          {item.name}
                        </div>
                        <div className="px-2">Price रू: <span className="text-lg font-extrabold ">{item.price}.00</span></div>
                        {item.color && <div className="px-2">Color: <span className="text-lg font-semibold">{item.color}</span></div>}
                        {item.size && <div className="px-2">Size: <span className="text-lg font-semibold">{item.size}</span></div>}
                      </div>
                    </div>
                    <div className="flex gap-2 justify-between w-full md:w-80 ml-auto pr-2 pl-2 md:pl-4 md:-mt-11 mb-1 items-center">
                      <div className="flex gap-2 items-center">
                        <Button
                          size='xs'
                          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                          </svg>}
                          onClick={() => {
                            if (item.numberOfItem > 1) {
                              const newUp = {
                                ...item,
                                numberOfItem: item.numberOfItem - 1,
                                total: (item.numberOfItem - 1) * item.price
                              }
                              dispatch(action.updateItem({
                                index: index,
                                item: newUp
                              }))
                            } else {
                              dispatch(action.removeItem({
                                index: index,
                                stat: '',
                              }))
                            }
                          }}
                        />
                        <span className="px-4 py-2 bg-gray-900 rounded">{item.numberOfItem}</span>
                        <Button
                          size='xs'
                          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>}
                          onClick={() => {
                            const newUp = {
                              ...item,
                              numberOfItem: item.numberOfItem + 1,
                              total: (item.numberOfItem + 1) * item.price
                            }
                            dispatch(action.updateItem({
                              index: index,
                              item: newUp
                            }))
                          }}
                        />

                      </div>
                      <Button
                        label={'Delete'}
                        size="xs"
                        customClass="float-right"
                        color="red"
                        onClick={() => {
                          dispatch(action.removeItem({
                            index: index,
                            stat: '',
                          }))
                        }}
                      />
                    </div>
                  </div>
                ))}
              </>
            ) :
              <div className="border mt-4 py-10 px-2 text-center rounded">
                <p>Select item before continue.</p>
              </div>
            }
            <div className="flex">
              <Button label={items.length > 0 ? 'Add More Items' : 'Select Item'}
                customClass="mt-2"
                size="sm"
                color="yellow"
                onClick={() => {
                  dispatch(action.toggleAction({
                    id: 'processProduct',
                    open: false,
                  }))
                }} />
              {items.length > 1 && <Button label={'Remove All'}
                customClass="mt-2 ml-auto"
                size="sm"
                color="yellow"
                onClick={() => {
                  dispatch(action.removeItem({
                    index: 0,
                    stat: 'all',
                  }))
                }} />}
            </div>
          </div>
          <div className="max-w-sm mx-auto lg:mx-0 lg:mr-auto">
            <div className="mt-4 border pt-2 pb-3 px-2 flex flex-col gap-2 rounded">
              <div className="py-1 text-lg">Customer Info</div>
              <Input helper='Full Name' />
              <Input helper='Contact Number' />
              <Input helper='Email' />
            </div>
            <div className="mt-2 border pt-2 pb-3 px-2 flex flex-col gap-2 rounded">
              <div className="py-1 text-lg">Customer Address</div>
              <Input helper='Home Address' />
              <Input helper='Tol' />
              <Input helper='City' />
              <Input helper='State' />
              <div className="">
                <div className="my-2 p-1">Nearby Address helps to deliver package easily.</div>
                <Input helper='Add 1' onClear={() => alert('Clearing')} />
                <Button size='xs' label={`Add Nearby Address`} customClass="mt-2 mb-2" />
              </div>
            </div>
            <div className="mt-2 pt-2 pb-3 px-2 flex flex-col gap-2 rounded">
              <Button label={`Submit`} customClass="mb-20 mt-2" fullwidth color='green' />
            </div>
          </div>
        </div>
      </form>
    </div>
  )
};

export default ProductProcess;

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
            setActive(false)
          }} />
      </div>
    )
  }
  return (
    <div className="flex items-center">
      <span>{label} : </span>
      {taxItem && <span className="text-sm text-yellow-500 ml-3">{taxItem}</span>}
      <span className="text-lg font-semibold ml-2">{value}.00</span>
      <span className="ml-2 cursor-pointer" onClick={() => setActive(true)} >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
          <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
        </svg>
      </span>
    </div>
  )
}