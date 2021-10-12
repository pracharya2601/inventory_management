export interface MenuProps {
  dropSide?: "left" | "right";
  hideIcon?: boolean;
  forceOpen?: boolean;
  label?: string | JSX.Element;
  withDivider?: boolean;
  icon?: JSX.Element;
  items: DDMItem[];
  withBackground?: boolean;
  children?: JSX.Element[];
}

export interface DDMItem {
  icon?: JSX.Element;
  label: string;
  desc?: string;
  link?: string;
}
export interface MenuItemProps {
  icon?: JSX.Element;
  label: string;
  desc?: string;
  onClick?: () => void;
  onClose?: () => void;
}
