import { useHostUsers } from '@/entities/host-users';
import { DeleteDataSetSnapshotButton } from '@/features/delete-dataset-snapshot';
import { EditHostUserActionButton } from '@/features/edit-host-user';
import { type FC } from 'react';
import { columnList } from './column-list';
import { type HostUser } from '@/entities/host-users/api/hostUserApi';
import Loader from '@/shared/ui/loader';

interface HostUsersTableProps {}
/** 
interface HostUserType {
  id: string;
  login: string;
  description?: string | null | undefined;
  need_sudo: boolean;
  use_ssh_key: boolean;
  sshkey?: string;
}
*/
type HostUserProps = {
  hostUser: HostUser
}

export const HostUsersTable: FC<HostUsersTableProps> = () => {
  const { data: hostUsers, isLoading, isError } = useHostUsers();

  if (isLoading) return <><Loader /></>;
  if (isError) return <>error</>;
  if (!hostUsers) return <>Нет данных</>;

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
          {hostUsers.map((hostUser) => (
            <TableRow key={hostUser.id} hostUser={hostUser} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const TableRow: FC<HostUserProps> = ({ hostUser }) => {
  return (
    <>
      <tr className="w-full flex items-start gap-6 px-8 py-2 border border-transparent border-b-[#d0d5dc] font-normal "  style={{paddingTop: "14px"}}>
        <td className="w-[180px]">{hostUser.login}</td>
        <td className="w-[180px]">{hostUser.sshkey ? hostUser.sshkey : "-"}</td>
        <td className="w-[250px]">{hostUser.description}</td>
        <td className="w-[185px]">{hostUser.need_sudo.toString()}</td>
        <td className="w-[400px]">
          <div className="flex gap-1">
            <EditHostUserActionButton hostUser={hostUser} />
            <DeleteDataSetSnapshotButton />
          </div>
        </td>
      </tr>
    </>
  );
};
