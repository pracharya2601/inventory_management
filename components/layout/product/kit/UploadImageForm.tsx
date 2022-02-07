import Button from '@/components/elements/Button';
import DropDownMenu, { DropDownItem } from '@/components/elements/ddm/DropDownMenu';
import Image from 'next/dist/client/image';

export const UploadImageForm = ({
    mobileShareComponent,
    uploadPhoto,
    images,
    colors,
    onDropdownChange,
    deleteImage,
}: {
    mobileShareComponent?: JSX.Element;
    uploadPhoto: (e: React.ChangeEvent<HTMLInputElement>) => void;
    images: Array<{ id: string; url: string; color: string }>;
    colors?: string[];
    onDropdownChange: (index: number, name: string) => void;
    deleteImage: (index: number, filename: string) => void;
}) => {
    const uploadImg = () => {
        const fileInp = document.getElementById('imageInput');
        fileInp.click();
    };
    return (
        <>
            <div className="mt-3 flex flex-col items-left text-gray-100">
                <p className="text-lg">Images</p>
                <Button label="Add Image" size="sm" customClass="w-28 mt-2" type="button" onClick={() => uploadImg()} />
                {mobileShareComponent && mobileShareComponent}
                <input type="file" id="imageInput" hidden={true} onChange={uploadPhoto} />
            </div>
            <div className="mt-3 flex flex- gap-2 justify-left min-w-full overflow-x-auto ">
                {images?.length > 0 &&
                    images.map(({ id, url, color }, index) => (
                        <div key={`${url}-${index}`} className="shadow-sm bg-gray-800 rounded">
                            <div className="p-2 flex justify-between items-center rounded">
                                {colors && (
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
                                                onClick={() => onDropdownChange(index, item)}
                                            />
                                        ))}
                                    </DropDownMenu>
                                )}
                                <Button
                                    size="xs"
                                    color="red"
                                    type="button"
                                    onClick={() => deleteImage(index, id)}
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
        </>
    );
};
