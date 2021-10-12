import React from 'react';
import { AlertProps } from '@/interface/elements/Alert';
import clsx from 'clsx';


const Alert = (props: AlertProps) => {
  const [hide, setHide] = React.useState(false);

  return (
    <div
      className={clsx(
        {
          "bg-yellow-200 border-yellow-600 text-yellow-600": props.type === "alert",
          'bg-green-200 border-green-600 text-green-600': props.type === "success",
          "bg-red-200 border-red-600 text-red-600": props.type === "danger",
          "cursor-pointer": props.onclickremove,
          "hidden": hide,
        },
        'border-l-4 p-4'
      )}
      role="alert"
      onClick={() => {
        props.onclickremove && setHide(true)
      }}
    >
      <p className="font-bold">{props.title}</p>
      <p>{props.text}</p>
    </div>
  );
};

export default Alert;