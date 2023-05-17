import React, { useState,useEffect } from 'react';
import './DocumentComponent.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import {useLocation } from 'react-router-dom';
import DatePicker from "react-datepicker";
import { getAuthToken , request } from '../../utils/axios';
import { parseISO } from 'date-fns';      
const DocumentDetail = () => {
  
  const [documentType,setDocumentType] = useState('');
  const [author,setAuthor] = useState('');
  const [retentionPeriod,setRetentionPeriod] = useState('');
  const [securityLevel,setSecurityLevel] = useState('');
  const [approver, setApprover] = useState([]);
  const [content, setContent] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const id = localStorage.getItem('id');
  const [title, setTitle] = useState('');
  const [firstApproverNo, setFirstApproverNo] = useState(null);
  const [secondApproverNo, setSecondApproverNo] = useState(null);
  const [thirdApproverNo, setThirdApproverNo] = useState(null);
  const [fourthApproverNo, setFourthApproverNo] = useState(null);

  const [firstApproverState, setFirstApproverState] = useState(null);
  const [secondApproverState, setSecondApproverState] = useState(null);
  const [thirdApproverState, setThirdApproverState] = useState(null);
  const [fourthApproverState, setFourthApproverState] = useState(null);
  const [rejectionReason, setRejectionReason] = useState(null);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [vacationDate, setVacationDate] = useState(null);
  const [restVacation, setRestVacation] = useState(null);
  const [annualCount, setAnnualCount] = useState(null);

  const [firstApproverStemp, setFirstApproverStemp] = useState(null);
  const [secondApproverStemp, setSecondApproverStemp] = useState(null);
  const [thirdApproverStemp, setThirdApproverStemp] = useState(null);
  const [fourthApproverStemp, setFourthApproverStemp] = useState(null);

  const [firstApproverId, setFirstApproverId] = useState(null);
  const [secondApproverId, setSecondApproverId] = useState(null);
  const [thirdApproverId, setThirdApproverId] = useState(null);
  const [fourthApproverId, setFourthApproverId] = useState(null);
  const [documentState, setDocumentState] = useState(null);
  const [showEditCancelButtons, setShowEditCancelButtons] = useState(false);
  const [showFilePath, setShowFilePath] = useState(false);
  const [filePath , setFilePath] = useState("");

  // const [startDate, setStartDate] = useState(null);
  // const [endDate, setEndDate] = useState(null);
  // const [vacationDate, setVacationDate] = useState(0);
  
  

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

    const query = useQuery();
    const documentNo = query.get('documentNo');

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8081/members/documentDetail/'+documentNo, {
        headers: {
          Authorization: 'Bearer ' + getAuthToken(),
        }
      });
      console.log(response.data)
      const data = response.data;
      console.log('data',data)
      setDocumentType(data.documentType)
      setAuthor(data.author);
      setRetentionPeriod(data.retentionPeriod);
      setSecurityLevel(data.securityLevel);
      setFirstApproverNo(data.firstApproverNo);
      setSecondApproverNo(data.secondApproverNo);
      setThirdApproverNo(data.thirdApproverNo);
      setFourthApproverNo(data.fourthApproverNo);
      setTitle(data.title);
      setContent(data.content);
      setFilePath(data.filePath);
      setDocumentState(data.documentState);
      if (data.vacationDate) {
        console.log('이거타야지 그러면 ')
        const getAnnualCount = async () => {
          try {
            const userResponse = await request('GET', `/members/getAnnualCount/${id}`);
            const userData = userResponse.data;
            console.log('userResponse',userResponse.data)
            setAnnualCount(userData.annualCount);
          } catch (error) {
            console.error('Failed to fetch user data:', error);
          }
        };
        getAnnualCount();

        setVacationDate(data.vacationDate);
        if (response.data.startDate && response.data.endDate) {
          
            setStartDate(parseISO(response.data.startDate));
            setEndDate(parseISO(response.data.endDate));
        }
      }
      if (data.rejectionReason) {
        setRejectionReason(data.rejectionReason);
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  const fetchApproversInfo = async (approverNos) => {
    try {
      const response = await axios.get("http://localhost:8081/members/approverInfo", {
        params: {
          approverNos: approverNos.join(","),
          documentNo: documentNo,
        },
        
          headers: {
            Authorization: 'Bearer ' + getAuthToken(),
          }
        
      });
      if (response.data[0]) {
        setFirstApproverId(response.data[0].id);
        setFirstApproverStemp(response.data[0].stemp);
        setFirstApproverState(response.data[0].firstApproverState); // Set firstApproverState
      }
      if (response.data[1]) {
        setSecondApproverId(response.data[1].id);
        setSecondApproverStemp(response.data[1].stemp);
        setSecondApproverState(response.data[1].secondApproverState); // Set secondApproverState
      }
      if (response.data[2]) {
        setThirdApproverId(response.data[2].id);
        setThirdApproverStemp(response.data[2].stemp);
        setThirdApproverState(response.data[2].thirdApproverState); // Set thirdApproverState
      }
      if (response.data[3]) {
        setFourthApproverId(response.data[3].id);
        setFourthApproverStemp(response.data[3].stemp);
        setFourthApproverState(response.data[3].fourthApproverState); // Set fourthApproverState
      }
      return response.data;
      
    } catch (error) {
      console.error("Failed to fetch approver info for Nos:", approverNos);
      return null;
    }
  };

  useEffect(() => {
    const approverIds = [
        firstApproverId,
        secondApproverId,
        thirdApproverId,
        fourthApproverId,
    ].filter((no) => no !== null);

    if (approverIds.includes(id) || documentState !== "반려됨") {
      setShowEditCancelButtons(true);
      setShowFilePath(true);
    } else {
      setShowEditCancelButtons(false);
      setShowFilePath(false);
    }
  }, [firstApproverId, secondApproverId, thirdApproverId, fourthApproverId, id]);
  
  useEffect(() => {

    const fetchAllApproversInfo = async () => {
      const approverNos = [
        firstApproverNo,
        secondApproverNo,
        thirdApproverNo,
        fourthApproverNo,
      ].filter((no) => no !== null);

      if (approverNos.length > 0) {
        const approversInfo = await fetchApproversInfo(approverNos);
        console.log('approversInfo',approversInfo)
        setApprover(approversInfo);
      }
    };
  
    if (firstApproverNo || secondApproverNo || thirdApproverNo || fourthApproverNo) {
      fetchAllApproversInfo();
    }
    
  }, [firstApproverNo, secondApproverNo, thirdApproverNo, fourthApproverNo,]);
  


  useEffect(() => {
    fetchData();
  }, [documentType,author,retentionPeriod,securityLevel]);

  const handleDocumentTypeChange = (event) => {
    setDocumentType(event.target.value);
  };
  
  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };

  const handleRetentionPeriodChange = (event) => {
    setRetentionPeriod(event.target.value);
  };

  const handleSecurityLevelChange = (event) => {
    setSecurityLevel(event.target.value);
  };

  const handleAddButtonClick = () => {
    let width = 530;
    let height = 710;
    let top = (window.innerHeight / 2) - (height / 2) + window.screenY;
    let left = (window.innerWidth / 2) - (width / 2) + window.screenX;
    localStorage.removeItem("approver");
    window.open('/apps/document/AddApprover', '_blank', `width=${width},height=${height},top=${top},left=${left}`);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    // Add logic to upload file to server or do something with it
  };  

  useEffect(() => {
    const storedApprover = JSON.parse(localStorage.getItem('approver')) || [];
    console.log('stroedApprover',storedApprover)
    setApprover(storedApprover);
  }, [localStorage.getItem('approver')]);

  useEffect(() => {
    const storedApprover = JSON.parse(localStorage.getItem('approver')) || [];
    setApprover(storedApprover);
    const handleStorageChange = () => {
      const storedApprover = JSON.parse(localStorage.getItem('approver')) || [];
      setApprover(storedApprover);
    };
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    
    // Add logic to upload file to server or do something with it
  }, [selectedFile]);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  
  
    useEffect(() => {
      if (startDate && endDate) {
        const diffTime = Math.abs(endDate - startDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        setRestVacation(annualCount-diffDays);
        if(documentState!='반려됨') {
          if (diffDays>annualCount) {
            window.alert('휴가가 부족합니다')
            setEndDate(null);
            setVacationDate(0);          
          }
        }
          else {
            setVacationDate(diffDays);
          } 
        
      }
    
    }, [startDate, endDate]);
  

  const handleStartDateChange = (date) => {
    const today = new Date();
  
    if (endDate && date > endDate) {
      window.alert('휴가 시작 날짜는 종료 날짜보다 이전이어야 합니다');
    } else if (date.setHours(0,0,0,0) < today.setHours(0,0,0,0)) {  // 날짜 비교를 위해 시간을 0으로 설정
      window.alert('휴가 시작 날짜는 오늘 날짜보다 이전이면 안됩니다');
    } else {
      setStartDate(date);
      console.log('시작날짜', date)
    }
  };
  
  const handleEndDateChange = (date) => {
    if (startDate && date < startDate) {
      window.alert('휴가 종료 날짜는 시작 날짜보다 이후이어야 합니다');
    } else {
      setEndDate(date);
      console.log('종료날짜',date)
    }
  };

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
  //수정하기 
  const handleUpdateDocument = async (event) => { 

    const result = window.confirm('수정 하시겠습니까 ?');
    if(result) {
      if(documentState=='반려됨' || documentState=='임시저장') {
                event.preventDefault();
              const storedApprover = JSON.parse(localStorage.getItem('approver')) || [];
              setApprover(storedApprover);
              const formData = new FormData();
              
              formData.append('documentNo',documentNo);
              formData.append('id',id);
              formData.append('documentType', documentType);
              formData.append('author', author);
              formData.append('retentionPeriod', retentionPeriod);
              formData.append('securityLevel', securityLevel);
              formData.append('title', title);
              formData.append('content', content); 
              formData.append('documentState',documentState);
              formData.append('documentNo',documentNo);
              if(documentType=='휴가') {
              formData.append('startDate',startDate);
              formData.append('endDate',endDate);
              formData.append('vacationDate', vacationDate);
              }
              

              if(firstApproverState) {
                formData.append('firstApproverState',firstApproverState)
              }
              if(secondApproverState) {
                formData.append('secondApproverState',secondApproverState)
              }
              if(thirdApproverState) {
                formData.append('thirdApproverState',thirdApproverState)
              }
              if(fourthApproverState) {
                formData.append('fourthApproverState',fourthApproverState)
              }

              storedApprover.forEach((apv, index) => {
                formData.append(`storedApprover${index}`, JSON.stringify(apv));
              });
            
              if (selectedFile) {
                formData.append('fileData', selectedFile, selectedFile.name);
              }

              for (const [key, value] of formData.entries()) {
                console.log('전송할파일formData',`${key}: ${value}`);
              }
              console.log("전송시작")
            
              try {
                const response = await request(
                  'POST',
                  '/members/updateVacationDocument', formData
                );
    //const response = await axios.post('http://localhost:8081/members/updateVacationDocument', formData);
    console.log('Update success:', response.data);
    window.alert('수정되었습니다.')

    // 현재 창을 닫은 후, 부모 창의 URL에 query parameter 추가
    let newUrl = new URL(window.opener.location.href);
    newUrl.searchParams.set('refresh', 'true');
    newUrl.searchParams.set('tab', 'update');
    window.opener.location.href = newUrl.href;

    window.close();
    // 이후 처리 (예: 페이지 이동 등)
} catch (error) {
    console.log("되겠냐고 ㅋ ");
    console.error('Insert error:', error);
    // 이후 처리 (예: 에러 메시지 표시 등)
}
            }
            else {
              window.alert("진행중이거나,완료된 문서는 수정할 수 없습니다.")
            }
    }
  };

  const handleApprovalButtonClick = async () => {
    const result = window.confirm('결재승인 하시겠습니까 ?');
    if(result) {
        console.log('승인')
        try {
            console.log(id)
            await request(
              'POST',
              '/members/approve/'+id+'/'+documentNo
            );
            //await axios.post('http://localhost:8081/members/approve/'+id+'/'+documentNo);
            window.alert('결재승인 되었습니다')

            // 현재 창을 닫은 후, 부모 창의 URL에 query parameter 추가
            let newUrl = new URL(window.opener.location.href);
            newUrl.searchParams.set('refresh', 'true');
            newUrl.searchParams.set('tab', 'pending');
            window.opener.location.href = newUrl.href;

            window.close();
        } catch(error) {
            console.error('Error:',error)
        }
    } else {
        console.log('취소')
    }
};

  

const handleRejectionButtonClick = async () => {
  const result = window.confirm('반려하시겠습니까 ?');

  if (result) {
      const rejectionReason = window.prompt('반려 사유를 입력해주세요');
      if (rejectionReason) {
          try {
              console.log('vacationDate보낸다', vacationDate);
              await request(
                'POST',
                '/members/addRejectionReason/' + rejectionReason + '/' + id + '/' + documentNo + '/' + vacationDate
              );
              //await axios.post('http://localhost:8081/members/addRejectionReason/' + rejectionReason + '/' + id + '/' + documentNo + '/' + vacationDate);
              window.alert('반려처리 되었습니다');
              
              let newUrl = new URL(window.opener.location.href);
              newUrl.searchParams.set('refresh', 'true');
              newUrl.searchParams.set('tab', 'pending');
              window.opener.location.href = newUrl.href;

              window.close();
          } catch (error) {
              console.error('Error:', error);
          }
      } else {
          window.alert('반려 사유를 입력해야합니다.');
      }
  } else {
      console.log('취소');
  }
};

function getFileName(filePath) {
  if (filePath) {
    return filePath.split('\\').pop().split('/').pop();
  } else {
    return "";
  }
}
  
  return (
    
    <div style={{ marginLeft: '' }}>
        <div>
        {showEditCancelButtons ? (
          <>
            <button type="button" onClick={handleApprovalButtonClick}>
                결재하기
                </button>
                <button type="button" onClick={handleRejectionButtonClick}>
                반려하기
                </button>
          </>
        ) : (
          <>
            <button type="button" onClick={handleUpdateDocument}>
              수정하기
            </button>
            <button type="button">취소</button>
          </>
        )}
      </div> 
      
      {documentState === '반려됨' && rejectionReason && <h2>반려사유 : {rejectionReason}</h2>}
      <h1>기본 설정</h1>
       <table className="tb-1">
        <tbody>
          <tr className="tr-1">
            <td>문서 종류</td>
            <td className='write-td'>
              <select value={documentType} onChange={handleDocumentTypeChange}>
                <option value="">{documentType}</option>
                <option value="보고서">보고서</option>
                <option value="프레젠테이션">프레젠테이션</option>
                <option value="계약서">계약서</option>
                <option value="기타">휴가</option>
              </select>
            </td>
            <td className='write-td'>작성자</td>
            <td>
              <input type="text" value={author} onChange={handleAuthorChange} />
            </td>
          </tr>
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

        {documentType === '휴가' && documentState !== '반려됨' && (
          <tr className="tr-1">
            <td>휴가 기간</td>
            <td className="write-td">{startDate} ~ {endDate}
            </td>
            <td className='write-td'>사용 휴가</td>
            <td>{vacationDate}일</td>
          </tr>
        )}

      {documentType === '휴가' && documentState === '반려됨' && (
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
          <td>남는 휴가 : {restVacation < 0 ? annualCount - vacationDate : restVacation}</td>
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
              <button 
                className="add-button" 
                onClick={handleAddButtonClick}
                disabled={documentState !== '임시저장' && documentState !== '반려됨'}
              >
                +
              </button>
            </td>
            <td className="col-2">{approver[0] ? approver[0].positionName : ""}</td>
            <td className="col-3">{approver[1] ? approver[1].positionName : ""}</td>
            <td className="col-4">{approver[2] ? approver[2].positionName : ""}</td>
            <td className="col-5">{approver[3] ? approver[3].positionName : ""}</td>
          </tr>
          <tr className="tr-2">
            <td className="col-2">{firstApproverState ===  "결재완료" ? <img src={firstApproverStemp} alt="Your description" /> : firstApproverState}</td>
            <td className="col-3">{secondApproverState === "결재완료" ? <img src={secondApproverStemp} alt="Your description" /> : secondApproverState}</td>
            <td className="col-4">{thirdApproverState === "결재완료" ? <img src={thirdApproverStemp} alt="Your description" /> : thirdApproverState}</td>
            <td className="col-5">{fourthApproverState === "결재완료" ? <img src={fourthApproverStemp} alt="Your description" /> : fourthApproverState}</td>
          </tr>


          <tr className="tr-3">
            <td className="col-2">{approver[0] ? approver[0].name : ""}</td>
            <td className="col-3">{approver[1] ? approver[1].name : ""}</td>
            <td className="col-4">{approver[2] ? approver[2].name : ""}</td>
            <td className="col-5">{approver[3] ? approver[3].name : ""}</td>
          </tr>
          <tr className="tr-4">
            <td className="col-1">참조</td>


            {showFilePath ? (
            <>
                <td colSpan="4" className="file">
                <button onClick={() => window.open(
                  
                  `http://localhost:8081/members/downloadFile/${encodeURIComponent(getFileName(filePath))}`, '_blank', 'noopener,noreferrer'
                  
                  )}>
                  {getFileName(filePath)}
                </button>
                </td>
            </>
            ) : (
                <>
                <td colSpan="4" className="file">
                    <input type="file" onChange={handleFileUpload} />
                </td>
                </>
            )}
            
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
        value={content}
        onChange={(content, delta, source, editor) => setContent(editor.getHTML())}
      />
      <div className="ql-editor" style={{ color: 'black' }}></div>
    </div>
    
  
    </div>
  );
}


export default DocumentDetail;