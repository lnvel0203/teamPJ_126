//import { useEffect, useState } from 'react';

// project import
import Routes from 'routes';
import ThemeCustomization from 'themes';

//import Loader from 'components/Loader';
import Locales from 'components/Locales';
import RTLLayout from 'components/RTLLayout';
import ScrollTop from 'components/ScrollTop';
import Snackbar from 'components/@extended/Snackbar';
import Notistack from 'components/third-party/Notistack';

//import { dispatch } from 'store';
//import { fetchDashboard } from 'store/reducers/menu';

// auth provider
import { FirebaseProvider as AuthProvider } from 'contexts/FirebaseContext';

// axios services
//import { getUsers } from './utils/axios';

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const App = () => {
 
  return (
    <ThemeCustomization>
      <RTLLayout>
        <Locales>
          <ScrollTop>
            <AuthProvider>
              <>
                <Notistack>
                  <Routes />
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
