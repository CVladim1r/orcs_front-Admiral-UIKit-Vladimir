import type { FC } from 'react';

interface DataSetSnapshotsTableProps {
  itemsSlot: React.ReactNode;
}

export const DataSetSnapshotsTable: FC<DataSetSnapshotsTableProps> = ({
  itemsSlot,
}) => {
  return (
    <div className="overflow-x-auto w-full h-full">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Name</th>
            <th>Creation Date</th>
            <th>Type</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{itemsSlot}</tbody>
      </table>
    </div>
  );
};
