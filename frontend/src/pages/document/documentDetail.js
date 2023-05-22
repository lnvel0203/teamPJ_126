import React, { useState,useEffect } from 'react';
import './DocumentComponent.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import {useLocation } from 'react-router-dom';
// import { parseISO } from 'date-fns';      
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
  const [documentState, setDocumentState] = useState(null);

  const [firstApproverNo, setFirstApproverNo] = useState(null);
  const [secondApproverNo, setSecondApproverNo] = useState(null);
  const [thirdApproverNo, setThirdApproverNo] = useState(null);
  const [fourthApproverNo, setFourthApproverNo] = useState(null);

  const [firstApproverState, setFirstApproverState] = useState(null);
  const [secondApproverState, setSecondApproverState] = useState(null);
  const [thirdApproverState, setThirdApproverState] = useState(null);
  const [fourthApproverState, setFourthApproverState] = useState(null);
  const [rejectionReason, setRejectionReason] = useState(null);

  const [firstApproverStemp, setFirstApproverStemp] = useState(null);
  const [secondApproverStemp, setSecondApproverStemp] = useState(null);
  const [thirdApproverStemp, setThirdApproverStemp] = useState(null);
  const [fourthApproverStemp, setFourthApproverStemp] = useState(null);
  
  const [firstApproverId, setFirstApproverId] = useState(null);
  const [secondApproverId, setSecondApproverId] = useState(null);
  const [thirdApproverId, setThirdApproverId] = useState(null);
  const [fourthApproverId, setFourthApproverId] = useState(null);

  
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [vacationDate, setVacationDate] = useState(null);

  const [showEditCancelButtons, setShowEditCancelButtons] = useState(false);
  const [showFilePath, setShowFilePath] = useState(false);
  const [filePath , setFilePath] = useState("");

  //url에 있는 documentNo값 받아서 const documentNo
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
    const query = useQuery();
    const documentNo = query.get('documentNo');

    useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8081/members/documentDetail/'+documentNo);
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
      setStartDate(response.data.startDate);
      setEndDate(response.data.endDate);
      setVacationDate(response.data.vacationDate);
      
      //반려문서일 경우 반려사유도 set 
      if (data.rejectionReason) {
        setRejectionReason(data.rejectionReason);
      }
    } catch (error) {
      console.error(error);
    }
  };
  fetchData();
}, []);

  //결재자 정보 조회 

  const fetchAllApproversInfo = async () => {
    const approverNos = [
      firstApproverNo,
      secondApproverNo,
      thirdApproverNo,
      fourthApproverNo,
    ].filter((no) => no !== null);

    //결재자가 있을경우 각 결재자 NO값을 가지고 fetchApproversInfo를 이용해 결재자 각각의 정보 조회 
    if (approverNos.length > 0) {
      const approversInfo = await fetchApproversInfo(approverNos);
      console.log('approversInfo',approversInfo)
      setApprover(approversInfo);
    }
  };

  const fetchApproversInfo = async (approverNos) => {
    try {
      const response = await axios.get("http://localhost:8081/members/approverInfo", {
        params: {
          approverNos: approverNos.join(","),
          documentNo: documentNo,
        },
      }); 
      if (response.data[0]) {
        setFirstApproverId(response.data[0].id);  //id값 
        setFirstApproverStemp(response.data[0].stemp); //도장정보 
        setFirstApproverState(response.data[0].firstApproverState); //결재상태 
      }
      if (response.data[1]) {
        setSecondApproverId(response.data[1].id);
        setSecondApproverStemp(response.data[1].stemp);
        setSecondApproverState(response.data[1].secondApproverState); 
      }
      if (response.data[2]) {
        setThirdApproverId(response.data[2].id);
        setThirdApproverStemp(response.data[2].stemp);
        setThirdApproverState(response.data[2].thirdApproverState); 
      }
      if (response.data[3]) {
        setFourthApproverId(response.data[3].id);
        setFourthApproverStemp(response.data[3].stemp);
        setFourthApproverState(response.data[3].fourthApproverState); 
      }
      return response.data;
      
    } catch (error) {
      console.error("Failed to fetch approver info for Nos:", approverNos);
      return null;
    }
  };

  useEffect(() => {
    if (firstApproverNo || secondApproverNo || thirdApproverNo || fourthApproverNo) {
      fetchAllApproversInfo();
    }
  }, [firstApproverNo, secondApproverNo, thirdApproverNo, fourthApproverNo,]);


  // 결재자 칸에 현재 로그인한 id 포함되어 있을경우 결재자로 판단 -> (결재하기,반려하기 버튼)
  // 아닐경우(수정하기,취소 버튼) --409 
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
  
  
  // select 에서 선택한 값으로 값 설정 
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

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);불러옴
  }; 

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };


  // 결재자목록(+)버튼 클릭시 화면 중앙에 팝업으로 결재자목록 불러옴
  const handleAddButtonClick = () => {
    let width = 530;
    let height = 710;
    let top = (window.innerHeight / 2) - (height / 2) + window.screenY;
    let left = (window.innerWidth / 2) - (width / 2) + window.screenX;
    localStorage.removeItem("approver");
    window.open('/apps/document/AddApprover', '_blank', `width=${width},height=${height},top=${top},left=${left}`);
  };

   

    // 컴포넌트가 마운트되거나 localStorage의 'approver' 값이 변경될 때마다 실행되는 효과
  useEffect(() => {
    // localStorage에서 'approver' 항목을 가져와 파싱하고, 기본값으로 빈 배열을 사용
    const storedApprover = JSON.parse(localStorage.getItem('approver')) || [];
    // 가져온 데이터를 상태에 저장
    setApprover(storedApprover);
  }, [localStorage.getItem('approver')]);

  // 컴포넌트가 마운트될 때만 실행되는 효과
  useEffect(() => {
    // localStorage에서 'approver' 항목을 가져와 파싱하고, 기본값으로 빈 배열을 사용
    const storedApprover = JSON.parse(localStorage.getItem('approver')) || [];
    // 가져온 데이터를 상태에 저장
    setApprover(storedApprover);

    // 'storage' 이벤트가 발생했을 때 실행할 함수 정의
    // 이 함수는 localStorage에서 'approver' 항목을 다시 가져와 상태를 업데이트함
    const handleStorageChange = () => {
      const storedApprover = JSON.parse(localStorage.getItem('approver')) || [];
      setApprover(storedApprover);
    };

    // 'storage' 이벤트 리스너 등록
    window.addEventListener('storage', handleStorageChange);

    // 컴포넌트가 언마운트될 때 'storage' 이벤트 리스너 제거
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);
  
  //Quill.js라는 리치 텍스트 에디터를 설정
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

  // db에 저장된 위치와이름을 포함한 값에서 이름값만 추출 
  function getFileName(filePath) {
    if (filePath) {
      return filePath.split('\\').pop().split('/').pop();
    } else {
      return "";
    }
  }

  //수정하기 (반려처리된 서류만 수정가능)
  const handleUpdateDocument = async (event) => { 

    const result = window.confirm('수정 하시겠습니까 ?');
    if(result) {
      if(documentState=='반려됨') {
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
                const response = await axios.post('http://localhost:8081/members/updateDocument', formData);
                console.log('Update success:', response.data);
                window.alert('수정되었습니다.')
            
                // 현재 창을 닫은 후, 부모 창의 URL에 query parameter 추가
                let newUrl = new URL(window.opener.location.href);
                newUrl.searchParams.set('refresh', 'true');
                newUrl.searchParams.set('tab', 'update');
                window.opener.location.href = newUrl.href;
                window.close();
                // 처리후 팝업창이 닫히면 newUrl을 통해 List에서 탭 이동 (list컴포넌트 256줄)
            } catch (error) {
                console.error('Insert error:', error);
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
            await axios.post('http://localhost:8081/members/approve/'+id+'/'+documentNo);
            window.alert('결재승인 되었습니다')

            // 현재 창을 닫은 후, 부모 창의 URL에 query parameter 추가
            let newUrl = new URL(window.opener.location.href);
            newUrl.searchParams.set('refresh', 'true');
            newUrl.searchParams.set('tab', 'approve');
            window.opener.location.href = newUrl.href;
            // 새로 설정한 url로 window.open
            // 처리후 팝업창이 닫히면 newUrl을 통해 List에서 탭 이동 (list컴포넌트 256줄)
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
  //반려 선택할경우 반려 사유입력 
  if (result) {
      const rejectionReason = window.prompt('반려 사유를 입력해주세요');
      if (rejectionReason) {
          try {
              console.log('vacationDate보낸다', vacationDate);
              await axios.post('http://localhost:8081/members/addRejectionReason/' + rejectionReason + '/' + id + '/' + documentNo + '/' + vacationDate);
              window.alert('반려처리 되었습니다');
              
              // 현재 창을 닫은 후, 부모 창의 URL에 query parameter 추가
              let newUrl = new URL(window.opener.location.href);
              newUrl.searchParams.set('refresh', 'true');
              newUrl.searchParams.set('tab', 'pending');
              window.opener.location.href = newUrl.href;
              // 처리후 팝업창이 닫히면 newUrl을 통해 List에서 탭 이동 (list컴포넌트 256줄)
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

//파일 다운 
const handleDownload = async () => {
  try {
    const response = await axios.get(`http://localhost:8081/members/downloadFile/${encodeURIComponent(getFileName(filePath))}`, {
      responseType: 'blob',
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', getFileName(filePath));
    document.body.appendChild(link);
    link.click();
  } catch (error) {
    console.error('Download Error:', error);
  }
};


  
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
      
      {/* 반려문서일 경우 반려사유 보여줌 */}
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

        {/* 휴가 문서일 경우 기간과 사용한 휴가일수 */}
        {documentType === '휴가' && documentState !== '반려됨' && (
          <tr className="tr-1">
            <td>휴가 기간</td>
            <td className="write-td">{startDate} ~ {endDate}
            </td>
            <td className='write-td'>사용 휴가</td>
            <td>{vacationDate}일</td>
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
          {/* 결재완료시 도장/아니면 상태값 표시  */}
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
                  <button onClick={handleDownload}>
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