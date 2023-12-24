import React, { FC } from 'react';

interface DropdownProps extends React.HTMLProps<HTMLUListElement> {

  items: React.ReactNode[];
}

export const Dropdown: FC<DropdownProps> = ({  items, ...defaultDropdownProps }) => {
  return (
    <ul {...defaultDropdownProps} className={`dropdown-content ${defaultDropdownProps.className}`}>
      {items.map((item, i) => (
        <li key={i} className="flex ">
          {item}
        </li>
      ))}
    </ul>
  );
};
