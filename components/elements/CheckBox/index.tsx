import clsx from 'clsx';
import React from 'react';
import { CheckBoxProps, CheckboxColors, CheckboxSize } from '@/interface/elements/CheckBox';


const colorVariant: CheckboxColors = {
  white: 'bg-black ring-white dark:ring-white ring-offset-indigo-200 dark:ring-offset-gray-800 bg-checkDark checked:bg-white',
  gray: 'bg-white ring-gray-500 ring-offset-gray-200 dark:ring-offset-gray-800 bg-check checked:bg-gray-500',
  red: 'bg-white ring-red-500 ring-offset-red-200 dark:ring-offset-gray-800 bg-check checked:bg-red-500',
  yellow: 'bg-white ring-yellow-500 ring-offset-yellow-200 dark:ring-offset-gray-800 bg-check checked:bg-yellow-500',
  green: 'bg-white ring-green-500 ring-offset-green-200 dark:ring-offset-gray-800 bg-check checked:bg-green-500',
  blue: 'bg-white ring-blue-500 ring-offset-blue-200 dark:ring-offset-gray-800 bg-check checked:bg-blue-500',
  indigo: 'bg-white ring-indigo-500 ring-offset-indigo-200 dark:ring-offset-gray-800 bg-check checked:bg-indigo-500',
  purple: 'bg-white ring-purple-500 ring-offset-purple-200 dark:ring-offset-gray-800 bg-check checked:bg-purple-500',
  pink: 'bg-white ring-pink-500 ring-offset-pink-200 dark:ring-offset-gray-800 bg-check checked:bg-pink-500',
}

const sizeVariant: CheckboxSize = {
  sm: 'h-4 w-4 ml-px ring-2 ring-offset-2',
  md: 'h-6 w-6 ml-px ring-3 ring-offset-3',
  lg: 'h-8 w-9 ml-px ring-4 ring-offset-4'
}

const Checkbox = ({ label, name, id, color = "blue", checked, size = "md", onChange, checkSide = "left", withBackground }: CheckBoxProps) => {
  return (
    <label className={clsx(
      'w-full flex items-center justify-left space-x-3 mb-3 cursor-pointer rounded-md',
      {
        "rounded-l-md": withBackground,
      }
    )}>
      {checkSide === "right" && <span className="text-gray-700 dark:text-white font-normal pl-2">{label}</span>}
      <input
        type="checkbox"
        name={name}
        id={id}
        className={clsx(
          'form-tick appearance-none rounded cursor-pointer',
          {
            [sizeVariant[size]]: size,
            [colorVariant[color]]: color
          },
          ' checked:border-transparent focus:outline-none'
        )}
        onChange={onChange}
        checked={checked}
      />
      {checkSide === "left" && <span className=" text-gray-700 dark:text-white font-normal">{label}</span>}
    </label>
  );
};
export default Checkbox;