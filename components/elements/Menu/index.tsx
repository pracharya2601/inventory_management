
import clsx from 'clsx';
import { useRouter } from 'next/dist/client/router';
import React, { useState, useRef } from 'react';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { useDropdown } from '@/hooks/userDropdown';
import { MenuProps, DDMItem, MenuItemProps } from '@/interface/elements/Menu';

const Menu = (props: MenuProps) => {
  const dropdownRef = useRef(null);
  const router = useRouter();
  const [isOpen, setOpen, setIsOpen] = useDropdown();
  useOutsideClick(dropdownRef, setIsOpen)
  const onClickHandle = (link: string) => {
    router.push(link)
    setOpen(false)
  }
  const onClickItenHandle = (): void => {
    setOpen(false);
  }
  const onClickHandleButton = (onClick: () => void): void => {
    setOpen(!isOpen)
  }

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div>
        {
          typeof props.label === "string" ? (
            <button
              type="button"
              onClick={() => setOpen(!isOpen)}
              className={clsx(
                {
                  'border border-gray-300 bg-white dark:bg-gray-800 shadow-sm': props.withBackground && !props.hideIcon,
                  '': props.hideIcon,
                  'px-4 py-2': !props.hideIcon,
                },
                `flex items-center justify-center w-full rounded-md  text-sm font-medium text-gray-700 dark:text-gray-50 hover:bg-gray-50 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500`,
              )}
              id="options-menu"
            >
              {props.label}

              {!props.hideIcon && props.icon || !props.hideIcon && (
                <svg
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 1792 1792"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M1408 704q0 26-19 45l-448 448q-19 19-45 19t-45-19l-448-448q-19-19-19-45t19-45 45-19h896q26 0 45 19t19 45z" />
                </svg>
              )}
            </button>
          ) : (
            React.cloneElement(props.label, { onClick: onClickHandleButton })

          )
        }

      </div>

      {(props.forceOpen || isOpen) && (
        <div className={clsx(
          "origin-top-right absolute z-20",
          {
            "right-0": props.dropSide === 'left' || !props.dropSide,
            "left-0": props.dropSide === 'right'
          },
          " mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5"
        )}>
          <div
            className={clsx(
              `py-1`,
              {
                'divide-y divide-gray-100': props.withDivider
              }
            )}
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {!props.children && props.items.map((item: DDMItem) => {
              return (
                <MenuItem key={item.label} label={item.label} icon={item.icon} desc={item.desc} onClick={() => onClickHandle(item.link)} />
              );
            })}
            {props.children && React.Children.map(props.children, child => {
              return React.cloneElement(child, { onClose: onClickItenHandle })
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;

export const MenuItem = ({ label, icon, desc, onClick, onClose }: MenuItemProps) => {

  return (
    <p
      key={label}
      className={clsx(
        {
          'flex items-center': icon,
          'block': !icon,
        },
        'block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600 cursor-pointer'
      )}
      role="menuitem"
      onClick={() => {
        onClick();
        onClose && onClose();
      }}
    >
      {icon}

      <span className="flex flex-col">
        <span>{label}</span>
        {desc && <span className="text-gray-400 text-xs truncate">{desc}</span>}
      </span>
    </p>
  )
}
