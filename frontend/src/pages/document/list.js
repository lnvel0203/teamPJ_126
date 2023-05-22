import PropTypes from 'prop-types';
import { useEffect,useState} from 'react';
import { Box, Tabs, Tab } from '@mui/material';

import axios from 'axios';
import { useLocation } from 'react-router-dom';



import ApprovalPendingList from './List/ApprovalPendingList';
import ApprovalCompletedList from './List/ApprovalCompletedList';
import ApprovalScheduledList from './List/ApprovalScheduledList';




// apiService.js 파일에 추가하기
export const getApprovalCompletedList = async (id) => {
  try {
    const response = await axios.get(`http://localhost:8081/members/ApprovalCompletedList/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getApprovalScheduledList = async (id) => {
  try {
    const response = await axios.get(`http://localhost:8081/members/ApprovalScheduledList/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getRejectionDocumentList = async (id) => {
  try {
    const response = await axios.get(`http://localhost:8081/members/RejectionDocumentList/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getApprovalPendingList = async (id) => {
  try {
    const response = await axios.get(`http://localhost:8081/members/ApprovalPendingList/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

import DfraftDocumentList from './List/DraftDocumentList';
import RejectionDocumentList from './List/RejectionDocumentList';

// ApproveList 컴포넌트
const ApproveList = () => {

  

  const location = useLocation();

  const [activeTab, setActiveTab] = useState(0);
  const [id, setId] = useState(null); // localStorage에서 가져온 id를 저장하기 위한 state

  // 로컬 스토리지에서 id 가져오기
  useEffect(() => {
    setId(localStorage.getItem('id'));
  }, []);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const shouldRefresh = query.get('refresh');
    const tab = query.get('tab');
    if (shouldRefresh) {
      ListCountData();
      if (tab === 'pending') {
        setActiveTab(2); // 반려했을때 
      }
      if(tab === 'update') {
        setActiveTab(0); // 수정했을때 0번 탭으로 
      } 
      if(tab === 'approve') {
        setActiveTab(4); // 승인했을때 4번탭으로(결재완료)
      } 
    }
  }, [location]);

  const [completedListCount, setCompletedListCount] = useState(0);
  const [scheduledListCount, setScheduledListCount] = useState(0);
  const [rejectionListCount, setRejectionListCount] = useState(0);
  const [pendingListCount, setPendingListCount] = useState(0);

  // 각 리스트들의 항목수
const ListCountData = async () => {
  if (id) {
    const completedList = await getApprovalCompletedList(id);
    setCompletedListCount(completedList.length);

    const scheduledList = await getApprovalScheduledList(id);
    setScheduledListCount(scheduledList.length);

    const rejectionList = await getRejectionDocumentList(id);
    setRejectionListCount(rejectionList.length);

    const pendingList = await getApprovalPendingList(id);
    setPendingListCount(pendingList.length);
  }
};

useEffect(() => {
  ListCountData();
}, [id, ListCountData]);

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={activeTab} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="기안 문서"/>
          <Tab label={`반려 문서 (${rejectionListCount})`}/>
          <Tab label={`결재 대기 (${pendingListCount})`}/>
          <Tab label={`결재 예정 (${scheduledListCount})`}/>
          <Tab label={`결재 완료 (${completedListCount})`}/>
        </Tabs>
      </Box>
      <TabPanel value={activeTab} index={0}>
        <DfraftDocumentList />
      </TabPanel>
      <TabPanel value={activeTab} index={1}>
        <RejectionDocumentList ListCountData={ListCountData} />
      </TabPanel>
      <TabPanel value={activeTab} index={2}>
        <ApprovalPendingList ListCountData={ListCountData} />
      </TabPanel>
      <TabPanel value={activeTab} index={3}>
        <ApprovalScheduledList ListCountData={ListCountData} />
      </TabPanel>
      <TabPanel value={activeTab} index={4}>
        <ApprovalCompletedList ListCountData={ListCountData} />
      </TabPanel>
    </>
  );
};

export default ApproveList;

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Box sx={{ pt: 3 }} role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`} aria-labelledby={`tab-${index}`} {...other}>
      {value === index && <Box>{children}</Box>}
    </Box>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  value: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired
};