import type { FC } from 'react';

interface DbHostsTableProps {
  itemsSlots: React.ReactNode;
}

export const DbHostsTable: FC<DbHostsTableProps> = ({ itemsSlots }) => {
  return (
    <div className="overflow-x-auto w-full h-full">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>DB OS User</th>
            <th>Path</th>
            <th>Type</th>
            <th>Host</th>
            <th>Host User</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{itemsSlots}</tbody>
      </table>
    </div>
  );
};
