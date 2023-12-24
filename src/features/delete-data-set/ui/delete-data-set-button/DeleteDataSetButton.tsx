
import type { FC } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useDeleteDataSet } from '../../api/deleteDataSetApi';
import { Button } from '@vtb/ui-kit3';

interface DeleteUserButtonProps {
  dataSetId: string;
}

export const DeleteDataSet: FC<DeleteUserButtonProps> = ({ dataSetId }) => {
  const queryClient = useQueryClient();
  const { mutate } = useDeleteDataSet(queryClient);
  const handleDelete = () => {
    if (dataSetId) mutate(dataSetId);
  };
  return (
    <Button appearance="danger"
      dimension="m"
      onClick={handleDelete}>
      Удалить
    </Button>
  );
};
