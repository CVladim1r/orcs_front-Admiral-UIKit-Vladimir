import { Snapshot } from '@/entities/data-sets/api/snapshotsApi';
import { FC, useState } from 'react';
import { CreateVdbForm } from '../..';
import { Button, Modal } from '@vtb/ui-kit3';

interface CreateVdbButtonProps {
  snapshot: Snapshot;
  dataSetId: string;
}

export const CreateVdbButton: FC<CreateVdbButtonProps> = ({
  snapshot,
  dataSetId,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(true);
  };

  return (
    <>
      <Button
        appearance="secondary"
        dimension="m"
        onClick={handleClick}
      >
        Создать VDB
      </Button>
      {isOpen ? (
        <Modal onClose={() => setIsOpen(false)}>
          <CreateVdbForm
            defaultDsId={dataSetId}
            defaultSnapId={snapshot.id}
            onSuccess={() => setIsOpen(false)}
            onError={() => setIsOpen(false)}
          />
        </Modal>
      ) : null}
    </>
  );
};
