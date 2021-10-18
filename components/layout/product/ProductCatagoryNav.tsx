import clsx from 'clsx';
import { useRouter } from 'next/dist/client/router';

export interface PCProps {
    active?: boolean;
    label?: string | JSX.Element;
    url?: string;
}

const ProductCatagoryButton = ({ active, label, url }: PCProps) => {
    const router = useRouter();
    const wrappedClass = clsx(`cursor-pointer w-max px-4 h-10 leading-10`, {
        'border-l border-r border-t rounded-t-md': active,
        'border-b': !active,
    });

    const onClickHandle = (url: string) => {
        url ? router.push(url) : console.log('No url found');
    };

    return (
        <div className={wrappedClass} onClick={() => onClickHandle(url)}>
            {label}
        </div>
    );
};

export default ProductCatagoryButton;
