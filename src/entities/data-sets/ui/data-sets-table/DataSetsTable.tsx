import type { FC } from 'react';

interface DataSetsTable {
  itemsSlot?: React.ReactNode[];
}

export const DataSetsTable: FC<DataSetsTable> = ({ itemsSlot }) => {
  return (
    <div className="overflow-x-auto w-full h-full">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Name</th>
            <th>Port</th>
            <th>Host</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{itemsSlot}</tbody>
      </table>
    </div>
  );
};
