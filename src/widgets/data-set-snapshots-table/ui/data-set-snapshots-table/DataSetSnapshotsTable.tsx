import { useDataSetSnapshots } from '@/entities/data-sets';
import Loader from '@/shared/ui/loader';
import { FC } from 'react';
import { columnList } from './column-list';
import { convertDate } from '@/utils/dateConvertor';
import { Snapshot, Stype } from '@/entities/data-sets/api/snapshotsApi';

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

  return (
    <div className="flex  gap-6 max-h-[620px] overflow-y-auto border-[3px] dark:bg-[#1D232A] border-blue-300 dark:border-gray-700 font-vtb-table p-4">
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
        <div style={{marginLeft: "12px"}}>{columnList[3].title}:</div>
        <div className="flex ">
          <CreateVdbButton snapshot={snapshot} dataSetId={dataSetId} />
          <DeleteDataSetSnapshotButton />
        </div>
      </div>
    </div>
  );
};
