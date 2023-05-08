import axios from 'axios';
import React, { useState, useEffect } from 'react';

const AddApprover = () => {
  const [approvers, setApprovers] = useState([]);
  const [selectedApprovers, setSelectedApprovers] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8081/members/approver');
      setApprovers(response.data.map(approver => ({ ...approver, checked: false })));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log("선택한거", { selectedApprovers })
    localStorage.setItem("approver", JSON.stringify(selectedApprovers));
  }, [selectedApprovers]);

  const handleCheck = (index) => {
    const newApprovers = [...approvers];
    newApprovers[index] = { ...newApprovers[index], checked: !newApprovers[index].checked };
    setApprovers(newApprovers);
    
  };

  const handleRegister = () => {
    const selectedApprovers = approvers
      .filter(approver => approver.checked)
      .sort((a, b) => a.positionId - b.positionId);
    setSelectedApprovers(selectedApprovers);
    window.close();
  };
  

  return (
    <div>
      <h2>결재자 목록</h2>
      <ul>
        {approvers.map((approver, index) => (
          <li key={index}>
            <input
              type="checkbox"
              checked={approver.checked}
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
};

export default AddApprover;
