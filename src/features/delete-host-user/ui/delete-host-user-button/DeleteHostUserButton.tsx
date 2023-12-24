import React from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useDeleteHostUser } from '../../api/deleteHostUser';
import { Button } from '@vtb/ui-kit3';
import { HostUser } from '../../../../entities/host-users/api/hostUserApi';

interface DeleteHostUserButtonProps {
  hostUserId?: HostUser;
}

const DeleteHostUserButton: React.FC<DeleteHostUserButtonProps> = ({ hostUserId }) => {
  const queryClient = useQueryClient();
  const { mutate } = useDeleteHostUser(queryClient);

  const handleDelete = () => {
    console.log('hostUserId:', hostUserId);
    if (hostUserId) {
      mutate(hostUserId.id);
    }
  };
  
  return (
    <Button onClick={handleDelete} appearance="danger" dimension="s">
      Удалить
    </Button>
  );
};

export default DeleteHostUserButton;
