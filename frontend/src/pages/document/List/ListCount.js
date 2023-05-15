import axios from 'axios';
import { getAuthToken } from '../../../utils/axios';
import { useCallback, useEffect } from 'react';

const ListCount = () => {
    const id = localStorage.getItem('id')

  const fetchUserData = useCallback(async () => {
    try {
      const getCompletedList = await axios.get('http://localhost:8081/members/ApprovalCompletedList/'+id, {
        headers: {
          Authorization: 'Bearer ' + getAuthToken(),
        }
      });
      localStorage.setItem('completedListCount', getCompletedList.data.length);
      const getScheduledList = await axios.get('http://localhost:8081/members/ApprovalScheduledList/'+id, {
        headers: {
          Authorization: 'Bearer ' + getAuthToken(),
        }
      });
      localStorage.setItem('scheduledListCount', getScheduledList.data.length);
      const getRejectionList = await axios.get('http://localhost:8081/members/RejectionDocumentList/'+id, {
        headers: {
          Authorization: 'Bearer ' + getAuthToken(),
        }
      });
      localStorage.setItem('rejectionListCount', getRejectionList.data.length);
      const getPendingList = await axios.get('http://localhost:8081/members/ApprovalPendingList/'+id, {
        headers: {
          Authorization: 'Bearer ' + getAuthToken(),
        }
      });
      localStorage.setItem('pendingListCount', getPendingList.data.length);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  return null;
}

export default ListCount;
