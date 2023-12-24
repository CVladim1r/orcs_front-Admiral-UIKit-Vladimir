import { useQueryClient } from '@tanstack/react-query';
import type { FC } from 'react';
import { useDeleteDbHost } from '..';
import { Button } from '@vtb/ui-kit3';


interface DeleteDbHostActionButtonProps {
  hostId: string;
}

export const DeleteDbHostActionButton: FC<DeleteDbHostActionButtonProps> = ({
  hostId,
}) => {
  const queryClient = useQueryClient();
  const { mutate } = useDeleteDbHost(queryClient);
  const handleDelete = () => {
    mutate(hostId);
  };
  return (
    <Button
      onClick={handleDelete}
      appearance='danger'
      dimension="m"
    >
      Удалить
    </Button>
  );
};
