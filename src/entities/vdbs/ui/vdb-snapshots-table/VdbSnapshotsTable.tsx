import type { FC } from 'react';

interface VdbSnapshotsTableProps {
  itemsSlot?: React.ReactNode[];
}

export const VdbSnapshotsTable: FC<VdbSnapshotsTableProps> = ({
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
            <th></th>
          </tr>
        </thead>
        <tbody>{itemsSlot}</tbody>
      </table>
    </div>
  );
};
