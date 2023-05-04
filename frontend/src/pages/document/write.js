import React, { Component } from 'react';
import Form from './Form';
import './DocumentComponent.css';

class DocumentWritePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      documentType: '',
      author: '',
      retentionPeriod: '',
      securityLevel: '',
      approvers: [
        { id: 1, department: '개발', name: '영수', position: '사장', stamps: 'https://example.com/stamp-alex.png' },
        { id: 2, department: '인사', name: '철수', position: '대리', stamps: 'https://example.com/stamp-alex.png' },
        { id: 3, department: '경영', name: '종수', position: '팀장', stamps: 'https://example.com/stamp-alex.png' }
      ]
    };
  }

  handleDocumentTypeChange = (event) => {
    this.setState({ documentType: event.target.value });
  };

  handleAuthorChange = (event) => {
    this.setState({ author: event.target.value });
  };

  handleRetentionPeriodChange = (event) => {
    this.setState({ retentionPeriod: event.target.value });
  };

  handleSecurityLevelChange = (event) => {
    this.setState({ securityLevel: event.target.value });
  };

  // handleAddButtonClick = () => {
  //   window.open('/apps/document/AddApprover', '_blank', 'width=800,height=600,top=300,left=300');
  // };

  handleAddButtonClick = () => {
    const newWindow = window.open('/apps/document/AddApprover', '_blank', 'width=800,height=600,top=300,left=300');
    newWindow.openerData = {
      sendSelectedApprovers: this.handleSelectedApprovers
    };
  };

  handleFileUpload = (event) => {
    const file = event.target.files[0];
    console.log('Selected file:', file);
    // Add logic to upload file to server or do something with it
  };

  handleSubmit = (event) => {
    event.preventDefault();
    // Write 컴포넌트의 state 값과 DocumentWritePage 컴포넌트의 state 값을 이용하여 insert 문 실행
    // ...
  };

  render() {
    const { documentType, author, retentionPeriod, securityLevel, approvers } = this.state;

    // function receiveSelectedApprovers(selectedApprovers) {
    //   console.log('Selected Approvers:', selectedApprovers);
    //   // 선택된 결재자들을 처리하는 코드 추가
    // }

    return (
      <div style={{ marginLeft: '' }}>
        <h1 className="write-h1">기본 설정</h1>
        <table className="tb-1">
          <tbody>
            <tr>
              <td className="write-td">문서 종류</td>
              <td className="write-td">
                <select value={documentType} onChange={this.handleDocumentTypeChange}>
                  <option value="">-- 선택하세요 --</option>
                  <option value="보고서">보고서</option>
                  <option value="프레젠테이션">프레젠테이션</option>
                  <option value="계약서">계약서</option>
                  <option value="기타">기타</option>
                </select>
              </td>
              <td className="write-td">작성자</td>
              <td className="write-td">
                <input type="text" value={author} onChange={this.handleAuthorChange} />
              </td>
            </tr>
            <tr>
              <td className="write-td">보존 연한</td>
              <td className="write-td">
                <select value={retentionPeriod} onChange={this.handleRetentionPeriodChange}>
                  <option value="">-- 선택하세요 --</option>
                  <option value="1년">1년</option>
                  <option value="2년">2년</option>
                  <option value="3년">3년</option>
                  <option value="5년">5년</option>
                  <option value="영구">영구</option>
                </select>
              </td>
              <td className="write-td">보안등급</td>
              <td className="write-td">
                <select value={securityLevel} onChange={this.handleSecurityLevelChange}>
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
        <h1 className="write-h1">결제선</h1>
        <table className="tb-2">
          <tbody>
            <tr className="tr-1">
              <td rowSpan="3" className="col-1">
                신청
                <button className="add-button" onClick={this.handleAddButtonClick}>
                  +
                </button>
              </td>
              <td className="col-2">{approvers[0].position}</td>
              <td className="col-3">{approvers[1].position}</td>
              <td className="col-4">{approvers[2].position}</td>
              <td className="col-5"></td>
            </tr>
            <tr className="tr-2">
              <td className="col-2">{approvers[0].stamps}</td>
              <td className="col-3">{approvers[1].stamps}</td>
              <td className="col-4">{approvers[2].stamps}</td>
              <td className="col-5"></td>
            </tr>
            <tr className="tr-3">
              <td className="col-2">{approvers[0].name}</td>
              <td className="col-3">{approvers[1].name}</td>
              <td className="col-4">{approvers[2].name}</td>
              <td className="col-5"></td>
            </tr>
            <tr className="tr-4">
              <td className="col-1">참조</td>
              <td colSpan="4" className="col-2">
                <input type="file" onChange={this.handleFileUpload} />
              </td>
            </tr>
          </tbody>
        </table>
        <br />
        <h1 className="write-h1">상세 입력</h1>
        <Form onSubmit={this.handleSubmit} />
      </div>
    );
  }
}

export default DocumentWritePage;
