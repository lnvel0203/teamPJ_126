import React, { useState,useEffect } from 'react';
import './DocumentComponent.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
const DocumentWritePage = () => {
  
  const [documentType,setDocumentType] = useState('');
  const [author,setAuthor] = useState('');
  const [retentionPeriod,setRetentionPeriod] = useState('');
  const [securityLevel,setSecurityLevel] = useState('');
  const [approver, setApprover] = useState([]);
  const id = localStorage.getItem('id');
  
 
  const handleDocumentTypeChange = (event) => {
    setDocumentType(event.target.value);
    console.log(localStorage.getItem("id"))
  };

  

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

  const [value, setValue] = useState('');

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

  const handleSubmit = () => {
    const addDocument = {
        
      //아이디?
      id:id,
      documentType : documentType,
      author : author,
      retentionPeriod: retentionPeriod,
      securityLevel: securityLevel,
    };
  
    console.log('insert 호출!!', addDocument);
  
  
    axios.post(API_BASE_URL + "/addDocument", addDocument)
      .then(response => {
        console.log(response.data);
        alert('일정이 추가되었습니다.');
      })
      .catch(error => {
        console.error(error);
        alert('일정 추가에 실패했습니다.');
      });
  };

  
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
              <td colSpan="4" className="file">
                <input type="file" onChange={handleFileUpload} />
              </td>
            </tr>
          </tbody>
        </table>
        <br />
        <h1>상세 입력</h1>
        <form onSubmit={handleSubmit}>
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
        <button type="submit">보내기</button>
        <button type="button">취소</button>
      </div>
    </form>
      </div>
    );
}

export default DocumentWritePage;