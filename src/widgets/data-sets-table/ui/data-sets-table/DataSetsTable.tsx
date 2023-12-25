import { type FC, useState, MouseEvent, useMemo } from 'react';
import { useDataSets } from '@/entities/data-sets';
import { DeleteDataSet } from '@/features/delete-data-set/ui/delete-data-set-button/DeleteDataSetButton';
import { EditDataSetActionButton } from '@/features/edit-data-set/ui/edit-data-set-action-button/EditDataSetActionButton';
import { CreateDataSetSnapshotActionButton } from '@/features/create-dataset-shapshot';
import { Dropdown } from '@/shared/ui/dropdown';
import { ReactComponent as MoreVerticalOutline } from '@openvtb/admiral-icons/build/system/MoreVerticalOutline.svg';
import { columnList } from './column-list';
import { useDbHostById } from '@/entities/db-hosts';
import { DataSetSnapshotsTable } from '@/widgets/data-set-snapshots-table';
import { DataSet } from '@/entities/data-sets/api/dataSetsApi';
import Loader from '@/shared/ui/loader';


interface DataSetsType {
  dsfsname: string;
  dsname: string;
  dsport: number;
  id: string;
  srchost: string;
  db_os_user?: string;
  db_path?: string;
  db_posrt?: number;
  db_type?: string;
  host_desc?: string;
  host_name?: string;
  host_user_id?: string;
  is_virtual?: boolean;
}

type DataSetProps = {
  dataSet: DataSet
}

export const DataSetsTable = () => {
  const { data: dataSets, isLoading, isError } = useDataSets();

  if (isLoading) return <><Loader /></>;
  if (isError) return <>error</>;
  if (!dataSets.length) return <>Нет данных</>;

  return (
    <div style={{ maxWidth: '1250px', overflow: 'hidden' }}>
      <table style={{ maxWidth: '80%' }} className="rounded-tl-2xl font-vtb-table text-sm">
        <thead>
          <tr style={{ paddingTop: "48px" }} className="w-full gap-6 px-8 py-1 flex items-center justify-start border border-transparent border-b-[#d0d5dc] font-[550]">
            {columnList.map((column, index) => (
              <td
                key={index}
                style={{ width: column.width }}
                className="border-transparent border-r-[#2b313b] leading-8 last:border-transparent font-[600]"
              >
                {column.title}
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataSets.map((dataSet) => (
            <TableRow key={dataSet.id} dataSet={dataSet} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const TableRow: FC<DataSetProps> = ({ dataSet }) => {
  const { data: dbHost } = useDbHostById(dataSet.srchost);

  const [selectedRow, setSelectedRow] = useState<DataSetsType | null>(null);
  const [expanded, setExpanded] = useState<DataSetsType | null>(null);

  const mergedData = useMemo(() => ({ ...dbHost, ...dataSet }), [dataSet, dbHost]);

  const itemActions = [
    <CreateDataSetSnapshotActionButton dataset={mergedData.id} />,
    <EditDataSetActionButton dataSet={mergedData} />,
    <DeleteDataSet dataSetId={mergedData.id} />,
  ];

  const handleContextMenuClick = (
    e: MouseEvent<HTMLLabelElement>,
    row: DataSetsType,
  ) => {
    e.stopPropagation();

    return selectedRow && selectedRow.id === row.id
      ? setSelectedRow(null)
      : setSelectedRow(row);
  };

  const handleRowClick = (row: DataSetsType) => {
    return expanded && expanded.id === row.id 
      ? setExpanded(null) 
      : setExpanded(row);
  };

  return (
    <>
      <tr
        style={{paddingTop: "14px"}}
        className={"w-full flex items-start gap-6 px-8 py-2 border border-transparent border-b-[#d0d5dc] font-normal"}
        onClick={() => handleRowClick(mergedData)}
      >
        <td className="w-[277px]">{mergedData.dsname}</td>
        <td className="w-[277px]">{mergedData.dsport ? mergedData.dsport : "-"}</td>
        <td className="w-[279px]">{mergedData.host_name}</td>
        <td className="w-[279px]">
          <div className="flex gap-2" >
            <label
              tabIndex={0}
              className="btn btn-square btn-sm m-1"
              onClick={(e) => handleContextMenuClick(e, mergedData)}
            >
              <MoreVerticalOutline style={{ width: '25px' }} />
            </label>
            {selectedRow && selectedRow.id === mergedData.id ? (
              <Dropdown
                tabIndex={0}
                className="w-max menu p-2 bg-base-100 rounded-md gap-1 shadow-lg"
                items={itemActions}
                onClick={(e) => e.stopPropagation()}
              />
            ) : null}
          </div>
        </td>
      </tr>
      {expanded && expanded.id === mergedData.id ? (
        <>{<DataSetSnapshotsTable dataSetId={expanded.id} />}</>
      ) : null}
    </>
  );
};

