
import { useState, type FC } from 'react';
import { EditUserForm } from '../..';
import { SystemUser } from '@/entities/users/api/usersApi';
import { Button, Modal } from '@vtb/ui-kit3';
import green from '@/shared/assets/green-create.png';
interface EditUserActionButtonProps {
  user: SystemUser;
}

const buttonStyle = {
  opacity: 1,
  fontWeight: 400,
  lineHeight: '16px',
  fontSize: '14px',
  color: '#2b313b',
};

export const EditUserActionButton: FC<EditUserActionButtonProps> = ({
  user,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(true);
  };

  return (
    <>
      <Button appearance="ghost"
        dimension="s"
        style={buttonStyle}
        onClick={handleClick}>
        <img style={{opacity: 1}} src={green}></img>
        Изменить
      </Button>
      {isOpen ? (
        <Modal onClose={() => setIsOpen(false)}>
          <EditUserForm
            user={user}
            onSuccess={() => setIsOpen(false)}
            onError={() => setIsOpen(false)}
          />
        </Modal>
      ) : null}
    </>
  );
};
