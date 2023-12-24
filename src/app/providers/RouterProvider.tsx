import { lazy, type FC } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import { Loadable } from '@/shared/ui/loadable';
import { PATH_PAGE } from '@/shared/lib/react-router';
import { AuthGuard, GuestGuard, sessionModel } from '@/entities/session';
import AppLayout from '@/widgets/layouts';

const Root = Loadable(lazy(() => import('@/pages/root')));
const About = Loadable(lazy(() => import('@/pages/about')));
const UsersPage = Loadable(lazy(() => import('@/pages/users')));
const DataSetsPage = Loadable(lazy(() => import('@/pages/data-sets')));
const HostUsersPage = Loadable(lazy(() => import('@/pages/host-users')));
const EnvironmentsPage = Loadable(lazy(() => import('@/pages/environments')));
const VdbsPage = Loadable(lazy(() => import('@/pages/vdbs')));
const LogsPage = Loadable(lazy(() => import('@/pages/logs')));
const Login = Loadable(lazy(() => import('@/pages/login')));
const Page404 = Loadable(lazy(() => import('@/pages/page-404')));

export const Router: FC = () => {
  const isAuth = sessionModel.useAuth();

  return useRoutes([
    {
      path: PATH_PAGE.login,
      element: (
        <AuthGuard isAuth={isAuth}>
          <Login />
        </AuthGuard>
      ),
    },
    {
      path: PATH_PAGE.register,
      element: (
        <AuthGuard isAuth={isAuth}>
          <>register</>
        </AuthGuard>
      ),
    },
    {
      element: (
        <GuestGuard isAuth={isAuth}>
          <AppLayout />
        </GuestGuard>
      ),
      children: [
        {
          path: PATH_PAGE.root,
          element: <Root />,
        },
        {
          path: PATH_PAGE.about,
          element: <About />,
        },
        {
          path: PATH_PAGE.users,
          element: <UsersPage />,
        },
        {
          path: PATH_PAGE.dataSets,
          element: <DataSetsPage />,
        },
        {
          path: PATH_PAGE.hostUsers,
          element: <HostUsersPage />,
        },
        {
          path: PATH_PAGE.environments,
          element: <EnvironmentsPage />,
        },
        {
          path: PATH_PAGE.logs,
          element: <LogsPage />,
        },
        {
          path: PATH_PAGE.vdbs,
          element: <VdbsPage />,
        },
      ],
    },
    { path: PATH_PAGE.page404, element: <Page404 /> },
    { path: '*', element: <Navigate to={PATH_PAGE.vdbs} replace /> },
  ]);
};
