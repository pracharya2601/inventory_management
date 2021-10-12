import { CheckboxColors, CheckboxSize } from "@/interface/elements/CheckBox";
import { RadioProps, RadioInputProps, RadioItemProps } from "@/interface/elements/Radio";
import clsx from "clsx";
import React from "react";

const list: RadioInputProps[] = [
  { value: "Hello", label: 'Hello ' },
  { value: "Hello1", label: 'Hello 1' },
  { value: "Hello2", label: 'Hello 2' },
  { value: "Hello3", label: 'Hello 3' },
  { value: "Hello4", label: 'Hello 4' },
]

const colorVariant: CheckboxColors = {
  white: 'bg-black ring-white dark:ring-white ring-offset-indigo-200 dark:ring-offset-gray-800 bg-check checked:bg-white',
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
  lg: 'h-8 w-8 ml-px ring-4 ring-offset-4'
}

const Radio = ({ value, id, color = "blue", size = "lg", name, onChange, items = list, children }: RadioProps) => {
  return (
    <fieldset id={id || name} className="my-1  pl-1 flex flex-wrap">
      {!children && items && items.map((item: RadioInputProps, index) => (
        <RadioItem
          key={index}
          size={size}
          checkValue={value}
          value={item.value}
          onChange={onChange}
          name={name}
          color={color}
          label={item.label}
        />
      ))}
      {children && React.Children.map(children, child => {
        return React.cloneElement(child, { onChange: onChange, name: name, size: size, color: color, checkValue: value })
      })}
    </fieldset>
  )
}

export default Radio;

export const RadioItem = ({ size, checkValue, value, onChange, name, color, label }: RadioItemProps) => {
  return (
    <label
      className={clsx(
        "flex items-center justify-start space-x-3 mb-3 cursor-pointer rounded-md my-1 dark:text-white mr-3",
        {
          "my-4": size === 'md',
          "my-5": size === 'lg',
        }
      )}
    >
      <input
        type="radio"
        value={value}
        checked={value === checkValue}
        name={name}
        onChange={onChange}
        className={clsx(
          'form-tick appearance-none cursor-pointer bg-white rounded-full',
          {
            [sizeVariant[size]]: size,
            [colorVariant[color]]: color,
          }
        )}
      />
      <span>{label}</span>
    </label>
  )
}