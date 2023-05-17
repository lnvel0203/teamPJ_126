import PropTypes from 'prop-types';
import { useEffect, useMemo, useState, Fragment, useCallback} from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import DfraftDocumentList from './List/DraftDocumentList';
import RejectionDocumentList from './List/RejectionDocumentList';
import axios from 'axios';
import { getAuthToken } from '../../utils/axios';
import { useLocation } from 'react-router-dom';

// material-ui
import { alpha, useTheme } from '@mui/material/styles';
import {
  Button,
  Chip,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery
} from '@mui/material';

// third-party
import NumberFormat from 'react-number-format';
import { useFilters, useExpanded, useGlobalFilter, useRowSelect, useSortBy, useTable, usePagination } from 'react-table';

// project import
import {
  CSVExport,
  HeaderSort,
  IndeterminateCheckbox,
  SortingSelect,
  TablePagination,
  TableRowSelection
} from 'components/third-party/ReactTable';

import ApprovalPendingList from './List/ApprovalPendingList';
import ApprovalCompletedList from './List/ApprovalCompletedList';
import ApprovalScheduledList from './List/ApprovalScheduledList';

// import makeData from 'data/react-table';
import { renderFilterTypes, GlobalFilter } from 'utils/react-table';

// assets
import { PlusOutlined,} from '@ant-design/icons';

// ==============================|| REACT TABLE ||============================== //

function ReactTable({ columns, data, getHeaderProps, renderRowSubComponent, handleAdd }) {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

  const filterTypes = useMemo(() => renderFilterTypes, []);
  const sortBy = { id: 'documentNo', desc: false };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    setHiddenColumns,
    allColumns,
    visibleColumns,
    rows,
    page,
    gotoPage,
    setPageSize,
    state: { globalFilter, selectedRowIds, pageIndex, pageSize, expanded },
    preGlobalFilteredRows,
    setGlobalFilter,
    setSortBy,
    selectedFlatRows
  } = useTable(
    {
      columns,
      data,
      // @ts-ignore
      filterTypes,
      // @ts-ignore
      initialState: { pageIndex: 0, pageSize: 10, hiddenColumns: ['avatar', 'email'], sortBy: [sortBy] }
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect
  );

  
  useEffect(() => {
    if (matchDownSM) {
      setHiddenColumns(['age', 'contact', 'visits', 'email', 'status', 'avatar']);
    } else {
      setHiddenColumns(['avatar', 'email']);
    }
    // eslint-disable-next-line
  }, [matchDownSM]);
  return (
    <>
      <TableRowSelection selected={Object.keys(selectedRowIds).length} />{' '}
      <Stack spacing={3}>
        <Stack 
          direction={matchDownSM ? 'column' : 'row'}
          spacing={1}
          justifyContent="space-between"
          alignItems="center"
          sx={{ p: 3, pb: 0 }}
        >
          <GlobalFilter /*// GlobalFilter: 전역 필터를 구현하는 구성요소입니다. */
            preGlobalFilteredRows={preGlobalFilteredRows}
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
            size="small"
          />
          <Stack direction={matchDownSM ? 'column' : 'row'} alignItems="center" spacing={1}>
            <SortingSelect sortBy={sortBy.id} setSortBy={setSortBy} allColumns={allColumns} />
            {/* SortingSelect: 컬럼 정렬 방식을 선택하는 드롭다운 메뉴를 구현하는 구성요소입니다. */}
            <Button variant="contained" startIcon={<PlusOutlined />} onClick={handleAdd} size="small">
              Add Customer
            </Button>
            <CSVExport data={selectedFlatRows.length > 0 ? selectedFlatRows.map((d) => d.original) : data} filename={'customer-list.csv'} />
            {/* CSVExport: 선택한 행 데이터를 CSV 파일로 내보내는 버튼을 구현하는 구성요소입니다.*/}
          </Stack>
        </Stack>

        <Table {...getTableProps()}>
          <TableHead>
            {headerGroups.map((headerGroup, i) => (
              <TableRow key={i} {...headerGroup.getHeaderGroupProps()} sx={{ '& > th:first-of-type': { width: '58px' } }}>
                {headerGroup.headers.map((column, index) => (
                  <TableCell key={index} {...column.getHeaderProps([{ className: column.className }, getHeaderProps(column)])}>
                    <HeaderSort column={column} />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            const rowProps = row.getRowProps();
              return (
                <Fragment key={i}>
                  <TableRow
                    {...row.getRowProps()}
                    sx={{ cursor: 'pointer', bgcolor: row.isSelected ? alpha(theme.palette.primary.lighter, 0.35) : 'inherit' }}
                  >
                    {row.cells.map((cell, index) => (
                      <TableCell
                        key={index}
                        {...cell.getCellProps([{ className: cell.column.className }])}
                        onClick={cell.column.id === 'selection' ? (e) => {
                          e.stopPropagation();
                          row.toggleRowSelected();
                        } : undefined}
                      >
                        {cell.render('Cell')}
                      </TableCell>
                    ))}
                  </TableRow>
                  {row.isExpanded && renderRowSubComponent({ row, rowProps, visibleColumns, expanded })}
                </Fragment>
              );
            })}
            {/* 우측 하단 화살표 */}
            <TableRow sx={{ '&:hover': { bgcolor: 'transparent !important' } }}>
              <TableCell sx={{ p: 2, py: 3 }} colSpan={9}>
                <TablePagination gotoPage={gotoPage} rows={rows} setPageSize={setPageSize} pageSize={pageSize} pageIndex={pageIndex} />
                {/* // TablePagination: 테이블에서 페이지네이션을 구현하는 구성요소입니다. */}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Stack>
    </>
  );
}


ReactTable.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
  getHeaderProps: PropTypes.func,
  handleAdd: PropTypes.func,
  renderRowSubComponent: PropTypes.any
};

// ==============================|| Document - LIST ||============================== //

const SelectionCell = ({ row }) => <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />;
const SelectionHeader = ({ getToggleAllPageRowsSelectedProps }) => (
  <IndeterminateCheckbox indeterminate {...getToggleAllPageRowsSelectedProps()} />
);


const CustomCell = ({ row }) => {
  const { values } = row;
  return (
    <Stack direction="row" spacing={1.5} alignItems="center">
      <Stack spacing={0}>
        <Typography variant="subtitle1">{values.fatherName}</Typography>
        <Typography variant="caption" color="textSecondary">
          {values.email}
        </Typography>
      </Stack>
    </Stack>
  );
};


const NumberFormatCell = ({ value }) => <NumberFormat displayType="text" format="+1 (###) ###-####" mask="_" defaultValue={value} />;


const StatusCell = ({ value }) => {
  switch (value) {
    case 'Complicated':
      return <Chip color="error" label="Rejected" size="small" variant="light" />;
    case 'Relationship':
      return <Chip color="success" label="Verified" size="small" variant="light" />;
    case 'Single':
    default:
      return <Chip color="info" label="Pending" size="small" variant="light" />;
  }
};

StatusCell.propTypes = {
  value: PropTypes.number
};

NumberFormatCell.propTypes = {
  value: PropTypes.string
};

CustomCell.propTypes = {
  row: PropTypes.object
};

SelectionCell.propTypes = {
  row: PropTypes.object
};

SelectionHeader.propTypes = {
  getToggleAllPageRowsSelectedProps: PropTypes.func
};



const ApproveList = () => {

  const location = useLocation();
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const shouldRefresh = query.get('refresh');
    const tab = query.get('tab');
    if (shouldRefresh) {
      ListCountData();
      if (tab === 'pending') {
        setActiveTab(2); // pending 탭이 1번째라고 가정
      }
       if(tab === 'update') {
        setActiveTab(0); 
      } 
      if(tab === 'approve') {
        setActiveTab(4); 
      } 
    }
  }, [location]);

  const [completedListCount, setCompletedListCount] = useState(0);
  const [scheduledListCount, setScheduledListCount] = useState(0);
  const [rejectionListCount, setRejectionListCount] = useState(0);
  const [pendingListCount, setPendingListCount] = useState(0);

  const id = localStorage.getItem('id')

  const ListCountData = useCallback(async () => {
    try {
      const getCompletedList = await axios.get('http://localhost:8081/members/ApprovalCompletedList/'+id, {
        headers: {
          Authorization: 'Bearer ' + getAuthToken(),
        }
      });
      console.log('나와 ? ',getCompletedList.data)
      setCompletedListCount(getCompletedList.data.length);

      const getScheduledList = await axios.get('http://localhost:8081/members/ApprovalScheduledList/'+id, {
        headers: {
          Authorization: 'Bearer ' + getAuthToken(),
        }
      });
      setScheduledListCount(getScheduledList.data.length);

      const getRejectionList = await axios.get('http://localhost:8081/members/RejectionDocumentList/'+id, {
        headers: {
          Authorization: 'Bearer ' + getAuthToken(),
        }
      });
      setRejectionListCount(getRejectionList.data.length);

      const getPendingList = await axios.get('http://localhost:8081/members/ApprovalPendingList/'+id, {
        headers: {
          Authorization: 'Bearer ' + getAuthToken(),
        }
      });
      setPendingListCount(getPendingList.data.length);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    ListCountData();
  }, [ListCountData]);

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  }

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
  index: PropTypes.number.isRequired,
}