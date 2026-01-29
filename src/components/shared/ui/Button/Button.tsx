import React, { useRef } from "react";

import styles from "./Button.module.css";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline";
  small?: boolean;
  text?: string;
};

export const Button = ({
  children,
//   variant = "default",
  className,
//   small,
  onClick,
  disabled,
  text,
  ...buttonProps
}: ButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    onClick?.(e);
  };

  return (
    <button
      ref={buttonRef}
      {...buttonProps}
      disabled={disabled}
      onClick={handleClick}
      className={[
        styles.button,
        // styles[variant],
        // small && styles.small,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {text ? <p>{text}</p> : children}
    </button>
  );
};