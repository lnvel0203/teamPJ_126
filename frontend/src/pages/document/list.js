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

// 아래 코드는 ReactTable 컴포넌트의 propTypes를 정의하고 있습니다. propTypes는 React 컴포넌트에서 전달받는 props의 타입을 검증하는 기능을 합니다.
// 이를 통해 개발자는 전달받은 props의 타입이나 값이 유효한지 미리 확인할 수 있습니다.
// ReactTable 컴포넌트의 propTypes를 간략하게 설명하면 다음과 같습니다.
// columns: 테이블의 열 정보를 담은 배열입니다.
// data: 테이블의 데이터 정보를 담은 배열입니다.
// getHeaderProps: 테이블의 헤더 셀에 대한 속성 정보를 담은 객체를 반환하는 함수입니다.
// handleAdd: 테이블에 새로운 데이터를 추가하는 함수입니다.
// renderRowSubComponent: 테이블의 각 행에 대한 서브 컴포넌트를 렌더링하는 함수 또는 구성요소입니다.
// propTypes는 개발자가 작성한 코드에서 오류를 사전에 방지할 수 있는 좋은 방법입니다. propTypes를 사용하면 개발자는 코드의 안정성을 높일 수 있으며, 유지 보수에도 큰 도움이 됩니다.
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

// 위 코드는 React-Table에서 사용되는 구성 요소 중 하나인 NumberFormatCell 구성 요소입니다. 이 구성 요소는 전화번호와 같은 값을 표시할 때,
// NumberFormat 라이브러리를 사용하여 포맷팅된 값을 보여줍니다.

// NumberFormatCell 구성 요소는 다음과 같은 특징을 가지고 있습니다.

// value 프로퍼티를 인자로 받습니다. 이 프로퍼티는 셀에서 표시될 값을 나타냅니다.
// NumberFormat 구성 요소를 사용하여 값을 포맷팅할 수 있습니다. displayType 속성을 사용하여 포맷팅된 값을 텍스트 형식으로 보여줄지, 인풋 타입으로 보여줄지 선택할 수 있습니다.
// format 속성을 사용하여 값을 어떤 형식으로 포맷팅할지 정의할 수 있습니다. 이 예제에서는 전화번호 포맷을 사용하였습니다.
// mask 속성을 사용하여 값을 입력할 때 표시될 마스크를 정의할 수 있습니다. 이 예제에서는 _ 문자를 사용하여 숫자를 입력할 때 자동으로 마스크가 적용되도록 하였습니다.
// defaultValue 속성을 사용하여 셀에서 초기값을 설정할 수 있습니다. 이 예제에서는 value 프로퍼티 값을 기본값으로 설정하였습니다.
const NumberFormatCell = ({ value }) => <NumberFormat displayType="text" format="+1 (###) ###-####" mask="_" defaultValue={value} />;

// value 프로퍼티를 인자로 받습니다. 이 프로퍼티는 셀에서 표시될 상태 값을 나타냅니다.
// switch 구문을 사용하여 value 값에 따라 다른 Chip 구성 요소를 보여줍니다. Chip 구성 요소는 마테리얼 디자인 라이브러리에서 제공하는 UI 컴포넌트 중 하나로, 라벨과 색상 등 다양한 속성을 설정할 수 있습니다.
// color 속성을 사용하여 Chip 구성 요소의 색상을 설정할 수 있습니다. 이 예제에서는 success, error, info 색상을 사용하였습니다.
// label 속성을 사용하여 Chip 구성 요소에 표시될 라벨을 설정할 수 있습니다. 이 예제에서는 Pending, Verified, Rejected 라벨을 사용하였습니다.
// size 속성을 사용하여 Chip 구성 요소의 크기를 설정할 수 있습니다.
// variant 속성을 사용하여 Chip 구성 요소의 변형을 설정할 수 있습니다. 이 예제에서는 light 변형을 사용하였습니다.
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

// React Table을 사용하여 만들어진 테이블에서, 각 셀의 내용을 렌더링하기 위해 사용되는 여러 개의 컴포넌트들입니다.

// row: 현재 셀의 데이터를 가지고 있는 행 객체입니다.
// setCustomer: 현재 선택된 고객 정보를 설정하는 함수입니다.
// setCustomerDeleteId: 삭제할 고객의 아이디를 설정하는 함수입니다.
// handleClose: 모달 창을 닫는 함수입니다.
// theme: 현재 테마를 나타내는 객체입니다.
// 액션 셀은 Stack 구성 요소를 사용하여 세 가지 아이콘 버튼을 감싸고, Tooltip 구성 요소를 사용하여
// 각 버튼에 마우스를 올리면 나타나는 툴팁을 제공합니다. 각 버튼은 IconButton으로 구현되며, color 속성을 사용하여 각각의 색상을 지정합니다.
// 각 버튼은 onClick 속성을 사용하여 클릭 이벤트를 처리합니다. 클릭 이벤트는 해당 버튼을 클릭한 행 데이터를 기반으로 처리됩니다.
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

// 위 코드는 React 컴포넌트들의 PropTypes를 정의하고 있습니다. PropTypes는 React에서 컴포넌트가 전달받은 props의 타입을 검사하여
//  올바른 타입을 전달 받았는지 확인하는 데 사용됩니다. 이를 통해 개발자는 런타임 에러를 방지하고 코드의 안정성을 높일 수 있습니다.

// 위 코드에서는 각각의 컴포넌트(SelectionCell, SelectionHeader, CustomCell, NumberFormatCell, StatusCell)에서 전달받은 props의 타입이
// 올바른지 검사하도록 propTypes를 정의하고 있습니다. 이를 통해 각각의 컴포넌트에서 사용되는 props의 타입이 잘못 지정되어 런타임 에러가 발생하는 것을 방지할 수 있습니다
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

  // Fetch user data from the server
  const fetchUserData = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:8081/members/document');
      setUserData(response.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const data = useMemo(() => userData, [userData]);
  console.log(data);
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

  // 위 코드는 React Table에서 사용하는 컬럼(column) 정보들을 정의하는 부분입니다.
  // useMemo hook을 사용하여 columns 배열을 최적화하고 있습니다. columns 배열은 테이블의 각 열(column)들을 정의합니다.

  // Header는 각 열(column)의 제목을 정의합니다. accessor는 해당 열(column)에 표시할 데이터 속성을 정의합니다.
  // Cell은 테이블의 각 셀(cell)에 표시될 내용을 정의합니다. className은 해당 열(column)에 대한 스타일을 적용하기 위한 클래스 이름을 정의합니다.
  // disableSortBy는 해당 열(column)에 대해 정렬을 비활성화하고 싶은 경우 사용합니다.

  // 위 코드에서는 SelectionHeader, SelectionCell, CustomCell, NumberFormatCell, StatusCell, ActionCell 등의 컴포넌트를 사용하여 Header, Cell 등을 구성하고 있습니다.
  // useTheme hook을 사용하여 테마(theme)를 가져와서 ActionCell 컴포넌트에 전달하고 있습니다.

  // 이렇게 정의된 columns 배열은 ReactTable 컴포넌트의 columns prop으로 전달됩니다. data prop은 테이블에 표시할 데이터를 정의합니다.
  // handleAdd prop은 "Add Customer" 버튼 클릭 시 실행될 함수를 정의합니다. getHeaderProps prop은 각 열(column)의 헤더(header)에 적용될 속성(props)을 정의합니다.
  //  renderRowSubComponent prop은 각 행(row)의 하위 컴포넌트(sub-component)를 렌더링하는 함수를 정의합니다.
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
        accessor: 'docState',
        className: 'cell-left'
      },
      {
        Header: '문서번호',
        accessor: 'documentNo',
        className: 'cell-left'
      },
      {
        Header: '제목',
        accessor: 'title'
      },
      {
        Header: '작성일',
        accessor: 'draftDate',
        className: 'cell-left',
        Cell: ({ value }) => format(new Date(value), 'yyyy-MM-dd')
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

  // renderRowSubComponent는 ReactTable에서 각각의 행에 대한 확장 패널의 내용을 렌더링하는 함수입니다.
  //  이 함수에서는 data 배열에서 해당하는 행에 대한 데이터를 가져와 CustomerView 컴포넌트에 전달합니다.
  //  useCallback hook을 사용하여 data 배열이 업데이트되지 않으면 이전 값을 사용하여 함수를 캐시합니다.
  //  이렇게 함으로써 불필요한 렌더링을 방지하고 앱의 성능을 최적화할 수 있습니다.
  const renderRowSubComponent = useCallback(({ row }) => <CustomerView data={data[row.id]} />, [data]);

  //   MainCard와 ScrollX는 UI 라이브러리에서 제공하는 컴포넌트로, MainCard는 카드 형식의 UI를, ScrollX는 가로 스크롤 기능을 제공합니다.

  // ReactTable은 테이블을 렌더링하기 위한 라이브러리입니다. columns prop에는 테이블의 각 열에 대한 정보가 담긴 배열이 전달되고,
  // data prop에는 테이블에 표시될 데이터가 전달됩니다. handleAdd prop은 고객 추가 버튼 클릭 시 호출될 함수를 전달하며,
  // getHeaderProps prop은 테이블 열의 헤더를 렌더링할 때 사용되는 함수를 전달합니다. renderRowSubComponent prop은 각 행의 하위 컴포넌트를 렌더링하는 함수를 전달합니다.

  // AlertCustomerDelete는 고객 삭제를 확인하는 알림창을 렌더링하는 컴포넌트입니다. title prop은 삭제할 고객의 이름을 전달하며,
  //  open prop은 알림창의 열림/닫힘 여부를 전달합니다. handleClose prop은 알림창을 닫는 함수를 전달합니다.

  // 마지막으로 Dialog 컴포넌트는 고객 추가를 위한 다이얼로그를 렌더링합니다. maxWidth, TransitionComponent, keepMounted, fullWidth, onClose,
  // open, sx, aria-describedby 등의 prop을 설정할 수 있으며, AddCustomer 컴포넌트를 자식으로 가집니다. customer prop은 수정할 고객의 정보를 전달하며,
  // onCancel prop은 다이얼로그를 닫는 함수를 전달합니다.
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
