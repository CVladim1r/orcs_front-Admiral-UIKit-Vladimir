import type { FC } from 'react';
import { useDeleteUser } from '../../api/deleteUser';
import { SystemUser } from '@/entities/users/api/usersApi';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@vtb/ui-kit3';
import red from '@/shared/assets/red-create.png';

interface DeleteUserButtonProps {
  user?: SystemUser;
}

const buttonStyle = {
  opacity: 1,
  fontWeight: 400,
  lineHeight: '16px',
  fontSize: '14px',
  color: '#2b313b',
};

export const DeleteUserButton: FC<DeleteUserButtonProps> = ({ user }) => {
  const queryClient = useQueryClient();
  const { mutate } = useDeleteUser(queryClient);
  const handleDelete = () => {
    if (user) mutate(user.id);
  };
  return (
    <Button appearance="ghost"
      dimension="s"
      style={buttonStyle}
      onClick={handleDelete}>
      <img style={{opacity: 1}} src={red}></img>
      Удалить
    </Button>
  );
};
