import React, { useState } from 'react';
import { request } from '../../../utils/axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


const InsertBoard = () => {

  //const [approver, setApprover] = useState([]);
  const id = localStorage.getItem('id');

  const [content, setValue] = useState('');
  const [title, setTitle] = useState('');
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

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const data = {
      title:title,
      content:content
    }

    request(
      'POST',
      `/members/insertBoard/${id}`, data
    ).then(response => {
      console.log(response.data);
      window.location.reload();
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
          onChange={(content, delta, source, editor) => setValue(editor.getHTML())}
        />

        <div className="ql-editor" style={{ color: 'black' }}></div>
      </div>
      <div>
        <button type="submit">글쓰기</button>
     </div>
    </form>
  </div>
    );
}

export default InsertBoard;