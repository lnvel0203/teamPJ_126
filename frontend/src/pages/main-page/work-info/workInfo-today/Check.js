import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

// 컴포넌트
import Clock from './Clock';

// 세션 아이디
const id = localStorage.getItem('id');

const items = [
  { text: '출근', status: 'start-work' },
  { text: '회의', status: 'meeting' },
  { text: '외출', status: 'go-out' },
  { text: '외근', status: 'field-work' },
  { text: '퇴근', status: 'end-work' },
  { text: '교육', status: 'education' },
  { text: '출장', status: 'business-trip' },
  { text: '휴식', status: 'rest' }
];

export default function Check(props) {
  const [isOut, setIsOut] = useState(false);
  const [isEndWork, setIsEndWork] = useState(false);

  const handleClick = async (status) => {
    // 퇴근 상태 확인
    const checkEndWorkStatus = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/members/isEndWork?id=${id}`);
        setIsEndWork(response.data === 1);
      } catch (error) {
        console.error(error);
      }
    };

    await checkEndWorkStatus();

    if (isEndWork && (status !== 'end-work' || status === 'go-out')) {
      alert('퇴근한 상태입니다.');
      return;
    }

    // 출근 상태
    if (status === 'start-work') {
      try {
        const response = await axios.get(`http://localhost:8081/members/isStartWork?id=${id}`);
        if (response.data == 1) {
          alert('이미 출근 한 상태입니다.');
          return;
        } else if (response.data == 0) {
          if (!window.confirm('출근?')) {
            return;
          }
        }
      } catch (error) {
        console.error(error);
      }
    }

    // 외출 상태이고 '복귀' 버튼을 누르지 않았을 때 경고 메시지 표시
    if (isOut && status !== 'return-work') {
      alert('복귀 버튼을 먼저 누르세요.');
      return;
    }

    if (status === 'end-work' && !window.confirm('퇴근하시겠습니까?')) {
      return;
    }

    axios
      .post('http://localhost:8081/members/attendanceCheck', { id: id, status: status })
      .then((response) => {
        console.log(response);
        props.onUpdate(); // 상태 변경

        // '외출' 버튼을 누른 경우 외출 상태를 업데이트
        if (status === 'go-out') {
          setIsOut(true);
        }
        // '복귀' 버튼을 누른 경우 외출 상태를 다시 확인
        else if (status === 'return-work') {
          checkOutStatus();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // 백엔드에서 외출 상태를 확인하는 함수
  const checkOutStatus = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/members/checkOutStatus?id=${id}`);
      setIsOut(response.data === 1);
    } catch (error) {
      console.error(error);
    }
  };

  // 컴포넌트가 마운트될 때 외출 상태를 확인
  useEffect(() => {
    checkOutStatus();
  }, []);

  // 변경된 버튼 상태에 따라 '외출' 또는 '복귀' 버튼을 렌더링
  const outOrReturnButton = () => {
    const buttonText = isOut ? '복귀' : '외출';
    const buttonId = isOut ? 'return-work' : 'go-out';

    return (
      <Grid item xs={3}>
        <Button
          variant="outlined"
          size="small"
          style={{
            border: '1px solid #263238',
            color: '#263238',
            boxShadow: 'none'
          }}
          onClick={() => handleClick(buttonId)}
        >
          {buttonText}
        </Button>
      </Grid>
    );
  };

  return (
    <div>
      <Box height="110px">
        <Clock />
        <Box display="flex" justifyContent="center">
          <Box justifyContent="center" width={280}>
            <Grid container spacing={1}>
              {items.map((item) => {
                if (item.status === 'go-out') {
                  return outOrReturnButton();
                } else {
                  return (
                    <Grid item xs={3} key={item.text}>
                      <Button
                        variant="outlined"
                        size="small"
                        style={{
                          border: '1px solid #263238',
                          color: '#263238',
                          boxShadow: 'none'
                        }}
                        onClick={() => handleClick(item.status)}
                      >
                        {item.text}
                      </Button>
                    </Grid>
                  );
                }
              })}
            </Grid>
          </Box>
        </Box>
      </Box>
    </div>
  );
}
