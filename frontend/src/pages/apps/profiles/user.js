import { useRef } from 'react';

// material-ui
import { Grid } from '@mui/material';
import { Outlet } from 'react-router';

// project import
// import ProfileCard from 'sections/apps/profiles/user/ProfileCard';
import ProfileTabs from 'sections/apps/profiles/user/ProfileTabs';

// ==============================|| PROFILE - USER ||============================== //

const UserProfile = () => {
  const inputRef = useRef(null);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        {/* 프로필이 몇 퍼센트 작성되었는지 보여주는 카드 */}
        {/* <ProfileCard focusInput={focusInput} /> */}
      </Grid>
      <Grid item xs={12} md={3}>
        {/* 프로필 사진과 이름이 포함된 카드 */}
        <ProfileTabs focusInput={focusInput} />
      </Grid>
      <Grid item xs={12} md={9}>
        <Outlet context={inputRef} />
      </Grid>
    </Grid>
  );
};

export default UserProfile;
