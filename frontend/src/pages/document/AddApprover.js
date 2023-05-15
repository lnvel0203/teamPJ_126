import { request } from '../../utils/axios';
import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';

const AddApprover = () => {
  const [approvers, setApprovers] = useState([]);
  const [selectedApprovers, setSelectedApprovers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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
  
  const handleCheck = (id) => {
    const updatedApprovers = approvers.map((approver) => 
      approver.id === id ? { ...approver, checked: !approver.checked } : approver
    );
    
    setApprovers(updatedApprovers);
  
    const selectedApprovers = updatedApprovers
      .filter(approver => approver.checked)
      .sort((a, b) => a.positionId - b.positionId);
  
    setSelectedApprovers(selectedApprovers);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  }

  // 검색기능 
  const filteredApprovers = approvers.filter((approver) =>
    approver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    approver.deptName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    approver.positionName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log("선택한거", { selectedApprovers })
    localStorage.setItem("approver", JSON.stringify(selectedApprovers));
  }, [selectedApprovers]);

  const handleRegister = () => {
    const selectedApprovers = approvers
      .filter(approver => approver.checked)
      .sort((a, b) => a.positionId - b.positionId);
    setSelectedApprovers(selectedApprovers);
    window.close();
  };

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
      <button onClick={handleRegister}>등록</button>
    </div>
  );
};

export default AddApprover;
