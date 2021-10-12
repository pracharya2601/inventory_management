import { Colors, C } from "../Color"

type Sizes = 'sm' | 'md' | 'lg';
type CheckSide = "left" | "right";

export type CheckboxColors = Colors;
export type CheckboxSize = {
  sm: string;
  md: string;
  lg: string
}

export interface CheckBoxProps {
  label?: string | JSX.Element;
  color?: C;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  id?: string;
  size?: Sizes;
  checkSide?: CheckSide;
  withBackground?: string;
  value?: string;
  checked?: boolean;
}