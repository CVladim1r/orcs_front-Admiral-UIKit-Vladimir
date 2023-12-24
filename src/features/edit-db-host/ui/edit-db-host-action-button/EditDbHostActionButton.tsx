import { DbHost } from '@/entities/db-hosts/api/dbHostApi';
import { useState, type FC } from 'react';
import { EditDbHostForm } from '../..';
import { Button, Modal, ModalContent } from '@vtb/ui-kit3';

interface EditDbHostActionButtonProps {
  dbhost: DbHost;
}

export const EditDbHostActionButton: FC<EditDbHostActionButtonProps> = ({
  dbhost,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(true);
  };

  return (
    <>
      <Button onClick={handleClick} appearance="primary" dimension="m">
        Изменить
      </Button>
      {isOpen ? (
        <Modal onClose={() => setIsOpen(false)}>
          <ModalContent>
            <EditDbHostForm
              dbhost={dbhost}
              onSuccess={() => setIsOpen(false)}
              onError={() => setIsOpen(false)}
            />
          </ModalContent>
        </Modal>
      ) : null}
    </>
  );
};
