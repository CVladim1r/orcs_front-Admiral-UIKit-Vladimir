import { VdbSnapshot, useVdbSnapshots } from '@/entities/vdbs/api/vdbSnapshotsApi';
import Loader from '@/shared/ui/loader';
import { useState, type FC } from 'react';
// import { Stype } from '@/entities/data-sets/api/snapshotsApi';
import { columnList } from './column-list';
import { convertDate } from '@/utils/dateConvertor';
//RCh
import { DeleteDataSetSnapshotButton } from '@/features/delete-dataset-snapshot';
import { RevertToVdbSnapshotButton } from '@/features/revert-to-vdb-snapshot';

interface VdbSnapshotsTableProps {
  vdbId: string;
}

type InfoContainerProps = {
  snapshot: VdbSnapshot;
  vdbId: string;
};

export const VdbSnapshotsTable: FC<VdbSnapshotsTableProps> = ({ vdbId }) => {
  const { data: snapshots, isLoading, isError } = useVdbSnapshots(vdbId);
  
  if (isLoading) return <Loader />;
  if (isError) return <>Ошибка</>;
  if (!snapshots.length) return <div className="dark:bg-[#1D232A] p-3">Нет данных</div>;

  return (
    <div className="w-full flex flex-col gap-1 dark:text-[#e2e5e9] text-[#414A58]">
      {snapshots.map((snapshot) => (
        <InfoContainer key={snapshot.id} snapshot={snapshot} vdbId={vdbId}/>
      ))}
    </div>
  );
};

const InfoContainer: FC<InfoContainerProps> = ({ snapshot, vdbId }) => {

  /*
  const snapshotType = (typeId: number) => {
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
  */

  return (
    <div className="flex gap-6 max-h-[620px] overflow-y-auto border-[3px] border-blue-300 dark:border-gray-700 font-vtb-table p-4">
      <div className="flex flex-col">
        <span className="flex gap-2">
          {columnList[0].title}: {snapshot.sname}
        </span>
        <span className="flex gap-2">
          {columnList[1].title}: {convertDate(snapshot.datecreated)}
        </span>
      </div>
      <div className="flex flex-col ">
      {columnList[3].title}:
        <div className="flex ">
          <RevertToVdbSnapshotButton vdbId={vdbId} snapshot={snapshot} />
          <DeleteDataSetSnapshotButton />
        </div>
      </div>
    </div>
  );
};
