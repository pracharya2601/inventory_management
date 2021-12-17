import Button from '@/components/elements/Button';
import DropDownMenu, { DropDownItem } from '@/components/elements/ddm/DropDownMenu';
import Input from '@/components/elements/Input';
import { CreateDataType, ProductType } from '@/interface/Product/ProductInterface';
import { SkusTable, SkusTableBodyHolder, SkusTableWrapper } from './SkusTable';
import Image from 'next/image';
import { useProductForm } from '@/hooks/useProductForm';

export const FormComponent = ({
    data,
    onSubmit,
}: {
    data: ProductType | CreateDataType;
    onSubmit?: (item: ProductType | CreateDataType) => void;
}) => {
    const { handleOnChange, handleOnChangeArray, onDropdownChange, da, deleteItem, addItem, colors, sizes } =
        useProductForm(data);

    const uploadPhoto = async (e) => {
        const file = e.target.files[0];
        const filename = encodeURIComponent(file.name);
        const res = await fetch(`http://localhost:3000/api/file?file=${filename}`);
        const { url, fields } = await res.json();
        const formData = new FormData();
        Object.entries({ ...fields, file }).forEach(([key, value]) => {
            formData.append(key, value as string);
        });
        const upload = await fetch(url, {
            method: 'POST',
            body: formData,
        });
        if (upload.ok) {
            console.log('url', `${upload.url}${filename}`);
            addItem('images', {
                id: filename,
                url: `${upload.url}${filename}`,
                color: 'default',
            });
            console.log('Uploaded successfully!');
        } else {
            console.error('Upload failed.');
        }
    };
    const deleteImage = async (name: string, filename: string) => {
        deleteItem(name);
        await fetch(`http://localhost:3000/api/file?file=${filename}`, {
            method: 'DELETE',
        });
    };

    const uploadImg = () => {
        const fileInp = document.getElementById('imageInput');
        fileInp.click();
    };

    if (!data) return null;
    return (
        <>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    onSubmit(da);
                }}
            >
                <div className="min-full p-3 max-w-screen-md mx-auto">
                    <div className="my-1">
                        <Input
                            placeholder={'Name of the product'}
                            square
                            value={da?.name}
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
                        value={da?.description}
                        rows={4}
                        id="descritpion"
                        name="description"
                        onChange={(e) => handleOnChange(e)}
                    ></textarea>
                    {da.listDescription.map(({ id, desckey, desc }, index) => (
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
                            addItem('listDescription', { id: da?.listDescription.length + 1, desckey: '', desc: '' })
                        }
                    />
                    <p className="text-md mt-3">Product Detail</p>
                    {da?.productdetail?.map(({ id, detailkey, detail }, index) => (
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
                            addItem('productdetail', { id: da?.productdetail.length + 1, detailkey: '', detail: '' })
                        }
                    />
                    <div className="mt-3 flex flex-col items-left">
                        <p className="text-lg">Images</p>
                        <Button
                            label="Add Image"
                            size="sm"
                            customClass="w-28 mt-2"
                            type="button"
                            onClick={() => uploadImg()}
                        />
                        <input type="file" id="imageInput" hidden={true} onChange={uploadPhoto} />
                    </div>
                    <div className="mt-3 flex flex- gap-2 justify-left min-w-full overflow-x-auto ">
                        {da?.images?.length > 0 &&
                            da.images.map(({ id, url, color }, index) => (
                                <div key={`${url}-${index}`} className="shadow-sm bg-gray-800 rounded">
                                    <div className="p-2 flex justify-between items-center rounded">
                                        <DropDownMenu
                                            label={
                                                <div
                                                    style={{ backgroundColor: color }}
                                                    className="px-2 py-1 rounded cursor-pointer -mb-1"
                                                >
                                                    {color || 'default'} &#10225;{''}
                                                </div>
                                            }
                                            dropSide="right"
                                        >
                                            {colors?.map((item) => (
                                                <DropDownItem
                                                    label={item}
                                                    key={`${item}-${url}`}
                                                    onClick={() => onDropdownChange(item, `images.${index}.color`)}
                                                />
                                            ))}
                                        </DropDownMenu>
                                        <Button
                                            size="xs"
                                            color="red"
                                            type="button"
                                            //onClick={() => deleteItem(`images.${index}`)}
                                            onClick={() => deleteImage(`images.${index}`, id)}
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
                                    </div>
                                    <div className="h-80 w-80 relative m-1 border">
                                        {url && (
                                            <Image
                                                src={url}
                                                layout="fill"
                                                objectFit="contain"
                                                objectPosition="center"
                                                alt={url}
                                            />
                                        )}
                                    </div>
                                </div>
                            ))}
                    </div>
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
                                        id: da?.skus.length + 1,
                                        color: '',
                                        size: '',
                                        count: 0,
                                        price: 0,
                                    })
                                }
                            />
                        }
                    >
                        {da?.skus.length > 0 &&
                            da.skus.map((sku, index) => {
                                return (
                                    <SkusTableBodyHolder key={`skus-${index}`}>
                                        <SkusTableWrapper>
                                            <DropDownMenu label={sku.color || 'Select'} dropSide="right">
                                                {colors?.map((item) => (
                                                    <DropDownItem
                                                        label={item}
                                                        key={`${item}-sku-color${index}`}
                                                        onClick={() => onDropdownChange(item, `skus.${index}.color`)}
                                                    />
                                                ))}
                                            </DropDownMenu>
                                        </SkusTableWrapper>
                                        <SkusTableWrapper>
                                            <DropDownMenu label={sku.size || 'Select'} dropSide="left">
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
                    <Button type="submit" label="Submit" color="green" customClass="w-52" size="sm" />
                </div>
            </form>
        </>
    );
};
