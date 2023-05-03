import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

// 컴포넌트
import Clock from './Clock';

const items = [
  { text: '출근', id: 'start-work' },
  { text: '회의', id: 'meeting' },
  { text: '외출', id: 'go-out' },
  { text: '외근', id: 'field-work' },
  { text: '퇴근', id: 'end-work' },
  { text: '교육', id: 'education' },
  { text: '출장', id: 'business-trip' },
  { text: '휴식', id: 'rest' }
];
//이거로 아이디
const userid = localStorage.getItem('id');

export default function Check(props) {
  const [isOut, setIsOut] = useState(false);
  const [isEndWork, setIsEndWork] = useState(false);

  const handleClick = async (id) => {
    // 퇴근 상태 확인
    const checkEndWorkStatus = async () => {
      try {
        const response = await axios.get('http://localhost:8081/members/isEndWork'+"/"+userid);
        setIsEndWork(response.data === 1);
      } catch (error) {
        console.error(error);
      }
    };

    await checkEndWorkStatus();

    if (isEndWork && (id !== 'end-work' || id === 'go-out')) {
      alert('퇴근한 상태입니다.');
      return;
    }

    // 출근 상태
    if (id === 'start-work') {
      try {
        const response = await axios.get('http://localhost:8081/members/isStartWork');
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
    if (isOut && id !== 'return-work') {
      alert('복귀 버튼을 먼저 누르세요.');
      return;
    }

    if (id === 'end-work' && !window.confirm('퇴근하시겠습니까?')) {
      return;
    }

    axios
      .post('http://localhost:8081/members/attendanceCheck', { id: id })
      .then((response) => {
        console.log(response);
        props.onUpdate(); // 상태 변경

        // '외출' 버튼을 누른 경우 외출 상태를 업데이트
        if (id === 'go-out') {
          setIsOut(true);
        }
        // '복귀' 버튼을 누른 경우 외출 상태를 다시 확인
        else if (id === 'return-work') {
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
      const response = await axios.get('http://localhost:8081/members/checkOutStatus');
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
                if (item.id === 'go-out') {
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
                        onClick={() => handleClick(item.id)}
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
