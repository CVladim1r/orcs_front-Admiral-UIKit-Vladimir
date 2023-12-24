
import { useState, type FC } from 'react';
import { CreateVdbSnapshotForm } from '../..';
import { Button, Modal } from '@vtb/ui-kit3';

interface CreateVdbSnapshotActionButtonProps {
  vdbId: string;
}

export const CreateVdbSnapshotActionButton: FC<
  CreateVdbSnapshotActionButtonProps
> = ({ vdbId }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(true);
  };

  return (
    <>
      <Button
        onClick={handleClick}
        appearance='primary'
        dimension="m"
      >
        Создать VDB Snapshot
      </Button>
      {isOpen ?
        <Modal onClose={() => setIsOpen(false)}>
          <CreateVdbSnapshotForm vdbId={vdbId}
            onSuccess={() => setIsOpen(false)}
            onError={() => setIsOpen(false)} />
        </Modal>
        : null}
    </>
  );
};
