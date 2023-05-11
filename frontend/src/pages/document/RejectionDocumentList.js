// Import Axios Services
import axios from 'axios';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useMemo, useState, Fragment } from 'react';
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
  Tooltip,
  Typography,
  useMediaQuery
} from '@mui/material';

// third-party
import NumberFormat from 'react-number-format';
import { useFilters, useExpanded, useGlobalFilter, useRowSelect, useSortBy, useTable, usePagination } from 'react-table';

// project import
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import IconButton from 'components/@extended/IconButton';
import { PopupTransition } from 'components/@extended/Transitions';
import {
  CSVExport,
  HeaderSort,
  IndeterminateCheckbox,
  SortingSelect,
  TablePagination,
  TableRowSelection
} from 'components/third-party/ReactTable';

import AddCustomer from 'sections/apps/customer/AddCustomer';
import CustomerView from 'sections/apps/customer/CustomerView';
import AlertCustomerDelete from 'sections/apps/customer/AlertCustomerDelete';

// import makeData from 'data/react-table';
import { renderFilterTypes, GlobalFilter } from 'utils/react-table';

// assets
import { CloseOutlined, PlusOutlined, EyeTwoTone, EditTwoTone, DeleteTwoTone } from '@ant-design/icons';

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

  //   이 Hook은 함수형 컴포넌트에서 마운트, 언마운트, 업데이트와 관련된 작업을 수행할 때 사용됩니다. 이 예시에서는 matchDownSM이라는 상태 변수가 변경될 때마다 실행됩니다.
  // 이 useEffect 함수의 목적은, 미디어 쿼리를 사용하여 현재 브라우저 창의 크기가 작은 경우에는 테이블에서 일부 열을 숨기고, 큰 경우에는 모든 열을 표시하는 것입니다.
  // 첫 번째 if문에서, matchDownSM 변수가 true인 경우 setHiddenColumns 함수를 사용하여 열을 숨기는 데 필요한 상태를 업데이트합니다. 두 번째 else문에서는 matchDownSM이 false인 경우 또 다른 setHiddenColumns 함수를 사용하여 다른 열을 숨깁니다.
  // useEffect의 두 번째 인자로 [matchDownSM]이 전달되는데, 이는 useEffect가 실행되는 조건입니다. 만약 matchDownSM 값이 변경되지 않았다면, useEffect 함수는 실행되지 않습니다. 이렇게 하면 불필요한 렌더링이 발생하지 않아서 성능이 개선됩니다.
  // 마지막으로, eslint-disable-next-line 주석이 있습니다. 이는 ESLint에서 경고를 비활성화하는 주석으로, 이 코드에서는 특정 규칙을 적용하지 않도록 설정하는 용도로 사용됩니다.
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

  //  이 코드는 React로 작성된 컴포넌트의 JSX 코드입니다. 이 컴포넌트는 테이블을 렌더링하며, react-table 라이브러리를 사용하여 구현되었습니다.
  // 컴포넌트의 return문에서는 Fragment와 JSX 코드를 사용하여 테이블을 구성합니다. JSX 코드는 다음과 같은 구성요소로 이루어져 있습니다

  return (
    <>
      <TableRowSelection selected={Object.keys(selectedRowIds).length} />{' '}
      {/* TableRowSelection: 테이블에서 선택된 행의 수를 표시하는 구성요소입니다.  */}
      <Stack spacing={3}>
        <Stack /* Stack: 다른 구성요소들을 감싸고 정렬하는 컨테이너 역할을 하는 구성요소입니다. */
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

// ==============================|| CUSTOMER - LIST ||============================== //

// 테이블의 행 선택 기능을 구현하는 데 사용되는 두 개의 구성 요소입니다.

// SelectionCell: 각 행에서 선택 상태를 표시하는 구성요소입니다.
// 이 구성요소는 IndeterminateCheckbox 구성요소를 사용하며,
// 해당 행의 선택 상태를 가져오기 위해 row.getToggleRowSelectedProps() 함수를 호출합니다.

// SelectionHeader: 전체 행에서 선택 상태를 표시하는 구성요소입니다.

// Section Cell and Header
const SelectionCell = ({ row }) => <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />;
const SelectionHeader = ({ getToggleAllPageRowsSelectedProps }) => (
  <IndeterminateCheckbox indeterminate {...getToggleAllPageRowsSelectedProps()} />
);

// React-Table에서 사용되는 구성 요소 중 하나인 CustomCell 구성 요소입니다.
// 이 구성 요소는 각 셀에서 렌더링되는 콘텐츠를 커스터마이징하기 위해 사용됩니다.
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


const ActionCell = (row, setCustomer, setCustomerDeleteId, handleClose, theme) => {
  const collapseIcon = row.isExpanded ? (
    <CloseOutlined style={{ color: theme.palette.error.main }} />
  ) : (
    <EyeTwoTone twoToneColor={theme.palette.secondary.main} />
  );
  return (
    <Stack direction="row" alignItems="center" justifyContent="center" spacing={0}>
      <Tooltip title="View">
        <IconButton
          color="secondary"
          onClick={(e) => {
            e.stopPropagation();
            row.toggleRowExpanded();
          }}
        >
          {collapseIcon}
        </IconButton>
      </Tooltip>
      <Tooltip title="Edit">
        <IconButton
          color="primary"
          onClick={(e) => {
            e.stopPropagation();
            setCustomer(row.values);
            handleAdd();
          }}
        >
          <EditTwoTone twoToneColor={theme.palette.primary.main} />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete">
        <IconButton
          color="error"
          onClick={(e) => {
            e.stopPropagation();
            handleClose();
            setCustomerDeleteId(row.values.fatherName);
          }}
        >
          <DeleteTwoTone twoToneColor={theme.palette.error.main} />
        </IconButton>
      </Tooltip>
    </Stack>
  );
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
  
    const [userData, setUserData] = useState([]);
  
    // Fetch user data from the server
    const fetchUserData = useCallback(async () => {
      try {
        const response = await axios.get('http://localhost:8081/members/ApprovalPendingList/'+id);
        setUserData(response.data);
      } catch (error) {
        console.error(error);
      }
    }, []);
  
    useEffect(() => {
      fetchUserData();
    }, [fetchUserData]);
  
    const data = useMemo(() => userData, [userData]);
    console.log('data',data);
    const [add, setAdd] = useState(false);
    const [open, setOpen] = useState(false);
    const [customer, setCustomer] = useState();
    const [customerDeleteId, setCustomerDeleteId] = useState();
  
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
  
        },
        {
          Header: 'Actions',
          className: 'cell-right',
          disableSortBy: true,
          Cell: ({ row }) => ActionCell(row, setCustomer, setCustomerDeleteId, handleClose, theme)
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
          <AddCustomer customer={customer} onCancel={handleAdd} />
        </Dialog>
      </MainCard>
    );
  };

export default RejectionDocumentList;
