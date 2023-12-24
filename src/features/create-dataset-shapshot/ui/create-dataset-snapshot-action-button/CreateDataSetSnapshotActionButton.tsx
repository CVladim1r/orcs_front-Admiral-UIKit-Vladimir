
import { useState, type FC } from 'react';
import { CreateDataSetSnapshotForm } from '../..';
import { Button, Modal } from '@vtb/ui-kit3';

interface CreateDataSetSnapshotActionButtonProps {
  dataset: string;
}

export const CreateDataSetSnapshotActionButton: FC<
  CreateDataSetSnapshotActionButtonProps
> = ({ dataset }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(true);
  };

  return (
    <>
      <Button
        appearance='secondary'
        dimension="m"
        onClick={handleClick}
      >
        Создать DataSet
        Snapshot
      </Button>
      {isOpen ?
        <Modal onClose={() => setIsOpen(false)}>
          <CreateDataSetSnapshotForm dataset={dataset}
            onSuccess={() => setIsOpen(false)}
            onError={() => setIsOpen(false)} />
        </Modal>
        : null}
    </>
  );
};
