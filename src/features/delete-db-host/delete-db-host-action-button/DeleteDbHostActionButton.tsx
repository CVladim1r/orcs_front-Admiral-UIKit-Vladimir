import { useQueryClient } from '@tanstack/react-query';
import type { FC } from 'react';
import { useDeleteDbHost } from '..';
import { Button } from '@vtb/ui-kit3';
import red from '@/shared/assets/red-create.png';

interface DeleteDbHostActionButtonProps {
  hostId: string;
}

const buttonStyle = {
  opacity: 1,
  fontWeight: 400,
  lineHeight: '16px',
  fontSize: '14px',
  color: '#2b313b',
};

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
      appearance='ghost'
      dimension="s"
      style={buttonStyle}
    >
      <img src={red}></img>
      Удалить
    </Button>
  );
};
