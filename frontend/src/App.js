// project import
import Routes from 'routes';
import ThemeCustomization from 'themes';

import Locales from 'components/Locales';
import RTLLayout from 'components/RTLLayout';
import ScrollTop from 'components/ScrollTop';
import Snackbar from 'components/@extended/Snackbar';
import Notistack from 'components/third-party/Notistack';

import { FirebaseProvider as AuthProvider } from 'contexts/FirebaseContext';

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const App = () => {
  return (
    <ThemeCustomization>  {/*테마*/}
      <RTLLayout>         {/*글꼴, 레이아웃*/}
        <Locales>         {/*언어*/}
          <ScrollTop>     {/*스크롤 위치*/}
            <AuthProvider>{/*인증*/}
              <>
                <Notistack> {/*스타일링*/}
                  <Routes /> {/*라우터*/}
                  <Snackbar />
                </Notistack>
              </>
            </AuthProvider>
          </ScrollTop>
        </Locales>
      </RTLLayout>
    </ThemeCustomization>
  );
};
export default App;
