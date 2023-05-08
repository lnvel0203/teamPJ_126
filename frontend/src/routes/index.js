import { lazy } from 'react';
import { useRoutes } from 'react-router-dom';
import Loadable from 'components/Loadable';
import ComponentsRoutes from './ComponentsRoutes';
import LoginRoutes from './LoginRoutes';
import MainRoutes from './MainRoutes';
import PopupContent from '../sections/charts/madechat/PopupContent';
const AuthLogin = Loadable(lazy(() => import('pages/auth/login')));
// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  return useRoutes([
    {
      path: '/',
      element: <AuthLogin />
    },

    {
      path: '/test',
      element: PopupContent()

    },
    LoginRoutes,
    ComponentsRoutes,
    MainRoutes
  ]);
}
