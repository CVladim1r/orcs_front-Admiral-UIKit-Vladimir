import { useQueryClient } from '@tanstack/react-query';
import type { FC } from 'react';
import { useDeleteVdb } from '../..';
import { Button } from '@vtb/ui-kit3';

interface DeleteVdbActionButtonProps {
  vdbId: string;
}

export const DeleteVdbActionButton: FC<DeleteVdbActionButtonProps> = ({
  vdbId,
}) => {
  const queryClient = useQueryClient();
  const { mutate } = useDeleteVdb(queryClient);
  const handleDelete = () => {
    mutate(vdbId);
  };
  return (
    <Button
      onClick={handleDelete}
      appearance='danger'
      style={{opacity: 0.7}}
      dimension="m"
    >
      Удалить
    </Button>
  );
};
