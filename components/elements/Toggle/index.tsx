import React, { useState } from 'react';

interface Props {
  onChange: (boolean) => void;
  check?: boolean;
  leftLabel?: string;
  rightLabel?: string;
  id?: string;
  name?: string;
}

const Toggle = ({ onChange, check, leftLabel, rightLabel, id, name }: Props) => {
  const [checked, setChecked] = useState(false);
  const unChecked = () => {
    setChecked(false);
    onChange(false);
  }
  const handleChecked = () => {
    setChecked(true);
    onChange(true);
  }
  const handleChange = () => {
    setChecked(!checked);
    onChange(!checked)
  }
  return (
    <div>
      <div className="">
        {leftLabel && <span className="text-gray-400 mr-2 font-medium cursor-pointer" onClick={() => unChecked()}>{leftLabel}</span>}
        <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
          <input
            type="checkbox"
            id={id}
            name={name}
            checked={checked}
            onChange={handleChange}
            className="right-6 checked:right-0 duration-200 ease-in checked:bg-blue-600 absolute block w-6 h-6 rounded-full bg-white border-4 border-blue-500 appearance-none cursor-pointer"
          />
          <span className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer border-2 border-blue-500" />
        </div>
        {rightLabel && <span className="text-gray-400 font-medium cursor-pointer" onClick={() => handleChecked()}>{rightLabel}</span>}
      </div>
    </div>
  );
};
export default Toggle;
