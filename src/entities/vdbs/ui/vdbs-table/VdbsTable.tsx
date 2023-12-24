import type { FC } from 'react';

interface VdbsTableProps {
  itemsSlot?: React.ReactNode[];
}

export const VdbsTable: FC<VdbsTableProps> = ({ itemsSlot }) => {
  return (
    <div className="overflow-x-auto w-full h-full">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Name</th>
            <th>Server</th>
            <th>DB Port</th>
            <th>Data Set</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{itemsSlot}</tbody>
      </table>
    </div>
  );
};
