import { VdbSnapshot } from '@/entities/vdbs/api/vdbSnapshotsApi';
import { useQueryClient } from '@tanstack/react-query';
import { useState, type FC } from 'react';
import { useRevertToVdbSnapshot } from '../..';

import { Button, Modal } from '@vtb/ui-kit3';

interface RevertToVdbSnapshotButtonProps {
  vdbId: string;
  snapshot: VdbSnapshot;
}

export const RevertToVdbSnapshotButton: FC<RevertToVdbSnapshotButtonProps> = ({
  vdbId,
  snapshot,
}) => {
  const queryClient = useQueryClient();
  const { mutate } = useRevertToVdbSnapshot(queryClient, vdbId);
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (saveState: boolean) => {
    mutate({ vdbId, snapname: snapshot.id, saveState });
    setIsOpen(false);
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        appearance="primary"
        dimension="m"
      >
        Перейти
      </Button>
      {isOpen ?
        <Modal onClose={() => setIsOpen(false)}>
          <div> Сохранить текущее состояние?</div>
          <div className="flex justify-end gap-3">
            <Button onClick={() => handleClick(true)}>Да</Button>
            <Button onClick={() => handleClick(false)}>Нет</Button>
          </div>
        </Modal>
        : null}
    </>
  );
};
