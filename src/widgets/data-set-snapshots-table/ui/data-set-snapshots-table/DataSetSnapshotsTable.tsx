import { useDataSetSnapshots } from '@/entities/data-sets';
import Loader from '@/shared/ui/loader';
import { useState, type FC } from 'react';
import { columnList } from './column-list';
import { convertDate } from '@/utils/dateConvertor';
import { Snapshot, Stype } from '@/entities/data-sets/api/snapshotsApi';
import { ReactComponent as MoreVerticalOutline } from '@openvtb/admiral-icons/build/system/MoreVerticalOutline.svg';
import { Dropdown } from '@/shared/ui/dropdown';
import { CreateVdbButton } from '@/features/create-vdb';
import { DeleteDataSetSnapshotButton } from '@/features/delete-dataset-snapshot';

interface DataSetSnapshotsTableProps {
  dataSetId: string;
}

type InfoContainerProps = {
  snapshot: Snapshot;
  dataSetId: string;
};

export const DataSetSnapshotsTable: FC<DataSetSnapshotsTableProps> = ({
  dataSetId,
}) => {
  const {
    data: snapshots,
    isLoading,
    isError,
  } = useDataSetSnapshots(dataSetId);
  
  if (isLoading) return <Loader />;
  if (isError) return <>Ошибка</>;
  if (!snapshots) return <>Нет данных</>;

  return (
    <div className="w-full flex flex-col gap-1 dark:text-[#e2e5e9] text-[#414A58]">
      {snapshots.map((snapshot) => (
        <InfoContainer key={snapshot.id} snapshot={snapshot} dataSetId={dataSetId} />
      ))}
    </div>
  );
};

const InfoContainer: FC<InfoContainerProps> = ({ snapshot, dataSetId }) => {
  const snapshotType = (typeId: Stype) => {
    switch (typeId) {
      case 0:
        return 'Первичный';
      case 1:
        return 'По расписанию';
      case 2:
        return 'Пользовательский';
      case 3:
        return 'Виртуальная БД';
    }
  };
  const itemActions = [
    <CreateVdbButton snapshot={snapshot} dataSetId={dataSetId} />,
    <DeleteDataSetSnapshotButton />,
  ]
  const [selectedRow, setSelectedRow] = useState<boolean>(false);
  
  return (
    <div className="flex  gap-6 max-h-[620px] overflow-y-auto border-[5px] dark:bg-[#1D232A] border-blue-300 dark:border-gray-700 font-vtb-table p-4">
      <div className="flex flex-col">
        <span className="flex gap-2">
          {columnList[0].title}: {snapshot.sname}
        </span>
        <span className="flex gap-2">
          {columnList[1].title}: {convertDate(snapshot.datecreated)}
        </span>
        <span className="flex gap-2">
          {columnList[2].title}: {snapshotType(snapshot.stype)}
        </span>
      </div>
      <div className="flex flex-col ">
        {columnList[3].title}:
        <div className="flex ">
          <label
            tabIndex={0}
            className="btn btn-square btn-sm m-1"
            onClick={() => setSelectedRow(!selectedRow)}
          >
            <MoreVerticalOutline style={{ width: '25px' }} />
          </label>
          {selectedRow ? (
            <Dropdown
              tabIndex={0}
              className="w-max menu p-2 bg-base-100 rounded-md gap-1 shadow-lg"
              items={itemActions}
            />

          ) : null}
        </div>
      </div>
    </div>
  );
};
