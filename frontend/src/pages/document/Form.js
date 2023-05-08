import { useState } from 'react';
import EditorComponent from './EditorComponent';

const Form = ({ documentType, author, retentionPeriod, securityLevel, approvers }) => {
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('documentType', documentType);
    formData.append('author', author);
    formData.append('retentionPeriod', retentionPeriod);
    formData.append('securityLevel', securityLevel);
    formData.append('content', content);
    formData.append('approvers', JSON.stringify(approvers));

    console.log(formData);
    // Add logic to send formData to server using fetch or Axios
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <EditorComponent value={content} onChange={setContent} />
      </div>
      <div>
        <button type="submit">보내기</button>
        <button type="button">취소</button>
      </div>
    </form>
  );
};

export default Form;
