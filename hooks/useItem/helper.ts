import { Skus } from "@/interface/Product/ProductInterface";

export const returnArr = (arr: Skus[], checkType: 'size' | 'color', getType: 'size' | 'color', checkVal: string): string[] => {
  let newArr: string[] = [];
  arr.forEach(itm => {
    if (itm[checkType] == checkVal) {
      if (!newArr.includes(itm[getType])) {
        newArr.push(itm[getType])
      }
    }
  })
  return newArr
}

export const calculateCount = (arr: Skus[], checkingArr: string[], checkType: "size" | "color", countType: "size" | 'color', checkVal: string) => {
  let a = arr.map(itm => checkingArr.includes(itm[checkType]) && itm[countType] == checkVal ? itm.count : 0);
  return a.reduce((prev, next) => prev + next)
}

export const calculateSpecificCount = (arr: Skus[], color: string, size: string) => {
  let a = arr.map(itm => itm.color == color && size == itm.size ? itm.count : 0)
  return a.reduce((prev, next) => prev + next)
}