import Button from '@/components/elements/Button';
import { apiPOST } from '@/hooks/middleware/api';
import { ProductType } from '@/interface/Product/ProductInterface';
import { appContext } from '@context/appcontext';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { FormComponent } from '../product/kit/FormComponent';

const EditProduct = () => {
    const router = useRouter();
    const {
        state: {
            user: { userdata },
            workplace: { companydata },
            formData: { updateData },
        },
    } = useContext(appContext);

    const staffPos =
        userdata?.workplaces &&
        companydata &&
        userdata?.workplaces.find(({ workplaceId }) => workplaceId === companydata?._id)?.positionLabel;

    const updateSubmit = (item: ProductType) => {
        console.log('is this the one', item);
        //apiPOST<string, ProductType>(`/products/${item._id}?businessId=${router.query?.businessId}`, item);
    };

    if (staffPos === 'staff') {
        return (
            <div className="h-96 flex flex-col gap-4 justify-center items-center p-4">
                You are Staff You need to be admin to post Product
                <Button label="Request your Employerr to make admin" />
            </div>
        );
    }

    if (!updateData) {
        return null;
    }

    return <FormComponent data={updateData} onSubmit={updateSubmit} />;
};

export default EditProduct;
