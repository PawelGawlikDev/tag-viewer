import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import TableHeader from "../TableHeader/TableHeader";
import TableToolbar from "../TableToolbar/TableToolbar";
import createData from "../../utils/createData";
import getTags from "../../utils/getTags";
import Button from "@mui/material/Button";
import { Skeleton } from "@mui/material";
import { StyledTableCell, StyledTableRow } from "../../utils/style";

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number,
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export default function TagsTable() {
  const [loading, setLoading] = React.useState(true);
  const [rows, setRows] = React.useState<Data[]>([]);
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("count");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [error, setError] = React.useState(false);
  const [pageIndex, setPageIndex] = React.useState(1);
  const [loadingMore, setLoadingMore] = React.useState(false);

  const handleGetMoreTags = () => {
    setLoadingMore(true);
    setPageIndex((prevPageIndex) => prevPageIndex + 1);
  };

  React.useEffect(() => {
    if (pageIndex > 0 && pageIndex <= 100) {
      setLoading(true);
      getTags(
        `https://api.stackexchange.com/2.3/tags?page=${pageIndex}&order=desc&sort=popular&site=stackoverflow`,
      )
        .then((resolve) => {
          const newRows: Data[] = resolve.map((tag: any, index: number) =>
            createData(index, tag.name, tag.count),
          );
          setRows((prevRows) => [...prevRows, ...newRows]);
          setLoading(false);
          setLoadingMore(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setLoading(false);
          setError(true);
          setLoadingMore(false);
        });
    }
  }, [pageIndex]);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data,
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [order, orderBy, page, rows, rowsPerPage],
  );

  return (
    <Box sx={{ width: "80%" }} className={"Table"}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableToolbar />
        <Box
          sx={{
            display: "flex",
            alignContent: "center",
            justifyContent: "space-between",
            alignItems: "stretch",
          }}
        >
          <TablePagination
            className="rowsPerPage"
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          <Button
            variant="contained"
            onClick={handleGetMoreTags}
            disabled={loadingMore}
          >
            {loadingMore ? "Loading..." : "Get More Tags"}
          </Button>
        </Box>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={"medium"}
          >
            <TableHeader
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody aria-label="table">
              {loading ? (
                Array.from(Array(rowsPerPage)).map((_, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell>
                      <Skeleton />
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <Skeleton />
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              ) : error ? (
                <StyledTableRow>
                  <StyledTableCell colSpan={3} align="center">
                    Error fetching data
                  </StyledTableCell>
                </StyledTableRow>
              ) : (
                visibleRows.map((row, index) => (
                  <StyledTableRow
                    hover
                    aria-checked={false}
                    tabIndex={-1}
                    key={row.id}
                    sx={{ cursor: "pointer" }}
                  >
                    <StyledTableCell component="th" scope="row">
                      {row.name}
                    </StyledTableCell>
                    <StyledTableCell>{row.count}</StyledTableCell>
                  </StyledTableRow>
                ))
              )}
              {emptyRows > 0 && (
                <StyledTableRow style={{ height: 53 * emptyRows }}>
                  <StyledTableCell colSpan={3} />
                </StyledTableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
