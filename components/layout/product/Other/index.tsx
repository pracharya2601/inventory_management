
import ComponentWrapper from '@/components/layout/ComponentWrapper';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { appContext } from '@context/appcontext';
import Dashboard from '@/components/layout/company/Dashboard';
import BusinessNavbar from '@/components/layout/company/BusinessNavbar';
import { ProductType } from '@/interface/Product/ProductInterface';
import ProductLayout from '@/components/layout/product/ProductLayout';
import { action } from '@context/action';
import SearchBar from '@/components/layout/searchbar';
import { socket } from 'socket/client';
import Pagination from '@/components/layout/product/Pagination';
import { CustomerAddress, ProcessProductInfo, ProcessProductPayloadType } from '@/interface/Product/ProcessProductType';
import Image from 'next/image';
import Button from '@/components/elements/Button';
import DropDownMenu, { DropDownItem } from '@/components/elements/ddm/DropDownMenu';
import { CancelButton, ChangeAddressButton } from './kit';

const PAGE_LIMIT = 10;

interface OtherType extends Omit<ProcessProductPayloadType, 'businessId' | 'productType'> {
  deliveryAttempt?: 'failed';
  productType: 'processing' | 'shipped' | 'delivered' | 'canceled';
}

const Other = ({ data, count }: { data: Array<OtherType>, count: number }) => {
  const [dataList, setDataList] = useState<Array<OtherType> | []>(data);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const router = useRouter();
  const businessId = router.query?.businessId as string;
  const productType = router.query?.productType;
  const pageNum = router.query?.page;
  const eventListern = `update.${businessId}-${productType}`;
  const addEventListener = `add.${businessId}-${productType}`;
  const eventaddresschangeEvent = `addresschange-${businessId}-processing`
  const {
    state: {
      user: { userdata },
      ui: { toggleOpen },
      lugItem,
    },
    dispatch,
  } = useContext(appContext);

  useEffect(() => {
    /**
     * @info useeffect to update realtime data
     */
    setDataList(data);
    if (businessId !== lugItem.businessId) {
      dispatch(
        action.removeItem({
          index: 0,
          stat: 'all',
        }),
      );
      dispatch(
        action.setBusinessId({
          businessId: businessId,
        }),
      );
    }
    socket.on(eventaddresschangeEvent, (data: { dataId: string, customerAddress: CustomerAddress }) => {
      const arr = [...dataList];
      const rowIndex = arr.findIndex(({ _id }) => _id === data.dataId);
      arr[rowIndex] = {
        ...arr[rowIndex],
        customerAddress: data.customerAddress,
      }
      setDataList(arr);
    })
    // socket.on(eventListern, (data: ProductType) => {
    //   const dataArr = [...dataList];
    //   const index = dataArr.findIndex(({ _id }) => _id === data._id);
    //   dataArr[index] = data;
    //   setDataList(dataArr);
    //   if (singleData?._id === data._id) {
    //     setSingleData(data);
    //   }
    // });
    // socket.on(addEventListener, (data: ProductType) => {
    //   setDataList((prevState) => [data, ...prevState]);
    // });
    if (router.query?.search) {
      dispatch(
        action.toggleAction({
          id: 'viewSearchBar',
          open: true,
        }),
      );
      setSearchTerm(router.query?.search as string);
    }
    return () => {
      setSearchTerm('');
      setDataList([]);
    };
  }, [router.asPath]);


  const business = userdata?.workplaces.find(({ workplaceId }) => workplaceId === router.query?.businessId);
  const onHandleSearchTerm = (e) => {
    const { value } = e.target;
    const cleanString = value.replace(/[|&;$%@"<>()+,]/g, '').toLowerCase();
    setSearchTerm(value);
    const filteredData: OtherType[] | [] = data.filter((data: OtherType) => {
      return data.customerInfo.name.toLowerCase().search(cleanString) != -1;
    });
    setDataList(filteredData);
  };
  const handleClear = () => {
    setSearchTerm('');
    setDataList(data);
    dispatch(
      action.toggleAction({
        id: 'viewSearchBar',
        open: false,
      }),
    );
    if (router.query?.search) {
      router.push(`/${router.query?.businessId}/${router.query?.productType}/1`);
    }
  };
  const removeItem = (id: string) => {
    const arr = [...dataList];
    const rowIndex = arr.findIndex(({ _id }) => _id === id);
    arr.splice(rowIndex, 1)
    setDataList(arr);
  }
  return (
    <ComponentWrapper
      searchBarComponent={
        <SearchBar searchTerm={searchTerm} onChange={onHandleSearchTerm} handleClear={handleClear} />
      }
    >
      <Dashboard
        businessHeading={
          <BusinessNavbar
            name={business?.workplaceName}
            id={business?.workplaceId}
            position={business?.positionLabel}
          />
        }
      >
        <ProductLayout
          key={router.asPath}
          pagination={count > PAGE_LIMIT && <Pagination count={count} limit={PAGE_LIMIT} />}
        >
          <div className='mt-1 max-w-5xl mx-auto px-1'>
            {
              dataList.length > 0 ?
                dataList.map((item: OtherType, index: number) => (
                  <div key={`${item._id}-${index}`} className={`border rounded mt-3 ${item?.deliveryAttempt === 'failed' && 'border-red-500'}`} >
                    <div className="flex px-2 border-b rounded-t bg-gray-700">
                      <div className='w-30 p-1 text-center'>
                        <span className='block text-sm uppercase font-semibold'>Order Placed</span>
                        <span className='block text-xs'>{item.createdAt?.split(':')?.[0]}</span>
                      </div>
                      <div className='w-20 p-1 text-center'>
                        <span className='block text-sm uppercase font-semibold'>Total</span>
                        <span className='block text-sm text-yellow-400'>{item.orderDetail?.total}.00</span>
                      </div>
                      <div className='w-40 max-w-xs overflow-x-hidden md:flex-1 p-1 text-center md:text-left truncate'>
                        <span className='block text-sm uppercase font-semibold'>Ship to</span>
                        <span className='block text-sm'>{item.customerInfo?.name}</span>
                      </div>
                    </div>
                    <div className=''>
                      {item?.items?.map((singleItem: ProcessProductInfo, index: number) => (
                        <div key={`${singleItem.name}-${index}`} className={`${index > 0 && 'border-t border-gray-600'} p-2 flex`}>
                          <div className="h-32 w-32 relative m-1">
                            <Image
                              src={singleItem.imageUrl}
                              layout="fill"
                              objectFit="cover"
                              objectPosition="center"
                            />
                          </div>
                          <div className='m-1 flex-1'>
                            <div className="capitalize text-sm sm:text-md md:text-lg font-semibold">{singleItem.name} </div>
                            <div className="text-xs mt-px mb-2 text-blue-200">Order Created By: <span className="ml-2 underline">{item.orderCreatedBy?.name}</span></div>
                            <div className="text-sm sm:text-md mt-1 w-40">Color: <span className="px-2 border py-px rounded">{singleItem.color}</span></div>
                            <div className="text-sm sm:text-md mt-1 w-40">Size: <span className="ml-2 md:ml-3 px-2 py-px border rounded">{singleItem.size}</span></div>
                            <div className="text-xs mt-2 text-green-300">Numbero of Item: <span className="ml-2">{singleItem.numberOfItem}</span></div>
                          </div>
                        </div>
                      ))}
                    </div>
                    {item?.deliveryAttempt && <div className="border-t py-1 bg-yellow-500 text-gray-900  text-center px-1 rounded-b">

                      <span className='block text-sm text-md  uppercase font-semibold'>Delivery Attempt: Failed</span>
                      <span className='block text-sm text-red-900'>Do not Removed order this will removed automatically after delivery company returned order</span>
                    </div>}
                    {!item?.deliveryAttempt && <div className="flex px-2 border-t rounded-b items-center bg-gray-700">
                      <div className='w-30 p-1 text-center'>
                        <span className='block text-sm text-yellow-500 uppercase font-semibold'>Payment</span>
                        <span className='block text-xs text-yellow-400'>{item.paymentStatus.method}</span>
                      </div>
                      {item.productType === 'processing' && (
                        <div className='w-20 p-1 text-center'>
                          <CancelButton removeItem={() => removeItem(item._id)} dataId={item._id} secret={business?.secret} label={<span className='cursor-pointer block text-sm text-red-500 hover:underline uppercase font-semibold'>cancel</span>} />
                        </div>
                      )}
                      <div className='w-40 max-w-xs overflow-x-hidden md:flex-1 p-1 text-center md:text-left truncate'>
                        {item.productType === 'processing' && <ChangeAddressButton secret={business?.secret} dataId={item._id} customerData={item?.customerAddress} customerName={item.customerInfo?.name} label={<span className='cursor-pointer block text-sm hover:underline text-purple-500 uppercase font-semibold'>Change address</span>} />}
                        {item.productType === 'shipped' || item.productType === 'delivered' && (
                          <>
                            <span className='block text-sm uppercase font-semibold'>Delivery By</span>
                            <span className='block text-sm'>Default Company</span>
                          </>
                        )}
                      </div>
                    </div>}
                  </div>
                )) : (
                  <div className='h-96 flex justify-center items-center text-center px-4'>No Available data. Previous data moved to different catagory.</div>
                )
            }
          </div>
        </ProductLayout>
      </Dashboard>
    </ComponentWrapper>
  );
};

export default Other;