import React, { useState, useEffect } from 'react';
import { Timeline } from 'antd';
import { Box } from '@mui/system';
import axios from 'axios';

// 세션 아이디
const id = localStorage.getItem('id');

const TimeLine = ({ update }) => {
  const [attendance, setAttendance] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:8081/members/attendanceList?id=${id}`)
      .then((response) => {
        setAttendance(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [update]);

  const displayNameMap = {
    startWork: '출근',
    meeting: '회의',
    goOut: '외출',
    fieldWork: '외근',
    endWork: '퇴근',
    education: '교육',
    businessTrip: '출장',
    rest: '휴식',
    returnWork: '복귀'
  };

  const attendanceArray = Object.entries(attendance)
    .filter(([, value]) => value !== null)
    .map(([key, value]) => ({
      key,
      value: new Date(value)
    }))
    .sort((a, b) => a.value - b.value);

  const attendanceItems = attendanceArray.map(({ key, value }) => (
    <Timeline.Item key={key}>
      {displayNameMap[key]}: {value.toLocaleTimeString()}
    </Timeline.Item>
  ));

  return (
    <Box mt={1}>
      <Timeline>{attendanceItems}</Timeline>
    </Box>
  );
};

export default TimeLine;
