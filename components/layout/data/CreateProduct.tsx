import Button from '@/components/elements/Button';
import { CreateDataType } from '@/interface/Product/ProductInterface';
import { appContext } from '@context/appcontext';
import { useContext } from 'react';
import { FormComponent } from '../product/kit/FormComponent';

const CreateProduct = () => {
    const {
        state: {
            user: { userdata },
            workplace: { companydata },
            formData: { createData },
        },
    } = useContext(appContext);
    const staffPos =
        userdata?.workplaces &&
        companydata &&
        userdata?.workplaces.find(({ workplaceId }) => workplaceId === companydata?._id)?.positionLabel;

    const createProductSubmit = (item: CreateDataType) => {
        console.log(item);
    };

    if (staffPos === 'staff') {
        return (
            <div className="h-96 flex flex-col gap-4 justify-center items-center p-4">
                You are Staff You need to be admin to post Product
                <Button label="Request your Employerr to make admin" />
            </div>
        );
    }
    return <FormComponent data={createData} onSubmit={createProductSubmit} />;
};

export default CreateProduct;
