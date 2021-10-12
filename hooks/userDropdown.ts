import { useState } from "react"
import { useOutsideClick } from "./useOutsideClick";

export const useDropdown = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const setOpen = (tp: boolean): void => {
    setIsOpen(tp)
  }

  return [isOpen, setOpen, setIsOpen] as const
}