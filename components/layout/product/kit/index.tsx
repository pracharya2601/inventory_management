import Button from '@/components/elements/Button';
import { PreviewColors, PreviewSizes } from '@/interface/Context/InitialStateType';

interface ColorsProps {
    activeColor: string;
    colors: PreviewColors[];
    setColor: ({ color, index, stat }: { color: string; index: number; stat: boolean }) => void;
    noHeading?: boolean;
}

interface SizeProps {
    activeSize: string;
    sizes: PreviewSizes[];
    setSize: ({ size, index, stat }: { size: string; index: number; stat: boolean }) => void;
    noHeading?: boolean;
}

export const Colors = ({ activeColor, colors, setColor, noHeading }: ColorsProps) => {
    return (
        <div className="w-full flex flex-col md:flex-row mt-3">
            {!noHeading && <span className="mt-1">Colors: </span>}
            <div className="flex overflow-auto md:flex-wrap pr-5 gap-1 py-2 pl-2">
                {colors.map(({ color, stat }, index) => (
                    <div
                        key={`${color}-${index}`}
                        className={`h-7 w-7 flex justify-center content-center border-2 rounded-full border-opposite-100 hover:border-primary-500 ${activeColor == color && stat ? 'border-blue-900 px-1 ring-6 ring-offset-1' : 'px-3'
                            } ${!stat && 'opacity-40 cursor-not-allowed hover:border-opposite-100'
                            } m-1 cursor-pointer text-sm`}
                        style={{ background: color }}
                        onClick={() => setColor({ color, index, stat })}
                    >
                        {activeColor == color && stat && <span className='mt-px' style={{ color: color, filter: `invert(1)` }}>✓</span>}
                    </div>
                ))}
            </div>
        </div>
    );
};

export const Sizes = ({ sizes, setSize, activeSize, noHeading }: SizeProps) => {
    return (
        <div className="w-full p-1 flex flex-col md:flex-row mt-3">
            {!noHeading && <span>Sizes: </span>}
            <div className="flex flex-wrap">
                {sizes.map(({ size, stat }, index) => (
                    <div key={`${size}-${index}`} className={`rounded-lg m-1 ${activeSize === size && stat && 'ring-offset-0 ring-6'}`}>
                        <Button
                            //key={`${size}-${index}`}
                            onClick={() => setSize({ size, index, stat })}
                            label={size}
                            size="xs"
                            type="button"
                            color={activeSize == size && stat ? 'green' : !stat ? 'red' : 'blue'}
                            //customClass="mx-1 my-1"
                            icon={activeSize === size && stat && <CheckMark />}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export const Description = ({ children }: { children: string }) => {
    return <div className="m-1 p-1 overflow ellipsis">{children}</div>;
};

export const CheckMark = ({ color }: { color?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        filter="invert(1)"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke={`${color == 'black' ? 'white' : 'black'}`}
    >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
);
