import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { getAuthToken } from '../../../../utils/axios';
// material-ui
import { useTheme } from '@mui/material/styles';
// import { Box, Divider, FormLabel, Grid, TextField, Menu, MenuItem, Stack, Typography } from '@mui/material';
import { Box, Divider, FormLabel, Grid, TextField, Menu, MenuItem, Stack, Typography } from '@mui/material';
import {useLocation } from 'react-router-dom';
// project import
import MainCard from 'components/MainCard';
import IconButton from 'components/@extended/IconButton';
import Avatar from 'components/@extended/Avatar';
import ProfileTab from './ProfileTab';
// import { facebookColor, linkedInColor, twitterColor } from 'config';

// assets
// import { FacebookFilled, LinkedinFilled, MoreOutlined, TwitterSquareFilled, CameraOutlined } from '@ant-design/icons';
import { MoreOutlined, CameraOutlined } from '@ant-design/icons';



// ==============================|| USER PROFILE - TAB CONTENT ||============================== //

const ProfileTabs = ({ focusInput }) => {

  //url에 있는 userid 받아서 const userid에 저장 
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const query = useQuery();
  
  const userId = query.get('userId');

  const id = localStorage.getItem("id");
  console.log('id',id)
  const [name, setName] = useState('');
  const [positionName, setPositionName] = useState('');
  const [deptName, setDeptName] = useState('');
  const [annualCount, setAnnualCount] = useState('');
  const [tardy, setTardy] = useState('');
 
 
  const theme = useTheme();
  const [selectedImage, setSelectedImage] = useState(undefined);
  const [avatar, setAvatar] = useState('./default.png');
  

  
  useEffect(() => {
    if (selectedImage) {
      setAvatar(URL.createObjectURL(selectedImage));  //URL 대신 지정경로 이미지 삽입

      const formData = new FormData();
      formData.append("file", selectedImage);

      axios.post(`http://localhost:8081/members/mypage/${id}/photo`, formData, {
          headers : {
            Authorization: 'Bearer ' + getAuthToken(),
              'Content-Type': 'multipart/form-data'
          }
      })
    }
  }, [selectedImage]);  


  useEffect(() => {
  async function fetchData() {
    try {
      const targetId = userId && userId !== id ? userId : id;
      const response = await axios.get(`http://localhost:8081/members/mypage/${targetId}`, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        }
      });

      console.log("성공",response.data)
      
      if (response.data.photo) {
          setAvatar(response.data.photo);
      }
      setName(response.data.name)
      setPositionName(response.data.positionName)
      setDeptName(response.data.deptName)
      setAnnualCount(response.data.annualCount)
      setTardy(response.data.tardy)
      console.log("지각",response.data.tardy)
      console.log('이름',response.data.name);
      setIsLoading(false); // 추가 폼 렌더링 관련
       
    } catch (error) {
      console.error('Error fetching data', error);
      setIsLoading(false); // 추가 폼 렌더링 관련
    }
  }

  fetchData();
}, [id, userId]); // id or userId가 변경되면 재실행



  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event?.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  

  return (
    <MainCard>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="flex-end">
            <IconButton
              variant="light"
              color="secondary"
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              <MoreOutlined />
            </IconButton>

            {/* # 프로필 옆에 더보기 ... 버튼 시작 */}
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button'
              }}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
            >
              <MenuItem
                component={Link}
                to="/apps/profiles/user/personal"
                onClick={() => {
                  handleClose();
                  setTimeout(() => {
                    focusInput();
                  });
                }}
              >
                Edit
              </MenuItem>
              <MenuItem onClick={handleClose} disabled>
                Delete
              </MenuItem>
            </Menu>
            {/* # 프로필 옆에 더보기 ... 버튼 끝 */}
          </Stack>
          <Stack spacing={2.5} alignItems="center">
            <FormLabel
              htmlFor="change-avtar"
              sx={{
                position: 'relative',
                borderRadius: '50%',
                overflow: 'hidden',
                '&:hover .MuiBox-root': { opacity: 1 },
                cursor: 'pointer'
              }}
            >
              <Avatar alt="Avatar 1" src={avatar} sx={{ width: 124, height: 124, border: '1px dashed' }} />
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, .75)' : 'rgba(0,0,0,.65)',
                  width: '100%',
                  height: '100%',
                  opacity: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Stack spacing={0.5} alignItems="center">
                  <CameraOutlined style={{ color: theme.palette.secondary.lighter, fontSize: '2rem' }} />
                  <Typography sx={{ color: 'secondary.lighter' }}>Upload</Typography>
                </Stack>
              </Box>
            </FormLabel>
            <TextField
              type="file"
              id="change-avtar"
              placeholder="Outlined"
              variant="outlined"
              sx={{ display: 'none' }}
              onChange={(e) => setSelectedImage(e.target.files?.[0])}
            />
            <Stack spacing={0.5} alignItems="center">
              <Typography variant="h5">{name}</Typography>
              
              <Typography color="secondary">{positionName}</Typography>
            </Stack>
            {/* SNS 링크 삭제 */}
            {/* <Stack direction="row" spacing={3} sx={{ '& svg': { fontSize: '1.15rem', cursor: 'pointer' } }}>
              <TwitterSquareFilled style={{ color: twitterColor }} />
              <FacebookFilled style={{ color: facebookColor }} />
              <LinkedinFilled style={{ color: linkedInColor }} />
            </Stack> */}
          </Stack>
        </Grid>
        <Grid item sm={3} sx={{ display: { sm: 'block', md: 'none' } }} />
        <Grid item xs={12} sm={6} md={12}>
          <Stack direction="row" justifyContent="space-around" alignItems="center">
            <Stack spacing={0.5} alignItems="center">
              <Typography variant="h5">{tardy}</Typography>
              <Typography color="secondary">지각</Typography>
            </Stack>
            <Divider orientation="vertical" flexItem />
            <Stack spacing={0.5} alignItems="center">
              <Typography variant="h5">{annualCount}</Typography>
              <Typography color="secondary">연차</Typography>
            </Stack>
            <Divider orientation="vertical" flexItem />
            <Stack spacing={0.5} alignItems="center">
              <Typography variant="h5">{deptName}</Typography>
              <Typography color="secondary">부서</Typography>
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          {/* 프로필 밑에 있는 설정들 */}
          <ProfileTab />
        </Grid>
      </Grid>
    </MainCard>
  );
};

ProfileTabs.propTypes = {
  focusInput: PropTypes.func
};

export default ProfileTabs;