import React, { useState,useEffect } from 'react';
import axios from 'axios';
import {getAuthToken, request } from '../../../utils/axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {useLocation } from 'react-router-dom';
const BoardDetail = () => {

  //const [approver, setApprover] = useState([]);
  const id = localStorage.getItem('id');
  const [content, setValue] = useState('');
  const [title, setTitle] = useState('');
  const [oldId, setOldId] = useState('');
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

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

    const query = useQuery();
    const boardNo =  query.get('boardNo');

  useEffect(() => {
    const fetchData = async () => {
      try {

        const response = await axios.get(`http://localhost:8081/members/getBoard/${boardNo}`, {
          headers: {
            Authorization: 'Bearer ' + getAuthToken(),
          }
        });
        console.log(response.data)
        const data = response.data;
        setValue(data.content);
        setTitle(data.title);
        setOldId(data.id);
      } catch (error) {
        console.error(error);
      }
    };


    fetchData();
  }, []);



  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

   await request(
      'DELETE',
      `/members/deleteBoard/${boardNo}`
    ).then(response => {
      console.log(response.data);
      window.close();
    })
  };

    return (
    
    <div style={{ marginLeft: '40px' }}>     
     <form onSubmit={handleSubmit}>
        <div className="title-input-container">
          <label htmlFor="title">제목: </label>
          <input type="text" id="title"
          className="title-input"
          value={title}
          readOnly={true}
          onChange={handleTitleChange} />
        </div>
      
      <div style={{ height: '650px', width: '900px' }}>
        <ReactQuill
          style={{ height: '600px' }}
          theme="snow"
          modules={modules}
          formats={formats}
          name="content"
          value={content}
          readOnly={true}
          onChange={(content, delta, source, editor) => setValue(editor.getHTML())}
        />

        <div className="ql-editor" style={{ color: 'black' }}></div>
      </div>
      <div>
{

id == oldId ?
<button type="submit">삭제하기</button>
:
null
}
     </div>
    </form>
  </div>
    );
}

export default BoardDetail;