import { LoginButton } from '@/features/login';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

interface LoginPageProps {}

export const LoginPage: FC<LoginPageProps> = ({}) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col w-screen h-screen items-center justify-center gap-10 bg-[#FFF]">
      <h3 className="text-2xl font-bold">{t('')}</h3>
      <div>
        <LoginButton />
      </div>
    </div>
  );
};
