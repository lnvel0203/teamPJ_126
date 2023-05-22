
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import axios from 'axios';
import { getAuthToken } from '../../../utils/axios';
import { PopupTransition } from 'components/@extended/Transitions';
import {useCallback, useState, Fragment, useMemo, useEffect } from 'react';
import { alpha, useTheme } from '@mui/material/styles';
import CustomerView from 'sections/apps/customer/CustomerView';
import { useFilters, useExpanded, useGlobalFilter, useRowSelect, useSortBy, useTable, usePagination } from 'react-table';
import {

    HeaderSort,
    IndeterminateCheckbox,
    SortingSelect,
    TablePagination,
    TableRowSelection
  } from 'components/third-party/ReactTable';
  import {
   Dialog,
   Stack,
   Table,
   TableBody,
   TableCell,
    TableHead,
   TableRow,
   useMediaQuery
  } from '@mui/material';

  import { renderFilterTypes, GlobalFilter } from 'utils/react-table';
  function ReactTable({ columns, data, getHeaderProps, renderRowSubComponent }) {
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
  
    const filterTypes = useMemo(() => renderFilterTypes, []);
    const sortBy = { id: 'boardNo', desc: false };
  
    
  
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      prepareRow,
      allColumns,
      visibleColumns,
      rows,
      page,
      gotoPage,
      setPageSize,
      state: {globalFilter, selectedRowIds, pageIndex, pageSize, expanded },
      preGlobalFilteredRows,
      setGlobalFilter,
      setSortBy,
   
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

    const handleTitleClick = (boardNo) => {
      console.log('boardNo',boardNo)
      window.open('/apps/boardDetail?boardNo='+boardNo, '_blank', 'width=1200,height=900,top=300,left=300');
    };
  
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
                        handleTitleClick(row.original.boardNo);
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


const SelectionCell = ({ row }) => <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />;
const SelectionHeader = ({ getToggleAllPageRowsSelectedProps }) => (
  <IndeterminateCheckbox indeterminate {...getToggleAllPageRowsSelectedProps()} />
);


const Announcement =()=>{

  
    //const id = localStorage.getItem('id');
    const theme = useTheme();
  
    const [userData, setUserData] = useState([]);
  
    // Fetch user data from the server
    const fetchUserData = useCallback(async () => {
      try {
        const response = await axios.get('http://localhost:8081/members/boardList/', {
          headers: {
            Authorization: 'Bearer ' + getAuthToken(),
          }
        });
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
   // const [open, setOpen] = useState(false);
    const [customer, setCustomer] = useState();
    //const [customerDeleteId, setCustomerDeleteId] = useState();
  
    const handleAdd = () => {
      setAdd(!add);
      if (customer && !add) setCustomer(null);
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
          Header: '글번호',
          accessor: 'boardNo',
          className: 'cell-left'
        },
        {
            Header: '제목',
            accessor: 'title',
            className: 'cell-left'
          }
          ,
    
        {
          Header: '작성자',
          accessor: 'id',
          className: 'cell-left'
        },
     
        {
          Header: '작성일',
          accessor: 'inputDate',
          className: 'cell-left',
  
        },
      ],
      [theme]
    );
    
    const renderRowSubComponent = useCallback(({ row }) => <CustomerView data={data[row.id]} />, [data]);
  
return(
<>
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
      </Dialog>
    </MainCard>
</>
)
    
}
export default Announcement;