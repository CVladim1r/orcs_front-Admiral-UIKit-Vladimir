import { useQueryClient } from '@tanstack/react-query';
import type { FC } from 'react';
import { useUpdateVdbToLatestSnap } from '../..';
import { Button } from '@vtb/ui-kit3';
import green from '@/shared/assets/green-create.png';
interface UpdateVdbToSnapActionButtonProps {
  vdbId: string;
}

const buttonStyle = {
  opacity: 1,
  fontWeight: 400,
  lineHeight: '16px',
  fontSize: '14px',
  color: '#2b313b',
};

export const UpdateVdbToSnapActionButton: FC<UpdateVdbToSnapActionButtonProps> = ({
  vdbId,
}) => {
  const queryClient = useQueryClient();
  const { mutate } = useUpdateVdbToLatestSnap(queryClient);
  const handleUp2Lt = () => {
    mutate(vdbId);
  };
  return (
    <Button
      onClick={handleUp2Lt}
      appearance = "ghost"
      dimension="s"
      style={buttonStyle}
    >
      <img src={green} alt="button" />
      <p>Обновить</p>
    </Button>
  );
};
