import { type FC, useState } from 'react';
import { DeleteUserButton } from '@/features/delete-user';
import { EditUserActionButton } from '@/features/edit-user';
import { columnList } from './column-list';
import { SystemUser, useUsers } from '@/entities/users/api/usersApi';
import Loader from '@/shared/ui/loader';

interface UsersTableProps {}

interface UserType {
  id: string;
  login: string;
  email: string;
  user_type: string;
  full_name: string;
  user_locked: boolean;
  use_ldap: boolean;
}

type UserProps = {
  user: SystemUser;
  isSelected: boolean;
  isHovered: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
};

export const TableRow: FC<UserProps> = ({
  user,
  isSelected,
  isHovered,
  onMouseEnter,
  onMouseLeave,
}) => {
  return (
    <>
      <tr
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className={`w-full flex items-start gap-6 px-8 py-2 border border-transparent border-b-[#d0d5dc] font-normal ${
          isSelected ? 'bg-blue-500 text-white' : isHovered ? 'bg-blue-50' : ''
        }`}
        style={{paddingTop: "14px"}}
      >
        <td className="w-[160px]">{user.login}</td>
        <td className="w-[300px]">{user.email}</td>
        <td className="w-[160px]">{user.user_type}</td>
        <td className="w-[235px]">{user.full_name}</td>
        <td className="w-[300px]">
          <div className="flex gap-2">
            <EditUserActionButton user={user} />
            <DeleteUserButton user={user} />
          </div>
        </td>
      </tr>
    </>
  );
};

export const UsersTable: FC<UsersTableProps> = () => {
  const { data: users, isLoading, isError } = useUsers();
  const [selectedRow, setSelectedRow] = useState<UserType | null>(null);
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);

  if (isLoading) return <><Loader /></>;
  if (isError) return <>error</>;
  if (!users) return <>Нет данных</>;

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
          {users.map((user) => (
            <TableRow
              key={user.id}
              user={user}
              isSelected={selectedRow !== null && selectedRow.id === user.id}
              isHovered={hoveredRow === user.id}
              onClick={() => setSelectedRow(user)}
              onMouseEnter={() => setHoveredRow(user.id)}
              onMouseLeave={() => setHoveredRow(null)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
