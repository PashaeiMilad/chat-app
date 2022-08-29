import React, { ButtonHTMLAttributes, forwardRef } from 'react'
import { composeClass } from '../../../utils/composeClass';
import style from "./style/button.module.scss";
interface ButtonProps extends  Omit<ButtonHTMLAttributes<HTMLButtonElement>,"children" | "type"> {
  type?:"primary" | "secondary";
  size?: "normal" | "small";
  children?:React.ReactNode;
}

const  Button = forwardRef<HTMLButtonElement,ButtonProps>(({type="primary",size="normal", ...props},ref) => {
  const classNameValue = composeClass("button",type,size);
  return (
    <button className={style[classNameValue]} type="button" ref={ref}{...props}>{props.children}</button>
  )
})


export default Button