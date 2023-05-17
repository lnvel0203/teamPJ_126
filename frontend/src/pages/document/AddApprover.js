import { request } from '../../utils/axios';
import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';

const AddApprover = () => {
  // 결재자 목록과 검색어 상태 저장
  const [approvers, setApprovers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // 서버에서 결재자 목록을 불러와 상태에 저장
  const fetchData = async () => {
    try {
      request(
        'GET',
        '/members/approver'
      ).then(response => {
        setApprovers(response.data.map((approver, index) => ({ ...approver, id: index, checked: false })));
      })
    } catch (error) {
      console.error(error);
    }
  };

  // 체크박스 상태 변경 처리, 선택된 결재자를 localStorage에 저장
  const handleCheck = (id) => {
    const updatedApprovers = approvers.map((approver) => 
      approver.id === id ? { ...approver, checked: !approver.checked } : approver
    );

    setApprovers(updatedApprovers);

    const selectedApprovers = updatedApprovers
      .filter(approver => approver.checked)
      .sort((a, b) => a.positionId - b.positionId);

    localStorage.setItem("approver", JSON.stringify(selectedApprovers));
  };

  // 검색어 상태 변경 처리
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  }

  // 컴포넌트가 마운트될 때 결재자 목록을 불러옴
  useEffect(() => {
    fetchData();
  }, []);

  // 테이블 칼럼 설정
  const columns = [
    {
      field: 'checked',
      headerName: '선택',
      width: 40,
      renderCell: (params) => (
        <input
          type="checkbox"
          checked={params.row.checked}
          onChange={() => handleCheck(params.row.id)}
        />
      ),
    },
    { field: 'name', headerName: '이름', width: 120 },
    { field: 'deptName', headerName: '부서', width: 120 },
    { field: 'positionName', headerName: '직급', width: 120 },
  ];

  // 검색어에 따라 결재자 목록 필터링
  const filteredApprovers = approvers.filter((approver) =>
    approver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    approver.deptName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    approver.positionName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ height: 400, width: '100%' }}>
      <input 
        type="text" 
        placeholder="검색..." 
        value={searchTerm} 
        onChange={handleSearchChange} 
      />
     <DataGrid
        rows={filteredApprovers}
        columns={columns}
        pageSize={5}
        onRowSelected={(row) => handleCheck(row.data.id)}
      />
    </div>
  );
};


export default AddApprover;
