import clsx from 'clsx';
import React from 'react';
import { InputProps } from "@/interface/elements/Input";

const Input = (props: InputProps) => {
  return (
    <>
      {(props.helper || props.icon) && props.label && (
        <label htmlFor={props.id} className="text-gray-700 capitalize dark:text-white">
          {props.label} {props.required && <span className="text-red-500 required-dot">*</span>}
        </label>
      )}
      <div
        className={`${props.helper || props.icon ? 'flex' : ''} relative ${props.disabled ? 'opacity-50 pointer-events-none' : ''
          }`}
      >
        {(!props.helper && !props.icon) && props.label && (
          <label htmlFor={props.id} className="text-gray-700 capitalize dark:text-white">
            {props.label} {props.required && <span className="text-red-500 required-dot">*</span>}
          </label>
        )}
        {(props.helper || props.icon) && (
          <span
            className={`${props.square ? '' : 'rounded-l-md'
              } inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm`}
          >
            {props.helper || props.icon}
          </span>
        )}

        <input
          id={props.id}
          disabled={props.disabled}
          value={props.value}
          onChange={props.onChange}
          className={clsx(
            {
              'ring-red-500 ring-2': props.error,
              'rounded-r-lg': (props.helper || props.icon) && !props.square,
              'rounded-lg border-transparent': (!props.square && !props.helper && !props.icon),


            },
            'z-10 flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent'
          )}

          type={props.type || 'text'}
          name={props.name}
          placeholder={props.placeholder}
          autoComplete={props.autoComplete}
          min={props.min}
          max={props.max}
        />
        {props.onClear && (
          <span
            className={`${props.square ? '' : 'rounded-lg cursor-pointer'
              } inline-flex  items-center px-1 border-t bg-white border-l border-b  border-gray-300 hover:bg-red-100 text-gray-500 shadow-sm text-sm`}
            onClick={() => props.onClear()}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="red">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </span>
        )}
        {props.error && (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              fill="currentColor"
              className="absolute text-red-500 right-2 bottom-3"
              viewBox="0 0 1792 1792"
            >
              <path d="M1024 1375v-190q0-14-9.5-23.5t-22.5-9.5h-192q-13 0-22.5 9.5t-9.5 23.5v190q0 14 9.5 23.5t22.5 9.5h192q13 0 22.5-9.5t9.5-23.5zm-2-374l18-459q0-12-10-19-13-11-24-11h-220q-11 0-24 11-10 7-10 21l17 457q0 10 10 16.5t24 6.5h185q14 0 23.5-6.5t10.5-16.5zm-14-934l768 1408q35 63-2 126-17 29-46.5 46t-63.5 17h-1536q-34 0-63.5-17t-46.5-46q-37-63-2-126l768-1408q17-31 47-49t65-18 65 18 47 49z" />
            </svg>

            <p className="absolute text-sm text-red-500 -bottom-6">{props.error}</p>
          </>
        )}

      </div>
      {!props.error && props.withForceIndications && (
        <>
          <div className="grid w-full h-1 grid-cols-12 gap-4 mt-3">
            {[1, 2, 3, 4, 5, 6].map((indicatorLevel) => (
              <div
                key={indicatorLevel + "indicator level"}
                className={clsx(
                  "h-full col-span-2 rounded",
                  {
                    [`bg-${props.indicatorColor || "green"}-500`]: indicatorLevel <= props.indicationLevel,
                    "bg-gray-500 dark:bg-dark-1": indicatorLevel > props.indicationLevel,
                  }
                )}
              ></div>
            ))}
          </div>
          {props.indicationLabel && <div className={clsx(
            "mt-2 text-xs mb-2",
            {
              [`text-${props.indicatorColor}-500`]: props.indicatorColor
            }
          )}>{props.indicationLabel}</div>}
        </>
      )}
    </>
  );
};

export default Input;
