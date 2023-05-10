import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { request } from '../../../../utils/axios';
// material-ui
import { Grid, Typography, Stack } from '@mui/material';
// import { openSnackbar } from 'store/reducers/snackbar';
import { openSnackbar } from '../../../../store/reducers/snackbar';

// project import
import MainCard from 'components/MainCard';
import Avatar from 'components/@extended/Avatar';

// components
import Today from './Today';

// 세션 아이디
const id = localStorage.getItem('id');

//asset
import { CheckSquareFilled, HomeFilled, InteractionFilled, RestFilled, HourglassFilled, ReadFilled } from '@ant-design/icons';
// ==============================|| CHECK - ICONS ||============================== //

const CheckCard = ({ onStatusChange }) => {
  // 스낵바
  const dispatch = useDispatch();
  // 외출/복귀 버튼 변경
  const [isOut, setIsOut] = useState(false);

  // 컴포넌트가 마운트될 때 외출 상태를 확인
  useEffect(() => {
    (async () => {
      await checkOutStatus();
    })();
  }, []);

  // 백엔드에서 외출 상태를 확인하는 함수
  const checkOutStatus = async () => {
    try {
      request(
        'GET',
        `members/checkOutStatus?id=${id}`
      ).then((response) => {
        setIsOut(response.data === 1);
        console.log('isOut?: ' + isOut);
      });
    } catch (error) {
      console.error(error);
    }
  };

  // 버튼 배열
  const items = [
    { text: '출근', status: 'start-work', icon: <CheckSquareFilled /> },
    { text: '회의', status: 'meeting', icon: <RestFilled />, color: 'success' },
    {
      text: isOut ? '복귀' : '외출',
      status: isOut ? 'return-work' : 'go-out',
      icon: isOut ? <HomeFilled /> : <HourglassFilled />,
      color: isOut ? 'info' : 'warning'
    },
    { text: '퇴근', status: 'end-work', icon: <HomeFilled />, color: 'info' },
    { text: '휴식', status: 'rest', icon: <InteractionFilled />, color: 'error' },
    { text: '교육', status: 'education', icon: <ReadFilled /> }
  ];

  const handleClick = async (status) => {
    // 출근 안했는데 버튼 다른 버튼 누를 때
    if (status !== 'start-work') {
      try {
    
        request(
          'GET',
          `members/isStartWork?id=${id}`
        ).then((response) => {
          if (response.data == 0) {
            dispatch(
              openSnackbar({
                open: true,
                message: '먼저 출근 버튼을 누르세요.',
                variant: 'alert',
                alert: {
                  color: 'error'
                }
              })
            );
            return;
          }
        });
      } catch (error) {
        console.error(error);
      }
    }

    // 버튼 바로 변경
    if (status === 'go-out') {
      console.log('1: ' + isOut);
      setIsOut(true);
    } else if (status === 'return-work') {
      setIsOut(false);
    }

    // 외출 상태이고 '복귀' 버튼을 누르지 않았을 때 경고 메시지 표시
    if (isOut && status !== 'return-work') {
      dispatch(
        openSnackbar({
          open: true,
          message: '복귀 버튼을 먼저 누르세요.',
          variant: 'alert',
          alert: {
            color: 'error'
          }
        })
      );
      return;
    }

    // 퇴근 상태 확인
    try {

      request(
        'GET',
        `members/isEndWork?id=${id}`
      ).then((response) => {
        if (response.data == 1) {
          dispatch(
            openSnackbar({
              open: true,
              message: '이미 퇴근한 상태입니다.',
              variant: 'alert',
              alert: {
                color: 'error'
              }
            })
          );
  
          return;
        } else if (response.data == 0) {
          if (status === 'end-work') {
            if (!window.confirm('퇴근 하시겠습니까?')) {
              return;
            }
          }
        }
      });
    } catch (error) {
      console.error(error);
    }

    // 출근 상태 확인
    if (status === 'start-work' && status !== 'end-work') {
      try {
        request(
          'GET',
          `members/isStartWork?id=${id}`
        ).then((response) => {
          if (response.data == 1) {
            dispatch(
              openSnackbar({
                open: true,
                message: '이미 출근한 상태입니다.',
                variant: 'alert',
                alert: {
                  color: 'error'
                }
              })
            );
            return;
          } else if (response.data == 0) {
            if (!window.confirm('출근 하시겠습니까?')) {
              return;
            }
          }
        });
      } catch (error) {
        console.error(error);
      }
    }


    // 근무 체크
    request(
      'POST',
      'members/workCheck', { id: id, status: status }
    ).then((response) => {
      console.log(response);
      onStatusChange();
      //props.onUpdate(); // 상태 변경
    })
    .catch((error) => {
      console.error(error);
    });
  };

  return (
    <MainCard sx={{ height: '100%' }} title="근무 체크">
      <Grid container spacing={1}>
        {/* 날짜 시간 시작 */}
        <Grid item xs={12}>
          <MainCard>
            <Stack alignItems="center">
              <Today />
            </Stack>
          </MainCard>
        </Grid>
        {/* 날짜 시간 끝 */}

        {/* 버튼 반복 시작 */}
        {items.map((item) => (
          <Grid key={item.status} item xs={4}>
            <MainCard content={false} boxShadow sx={{ py: 2.5 }} onClick={() => handleClick(item.status)}>
              <Stack alignItems="center" spacing={1}>
                <Avatar size="md" type="filled" color={item.color}>
                  {item.icon}
                </Avatar>
                <Typography variant="subtitle1" color="secondary">
                  {item.text}
                </Typography>
              </Stack>
            </MainCard>
          </Grid>
        ))}

        {/* 버튼 반복 끝 */}
      </Grid>
    </MainCard>
  );
};

export default CheckCard;
