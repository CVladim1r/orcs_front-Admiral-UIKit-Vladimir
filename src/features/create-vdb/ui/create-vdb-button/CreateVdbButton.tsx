import { Snapshot } from '@/entities/data-sets/api/snapshotsApi';
import { FC, useState } from 'react';
import { CreateVdbForm } from '../..';
import { Button, Modal } from '@vtb/ui-kit3';
import green from '@/shared/assets/green-create.png';
interface CreateVdbButtonProps {
  snapshot: Snapshot;
  dataSetId: string;
}

const buttonStyle = {
  opacity: 1,
  fontWeight: 400,
  lineHeight: '16px',
  fontSize: '14px',
  color: '#2b313b',
};

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
        appearance="ghost"
        dimension="s"
        onClick={handleClick}
        style={buttonStyle}
      >
        <img src={green}></img>
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
