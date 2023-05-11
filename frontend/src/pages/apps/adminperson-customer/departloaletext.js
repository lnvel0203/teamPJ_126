// Import Axios Services
//import axios from 'axios';
import { request } from '../../../utils/axios';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useMemo, useState, Fragment } from 'react';

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
  //2023-05-09 김희수 Tooltip 삭제
  // Tooltip,
  Typography,
  useMediaQuery
} from '@mui/material';

// third-party
import NumberFormat from 'react-number-format';
import { useFilters, useExpanded, useGlobalFilter, useRowSelect, useSortBy, useTable, usePagination } from 'react-table';

// project import
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
// import IconButton from 'components/@extended/IconButton';
import { PopupTransition } from 'components/@extended/Transitions';
import {
  CSVExport,
  HeaderSort,
  IndeterminateCheckbox,
  //2023-05-09 김희수 SortingSelect 삭제
  // SortingSelect,
  TablePagination,
  TableRowSelection
} from 'components/third-party/ReactTable';

// import AddCustomer from 'sections/apps/customer/AddCustomer';
import AddDepart from 'sections/apps/depart/AddDepart';
import CustomerView from 'sections/apps/customer/CustomerView';
// import AlertCustomerDelete from 'sections/apps/customer/AlertCustomerDelete';
// import DeletDepart from 'sections/apps/depart/DeletDepart';

// import makeData from 'data/react-table';
import { renderFilterTypes, GlobalFilter } from 'utils/react-table';

// assets
import {  PlusOutlined } from '@ant-design/icons';

// 수정 팝업 컴포넌트
//  import EditDepart from 'sections/apps/depart/EditDepart';

// ==============================|| REACT TABLE ||============================== //

// 2023-05-09 김희수 부서 수정 버튼기능 추가
// const editClick = () => {
//   alert('test');
//   window.open('sections/apps/depart/EditDepart');
//   axios
//     .put(`http://localhost:8081/department/editDepartment/${deptid}/${deptname}`, deptid,deptname)
//     .then((EditDepart) => {
//       console.log(EditDepart);
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// }

const handleDelet = (deptid) => {
  //미승인 상태 사원 -> 승인상태로 변경 및 승인버튼 삭제

    request(
      'DELETE',
      `department/deleteDepartment/${deptid}`, deptid
    ).then((response) => {
      console.log(response.data); // logs the updated user data
      window.location.reload(); // 자동 새로고침
    })
    .catch((error) => {
      console.error(error);
    });
};

// 2023-05-09 김희수 부서 수정 버튼기능 추가
function SelectCell({ positionName, onChange }) {
  return (
    <select value={positionName} onChange={e => onChange(e.target.value)}>

      <option value="선택">-</option>

      <option value="인사팀">인사팀</option>
      <option value="경영지원팀">경영지원팀</option>
      <option value="영업팀">영업팀</option>
      <option value="기획팀">기획팀</option>
      <option value="개발팀">개발팀</option>
    </select>
  );
}


function ReactTable({ columns, data, getHeaderProps, renderRowSubComponent, handleAdd }) {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

  const filterTypes = useMemo(() => renderFilterTypes, []);
  const sortBy = { id: 'fatherName', desc: false };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    // setHiddenColumns,
    // allColumns,
    visibleColumns,
    rows,
    page,
    gotoPage,
    setPageSize,
    state: { globalFilter, selectedRowIds, pageIndex, pageSize, expanded },
    preGlobalFilteredRows,
    setGlobalFilter,
    // setSortBy,
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
    // if (matchDownSM) {
    //   setHiddenColumns(['age', 'contact', 'visits', 'email', 'status', 'avatar']);
    // } else {
    //   setHiddenColumns(['avatar', 'email']);
    // }
    // eslint-disable-next-line
    
  }, [matchDownSM]);

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
            <Button variant="contained" startIcon={<PlusOutlined />} onClick={handleAdd} size="small">
              부서 추가
            </Button>
            <CSVExport data={selectedFlatRows.length > 0 ? selectedFlatRows.map((d) => d.original) : data} filename={'customer-list.csv'} />
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
                      row.toggleRowSelected();
                    }}
                    sx={{ cursor: 'pointer', bgcolor: row.isSelected ? alpha(theme.palette.primary.lighter, 0.35) : 'inherit' }}
                  >
                    {row.cells.map((cell, index) => (
                      <TableCell key={index} {...cell.getCellProps([{ className: cell.column.className }])}>
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

// const ActionCell = (row, setCustomerDeleteId, handleClose, theme) => {
//   const collapseIcon = row.isExpanded ? (
//     <CloseOutlined style={{ color: theme.palette.error.main }} />
//   ) : (
//     <EyeTwoTone twoToneColor={theme.palette.secondary.main} />
//   );
//   return (
//     <Stack direction="row" alignItems="center" justifyContent="center" spacing={0}>
//       <Tooltip title="View">
//         <IconButton
//           color="secondary"
//           onClick={(e) => {
//             e.stopPropagation();
//             row.toggleRowExpanded();
//           }}
//         >
//           {collapseIcon}
//         </IconButton>
//       </Tooltip>
//       <Tooltip title="수정">
//         <IconButton
//           color="primary"
//           onClick={(e) => {
//             e.stopPropagation();
//             // setCustomer(row.values);
//             // setCustomerEditId(row.values); 
//             handleEditClick(row.values.deptid); 
//           }}
//         >
//           <EditTwoTone twoToneColor={theme.palette.primary.main} />
//         </IconButton>
//       </Tooltip>
//       <Tooltip title="Delete">
//         <IconButton
//           color="error"
//           onClick={(e) => {
//             e.stopPropagation();
//             handleClose();
//             setCustomerDeleteId(row.values.deptname);
//           }}
//         >
//           <DeleteTwoTone twoToneColor={theme.palette.error.main} />
//         </IconButton>
//       </Tooltip>
//     </Stack>
//   );
// };

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

const CustomerListPage = () => {
  const theme = useTheme();

  const [userData, setUserData] = useState([]);

  // 서버에서 부서 정보를 패치해옴
  const fetchUserData = useCallback(async () => {
    try {
      request(
        'GET',
        '/department'
      ).then(response => {
        setUserData(response.data);
        console.log(response.data);
      })
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const data = useMemo(() => userData, [userData]);

  const [add, setAdd] = useState(false);
  const [open, setOpen] = useState(false);
  const [customer, setCustomerEditId] = useState();
  // 2023-05-09 김희수 setCustomerDeleteId 삭제
  const [customerDeleteId, DeletDepart] = useState();

  const handleAdd = () => {
    setAdd(!add);
    if (customer && !add) setCustomerEditId(null);
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
        Header: '번호',
        accessor: 'deptid', // 테이블 컬럼명
        className: 'cell-center'
      },
      {
        Header: '부서이름',
        accessor: 'deptname',
        className: 'cell-center'
      },
      {
        Header: '부서장',
        accessor: 'deptreadername',
        className: 'cell-center'
      },
      {
        Header: '설립일', 
        accessor: 'deptdate',
        className: 'cell-center',
        Cell: ({ value }) => new Date(value).toLocaleDateString()
      },
      {
        Header: '부서장 변경',
        className: 'cell-center',
        disableSortBy: true,
        // Cell: ({ row }) => ActionCell(row, setCustomerEditId, setCustomerDeleteId, handleClose, theme)
        Cell: ({ value, row, setValue }) => {
          const [selectedPosition, setSelectedPosition] = useState(value);
          
          const handlePositionChange = (newValue) => {
            setSelectedPosition(newValue);
            setValue(newValue, row.index, 'positionName', row.original.positionName);
          };
        
          return (
            // const ActionCell = (row, setCustomerDeleteId, handleClose, theme) => {
            <div>
              <SelectCell positionName={selectedPosition} onChange={handlePositionChange} />
              <button onClick={() => handleEdit({ ...row.original, positionName: selectedPosition })}>수정</button>
              
              {/* 2023-05-10 김희수 삭제버튼 추가 */}
              <button 
              color='error'
              style={{ marginLeft: '10px' }} 
              onClick={(e) =>{
                e.stopPropagation();
                handleDelet(row.values.deptid);
                // DeletDepart(row.values.deptid);
              }}
              // onClick={() => handleDelet({ ...row.original, positionName: selectedPosition })}
              >삭제</button>
            </div>
            // }
          );
        }
      }
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [theme]
  );

  const renderRowSubComponent = useCallback(({ row }) => <CustomerView data={data[row.deptid]} />, [data]);

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
      {/* <AlertCustomerDelete title={customerDeleteId} open={open} handleClose={handleClose} /> */}
      <DeletDepart title={customerDeleteId} open={open} handleClose={handleClose} />
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
        <AddDepart customer={customer} onCancel={handleAdd} />
      </Dialog>

      {/* <Dialog
        maxWidth="sm"
        TransitionComponent={PopupTransition}
        keepMounted
        fullWidth
        onClose={setCustomerEditId}
        open={add}
        sx={{ '& .MuiDialog-paper': { p: 0 }, transition: 'transform 225ms' }}
        aria-describedby="alert-dialog-slide-description"
      >
        <EditDepart customer={customer} onCancel={handleAdd} />
      </Dialog> */}

    </MainCard>
  );
};

export default CustomerListPage;