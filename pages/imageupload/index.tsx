import { HomeButton } from '@/components/layout/NavButtons';
import { UploadImageForm } from '@/components/layout/product/kit/UploadImageForm';
import { decrypt } from '@/hooks/middleware/encrypt';
import { isMobileView } from '@/hooks/middleware/isMobileView';
import { useProduceImageUpload } from '@/hooks/useProductForm/useProductImageUpload';
import { useRouter } from 'next/router';

/* eslint-disable @typescript-eslint/no-explicit-any */
const ImageUpload = ({ error }: { error: string }) => {
    const router = useRouter();
    const imageuploadId = router.query?.share as string;
    const { images, uploadPhoto, deleteImage, changeImgColor } = useProduceImageUpload(imageuploadId, []);
    return (
        <div className="dark bg-gray-900 py-10 px-3 fixed h-screen w-screen">
            <div className="flex flex-col m-auto mt-5 w-full w-3/4 md:w-96 max-w-md px-4 py-8 rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
                <div className=" flex flex-col items-center mb-6 text-md font-light text-gray-600 dark:text-white">
                    <HomeButton />
                    <p className="text-gray-200">Upload Image from your phone</p>
                </div>
                <div className="flex flex-col gap-4 item-center bg-gray-900 p-2 rounded">
                    {error ? (
                        <p className="text-red-500 text-center text-lg p-3">{error}</p>
                    ) : (
                        <UploadImageForm
                            uploadPhoto={uploadPhoto}
                            images={images}
                            onDropdownChange={changeImgColor}
                            deleteImage={deleteImage}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default ImageUpload;

export async function getServerSideProps(context: any) {
    const iam = context.query?.iam;
    const share = context.query?.share;
    const isMobile = isMobileView(context.req);
    const decryptVal = +decrypt<string>(iam);
    const newDateTime = new Date().getTime() + 3600000;
    const error = newDateTime < decryptVal ? 'Timeout please scan the barcode again and proceed it.' : '';
    if (!isMobile) {
        return {
            redirect: {
                permanent: false,
                destination: '/',
            },
        };
    }

    if (iam && share) {
        return {
            props: {
                error,
            },
        };
    } else {
        return {
            redirect: {
                permanent: false,
                destination: '/',
            },
        };
    }
}
