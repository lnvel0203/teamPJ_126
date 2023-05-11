import React, { useState,useEffect } from 'react';
import './DocumentComponent.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { useNavigate,useLocation } from 'react-router-dom';
const DocumentDetail = () => {
  
  const navigate = useNavigate();
  const [documentType,setDocumentType] = useState('');
  const [author,setAuthor] = useState('');
  const [retentionPeriod,setRetentionPeriod] = useState('');
  const [securityLevel,setSecurityLevel] = useState('');
  const [approver, setApprover] = useState([]);
  const [content, setContent] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  //const [filePath,setFilePath] = useState(null);
  const id = localStorage.getItem('id');
  const [title, setTitle] = useState('');
  const [firstApproverNo, setFirstApproverNo] = useState(null);
  const [secondApproverNo, setSecondApproverNo] = useState(null);
  const [thirdApproverNo, setThirdApproverNo] = useState(null);
  const [fourthApproverNo, setFourthApproverNo] = useState(null);
  const [firstApproverId, setFirstApproverId] = useState(null);
  const [secondApproverId, setSecondApproverId] = useState(null);
  const [thirdApproverId, setThirdApproverId] = useState(null);
  const [fourthApproverId, setFourthApproverId] = useState(null);
  const [showEditCancelButtons, setShowEditCancelButtons] = useState(false);
  const [showFilePath, setShowFilePath] = useState(false);
  const [filePath , setFilePath] = useState("");
  

  


  
  
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

    const query = useQuery();
    const documentNo = query.get('documentNo');

    

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8081/members/documentDetail/'+documentNo);
      console.log(response.data)
      const data = response.data;
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
    } catch (error) {
      console.error(error);
    }
  };

  

  const fetchApproversInfo = async (approverNos) => {
    try {
      const response = await axios.get("http://localhost:8081/members/approverInfo", {
        params: {
          approverNos: approverNos.join(","),
        },
      });
        console.log('resdata0',response.data[0].id)
        console.log('resdata1',response.data[1].id)
        console.log('resdata2',response.data[2].id)
        setFirstApproverId(response.data[0].id)
        console.log('setfirst',firstApproverId)
        setSecondApproverId(response.data[1].id)
        if (response.data[2]) {
            setThirdApproverId(response.data[2].id);
          }
          if (response.data[3]) {
            setFourthApproverId(response.data[3].id);
          }
      console.log('axios.get(http://localhost:8081/members/approverInfo',response.data)
      console.log(response.data[0].id)
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

    if (approverIds.includes(id)) {
        console.log("아이디 포함됨")
        console.log("approverIDs배열",approverIds)
      setShowEditCancelButtons(true);
      setShowFilePath(true);
    } else {
        console.log("아이디 포함 안됨")
        console.log("approverIDs배열",approverIds)
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
        setApprover(approversInfo);
      }
    };
  
    if (firstApproverNo || secondApproverNo || thirdApproverNo || fourthApproverNo) {
      fetchAllApproversInfo();
    }
  }, [firstApproverNo, secondApproverNo, thirdApproverNo, fourthApproverNo]);
  



  useEffect(() => {
    fetchData();
    console.log('useEffect실행')
    console.log('다큐타입',documentType)
  }, [documentType,author,retentionPeriod,securityLevel]);

  const handleDocumentTypeChange = (event) => {
    setDocumentType(event.target.value);
  };
  
  useEffect(() => {
    console.log('setFirstApproverId:', firstApproverId);
  }, [firstApproverId]);

  useEffect(() => {
    console.log('setSecondApproverId:', secondApproverId);
  }, [secondApproverId]);

  useEffect(() => {
    if (thirdApproverId !== null) {
      console.log('setThirdApproverId:', thirdApproverId);
    }
  }, [thirdApproverId]);
  
  useEffect(() => {
    if (fourthApproverId !== null) {
      console.log('setFourthApproverId:', fourthApproverId);
    }
  }, [fourthApproverId]);

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
    console.log("id",{id})
  };

  const handleRetentionPeriodChange = (event) => {
    setRetentionPeriod(event.target.value);
  };

  const handleSecurityLevelChange = (event) => {
    setSecurityLevel(event.target.value);
    console.log('write로컬',localStorage.getItem("approver"))
  };

  const handleAddButtonClick = () => {
    localStorage.removeItem("approver");
    window.open('/apps/document/AddApprover', '_blank', 'width=800,height=600,top=300,left=300');
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    console.log('Selected file:', file);
    // Add logic to upload file to server or do something with it
  };  

  useEffect(() => {
    const storedApprover = JSON.parse(localStorage.getItem('approver')) || [];
    setApprover(storedApprover);
    console.log(storedApprover)
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

  const handleUpdateDocument = async (event) => { 
    console.log('수정버튼클릭')
    event.preventDefault();
    
    const storedApprover = JSON.parse(localStorage.getItem('approver')) || [];
    setApprover(storedApprover);
    const formData = new FormData();
    storedApprover.forEach((apv, index) => {
    formData.append(`storedApprover${index}`, JSON.stringify(apv));
    // Add approver number to formData
    formData.append(`approverNo${index}`, apv.no);
  });
    
    formData.append('documentNo',documentNo);
    formData.append('id',id);
    formData.append('documentType', documentType);
    formData.append('author', author);
    formData.append('retentionPeriod', retentionPeriod);
    formData.append('securityLevel', securityLevel);
    formData.append('title', title);
    formData.append('content', content); 

    storedApprover.forEach((apv, index) => {
      formData.append(`storedApprover${index}`, JSON.stringify(apv));
    });
  
    if (selectedFile) {
      formData.append('fileData', selectedFile, selectedFile.name);
    }

    for (const [key, value] of formData.entries()) {
      console.log('aasdlf;kajdsjlk;',`${key}: ${value}`);
    }
    console.log('selectedFile',selectedFile)
    console.log("전송시작")
  
    try {
      const response = await axios.post('http://localhost:8081/members/updateDocument', formData);
      console.log('Update success:', response.data);
      console.log("성공한듯 ? ")
      navigate('/apps/document/documentList', { state: { id: id } });
      
      // 이후 처리 (예: 페이지 이동 등)
    } catch (error) {
      console.log("되겠냐고 ㅋ ");
      console.error('Insert error:', error);
      // 이후 처리 (예: 에러 메시지 표시 등)
    }
  };

  const handleApprovalButtonClick = () => {
    // 결재 처리 로직
  };

  const handleRejectionButtonClick = () => {
    // 반려 처리 로직
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
                <option value="기타">기타</option>
              </select>
            </td>
            <td className='write-td'>작성자</td>
            <td>
              <input type="text" value={author} onChange={handleAuthorChange} />
            </td>
          </tr>
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


            {showFilePath ? (
            <>
            <td colSpan="4" className="file">
              <input type="file" onChange={handleFileUpload} />
            </td>
            </>
            ) : (
                <>
                    <td colSpan="4" className="file">
                    <span>{filePath}</span>
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