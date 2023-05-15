import React, { useState } from 'react';
import { request } from '../../../utils/axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
const DocumentWritePage = () => {
  
  const [documentType,setDocumentType] = useState('');
  const [responser,setSecurityLevel] = useState('');
  const [title, setTitle] = useState('');
  //const [approver, setApprover] = useState([]);
  const id = localStorage.getItem('id');
 
  const handleDocumentTypeChange = (event) => {
    setDocumentType(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
    console.log("id",{id})
  };
  const handleReAuthorChange = (event) => {
    setSecurityLevel(event.target.value);
    console.log('write로컬',localStorage.getItem("approver"))
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  // useEffect(() => {
  //   const storedApprover = JSON.parse(localStorage.getItem('approver')) || [];
  //   setApprover(storedApprover);
  //   console.log(storedApprover)
  // }, [localStorage.getItem('approver')]);

  // useEffect(() => {
  //   const storedApprover = JSON.parse(localStorage.getItem('approver')) || [];
  //   setApprover(storedApprover);
  //   const handleStorageChange = () => {
  //     const storedApprover = JSON.parse(localStorage.getItem('approver')) || [];
  //     setApprover(storedApprover);
  //   };
  //   window.addEventListener('storage', handleStorageChange);
  //   return () => {
  //     window.removeEventListener('storage', handleStorageChange);
  //   };
  // }, []);

  const [content, setValue] = useState('');

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // const formData = new FormData();
    // formData.append('documentType', documentType);
    // formData.append('author', author);
    // formData.append('securityLevel', reauthor);
    // approver.forEach((apv, index) => {
    //   formData.append(`approver${index}`, JSON.stringify(apv));
    // });
    // formData.append('file', selectedFile);
  
    const mailData = {
      documentType:documentType,
      title:title,
      writer:id,
      id:id,
      responser:responser,
      content:content
    }
    request(
      'POST',
      '/mail/addMail', mailData
    ).then(response => {
      setDocumentType('');
      setSecurityLevel('');
      setValue('');
      console.log(response.data);
      window.location.reload();
    })
  };

  const addressBook = () =>{
    const features = "width=400,height=600,top=100,left=100";
    window.open("/apps/customer/customer-MailList", "_blank", features);
  }
  
    return (
    
    <div style={{ marginLeft: '40px' }}>      
        <br />
        <h1>메일 쓰기</h1>
        <button type="button" onClick={addressBook}>주소록</button>
        <table className="tb-1">
          <tbody>
            <tr className="tr-1">
              <td>분류</td>
              <td className='write-td'>
                <select value={documentType} onChange={handleDocumentTypeChange}>
                  <option value="">-- 선택하세요 --</option>
                  <option value="보고서">보고서</option>
                  <option value="공지">공지</option>
                  <option value="문의">문의</option>
                  <option value="기타">기타</option>
                </select>
              </td>
            </tr>
            <tr className="tr-1">
              <td className='write-td'>보내는 이</td>
              <td>
                <input type="text" name='id' value={id} onChange={handleAuthorChange} />
              </td>
            </tr>
            <tr className="tr-1">
              <td className='write-td'>받는 이</td>
              <td>
                <input type="text" name='responser' value={responser} onChange={handleReAuthorChange} />
              </td>
            </tr>
          </tbody>
        </table>
        <br />
      <form onSubmit={handleSubmit}>
      <div>
        <button type="submit">메일 보내기</button>
        </div>
        <br />
        <br />
        <br />
        <div className="title-input-container">
        <label htmlFor="document-title">제목: </label>
        <input type="text" id="document-title" className="title-input" value={title} onChange={handleTitleChange} />
        </div>
      
      <div style={{ height: '450px', width: '700px' }}>
        <ReactQuill
          style={{ height: '350px' }}
          theme="snow"
          modules={modules}
          formats={formats}
          value={content}
          onChange={(content, delta, source, editor) => setValue(editor.getHTML())}
        />
        <div className="ql-editor" style={{ color: 'black' }}></div>
      </div>
      
    </form>
  </div>
    );
}

export default DocumentWritePage;