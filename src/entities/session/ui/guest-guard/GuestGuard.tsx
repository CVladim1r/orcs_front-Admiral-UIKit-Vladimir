import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { PATH_PAGE } from '@/shared/lib/react-router';

type GuestGuardProps = {
  isAuth: boolean;
  children: ReactNode;
};

export const GuestGuard = (props: GuestGuardProps) => {
  const { isAuth, children } = props;

  if (!isAuth) return <Navigate to={PATH_PAGE.login} />;

  return <> {children} </>;
};
