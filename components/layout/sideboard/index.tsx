import { useRef, useState } from 'react';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import SideboardOutline from './SideboardOutline';

interface SideBoardProps {
    label?: string | JSX.Element;
    children?: JSX.Element | JSX.Element[];
}

const SideBoard = ({ label, children }: SideBoardProps) => {
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
            <SideboardOutline setOpen={setOpen} open={open}>
                {children}
            </SideboardOutline>
        </>
    );
};

export default SideBoard;
