import { sessionModel } from '@/entities/session';
import { Button } from '@vtb/ui-kit3';

import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

interface LogoutButtonProps extends React.HTMLProps<HTMLButtonElement> {}

export const LogoutButton: FC<LogoutButtonProps> = ({
}) => {
  const { t } = useTranslation();
  const handleClick = () => {
    sessionModel.logout();
  };

  return (
    <Button onClick={handleClick}
     appearance='ghost'>
      {t('logout')}
    </Button>
  );
};
