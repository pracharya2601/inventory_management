import { RefObject, useEffect } from "react";

export const useOutsideClick = (ref: RefObject<HTMLElement>, setClose: (stat: boolean) => void) => {
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        setClose(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}