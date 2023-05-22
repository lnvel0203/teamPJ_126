import React, { useState, useEffect } from 'react';
import './DocumentComponent.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { request } from '../../utils/axios';
import { useNavigate } from 'react-router-dom';
const DocumentWritePage = () => {

  const [annualCount, setAnnualCount] = useState(0);
  const navigate = useNavigate();
  const [documentType,setDocumentType] = useState('');
  const [retentionPeriod,setRetentionPeriod] = useState('');
  const [securityLevel,setSecurityLevel] = useState('');
  const [approver, setApprover] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const id = localStorage.getItem('id');
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [vacationDate, setVacationDate] = useState(null);
  const [name, setName] = useState('');
  const [restVacation, setRestVacation] = useState(0);

  const [value, setValue] = useState('');

  // 서버에서 이름과 남은 휴가일수를 가져오는 함수 호출
  useEffect(() => {
    fetchUserData();
  }, []);


  //id 값으로 휴가일수,이름을 가져오는 함수 
  const fetchUserData = async () => {
    try {
      const response = await request('GET', `/members/getAnnualCount/${id}`);
      const userData = response.data;
      console.log('userdata',userData)
      setName(userData.name); 
      setAnnualCount(userData.annualCount);
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  };

  //문서종류 휴가로 변경시 
  const handleDocumentTypeChange = (event) => {
    setDocumentType(event.target.value);
    if (event.target.value === '휴가') {
      setRetentionPeriod('');
      setSecurityLevel('');
    } 
  };

// 휴가 시작 날짜 설정 
const handleStartDateChange = (date) => {
  const today = new Date();
  
  if (endDate && date > endDate) {
    window.alert('휴가 시작 날짜는 종료 날짜보다 이전이어야 합니다');
  } else if (date.setHours(0,0,0,0) < today.setHours(0,0,0,0)) {  // 날짜 비교를 위해 시간을 0으로 설정
    window.alert('휴가 시작 날짜는 오늘 날짜보다 이전이면 안됩니다');
  } else {
    setStartDate(date);
  }
};

// 휴가 종료 날짜 설정 
const handleEndDateChange = (date) => {
  if (startDate && date < startDate) {
    window.alert('휴가 종료 날짜는 시작 날짜보다 이후이어야 합니다');
  } else {
    setEndDate(date);
  }
};

// 이 함수는 날짜가 주말인지 확인합니다.
const isWeekend = (date) => {
  const day = date.getDay();
  return day === 0 || day === 6;  // 0은 일요일, 6은 토요일
}

// 휴가 시작 날짜와 종료 날짜 사이의 휴가일수를 계산
useEffect(() => {
  if (startDate && endDate) {
    let diffDays = 0;
    let currentDate = new Date(startDate);
      
    while(currentDate <= endDate) {
      // 주말이 아닐 경우에만 diffDays를 증가시킵니다.
      if(!isWeekend(currentDate)) {
        diffDays++;
      }
      
      // currentDate를 다음 날로 업데이트합니다.
      currentDate.setDate(currentDate.getDate() + 1);
    }
      
    if (diffDays > annualCount) {
      window.alert('휴가가 부족합니다')
      setEndDate(null);
      setVacationDate(0);
    } else {
      setVacationDate(diffDays);
      setRestVacation(annualCount - diffDays);
    }
  }
}, [startDate, endDate]);


  const handleRetentionPeriodChange = (event) => {
    setRetentionPeriod(event.target.value);
  };

  const handleSecurityLevelChange = (event) => {
    setSecurityLevel(event.target.value);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    console.log('Selected file:', file);
  };  

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  // 팝업으로 결재자 목록 
  const handleAddButtonClick = () => {
    let width = 530;
    let height = 710;
    let top = (window.innerHeight / 2) - (height / 2) + window.screenY;
    let left = (window.innerWidth / 2) - (width / 2) + window.screenX;
    localStorage.removeItem("approver");
    window.open('/apps/document/AddApprover', '_blank', `width=${width},height=${height},top=${top},left=${left}`);
  };


  useEffect(() => {
    // 로컬 스토리지에서 'approver' 항목을 가져와 JSON 형식으로 파싱합니다.
    const storedApprover = JSON.parse(localStorage.getItem('approver')) || [];

    // 가져온 'approver' 항목을 상태 변수 approver에 설정합니다.
    setApprover(storedApprover);

    const handleStorageChange = () => {
      
      const storedApprover = JSON.parse(localStorage.getItem('approver')) || [];
      setApprover(storedApprover);
    };
    // window 객체에 이벤트 리스너로 로컬 스토리지의 변경을 감지
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  

  const modules = {
    toolbar: [
      [{ font: [] }],
      [{ header: [1, 2, 3, 4, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['link', 'image'],
      [{ align: [] }, { color: [] }, { background: [] }],
      ['clean']
    ]
  };

  const formats = [
    'font',
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'align',
    'color',
    'background'
  ];

  const handleAddDocument = async (event) => { 

    event.preventDefault();
    
    const storedApprover = JSON.parse(localStorage.getItem('approver')) || [];
    setApprover(storedApprover);
    
    const formData = new FormData();

   
    storedApprover.forEach((apv, index) => {
    formData.append(`storedApprover${index}`, JSON.stringify(apv));
    // Add approver number to formData
    formData.append(`approverNo${index}`, apv.no);
    });
    
    //if(documentType=='휴가')
    formData.append('id',id);
    formData.append('documentType', documentType);
    formData.append('author', name);
    formData.append('retentionPeriod', retentionPeriod);
    formData.append('securityLevel', securityLevel);
    formData.append('startDate',startDate);
    formData.append('endDate',endDate);
    formData.append('vacationDate', vacationDate);
    formData.append('title', title);
    formData.append('content', value); 

    storedApprover.forEach((apv, index) => {
      formData.append(`storedApprover${index}`, JSON.stringify(apv));
    });
  
    if (selectedFile) {
      formData.append('fileData', selectedFile, selectedFile.name);
    }

    for (const [key, value] of formData.entries()) {
      console.log('formData',`${key}: ${value}`);
    }
    if(documentType=='휴가') {
    try {
      request(
        'POST',
        '/members/addVacationDocument', formData
      ).then(response => {
        console.log('Insert success:', response.data);
        navigate('/apps/document/documentList', { state: { id: id } });
      })     
    } catch (error) {
      console.error('Insert error:', error);
      // 이후 처리 (예: 에러 메시지 표시 등)
    }
  } else {
    try {
      request(
        'POST',
        '/members/addDocument', formData
      ).then(response => {
        console.log('Insert success:', response.data);
        navigate('/apps/document/documentList', { state: { id: id } });
      })
      


    } catch (error) {
      console.error('Insert error:', error);
      // 이후 처리 (예: 에러 메시지 표시 등)
    }

  }
  };

  

  

  
  
  
  console.log(typeof annualCount, typeof vacationDate, typeof restVacation);
    return (
    
      <div style={{ marginLeft: '' }}>      
        <h1>기본 설정</h1>
         <table className="tb-1">
          <tbody>
            <tr className="tr-1">
              <td>문서 종류</td>
              <td className='write-td'>
                <select value={documentType} onChange={handleDocumentTypeChange}>
                  <option value="">-- 선택하세요 --</option>
                  <option value="보고서">보고서</option>
                  <option value="프레젠테이션">프레젠테이션</option>
                  <option value="계약서">계약서</option>
                  <option value="휴가">휴가</option>
                </select>
              </td>
              <td className='write-td'>작성자</td>
              <td>
                {name}
              </td>
            </tr>
            

            {/* 문서종류가 휴가가 아닐떄  */}
            {documentType !== '휴가' && (
            <tr className="tr-1">
              <td>보존 연한</td>
              <td className='write-td'>
                <select value={retentionPeriod} onChange={handleRetentionPeriodChange}>
                  <option value="">-- 선택하세요 --</option>
                  <option value="1년">1년</option>
                  <option value="2년">2년</option>
                  <option value="3년">3년</option>
                  <option value="5년">5년</option>
                  <option value="영구">영구</option>
                </select>
              </td>
              <td>보안등급</td>
              <td className='write-td'>
                <select value={securityLevel} onChange={handleSecurityLevelChange}>
                  <option value="">-- 선택하세요 --</option>
                  <option value="일반">일반</option>
                  <option value="기밀">기밀</option>
                  <option value="매우 기밀">매우 기밀</option>
                </select>
              </td>
            </tr>
            )}

            {/* 문서종류가 휴가 일때   */}
            {documentType === '휴가' && (
            <tr className="tr-1">
            <td>휴가 시작 날짜</td>
            <td className="write-td">
              <DatePicker selected={startDate} onChange={handleStartDateChange} />
            </td>
            <td>휴가 종료 날짜</td>
            <td className="write-td">
              <DatePicker selected={endDate} onChange={handleEndDateChange} dateFormat="yyyy/MM/dd" />
            </td>
            <td>사용 가능 휴가: {annualCount}</td>
            <td>사용할 휴가: {vacationDate}</td>
            <td>남는 휴가 : {restVacation}</td>
          </tr>
                )}
      </tbody>
    </table>

           
        <br />
        <br />
        <h1>결재선</h1>
        <table className="tb-2">
          <tbody>
            <tr className="tr-1">
              <td rowSpan="3" className="col-1">
                신청
                <button className="add-button" onClick={handleAddButtonClick}>
                  +
                </button>
              </td>
              <td className="col-2">{approver[0] ? approver[0].positionName : ""}</td>
              <td className="col-3">{approver[1] ? approver[1].positionName : ""}</td>
              <td className="col-4">{approver[2] ? approver[2].positionName : ""}</td>
              <td className="col-5">{approver[3] ? approver[3].positionName : ""}</td>
            </tr>
            <tr className="tr-2">
              <td className="col-2">{approver[0] ? "(결재란)" : ""}</td>
              <td className="col-3">{approver[1] ? "(결재란)" : ""}</td>
              <td className="col-4">{approver[2] ? "(결재란)" : ""}</td>
              <td className="col-5">{approver[3] ? "(결재란)" : ""}</td>
            </tr>


            <tr className="tr-3">
              <td className="col-2">{approver[0] ? approver[0].name : ""}</td>
              <td className="col-3">{approver[1] ? approver[1].name : ""}</td>
              <td className="col-4">{approver[2] ? approver[2].name : ""}</td>
              <td className="col-5">{approver[3] ? approver[3].name : ""}</td>
            </tr>
            <tr className="tr-4">
              <td className="col-1">참조</td>
              <td colSpan="4" className="file">
                <input type="file" onChange={handleFileUpload} />
              </td>
            </tr>
          </tbody>
        </table>
        <br />
        <h1>상세 입력</h1>
        <div className="title-input-container">
  <label htmlFor="document-title">제목: </label>
  <input type="text" id="document-title" className="title-input" value={title} onChange={handleTitleChange} />
</div>


        
      <div style={{ height: '650px', width: '900px' }}>
        <ReactQuill
          style={{ height: '600px' }}
          theme="snow"
          modules={modules}
          formats={formats}
          value={value}
          onChange={(content, delta, source, editor) => setValue(editor.getHTML())}
        />
        <div className="ql-editor" style={{ color: 'black' }}></div>
      </div>
      <div>
        <button type="button" onClick={handleAddDocument}>보내기</button>
        <button type="button">취소</button>
      </div>
    
      </div>
    );
}

export default DocumentWritePage;