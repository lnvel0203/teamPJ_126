// AddApprover.jsx

import axios from 'axios';
import React, { useState, useEffect } from 'react';

const AddApprover = () => {
  const [approvers, setApprovers] = useState([]);
  const [selectedApprovers, setSelectedApprovers] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8081/members/approver');
      setApprovers(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleCheck = (index) => {
    const newApprovers = [...approvers];
    newApprovers[index] = { ...approvers[index], isChecked: !approvers[index].isChecked };
    setApprovers(newApprovers);
  };

  const handleRegister = () => {
    setSelectedApprovers(approvers.filter((approver) => approver.isChecked));
    console.log(selectedApprovers)
    localStorage.setItem("approver",JSON.stringify(selectedApprovers));
    console.log('로컬',localStorage.getItem("approver"))
  };

  
  

  return (
    <div>
      <h2>결재자 목록</h2>
      <ul>
        {approvers.map((approver, index) => (
          <li key={index}>
            <input
              type="checkbox"
              checked={approver.isChecked}
              onChange={() => handleCheck(index)}
            />
            <div>
              <p>{approver.name}</p>
              <p>{approver.deptName}</p>
              <p>{approver.positionName}</p>
            </div>
          </li>
        ))}
      </ul>
      <button onClick={handleRegister}>등록</button>
    </div>
  );
}

export default AddApprover;