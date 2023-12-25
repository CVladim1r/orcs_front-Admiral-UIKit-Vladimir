import { useVdbs } from '@/entities/vdbs';
import { DeleteVdbActionButton } from '@/features/delete-vdb';
import { EditVdbActionButton } from '@/features/edit-vdb';
import { type FC, useState, MouseEvent, useMemo } from 'react';
import { columnList } from './column-list';
import { Dropdown } from '@/shared/ui/dropdown';
import { ReactComponent as MoreVerticalOutline } from '@openvtb/admiral-icons/build/system/MoreVerticalOutline.svg';
import { Vdb } from '@/entities/vdbs/api/vdbsApi';
import { useDbHostById } from '@/entities/db-hosts';
import { useDataSet } from '@/entities/data-sets';
import { VdbSnapshotsTable } from '@/widgets/vdb-snapshots-table';
import { UpdateVdbToSnapActionButton } from '@/features/update-vdb-to-latest-snapshot';
import Loader from '@/shared/ui/loader';

interface VdbType {
  snapid: string;
  hostid: string;
  vdbpath: string;
  vdbname: string;
  dbport: number;
  dsid: string;
  id: string;
}

type VdbProps = {
  vdb: Vdb;
};

export const VdsTable = () => {
  const { data: vdbs, isLoading, isError } = useVdbs();

  if (isLoading) return <><Loader /></>;
  if (isError) return <>error</>;
  if (!vdbs) return <>Нет данных</>;

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
          {vdbs.map((vdb) => (
            <TableRow key={vdb.id} vdb={vdb} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const TableRow: FC<VdbProps> = ({ vdb }) => {
  const { data: dbHostData } = useDbHostById(vdb.hostid);
  const { data: DataSetData } = useDataSet(vdb.dsid);

  const [selectedRow, setSelectedRow] = useState<VdbType | null>(null);
  const [expanded, setExpanded] = useState<VdbType | null>(null);

  const mergedData = useMemo(() => ({ ...DataSetData, ...dbHostData, ...vdb }), [DataSetData, dbHostData, vdb]);
  const itemActions = [
    <EditVdbActionButton vdb={mergedData} />,
    <UpdateVdbToSnapActionButton vdbId={vdb.id} />,
    <DeleteVdbActionButton vdbId={vdb.id} />,
  ];

  const handleContextMenuClick = (
    e: MouseEvent<HTMLLabelElement>,
    row: VdbType,
  ) => {
    e.stopPropagation();

    return selectedRow && selectedRow.id === row.id
      ? setSelectedRow(null)
      : setSelectedRow(row);
  };

  const handleRowClick = (row: VdbType) => {
    return expanded && expanded.id === row.id 
      ? setExpanded(null) 
      : setExpanded(row);
  };

  return (
    <>
      <tr
        className="w-full flex items-start gap-6 px-8 py-2 border border-transparent border-b-[#d0d5dc] font-normal"
        onClick={() => handleRowClick(mergedData)}
        style={{paddingTop: "14px"}}>
        <td className="w-[170px]">{mergedData.vdbname}</td>
        <td className="w-[200px]">{mergedData.host_name ? mergedData.host_name : '-'}</td>
        <td className="w-[180px]">{mergedData.dbport ? mergedData.dbport : '-'}</td>
        <td className="w-[260px]">{mergedData.dsname}</td>
        <td className="w-[278px]">
          <div className="flex gap-2">
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
                style={{width: "158px", display: "flex", alignContent: "center", paddingRight: "26px"}}
                className="w-max menu p-2 bg-base-100 rounded-md gap-1 shadow-lg"
                items={itemActions}
                onClick={(e) => e.stopPropagation()}
              />
            ) : null}
          </div>
        </td>
      </tr>
      {expanded && expanded.id === mergedData.id ? (
        <>{<VdbSnapshotsTable vdbId={expanded.id} />}</>
      ) : null}
    </>
  );
};
