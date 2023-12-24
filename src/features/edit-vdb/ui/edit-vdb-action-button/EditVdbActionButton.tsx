import { Vdb } from '@/entities/vdbs/api/vdbsApi';
import { useState, type FC } from 'react';
import { EditVdbForm } from '../..';
import { Button, Modal } from '@vtb/ui-kit3';

interface EditVdbActionButtonProps {
  vdb: Vdb;
}

export const EditVdbActionButton: FC<EditVdbActionButtonProps> = ({ vdb }) => {
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
        Изменить
      </Button>
      {isOpen ? (
        <Modal onClose={() => setIsOpen(false)}>
          <EditVdbForm
            vdb={vdb}
            onSuccess={() => setIsOpen(false)}
            onError={() => setIsOpen(false)}
          />
        </Modal>
      ) : null}
    </>
  );
};
