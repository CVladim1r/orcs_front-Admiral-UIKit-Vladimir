import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { PATH_PAGE } from '@/shared/lib/react-router';

type AuthGuardProps = {
  isAuth: boolean;
  children: ReactNode;
};

export const AuthGuard = (props: AuthGuardProps) => {
  const { isAuth, children } = props;

  if (isAuth) return <Navigate to={PATH_PAGE.vdbs} />;

  return <> {children} </>;
};
