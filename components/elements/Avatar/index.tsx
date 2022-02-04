import clsx from 'clsx';
import React from 'react';
import Link from 'next/link';
import { AvatarProps } from '@/interface/elements/Avatar';

const Avatar = ({ withBorder, size, withInfo, type, img, goto, isEdit, onUpload }: AvatarProps) => {
    let sizeClasses = 'h-16 w-16';
    if (size && size !== 'normal') {
        sizeClasses = size === 'small' ? 'h-10 w-10' : 'h-20 w-20';
        if (size === 'monster') {
            sizeClasses = 'h-40 w-40';
        }
    }

    let roundedClasses = 'rounded-full';
    if (type && type !== 'full') {
        roundedClasses = type === 'square' ? '' : 'rounded-lg';
    }
    if (!goto) {
        return (
            <div className={clsx('block relative border rounded-full overflow-hidden')}>
                <img
                    alt="profil"
                    src={img || '/icon.png'}
                    className={clsx('mx-auto object-cover', roundedClasses, sizeClasses, {
                        'border-2 border-white dark:border-gray-800': withBorder,
                    })}
                />
                {withInfo && (
                    <span className="absolute w-3 border-2 left-1/2 -bottom-2 transform -translate-x-1/2 border-white h-3 bg-green-500 rounded-full"></span>
                )}
                {isEdit && (
                    <p
                        onClick={() => onUpload()}
                        className="cursor-pointer absolute w-40 bottom-0 text-center p-2 z-30 bg-gray-700 hover:bg-gray-800 overflow-hidden"
                    >
                        Upload
                    </p>
                )}
            </div>
        );
    }
    return (
        <Link href={goto}>
            <a href="" className="block relative">
                <img
                    alt="profil"
                    src={img || '/icon.png'}
                    className={clsx('mx-auto object-cover', roundedClasses, sizeClasses, {
                        'border-2 border-white dark:border-gray-800': withBorder,
                    })}
                />
                {withInfo && (
                    <span className="absolute w-3 border-2 left-1/2 -bottom-2 transform -translate-x-1/2 border-white h-3 bg-green-500 rounded-full"></span>
                )}
            </a>
        </Link>
    );
};
export default Avatar;
