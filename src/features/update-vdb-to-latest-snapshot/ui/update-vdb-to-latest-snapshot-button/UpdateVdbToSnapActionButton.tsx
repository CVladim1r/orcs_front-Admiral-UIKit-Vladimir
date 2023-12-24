import { useQueryClient } from '@tanstack/react-query';
import type { FC } from 'react';
import { useUpdateVdbToLatestSnap } from '../..';
import { Button } from '@vtb/ui-kit3';

interface UpdateVdbToSnapActionButtonProps {
  vdbId: string;
}

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
      appearance = "primary"
      dimension="m"
    >
      Обновить
    </Button>
  );
};
