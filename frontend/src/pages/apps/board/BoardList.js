import { Box, Tabs, Tab } from '@mui/material';
import {  useState } from 'react';
import Announcement from './Announcement';
import InsertBoard from './InsertBoard';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <Box sx={{ pt: 3 }} role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`} aria-labelledby={`tab-${index}`} {...other}>
        {value === index && <Box>{children}</Box>}
      </Box>
    );
  }

const BoardList =() => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
  
    }
        return(
            <>
            
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
        <Tab label="공지 사항"/>
        <Tab label="게시글 쓰기"/>
      </Tabs>
    </Box>
    <TabPanel value={value} index={0}>
    <Announcement/>
  
    </TabPanel>

    <TabPanel value={value} index={1}>
   
    <InsertBoard/>
    </TabPanel>
            </>

        )

}
export default BoardList;