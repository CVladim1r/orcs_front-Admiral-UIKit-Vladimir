import { useState, type FC } from 'react';
import { CreateDataSetSnapshotForm } from '../..';
import { Button, Modal } from '@vtb/ui-kit3';
import blue from '@/shared/assets/blue.svg';

interface CreateDataSetSnapshotActionButtonProps {
  dataset: string;
}

const buttonStyle = {
  opacity: 1,
  fontWeight: 400,
  lineHeight: '16px',
  fontSize: '14px',
  color: '#2b313b',
};

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
        appearance='ghost'
        dimension="s"
        onClick={handleClick}
        style={buttonStyle}
      >
        <img src={blue} alt="button create DataSet Snapshot" />
        Создать DS Snapshot
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
