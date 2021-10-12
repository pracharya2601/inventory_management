import React from 'react';
import { TextAreaProps } from '@/interface/elements/TextArea';

const TextArea = (props: TextAreaProps) => {
  return (
    <div>
      <label className="text-gray-700 capitalize" htmlFor="name">
        {props.label}
        {props.required && <span className="text-red-500 required-dot">*</span>}
      </label>
      <textarea
        className="flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
        id={props.id}
        placeholder={props.placeholder}
        name={props.name}
        rows={5}
        cols={40}
      ></textarea>
    </div>

  );
};

export default TextArea;
