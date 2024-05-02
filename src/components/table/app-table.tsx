import { Article } from '@/app/page';
import { TableSortLabel, tableSortLabelClasses } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import Link from 'next/link';
import { memo, useMemo, useState } from 'react';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
  },
}));

const StyledTableSortLabel = styled(TableSortLabel)(() => ({
  [`&.${tableSortLabelClasses.root}`]: {
    color: 'white',
  },
  [`&.${tableSortLabelClasses.active} .${tableSortLabelClasses.icon}`]: {
    color: 'white',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const tableHeaders: { id: keyof Article; title: string; sortable: boolean }[] = [
  { id: 'index', title: 'No.', sortable: true },
  { id: 'title', title: 'Title', sortable: false },
  { id: 'views', title: 'Views', sortable: true },
  { id: 'likes', title: 'Likes', sortable: true },
  { id: 'stocks', title: 'Stocks', sortable: true },
];

function AppTable({ data }: { data: Article[] }) {
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<keyof Article | undefined>(undefined);

  const sortedData = useMemo(() => {
    if (orderBy === undefined) return data;

    const sortedData = data.slice().sort((a, b) => {
      const first = a[orderBy] as number;
      const second = b[orderBy] as number;

      if (order === 'asc') {
        return first - second;
      } else {
        return second - first;
      }
    });

    return sortedData;
  }, [data, order, orderBy]);

  const onSort = (sortKey: keyof Article) => {
    if (sortKey === orderBy) {
      setOrder(order === 'asc' ? 'desc' : 'asc');
    } else {
      setOrderBy(sortKey);
      setOrder('asc');
    }
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 650 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {tableHeaders.map((header) =>
                header.sortable ? (
                  <StyledTableCell key={header.id} align={header.sortable ? 'right' : 'center'} sortDirection={order}>
                    <StyledTableSortLabel
                      active={orderBy === header.id}
                      direction={order}
                      onClick={() => {
                        header.sortable && onSort(header.id);
                      }}
                    >
                      {header.title}
                    </StyledTableSortLabel>
                  </StyledTableCell>
                ) : (
                  <StyledTableCell key={header.id} align="center">
                    {header.title}
                  </StyledTableCell>
                )
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData.map((row) => (
              <StyledTableRow key={row.index}>
                <StyledTableCell component="th" scope="row" align="center">
                  {row.index}
                </StyledTableCell>
                <StyledTableCell align="left">
                  <Link target="_blank" href={row.url} className="text-blue-500">
                    {row.title}
                  </Link>
                </StyledTableCell>
                <StyledTableCell align="right">{row.views}</StyledTableCell>
                <StyledTableCell align="right">{row.likes}</StyledTableCell>
                <StyledTableCell align="right">{row.stocks}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default memo(AppTable);
