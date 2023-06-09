// Import Axios Services
import axios from 'axios';
import { getAuthToken, request } from '../../../utils/axios';
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
  Typography,
  useMediaQuery,
  Tooltip
} from '@mui/material';
import IconButton from 'components/@extended/IconButton';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

// third-party
import NumberFormat from 'react-number-format';
import { useFilters, useExpanded, useGlobalFilter, useRowSelect, useSortBy, useTable, usePagination } from 'react-table';

// project import
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import { PopupTransition } from 'components/@extended/Transitions';
import {
  //CSVExport,
  HeaderSort,
  IndeterminateCheckbox,
  //   SortingSelect,
  TablePagination,
  TableRowSelection
} from 'components/third-party/ReactTable';

import AddDepart from 'sections/apps/depart/AddDepart';
import CustomerView from 'sections/apps/customer/CustomerView';
import AlertCustomerDelete from 'sections/apps/customer/AlertCustomerDelete';

// import makeData from 'data/react-table';
import { renderFilterTypes, GlobalFilter } from 'utils/react-table';

// assets
import { PlusOutlined, DeleteTwoTone } from '@ant-design/icons';

// ==============================|| REACT TABLE ||============================== //

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
    setHiddenColumns,
    visibleColumns,
    rows,
    page,
    gotoPage,
    setPageSize,
    state: { globalFilter, selectedRowIds, pageIndex, pageSize, expanded },
    preGlobalFilteredRows,
    setGlobalFilter,
    // setSortBy,
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
      setHiddenColumns(['no', 'id', 'age', 'contact', 'visits', 'email', 'status', 'avatar']);
    } else {
      setHiddenColumns(['avatar', 'email']);
    }
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
              부서 신설
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

const ActionCell = (row) => {
  // 추가 시작 ==========================================================

  const [positionData, setPositionData] = useState([]);
  // 2023-05-15

  // 서버에서 직급 정보를 패치해옴
  useEffect(() => {
    axios
      .get('http://localhost:8081/department/positionData', {
        headers: {
          Authorization: 'Bearer ' + getAuthToken(),
        }
      })
      .then((response) => {
        setPositionData(response.data);
        console.log('#');
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // 추가 끝 ==============================================================

  const [selectedOption, setSelectedOption] = useState();

  const handleButtonClick = async (deptid) => {
    const sendData = {
      deptId: deptid,
      deptReaderName: selectedOption
    };

    await axios
    .put(`http://localhost:8081/department/updatePosition`, { sendData }, {
      headers: {
        Authorization: 'Bearer ' + getAuthToken(),
      }
    })
    .then((response) => {
      console.log(response);
      window.location.reload();
    })
    .catch((error) => {
      console.error(error);
    });
  };

 // 부서 삭제
 const handleDelete = (deptid) => {
  request('DELETE', `department/deleteDepartment/${deptid}`, deptid)
    .then((response) => {
      console.log(response.data); // logs the updated user data
      window.location.reload(); // 자동 새로고침
    })
    .catch((error) => {
      console.error(error);
    });
};

  return (
    <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
      <Autocomplete
        id="optionList"
        options={positionData}
        sx={{ width: 130 }}
        onChange={(event, value) => setSelectedOption(value)}
        renderInput={(params) => <TextField {...params} />}
      />
      <Button variant="contained" onClick={() => handleButtonClick(row.original.deptid)}>
        변경
      </Button>
      <Tooltip title="부서 삭제">
        <IconButton
          color="error"
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(row.original.deptid);
          }}
        >
          <DeleteTwoTone />
        </IconButton>
      </Tooltip>
    </Stack>
  );
};

StatusCell.propTypes = {
  value: PropTypes.number
};

NumberFormatCell.propTypes = {
  //번호형식 셀
  value: PropTypes.string
};

CustomCell.propTypes = {
  //사용자 지정 셀
  row: PropTypes.object
};

SelectionCell.propTypes = {
  row: PropTypes.object
};

SelectionHeader.propTypes = {
  getToggleAllPageRowsSelectedProps: PropTypes.func
};

// # 리스트 시작

const Departloaletext = () => {
  const theme = useTheme();

  const [userData, setUserData] = useState([]);

 // 서버에서 회원 정보를 패치해옴
 const fetchUserData = useCallback(async () => {
  try {
    request('GET', 'department').then((response) => {
      setUserData(response.data);
    });
  } catch (error) {
    console.error(error);
  }
}, []);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const data = useMemo(() => userData, [userData]); //리스트

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
        Cell: ({ row }) => ActionCell(row, setCustomer, setCustomerDeleteId, handleClose, theme)
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
        <AddDepart customer={customer} onCancel={handleAdd} />
      </Dialog>
    </MainCard>
  );
};

export default Departloaletext;