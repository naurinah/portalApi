import { Button } from "@material-ui/core";
// import user from "./user";
import Modal from "react-bootstrap/Modal";
import React, { useState, useEffect } from "react";
import user from "./user";
import EditExpensePage from "./EditExpensePage";
import {BrowserRouter, BrowserRouter as Router,Link,Route,Switch} from 'react-router-dom';
// import Link from '@material-ui/core/Link';
import PropTypes from "prop-types";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Paper from "@material-ui/core/Paper";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import CircularProgress from "@material-ui/core/CircularProgress";


function createData(acno, total_Hits, Last_Hit,action) {
  return { acno, total_Hits, Last_Hit,action };
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "account",
    numeric: false,
    disablePadding: false,
    label: "ACCOUNT",
  },
  {
    id: "total_Hits",
    numeric: false,
    disablePadding: false,
    label: "TOTAL HITS",
  },
  {
    id: "Last_Hit",
    numeric: false,
    disablePadding: false,
    label: "LAST HIT",
  },
  {
    id: "action",
    numeric: false,
    disablePadding: false,
    label: "ACTION",
  },
];

function EnhancedTableHead(props) {
  const { classes, order, orderBy, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead className="bg-[#f5f5fd]">
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 100%",
  },
}));

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

export default function Modals({ show, onHide, acno }) {
  const classes = useStyles();
  const handleClickOpen = () => {setOpen(true);  };
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [originalRows, setOriginalRows] = React.useState([]);
  const [apis, setApis] = React.useState(null);
  const [rows, setRows] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const ac = "";
  const [modalAcno, setModalAcno] = React.useState("");
   const [open, setOpen] = React.useState(false);


  const fetchAccountDetails = async (ac) => {
    let newRows = rows;
    const response = await fetch(
      `https://bigazure.com/api/json_v4/dashboard/API_PORTAL_API/api_customer.php?api_no=${ac}`
    ).then((res) => res.json());
    newRows = [];
    if (newRows === []) {
      response.map((a) => {
        newRows=[
          createData(
            a["acno"],
            a["total_Hits"],
            a["Last_Hit"],
          <Button variant="outlined" color="primary" onClick={handleClickOpen} >View Details</Button>
         
          )
          ];
        });
  }else {
    response.map((a) => {
    newRows.push(
      createData(
        a["acno"],
        a["total_Hits"],
        a["Last_Hit"],
       <Button variant="outlined" color="primary" onClick={handleClickOpen} >View Details</Button>
      ),
    );
  })
  }

      setRows(newRows);
      setOriginalRows(newRows);
      setIsLoading(false);
    };

    useEffect(async () => {
      if (acno !== undefined) {
        setIsLoading(true);
        setRows([]);
        let acSplit = [""];
        acSplit = acno.split(",");
        if (acSplit !== undefined) {
          acSplit.map(async (a) => {
            if (a !== "") {
              await fetchAccountDetails(a);
            }
          });
        }
        setIsLoading(false);
      }
    }, [acno]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
    

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Customer Related to this API
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isLoading ? (
          <div className="flex justify-center items-center">
            <CircularProgress />
          </div>
        ) : (
          <Paper className={classes.paper}>
            <TableContainer>
              <Table
                className={classes.table}
                aria-labelledby="tableTitle"
                size={"medium"}
                aria-label="enhanced table"
              >
                <EnhancedTableHead
                  classes={classes}
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleRequestSort}
                  rowCount={rows.length}
                />
                <TableBody>
                  {stableSort(rows, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <TableRow hover tabIndex={-1} key={row.ac}>
                          <TableCell>{row.acno}</TableCell>
                          <TableCell>{row.total_Hits}</TableCell>
                          <TableCell>{row.Last_Hit}</TableCell>
                          <TableCell>{row.action}</TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[25, 50, 100,150]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </Paper>
        )}
       
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
   
  );
  
}
