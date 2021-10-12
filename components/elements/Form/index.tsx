import React, { createContext, useContext } from 'react';

const Form = ({ children, onSubmit, customClass }) => {

  const onSubmitHandle = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSubmit();

  }
  return (
    <form onSubmit={onSubmitHandle} className={customClass}>
      {children}
    </form>
  )
}

export default Form;

