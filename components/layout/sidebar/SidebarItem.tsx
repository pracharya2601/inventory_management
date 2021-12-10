import { useRouter } from 'next/router';

export interface SidebarItemProps {
    markIcon?: boolean;
    label?: string | JSX.Element;
    icon?: JSX.Element;
    onClick?: () => void;
}

export const SidebarItem = ({ label, icon, markIcon, onClick }: SidebarItemProps) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const router = useRouter();
    // const onClickHandle = () => {
    //   if (onClick) {
    //     onClick();
    //   }
    // }
    return (
        <div
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-200 dark:hover:bg-black flex justify-between cursor-pointer"
            onClick={onClick}
        >
            <div className="flex items-center gap-2">
                {icon && icon}
                {label}
            </div>
            {markIcon && (
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                </div>
            )}
        </div>
    );
};
