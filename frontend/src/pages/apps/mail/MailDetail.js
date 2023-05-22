import React, { useState,useEffect } from 'react';
import {getAuthToken } from '../../../utils/axios';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {useLocation } from 'react-router-dom';
const DocumentWritePage = () => {
  
  const [documentType,setDocumentType] = useState('');
  const [responser,setSecurityLevel] = useState('');
  const [title, setTitle] = useState('');
  const [content, setValue] = useState('');
  const [oldId, setOldId] = useState('');
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
    const query = useQuery();
    const mailNo =  query.get('mailNo');

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

  useEffect(() => {
    const fetchData = async () => {
      try {

        const response = await axios.get(`http://localhost:8081/mail/getMail/${mailNo}`, {
          headers: {
            Authorization: 'Bearer ' + getAuthToken(),
          }
        });
        console.log(response.data)
        const data = response.data;
        setDocumentType(data.documentType);
        setSecurityLevel(data.responser);
        setTitle(data.title);
        setOldId(data.id);
        setValue(data.content);
      } catch (error) {
        console.error(error);
      }
    };


    fetchData();
  }, []);
  
    return (
    
    <div style={{ marginLeft: '40px' }}>      
        <br />
        <table className="tb-1">
          <tbody>
            <tr className="tr-1">
              <td>분류</td>
              <td className='write-td'>
                <select value={documentType} readOnly={true}>
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
                <input type="text" name='id' value={oldId} readOnly={true} />
              </td>
            </tr>
            <tr className="tr-1">
              <td className='write-td'>받는 이</td>
              <td>
                <input type="text" name='responser' value={responser} readOnly={true} />
              </td>
            </tr>
          </tbody>
        </table>
        <br />
      <form>
      <div>
              </div>
        <br />
        <br />
        <br />
        <div className="title-input-container">
        <label htmlFor="document-title">제목: </label>
        <input type="text" id="document-title" className="title-input" value={title} readOnly={true} />
        </div>
      
      <div style={{ height: '450px', width: '700px' }}>
        <ReactQuill
          style={{ height: '350px' }}
          theme="snow"
          modules={modules}
          formats={formats}
          value={content}
          readOnly={true}
          onChange={(content, delta, source, editor) => setValue(editor.getHTML())}
        />
        <div className="ql-editor" style={{ color: 'black' }}></div>
      </div>
      
    </form>
  </div>
    );
}

export default DocumentWritePage;