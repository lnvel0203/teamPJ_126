//하위컴포넌트가 렌더링될때까지 코드스플리팅하여 렌더링 퍼포먼스를 개선한다.
//코드 스플리팅이란 코드 스플리팅을 하게되면, 지금 당장 필요한 코드가 아니라면 따로 분리시켜서, 나중에 필요할 때 불러와서 사용할 수 있다.
//이를 통해 페이지의 로딩 속도를 개선할 수 있다.
//lazy는 전제조건이 다 충족되지 까지 ui가 랜더링 되는걸 block한다

//Suspense 컴포넌트는 자식이 완료 되기 전에 Loading같이 먼저 뜨는 컴포넌트를 fallback 프롭스 안에서 받아서 처리함.

//고로 자식의 컴포넌트가 lazy 때문에 가장 뒤에 랜더링이 될거고, 그 전엔 상위 컴포넌트가 뜨게된다.

import { lazy } from 'react';

//v6에서 switch에서 바뀐 방식
//매칭되는 페이지 컴포넌트 하나만을 렌더링 하기 위함
import { useRoutes } from 'react-router-dom';

// project import
import Loadable from 'components/Loadable';
import LoginRoutes from './LoginRoutes';
import MainRoutes from './MainRoutes';
const AuthLogin = Loadable(lazy(() => import('pages/auth/login')));

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  return useRoutes([
    {
      path: '/',
      element: <AuthLogin />
     
    },
    MainRoutes,
    LoginRoutes,
  ]);
}
