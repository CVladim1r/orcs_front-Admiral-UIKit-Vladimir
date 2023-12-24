import type { FC } from 'react';

interface UsersTableProps {
  userItemsSlots?: React.ReactNode[];
}

export const UsersTable: FC<UsersTableProps> = ({ userItemsSlots }) => {
  return (
    <div className="overflow-x-auto w-full h-full">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Login</th>
            <th>Email</th>
            <th>Type</th>
            <th>Full Name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{userItemsSlots}</tbody>
      </table>
    </div>
  );
};
