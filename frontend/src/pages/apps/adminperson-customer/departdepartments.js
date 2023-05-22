// Import Axios Services
import { request } from '../../../utils/axios';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useMemo, useState, Fragment } from 'react';


// material-ui
import { alpha, useTheme } from '@mui/material/styles';
import {
  // Button,
  Chip,
  Dialog,
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
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';

import { PopupTransition } from 'components/@extended/Transitions';
import {
  HeaderSort,
  IndeterminateCheckbox,
  TablePagination,
  TableRowSelection
} from 'components/third-party/ReactTable';

import AddCustomer from 'sections/apps/customer/AddCustomer';
import CustomerView from 'sections/apps/customer/CustomerView';
import AlertCustomerDelete from 'sections/apps/customer/AlertCustomerDelete';

import { renderFilterTypes, GlobalFilter } from 'utils/react-table';

// ==============================|| REACT TABLE ||============================== //

function SelectCell({ deptname, onChange, options }) {
  const handleDeptChange = (event) => {
    const newValue = event.target.value;
    onChange(newValue);
  };

  return (
    <select value={deptname} onChange={handleDeptChange}>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

//5월 8일 김성훈 팀 리스트 불러오기 
const Cell = ({ value, row, setValue }) => {
  const [selectedDept, setSelectedDept] = useState(value);
  const [deptList, setDeptList] = useState([]);

  const handleDeptChange = (newValue) => {
    setSelectedDept(newValue);
    setValue(newValue, row.index, 'DeptName', row.original.DeptName);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {

        request(
          'GET',
          '/department'
        ).then(response => {
          const deptData = response.data;
          const deptNames = deptData.map((dept) => dept.deptname);
          setDeptList(deptNames);
        })
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserData();
  }, []);

  return (
    <div>
      <SelectCell deptname={selectedDept} onChange={handleDeptChange} options={deptList} />
      <button onClick={() => handleEdit({ ...row.original, DeptName: selectedDept })}>수정</button>
    </div>
  );
};

function handleEdit(rowData) {
  const { id, DeptName } = rowData;
  console.log(id, DeptName);

  request(
    'PUT',
    `/members/editDeptname/${id}/${DeptName}`
  ).then(() => {
    console.log('수정 성공');
     window.location.reload(); 
  })
  .catch((error) => {
    console.error('수정 실패', error);
  });

}


function ReactTable({ columns, data, getHeaderProps, renderRowSubComponent,}) {
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
    visibleColumns,
    rows,
    page,
    gotoPage,
    setPageSize,
    state: { globalFilter, selectedRowIds, pageIndex, pageSize, expanded },
    preGlobalFilteredRows,
    setGlobalFilter,
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


//직워 리스트 불러오기 
const CustomerListPage = () => {
  const theme = useTheme();

  const [userData, setUserData] = useState([]);

  // 서버에서 회원 정보를 패치해옴
  const fetchUserData = useCallback(async () => {
    try {







      request(
        'GET',
        '/members/position'
      ).then(response => {
        setUserData(response.data);
      })




      // const response = await axios.get('http://localhost:8081/members/position'); //컨트롤러 주소
      // setUserData(response.data);
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
  const [customer, setCustomer] = useState();
  const [customerDeleteId] = useState();

  //5월 4일 김성훈 수정   사용안함 삭제 
  //const [customerDeleteId, setCustomerDeleteId] = useState();

  const handleAdd = () => {
    setAdd(!add);
    if (customer && !add) setCustomer(null);
  };

  const handleClose = () => {
    setOpen(!open);
  };

  //5월 8일 김성훈 내용 수정 
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
        Header: '아이디',
        accessor: 'id',
        className: 'cell-center'
      },
      {
        Header: '이름',
        accessor: 'name',
        className: 'cell-center'
      },
      {
        Header: '입사날짜',
        accessor: 'hireDate',
        className: 'cell-center'
      },
      {
        Header: '상태',
        accessor: 'state',
        className: 'cell-center'
      },

      {
        Header: '직급',
        accessor: 'positionName',
        className: 'cell-center',
      },
      {
        Header: '부서',
        accessor: 'deptName',
        className: 'cell-right'
      },

      // 5월 8일 김성훈 팀 보이기 확긴하기!
      {
        Header: '부서선택',
        className: 'cell-center',
        disableSortBy: true,
        Cell: Cell,
      },
      

      // //5월 4일 수정 김성훈  직원 직급 수정 및 버튼 
      // {
      //   Header: '변경',
      //   className: 'cell-center',
      //   disableSortBy: true,
      //   Cell: ({ value, row, setValue }) => {
      //     const [selectedPosition, setSelectedPosition] = useState(value);
          
      //     const handlePositionChange = (newValue) => {
      //       setSelectedPosition(newValue);
      //       setValue(newValue, row.index, 'positionName', row.original.positionName);
      //     };
        
      //     return (
      //       <div>
      //         <SelectCell positionName={selectedPosition} onChange={handlePositionChange} />
      //         <button onClick={() => handleEdit({ ...row.original, positionName: selectedPosition })}>수정</button>
      //       </div>
      //     );
      //   }
      // }
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

export default CustomerListPage;