import { useQueryClient } from '@tanstack/react-query';
import type { FC } from 'react';
import { useDeleteVdb } from '../..';
import { Button } from '@vtb/ui-kit3';
import red from '@/shared/assets/red-create.png';
interface DeleteVdbActionButtonProps {
  vdbId: string;
}

const buttonStyle = {
  opacity: 1,
  fontWeight: 400,
  lineHeight: '16px',
  fontSize: '14px',
  color: '#2b313b',
  
};

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
      appearance='ghost'
      style={buttonStyle}
      dimension="s"
    >
      <img src={red}></img>
      <p>Удалить</p>
    </Button>
  );
};
