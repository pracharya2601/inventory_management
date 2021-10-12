import React from "react";

type SimpleSpread<L, R> = R & Pick<L, Exclude<keyof L, keyof R>>;

interface PropsExtra {
  type?: string;
  label?: string;
  required?: boolean;
  error?: string;
  icon?: JSX.Element;
  helper?: string;
  placeholder?: string;
  name?: string;
  disabled?: boolean;
  square?: boolean;
  onClear?: () => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string | number;
  withForceIndications?: boolean;
  id?: string;
  indicationStyle?: string;
  indicationLabel?: string;
  indicationLevel?: number;
  indicatorColor?: string;
  autoComplete?: string;
  min?: string;
  max?: string;
}

export interface InputProps
  extends SimpleSpread<React.HTMLAttributes<HTMLInputElement>, PropsExtra> { }

