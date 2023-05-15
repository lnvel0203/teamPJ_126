// Import Axios Services
import PropTypes from 'prop-types';
import { useCallback, useEffect, useMemo, useState, Fragment } from 'react';
import axios from 'axios';
import { getAuthToken } from '../../../utils/axios';
import { format } from 'date-fns';

// material-ui
import { alpha, useTheme } from '@mui/material/styles';
import {
  Button,
  Chip,
  Dialog,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  //5월 8일 수정 김성훈  삭제 요청
  // Tooltip,
  Typography,
  useMediaQuery
} from '@mui/material';

// third-party
import NumberFormat from 'react-number-format';
import { useFilters, useExpanded, useGlobalFilter, useRowSelect, useSortBy, useTable, usePagination } from 'react-table';

// project import
import Write from '../Write';
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';

//5월 8일 수정 김성훈  삭제 요청
// import IconButton from 'components/@extended/IconButton';
import { PopupTransition } from 'components/@extended/Transitions';
import {
  //CSVExport,
  HeaderSort,
  IndeterminateCheckbox,
  //5월4일 김성훈 수정 삭제 요청 
  //SortingSelect,
  TablePagination,
  TableRowSelection
} from 'components/third-party/ReactTable';


import CustomerView from 'sections/apps/customer/CustomerView';
import AlertCustomerDelete from 'sections/apps/customer/AlertCustomerDelete';

// import makeData from 'data/react-table';
import { renderFilterTypes, GlobalFilter } from 'utils/react-table';

// assets
//5월 4일 김성훈 PlusQutlined,삭제 요청 
import {  PlusOutlined   } from '@ant-design/icons';

//5월 8일 김성훈 수정 ,삭제 요청 
//import { CloseOutlined, EyeTwoTone, EditTwoTone, DeleteTwoTone } from '@ant-design/icons';


// ==============================|| REACT TABLE ||============================== //
//5월 4일 김성훈 handleAdd,삭제
//function ReactTable({ columns, data, getHeaderProps, renderRowSubComponent, handleAdd })

//5월 8일 김성훈 직원 팀 선택하기 
function ReactTable({ columns, data, getHeaderProps, renderRowSubComponent,handleAdd}) {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

  const filterTypes = useMemo(() => renderFilterTypes, []);
  const sortBy = { id: 'fatherName', desc: false };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    setHiddenColumns,
    //5월 4일 김성훈 수정 
    //allColumns,
    visibleColumns,
    rows,
    page,
    gotoPage,
    setPageSize,
    state: { globalFilter, selectedRowIds, pageIndex, pageSize, expanded },
    preGlobalFilteredRows,
    setGlobalFilter,
    //5월 4일 김성훈 수정
    //setSortBy,
    //selectedFlatRows
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

  const handleTitleClick = (documentNo) => {
    console.log('documentNo',documentNo)
    window.open('/apps/document/documentDetail?documentNo='+documentNo, '_blank', 'width=1200,height=900,top=300,left=300');
  };

  return (
    <>
      <TableRowSelection selected={Object.keys(selectedRowIds).length} />
      <Stack spacing={3}>
        <Stack
          direction={matchDownSM ? 'column' : 'row'}
          spacing={1}
          justifyContent="space-between"
          alignItems="center"
          sx={{ p: 3, pb: 0 }}
        >
          <GlobalFilter
            preGlobalFilteredRows={preGlobalFilteredRows}
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
            size="small"
          />
          <Stack direction={matchDownSM ? 'column' : 'row'} alignItems="center" spacing={1}>
            {/* <SortingSelect sortBy={sortBy.id} setSortBy={setSortBy} allColumns={allColumns} /> */}
            {/*  5월 4일 김성훈 Add Custorme 제거   사용안함 삭제 요청 */ }
            <Button variant="contained" startIcon={<PlusOutlined />} onClick={handleAdd} size="small">
              서류 작성
            </Button>
            {/* <CSVExport data={selectedFlatRows.length > 0 ? selectedFlatRows.map((d) => d.original) : data} filename={'customer-list.csv'} /> */}
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
                    onClick={() => {
                      handleTitleClick(row.original.documentNo);
                    }}
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
            <TableRow sx={{ '&:hover': { bgcolor: 'transparent !important' } }}>
              <TableCell sx={{ p: 2, py: 3 }} colSpan={9}>
                <TablePagination gotoPage={gotoPage} rows={rows} setPageSize={setPageSize} pageSize={pageSize} pageIndex={pageIndex} />
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

// ==============================|| CUSTOMER - LIST ||============================== //

// Section Cell and Header
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


const RejectionDocumentList = () => {
  
  
    const id = localStorage.getItem('id');
    const theme = useTheme();
    const closecheck = localStorage.getItem("closeCheck")
    const [userData, setUserData] = useState([]);
  
    // Fetch user data from the server
    const fetchUserData = useCallback(async () => {
      try {
        const response = await axios.get('http://localhost:8081/members/DraftDocumentList/'+id, {
          headers: {
            Authorization: 'Bearer ' + getAuthToken(),
          }
        });
        setUserData(response.data);
        const getCompletedList = await axios.get('http://localhost:8081/members/ApprovalCompletedList/'+id, {
          headers: {
            Authorization: 'Bearer ' + getAuthToken(),
          }
        });
        localStorage.setItem('completedListCount',getCompletedList.data.length);
        const getScheduledList = await axios.get('http://localhost:8081/members/ApprovalScheduledList/'+id, {
          headers: {
            Authorization: 'Bearer ' + getAuthToken(),
          }
        });
        localStorage.setItem('scheduledListCount',getScheduledList.data.length);
        const getRejectionList = await axios.get('http://localhost:8081/members/RejectionDocumentList/'+id, {
          headers: {
            Authorization: 'Bearer ' + getAuthToken(),
          }
        });
        localStorage.setItem('rejectionListCount',getRejectionList.data.length);
        const getPendingList = await axios.get('http://localhost:8081/members/ApprovalPendingList/'+id, {
          headers: {
            Authorization: 'Bearer ' + getAuthToken(),
          }
        });
        localStorage.setItem('pendingListCount',getPendingList.data.length);
      } catch (error) {
        console.error(error);
      }
    }, []);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData,closecheck]);

  const data = useMemo(() => userData, [userData]);

  const [add, setAdd] = useState(false);
  const [open, setOpen] = useState(false);
  const [customer, setCustomer] = useState();
  const [customerDeleteId] = useState();

  const handleAdd = () => {
    setAdd(!add);
    if (customer && !add) setCustomer(null);
  };

  const handleClose = () => {
    setOpen(!open);
  };

  const columns = useMemo(
    () => [
      {
        title: 'Row Selection',
        Header: SelectionHeader,
        accessor: 'selection',
        Cell: SelectionCell,
        disableSortBy: true
      },
      {
        Header: '상태',
        accessor: 'documentState',
        className: 'cell-left'
      },
      {
        Header: '문서번호',
        accessor: 'documentNo',
        className: 'cell-left'
      },
      {
        Header: '작성자',
        accessor: 'author',
        className: 'cell-left'
      },
      {
        Header: '제목',
        accessor: 'title',
      }
      ,
      {
        Header: '작성일',
        accessor: 'draftDate',
        className: 'cell-left',
        Cell: ({ value }) => format(new Date(value), 'yyyy-mm-dd HH:mm:ss')

      }
      
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [theme]
  );

  const renderRowSubComponent = useCallback(({ row }) => <CustomerView data={data[row.id]} />, [data]);

  return (
    <MainCard content={false}>
      <ScrollX>
        <ReactTable
          columns={columns}
          data={userData}
          handleAdd={handleAdd}
          getHeaderProps={(column) => column.getSortByToggleProps()}
          renderRowSubComponent={renderRowSubComponent}
        />
      </ScrollX>
      <AlertCustomerDelete title={customerDeleteId} open={open} handleClose={handleClose} />
      {/* add user dialog */}
      <Dialog
        maxWidth="sm"
        TransitionComponent={PopupTransition}
        keepMounted
        fullWidth
        onClose={handleAdd}
        open={add}
        sx={{ '& .MuiDialog-paper': { p: 0 }, transition: 'transform 225ms' }}
        aria-describedby="alert-dialog-slide-description"
      >
        <Write customer={customer} onCancel={handleAdd} />
      </Dialog>
    </MainCard>
  );
};

export default RejectionDocumentList;