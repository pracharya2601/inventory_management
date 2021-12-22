import { C, Colors } from '../Color';

export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type BthType = 'submit' | 'button';
type Variant = 'outlined' | 'contained';

export type BtnColors = Colors;

export type BtnSizes = {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
};

export interface ButtonProps {
    rounded?: boolean;
    color?: C;
    icon?: JSX.Element;
    disabled?: boolean;
    type?: BthType;
    label?: string | JSX.Element;
    variant?: Variant;
    onClick?: () => void;
    customClass?: string;
    size?: Size;
    fullwidth?: boolean;
    iconSide?: 'left' | 'right';
}
