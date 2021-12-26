import { useState } from 'react';
import statColor from '../../colorsName.json';

export const useColorDropdown = () => {
  const [colVal, setColVal] = useState<string>('');
  const [listColors, setListColors] = useState<string[]>(statColor);
  const [showDropDown, setShowDropDown] = useState(false);
  const [timer, setTimer] = useState(null);

  const onHandleChangeColor = (e) => {
    if (timer) {
      clearTimeout(timer);
    }
    setShowDropDown(true);
    const { value } = e.target;
    const searchTerm = value.toLowerCase();
    setColVal(value);
    const reg = new RegExp(searchTerm);
    const a = statColor.filter((term) => {
      if (term.toLowerCase().match(reg)) {
        return term;
      }
    });
    setListColors(a);
    setTimer(setTimeout(() => setShowDropDown(false), 5000));
  };

  return {
    listColors,
    colorVal: colVal,
    setColVal,
    showDropDown,
    setShowDropDown,
    onHandleChangeColor,
    timer,
    setTimer,
  };
};
