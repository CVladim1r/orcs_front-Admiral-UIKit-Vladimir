import { useDbHosts } from '@/entities/db-hosts';
import { type FC, useState, MouseEvent, useMemo } from 'react';
import { useHostUser } from '@/entities/host-users';
import { EditDbHostActionButton } from '@/features/edit-db-host';
import { DeleteDbHostActionButton } from '@/features/delete-db-host';
import { columnList } from './column-list';
import { Dropdown } from '@/shared/ui/dropdown';
import { ReactComponent as MoreVerticalOutline } from '@openvtb/admiral-icons/build/system/MoreVerticalOutline.svg';
import { DbHost } from '@/entities/db-hosts/api/dbHostsApi';
import Loader from '@/shared/ui/loader';

interface HostType {
  description?: string | null;
  id: string;
  login?: string;
  need_sudo?: boolean;
  sshkey?: string;
  use_ssh_key?: boolean;
  db_os_user: string;
  ssh_port?: number;
  db_port?: number;
}

type DBHostProps = {
  dbHost: DbHost;
};

export const DbHostsTable = () => {
  const { data: dbHosts, isLoading, isError } = useDbHosts();

  if (isLoading) return <><Loader /></>;
  if (isError) return <>error</>;
  if (!dbHosts) return <>Нет данных</>;

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
          {dbHosts.map((dbHost) => (
            <TableRow key={dbHost.id} dbHost={dbHost} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const TableRow: FC<DBHostProps> = ({ dbHost }) => {
  const { data: hostUser } = useHostUser(dbHost.host_user_id);

  const [selectedRow, setSelectedRow] = useState<HostType | null>(null);

  const mergedData = useMemo(() => ({ ...hostUser, ...dbHost }), [hostUser, dbHost]);

  const itemActions = [
    <EditDbHostActionButton dbhost={mergedData} />,
    <DeleteDbHostActionButton hostId={mergedData.id} />,
  ];
  
  const handleContextMenuClick = (
    e: MouseEvent<HTMLLabelElement>,
    row: HostType,
  ) => {
    e.stopPropagation();

    return selectedRow && selectedRow.id === row.id
      ? setSelectedRow(null)
      : setSelectedRow(row);
  };

  return (
    <>
      <tr className="w-full flex items-start gap-6 px-8 py-2 border border-transparent border-b-[#d0d5dc] font-normal"  style={{paddingTop: "14px"}}>
        <td className="w-[160px]">{mergedData.db_os_user}</td>
        <td className="w-[160px]">{mergedData.db_path}</td>
        <td className="w-[140px]">{mergedData.db_type}</td>
        <td className="w-[160px]">{mergedData.host_name}</td>
        <td className="w-[185px]">{`${mergedData.login} - ${mergedData.description}`}</td>
        <td className="w-[300px]">
          <div className="flex gap-2">
            <EditDbHostActionButton dbhost={mergedData} />
            <DeleteDbHostActionButton hostId={mergedData.id} />
          </div>
        </td>
      </tr>
    </>
  );
};
