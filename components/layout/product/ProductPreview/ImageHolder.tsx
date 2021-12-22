import { Images as ImageTypes } from '@/interface/Product/ProductInterface';
import Image from 'next/image';
import React from 'react';
import ImageMagnifier from './ImageMagnifier';

interface ImageHolderProps {
    activeImage: string;
    images: ImageTypes[];
    setActiveImage: (name: string) => void;
    name: string;
}

const ImageHolder = ({ activeImage, images, setActiveImage, name }: ImageHolderProps) => {
    return (
        <div className="w-full mt-10 md:w-96 flex flex-col items-center">
            <div className="h-64 w-64 relative m-1">
                <ImageMagnifier src={activeImage} />
            </div>
            <div className="flex flex-wrap w-full justify-center">
                {images.map((img) => (
                    <div
                        key={img.url}
                        className={`h-11 md:h-16 w-11 md:w-16 relative m-1 border-2 rounded ${activeImage === img.url && 'border-green300'
                            } hover:border-blud-300 cursor-pointer`}
                        onClick={() => setActiveImage(img.url)}
                    >
                        <Image src={img.url} layout="fill" objectFit="cover" objectPosition="center" alt={name} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageHolder;
