import { Vdb } from '@/entities/vdbs/api/vdbsApi';
import { useState, type FC } from 'react';
import { EditVdbForm } from '../..';
import { Button, Modal } from '@vtb/ui-kit3';
import blue from '@/shared/assets/blue.svg';
interface EditVdbActionButtonProps {
  vdb: Vdb;
}

const buttonStyle = {
  opacity: 1,
  fontWeight: 400,
  lineHeight: '16px',
  fontSize: '14px',
  color: '#2b313b',
};

export const EditVdbActionButton: FC<EditVdbActionButtonProps> = ({ vdb }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(true);
  };

  return (
    <>
      <Button
        onClick={handleClick}
        appearance='ghost'
        dimension="s"
        style={buttonStyle}
      >
        <img src={blue} alt="button" />
        <p>Изменить</p>
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
