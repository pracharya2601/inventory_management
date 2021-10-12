import Button from "@/components/elements/Button";
import { EDITOR_THEME } from "@/editor/Theme";
import { C } from "@/interface/Color";
import { Size } from "@/interface/elements/Button";
import React, { useState } from "react";
import { LiveProvider, LiveEditor, LivePreview, LiveError } from "react-live";


const Icon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
</svg>)


const Components = () => {
  const [copy, setCopy] = useState(false);
  const [color, setColor] = useState("")
  const [size, setSize] = useState("");
  const [icon, setIcon] = useState(false);
  const [variant, setVariant] = useState('');
  const [btnType, setBtnType] = useState(false);
  const [disable, setDisable] = useState(false);
  const [fullWidth, setFullWidth] = useState(false);


  const code = `
    <Button 
      label="My Button"
      type="button"
      onClick={() => alert("Hello")}
      ${color ? `color="${color}"` : ''}
      ${size ? `size="${size}"` : ''}
      ${variant ? `variant="${variant}"` : ''}
      ${btnType ? "rounded" : ''}
      ${disable ? "disabled" : ''}
      ${fullWidth ? "fullwidth" : ''}
      ${icon ? `icon={
        <svg xmlns="http://www.w3.org/2000/svg" 
          className="h-5 w-5" viewBox="0 0 20 20" 
          fill="currentColor"
        >
          <path fillRule="evenodd" 
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
            clipRule="evenodd" 
          />
        </svg>
      }` : ''}

    />
  `
  const copyCode = () => {
    const el = document.createElement('textarea');
    el.value = code;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    setCopy(true)
  };

  return (
    <div className="w-full lg:w-1/2 m-auto shadow bg-gray-100 dark:bg-gray-900 rounded p-2 flex flex-col items-center">
      <LiveProvider
        code={code}
        scope={{ Button }}
        theme={EDITOR_THEME}
      >

        <div className="w-full border-2 border-gray-500 rounded-t-xl">
          <button onClick={() => copyCode()} className="bg-green-200 p-2 rounded m-2">{copy ? "Copied" : "Copy Code"}</button>
          <LivePreview className="w-full h-64 flex justify-center items-center rounded-t-xl py-5 px-5 border-b-2 border-gray-500" />
          <div className="px-1 py-2 flex flex-wrap items-center">
            <span className="mr-1">
              Colors:
            </span>
            {btnColors.map((item: C) => (
              <Button
                onClick={() => setColor(item)}
                size="xs"
                color={item}
                rounded
                customClass="m-1"
                icon={<Icon />}
              />
            ))}
          </div>
          <div className="px-1 py-2 flex flex-wrap items-center">
            <span className="mr-1">
              Sizes:
            </span>
            {btnSizes.map((item: Size) => (
              <Button
                onClick={() => setSize(item)}
                size={"sm"}
                customClass="m-1"
                // icon={<Icon />}
                label={item}
              />
            ))}
          </div>
          <div className="px-1 py-2 flex flex-wrap items-center">
            <span className="mr-1">
              Icon:
            </span>
            <Button onClick={() => setIcon(!icon)} size="xs" customClass="m-1" label={`${icon ? "Remove Icon" : "Add Icon"}`} />
          </div>
          <div className="px-1 py-2 flex flex-wrap items-center">
            <span className="mr-1">
              Variant:
            </span>
            <Button onClick={() => setVariant("outlined")} size="xs" customClass="m-1" label="Outlined" variant="outlined" />
            <Button onClick={() => setVariant("")} size="xs" customClass="m-1" label="Contained" />
          </div>
          <div className="px-1 py-2 flex flex-wrap items-center">
            <span className="mr-1">
              Button Type:
            </span>
            <Button onClick={() => setBtnType(true)} size="xs" customClass="m-1" label="Rounded" rounded />
            <Button onClick={() => setBtnType(false)} size="xs" customClass="m-1" label="Normal" />
          </div>
          <div className="px-1 py-2 flex flex-wrap items-center">
            <span className="mr-1">
              Disable:
            </span>
            <Button onClick={() => setDisable(!disable)} size="xs" color={disable ? "yellow" : "red"} customClass="m-1" label={disable ? "Remove Disable" : "Disable"} />
          </div>
          <div className="px-1 py-2 flex flex-wrap items-center">
            <span className="mr-1">
              Disable:
            </span>
            <Button onClick={() => setFullWidth(!fullWidth)} size="xs" customClass="m-1" label={fullWidth ? "Remove full width" : "See full width"} />
          </div>
          <div className="w-full">
            <LiveEditor className="rounded-b" key={`${color}-${size}-${icon}-${variant}-${btnType}-${disable}-${fullWidth}`} />
          </div>

          <LiveError />
        </div>
      </LiveProvider>
    </div>
  )
}

export default Components;

const btnColors = ["white", 'gray', 'red', 'yellow', 'green', 'blue', 'indigo', 'purple', 'pink'];
const btnSizes = ["xs", 'sm', 'md', 'lg', 'xl']
