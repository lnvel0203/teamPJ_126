import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const EditorComponent = ({ value, onChange }) => {
  const modules = {
    toolbar: [
      [{ font: [] }],
      [{ header: [1, 2, 3, 4, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['link', 'image'],
      [{ align: [] }, { color: [] }, { background: [] }], // dropdown with defaults from theme
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

  return (
    <div style={{ height: '650px', width: '900px' }}>
      <ReactQuill
        style={{ height: '600px' }}
        theme="snow"
        modules={modules}
        formats={formats}
        value={value}
        onChange={(content, delta, source, editor) => onChange(editor.getHTML())}
      />
      <div className="ql-editor" style={{ color: 'black' }}></div>
    </div>
  );
};

export default EditorComponent;
