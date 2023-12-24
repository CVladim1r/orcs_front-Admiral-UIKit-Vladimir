import type { FC } from 'react';

interface HostUsersTableProps {
  itemsSlot: React.ReactNode[];
}

export const HostUsersTable: FC<HostUsersTableProps> = ({ itemsSlot }) => {
  return (
    <div className="overflow-x-auto w-full h-full">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Login</th>
            <th>SSH Key</th>
            <th>Description</th>
            <th>Need Sudo</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{itemsSlot}</tbody>
      </table>
    </div>
  );
};
