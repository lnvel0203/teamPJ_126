import { lazy } from 'react';
import { useRoutes } from 'react-router-dom';

// project import
//import CommonLayout from 'layout/CommonLayout';
import Loadable from 'components/Loadable';
import ComponentsRoutes from './ComponentsRoutes';
import LoginRoutes from './LoginRoutes';
import MainRoutes from './MainRoutes';
const AuthLogin = Loadable(lazy(() => import('pages/auth/login')));
// render - landing page
//const PagesLanding = Loadable(lazy(() => import('pages/landing')));

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  return useRoutes([
    {
      path: '/',
      element: <AuthLogin />
      // path: '/',
      // element: <CommonLayout layout="landing" />,
      // children: [
      //   {
      //     path: '/',
      //     element: <AuthLogin />
      //     // path: '/',
      //     // element: <PagesLanding />
      //   }
      // ]
    },
    LoginRoutes,
    ComponentsRoutes,
    MainRoutes
  ]);
}
