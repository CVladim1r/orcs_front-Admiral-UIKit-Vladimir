import { HostUser } from '@/entities/host-users/api/hostUsersApi';
import { useState, type FC } from 'react';
import { EditHostUserForm } from '../..';
import { Button, Modal } from '@vtb/ui-kit3';
import green from '@/shared/assets/green-create.png';

interface EditHostUserActionButtonProps {
  hostUser: HostUser;
}

const buttonStyle = {
  opacity: 1,
  fontWeight: 400,
  lineHeight: '16px',
  fontSize: '14px',
  color: '#2b313b',
};

export const EditHostUserActionButton: FC<EditHostUserActionButtonProps> = ({
  hostUser,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(true);
  };

  return (
    <>
      <Button
        onClick={handleClick}
        appearance="ghost"
        dimension="s"
        style={buttonStyle}
      >
        <img style={{opacity: 1}} src={green}></img>
        Изменить
      </Button>
      {isOpen ? (
        <Modal onClose={() => setIsOpen(false)}>
          <EditHostUserForm
            hostUser={hostUser}
            onSuccess={() => setIsOpen(false)}
            onError={() => setIsOpen(false)}
          />
        </Modal>
      ) : null}
    </>
  );
};
