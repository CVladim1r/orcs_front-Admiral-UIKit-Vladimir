import type { FC } from 'react';

interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  children?: React.ReactNode;
}

export const Button: FC<ButtonProps> = ({
  children,
  ...defaultButtonProps
}) => {
  return (
    <button
      onClick={defaultButtonProps.onClick}
      className={`btn ${defaultButtonProps.className}`}
    >
      {children}
    </button>
  );
};
