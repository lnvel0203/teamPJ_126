import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

// assets
import { CreditCardOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';

function getPathIndex(pathname) {

  //url에 있는 userid 받아서 const userid에 저장 
  

  let selectedTab = 0;
  switch (pathname) {
    case '/apps/profiles/user/payment':
      selectedTab = 1;
      break;
    case '/apps/profiles/user/password':
      selectedTab = 2;
      break;
    case '/apps/profiles/user/settings':
      selectedTab = 3;
      break;
    case '/apps/profiles/user/personal':
    default:
      selectedTab = 0;
  }
  return selectedTab;
}

// ==============================|| USER PROFILE - TAB ||============================== //

const ProfileTab = () => {

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const query = useQuery();
  const userId = query.get('userId');
  const id = localStorage.getItem('id');

  const theme = useTheme();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  if(userId) {
    console.log('존재 userId',userId,'Id',id)
  }

  const [selectedIndex, setSelectedIndex] = useState(getPathIndex(pathname));
  const handleListItemClick = (index, route) => {
    setSelectedIndex(index);
    navigate(route);
  };

  useEffect(() => {
    setSelectedIndex(getPathIndex(pathname));
  }, [pathname]);

  return (
    <List component="nav" sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32, color: theme.palette.grey[500] } }}>
      <ListItemButton selected={selectedIndex === 0} onClick={() => handleListItemClick(0, '/apps/profiles/user/personal')}>
        <ListItemIcon>
          <UserOutlined />
        </ListItemIcon>
        <ListItemText primary="내정보" />
      </ListItemButton>
      {!(userId && userId !== id) && (
        <>
          <ListItemButton selected={selectedIndex === 1} onClick={() => handleListItemClick(1, '/apps/profiles/user/payment')}>
            <ListItemIcon>
              <CreditCardOutlined />
            </ListItemIcon>
            <ListItemText primary="월급명세서" />
          </ListItemButton>
          <ListItemButton selected={selectedIndex === 2} onClick={() => handleListItemClick(2, '/apps/profiles/user/password')}>
            <ListItemIcon>
              <LockOutlined />
            </ListItemIcon>
            <ListItemText primary="비밀번호 변경" />
          </ListItemButton>
        </>
      )}
    </List>
  );
  
};

export default ProfileTab;