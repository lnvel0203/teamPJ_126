import React, { useState } from 'react';
import { Box, Tabs, TextField, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

export default function DocumentListComponent() {
  const [value, setValue] = useState('one');
  const [] = useState(false);
  const [searchText, setSearchText] = useState('');

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  }

  const columns = [
    { field: '문서번호', headerName: '문서번호', width: 110 },
    { field: '제목', headerName: '제목', width: 200 },
    { field: '기안자', headerName: '기안자', width: 120 },
    { field: '기안일', headerName: '기안일', width: 120 },
    { field: '문서종류', headerName: '문서종류', width: 120 },
    { field: '구분', headerName: '구분', width: 120 },
  ];

  const rows = [
    { id: 1, 문서번호: 'DOC-001', 제목: '회사운영계획서', 기안자: '김사원', 기안일: '2022-03-01', 문서종류: '기획서', 구분: '일반' },
    { id: 2, 문서번호: 'DOC-002', 제목: '재무제표', 기안자: '이대리', 기안일: '2022-03-02', 문서종류: '재무제표', 구분: '일반' },
    { id: 3, 문서번호: 'DOC-003', 제목: '인사발령서', 기안자: '박과장', 기안일: '2022-03-03', 문서종류: '인사서류', 구분: '비밀' },
    { id: 4, 문서번호: 'DOC-004', 제목: '물품구매요청서', 기안자: '최대리', 기안일: '2022-03-04', 문서종류: '구매서류', 구분: '일반' },
  ];

  
  const filteredRows = rows.filter((row) => {
    const regex = new RegExp(searchText, 'i');
    return regex.test(row.제목) || regex.test(row.기안자) || regex.test(row.문서종류) || regex.test(row.구분);
  });

  return (
    <Box sx={{ width: '100%' , marginLeft: '400px'}}>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
      >
        
      </Tabs>
      {value === 'one' && (
        <Box sx={{ flexGrow: 1, maxWidth: 900 }}>
          
          <h2>  </h2>

          {/* 검색 필터 추가 */}
          <TextField
            id="outlined-basic"
            label="검색"
            variant="outlined"
            sx={{ width: '20ch', mb: 2 }}
            value={searchText}
            onChange={handleSearchChange}
          />

          <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={filteredRows}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
              checkboxSelection
              disableSelectionOnClick
            />
          </div>
          <br></br>
          <Button variant="outlined" color="primary">등록</Button>
        </Box>
      )}
    </Box>
  );
}
