import Button from '@/components/elements/Button';
import DropDownMenu, { DropDownItem } from '@/components/elements/ddm/DropDownMenu';
import Input from '@/components/elements/Input';
import { SkusTable, SkusTableBodyHolder, SkusTableWrapper } from './SkusTable';

const ProductForm = ({
    data,
    handleOnChange,
    handleOnChangeArray,
    onDropdownChange,
    deleteItem,
    addItem,
    colors,
    colorSearchBox,
    sizes,
    sizeSearchBox,
    submitButton,
    imageComponent,
}: any) => {
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
            }}
        >
            <div className="min-full p-3 max-w-screen-md mx-auto">
                <div className="my-1">
                    <Input
                        placeholder={'Name of the product'}
                        square
                        value={data?.name}
                        helper="Product Name"
                        required
                        indicationStyle="Hello"
                        onChange={(e) => handleOnChange(e)}
                        id="name"
                        name="name"
                    />
                </div>
                <p className="text-md mt-3">Description</p>
                <textarea
                    className="w-full p-2 text-gray-800"
                    placeholder="Product catagory and product type need to be render and also create some sort of algorith to work on skus so that if item is selected already those cannot be selected"
                    value={data?.description}
                    rows={4}
                    id="descritpion"
                    name="description"
                    onChange={(e) => handleOnChange(e)}
                ></textarea>
                {data?.listDescription.map(({ id, desckey, desc }, index) => (
                    <div className="my-1 w-full flex gap-1" key={`${id}-listDescription`}>
                        <div className="flex-initial">
                            <Input
                                placeholder={'Name of the product'}
                                square
                                value={desckey}
                                required
                                id="listDescription-desckey"
                                name={`listDescription.${index}.desckey`}
                                onChange={(e) => handleOnChangeArray(e)}
                            />
                        </div>
                        <div className="flex-grow">
                            <Input
                                placeholder={'Name of the product'}
                                square
                                value={desc}
                                autoComplete="off"
                                required
                                id="listDescription-desc"
                                name={`listDescription.${index}.desc`}
                                onChange={(e) => handleOnChangeArray(e)}
                                onClear={() => deleteItem(`listDescription.${index}`)}
                            />
                        </div>
                    </div>
                ))}
                <Button
                    label="Add List Description"
                    size="sm"
                    customClass="mt-2 mb-3"
                    type="button"
                    onClick={() =>
                        addItem('listDescription', { id: data?.listDescription.length + 1, desckey: '', desc: '' })
                    }
                />
                <p className="text-md mt-3">Product Detail</p>
                {data?.productdetail?.map(({ id, detailkey, detail }, index) => (
                    <div className="my-1 flex gap-1" key={`${id}-product-detail`}>
                        <div className="flex-initial">
                            <Input
                                placeholder={'Name of the product'}
                                square
                                value={detailkey}
                                required
                                id={`productdetail.${index}.detailkey`}
                                name={`productdetail.${index}.detailkey`}
                                onChange={(e) => handleOnChangeArray(e)}
                            />
                        </div>
                        <div className="flex-grow">
                            <Input
                                placeholder={'Name of the product'}
                                square
                                value={detail}
                                required
                                indicationStyle="Hello"
                                id={`productdetail.${index}.detail`}
                                name={`productdetail.${index}.detail`}
                                onChange={(e) => handleOnChangeArray(e)}
                                onClear={() => deleteItem(`productdetail.${index}`)}
                            />
                        </div>
                    </div>
                ))}
                <Button
                    label="Add Detail"
                    size="sm"
                    customClass="mt-2 mb-3"
                    type="button"
                    onClick={() =>
                        addItem('productdetail', { id: data?.productdetail.length + 1, detailkey: '', detail: '' })
                    }
                />
                {imageComponent && imageComponent}
                <p className="text-md mt-9 mb-2">Product Variant</p>
                <SkusTable
                    addNewButton={
                        <Button
                            label="Add More Variant"
                            size="sm"
                            customClass="mb-3 mt-2 ml-1"
                            type="button"
                            onClick={() =>
                                addItem('skus', {
                                    id: data?.skus.length + 1,
                                    color: '',
                                    size: '',
                                    count: 0,
                                    price: 0,
                                })
                            }
                        />
                    }
                >
                    {data?.skus.length > 0 &&
                        data.skus.map((sku, index) => {
                            return (
                                <SkusTableBodyHolder key={`skus-${index}`}>
                                    <SkusTableWrapper>
                                        <DropDownMenu label={sku.color || 'Select'} dropSide="right">
                                            {colorSearchBox}
                                            {colors?.map((item) => {
                                                return (
                                                    <DropDownItem
                                                        label={item}
                                                        key={`${item}-sku-color${index}`}
                                                        onClick={() => onDropdownChange(item, `skus.${index}.color`)}
                                                    />
                                                );
                                            })}
                                        </DropDownMenu>
                                    </SkusTableWrapper>
                                    <SkusTableWrapper>
                                        <DropDownMenu label={sku.size || 'Select'} dropSide="left">
                                            {sizeSearchBox}
                                            {sizes?.map((item) => (
                                                <DropDownItem
                                                    label={item}
                                                    key={`${item}-sku-sizes${index}`}
                                                    onClick={() => onDropdownChange(item, `skus.${index}.size`)}
                                                />
                                            ))}
                                        </DropDownMenu>
                                    </SkusTableWrapper>
                                    <SkusTableWrapper>
                                        <div className="w-24">
                                            <Input
                                                square
                                                type="number"
                                                min="0"
                                                value={sku.count}
                                                id={`skus.${index}.count`}
                                                name={`skus.${index}.count`}
                                                onChange={(e) => handleOnChangeArray(e)}
                                            />
                                        </div>
                                    </SkusTableWrapper>
                                    <SkusTableWrapper>
                                        <div className="w-36 mr-10 md:-mr-2">
                                            <Input
                                                square
                                                helper="$"
                                                type="number"
                                                min="0"
                                                name={`skus.${index}.price`}
                                                id={`skus.${index}.price`}
                                                value={sku.price}
                                                onChange={(e) => handleOnChangeArray(e)}
                                            />
                                        </div>
                                    </SkusTableWrapper>
                                    <SkusTableWrapper last>
                                        <Button
                                            size="xs"
                                            color="red"
                                            customClass="absolute top-5 right-10"
                                            onClick={() => deleteItem(`skus.${index}`)}
                                            type="button"
                                            icon={
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-6 w-6"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M6 18L18 6M6 6l12 12"
                                                    />
                                                </svg>
                                            }
                                        />
                                    </SkusTableWrapper>
                                </SkusTableBodyHolder>
                            );
                        })}
                </SkusTable>
            </div>
            <div className="fixed flex items-center justify-center gap-4 bottom-0 right-0 p-2 w-full z-40 bg-gray-900">
                <div className="w-52 pb-2">{submitButton}</div>
            </div>
        </form>
    );
};

export default ProductForm;
