import { DbHost } from '@/entities/db-hosts/api/dbHostApi';
import { useState, type FC } from 'react';
import { EditDbHostForm } from '../..';
import { Button, Modal, ModalContent } from '@vtb/ui-kit3';
import green from '@/shared/assets/green-create.png';
interface EditDbHostActionButtonProps {
  dbhost: DbHost;
}

const buttonStyle = {
  opacity: 1,
  fontWeight: 400,
  lineHeight: '16px',
  fontSize: '14px',
  color: '#2b313b',
};

export const EditDbHostActionButton: FC<EditDbHostActionButtonProps> = ({
  dbhost,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(true);
  };

  return (
    <>
      <Button onClick={handleClick} appearance="ghost" dimension="s" style={buttonStyle}>
        <img src={green}></img>
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
