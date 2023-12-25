
import type { FC } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useDeleteDataSet } from '../../api/deleteDataSetApi';
import { Button } from '@vtb/ui-kit3';
import red from '@/shared/assets/red-create.png';
interface DeleteUserButtonProps {
  dataSetId: string;
}

const buttonStyle = {
  opacity: 1,
  fontWeight: 400,
  lineHeight: '16px',
  fontSize: '14px',
  color: '#2b313b',
};

export const DeleteDataSet: FC<DeleteUserButtonProps> = ({ dataSetId }) => {
  const queryClient = useQueryClient();
  const { mutate } = useDeleteDataSet(queryClient);
  const handleDelete = () => {
    if (dataSetId) mutate(dataSetId);
  };
  return (
    <Button appearance="ghost"
      dimension="s"
      onClick={handleDelete}
      style={buttonStyle}
      >
      <img src={red} alt="" />
      Удалить
    </Button>
  );
};
