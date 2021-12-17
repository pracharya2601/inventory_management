import { useRef, useState } from 'react';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import SideboardOutline from './SideboardOutline';

interface SideBoardProps {
    label?: string | JSX.Element;
    children?: JSX.Element | JSX.Element[];
    size?: 'small' | 'normal' | 'full';
}

const SideBoard = ({ label, children, size }: SideBoardProps) => {
    const sideboardRef = useRef(null);
    const [open, setOpen] = useState(false);
    useOutsideClick(sideboardRef, setOpen);

    return (
        <>
            {label && (
                <div className="cursor-pointer w-max" onClick={() => setOpen(true)}>
                    {label}
                </div>
            )}
            <SideboardOutline setOpen={setOpen} open={open} size={size} label={label}>
                {children}
            </SideboardOutline>
        </>
    );
};

export default SideBoard;
