import { Colors, C } from "../Color"

type Sizes = 'sm' | 'md' | 'lg';
type RadioSide = "left" | "right";

export type CheckboxColors = Colors;
export type CheckboxSize = {
  sm: string;
  md: string;
  lg: string
}

export interface RadioInputProps {
  value: string;
  label: string;
}

export interface RadioProps {
  value?: string;
  id?: string;
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  items?: RadioInputProps[];
  color?: C;
  size?: Sizes;
  radioSide?: RadioSide;
  children?: JSX.Element[];
}

export interface RadioItemProps {
  value?: string;
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  color?: C;
  size?: Sizes;
  radioSide?: RadioSide;
  checkValue?: string;
  label?: string;
}