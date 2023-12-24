import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { UserLoginForm } from '@/features/user-login/ui/UserLoginForm';
import { Button, Modal } from '@vtb/ui-kit3';


export const LoginButton: React.FC = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(true);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(true);
  };

  const handleButtonClick = () => {
    openModal();
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleButtonClick();
    }
  };

  useEffect(() => {
    document.addEventListener('keypress', handleKeyPress);

    return () => {
      document.removeEventListener('keypress', handleKeyPress);
    };
  }, []); 

  return (
    <>
      <Button onClick={handleButtonClick}>{t('login')}</Button>
      {isModalOpen ? (
        <Modal onClose={closeModal} title={t('signIn')}>
          <UserLoginForm
            onSuccess={() => setIsModalOpen(true)}
            onError={() => setIsModalOpen(false)}
          />
        </Modal>
      ) : null}
    </>
  );
};
