import React from 'react';
import clsx from 'clsx';
import { BtnSizes, BtnColors, ButtonProps } from '@/interface/elements/Button';

const colors: BtnColors = {
  white: 'bg-white hover:bg-gray-100 focus:ring-black dark:focus:ring-white focus:ring-offset-indigo-200 dark:focus:ring-offset-gray-800 text-gray-900',
  gray: 'bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-200 dark:focus:ring-offset-gray-800',
  red: 'bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 dark:focus:ring-offset-gray-800',
  yellow: 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500 focus:ring-offset-yellow-200 dark:focus:ring-offset-gray-800',
  green: 'bg-green-500 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 dark:focus:ring-offset-gray-800',
  blue: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 dark:focus:ring-offset-gray-800',
  indigo: 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 dark:focus:ring-offset-gray-800',
  purple: 'bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 dark:focus:ring-offset-gray-800',
  pink: 'bg-pink-600 hover:bg-pink-700 focus:ring-pink-500 focus:ring-offset-pink-200 dark:focus:ring-offset-gray-800',
};

const varianntColor: BtnColors = {
  white: 'bg-opacity-0 border-white-600 text-white hover:text-gray-500 hover:bg-gray-300',
  gray: 'bg-opacity-0 border-gray-600 text-gray-400 hover:text-white',
  red: 'bg-opacity-0 border-red-600 text-red-500 hover:text-white',
  yellow: 'bg-opacity-0 border-yellow-600 text-yellow-500 hover:text-white',
  green: 'bg-opacity-0 border-green-600 text-green-500 hover:text-white',
  blue: 'bg-opacity-0 border-blue-600 text-blue-500 hover:text-white',
  indigo: 'bg-opacity-0 border-indigo-600 text-indigo-500 hover:text-white',
  purple: 'bg-opacity-0 border-purple-600 text-purple-500 hover:text-white',
  pink: 'bg-opacity-0 border-pink-600 text-pink-500 hover:text-white',
}
const ontlineBorderVariant: BtnSizes = {
  xs: "border-2",
  sm: "border-2",
  md: "border-3 ",
  lg: "border-4",
  xl: "border-6",
}

const sizeFocusRing: BtnSizes = {
  xs: "focus:ring-2 focus:ring-offset-1",
  sm: " focus:ring-2 focus:ring-offset-2",
  md: " focus:ring focus:ring-offset-2",
  lg: " focus:ring focus:ring-offset-3",
  xl: "focus:ring-4 focus:ring-offset-4",
}
const sizeVariant: BtnSizes = {
  xs: "py-px px-3 text-xs h-7",
  sm: "py-1 px-4 text-sm h-9 ",
  md: "py-2 px-5 text-base h-12 ",
  lg: "py-3 px-6 text-xl h-16",
  xl: "py-6 px-10 text-3xl h-24",
}
const iconSizeVariant: BtnSizes = {
  xs: "py-px px-3 h-7 w-7",
  sm: "py-1 px-4 h-8 w-8",
  md: "py-2 px-5 h-10 w-10",
  lg: "py-3 px-6 h-14 w-14",
  xl: "py-4 px-10 h-20 w-20",
}


const Button = ({ rounded, color = "blue", icon, disabled, type, size = "md", label, onClick, customClass, variant = "contained", fullwidth = false }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      type={type || 'button'}
      disabled={disabled}
      className={clsx(
        rounded ? 'rounded-full' : 'rounded-lg ',
        'text-white transition ease-in duration-200 text-center font-semibold shadow-md focus:outline-none whitespace-nowrap',
        {
          'flex justify-center items-center ': icon,
          [ontlineBorderVariant[size]]: size && variant == "outlined",
          [sizeFocusRing[size]]: size,
          [sizeVariant[size]]: size && label,
          [customClass]: customClass,
          [colors[color]]: color,
          "flex-1": label && fullwidth,
          [iconSizeVariant[size]]: !label && icon,
          "pr-5": icon && label,
          'opacity-70 cursor-not-allowed': disabled,
          [varianntColor[color]]: variant == "outlined",
        }

      )}
    >
      <span className="w-7 flex">
        {icon && icon}
      </span>


      {label && label}
    </button>
  );
};
export default Button;
