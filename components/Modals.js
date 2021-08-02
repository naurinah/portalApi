import { Button } from "@material-ui/core";
// import user from "./user";
import Modal from "react-bootstrap/Modal";
import React, { useState, useEffect } from "react";
import IconButton from '@material-ui/core/IconButton';
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
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';


function createData(acno, total_Hits, Last_Hit) {
  return { acno, total_Hits, Last_Hit,
    history: [
      { date: '2020-01-05', customerId: '11091700', amount: 3 },
      { date: '2020-01-02', customerId: 'Anonymous', amount: 1 },
    ], 
  
  
  };
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
 
  
];

function EnhancedTableHead(props) {
  const { classes, order, orderBy, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
      const { row } = props;
      const [open, setOpen] = React.useState(false);
      const classes = useRowStyles();
  };
  

  return (
    <React.Fragment>
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
    </React.Fragment>
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


 
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Name</TableCell>
              <TableCell align="right">City</TableCell>
              <TableCell align="right">Cell</TableCell>
              <TableCell align="right">Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <Row key={row.name} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
   
  }










  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [originalRows, setOriginalRows] = React.useState([]);
  const [apis, setApis] = React.useState(null);
  const [rows, setRows] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const ac = "";

  const fetchAccount = async (ac) => {
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
            <IconButton 
            aria-label="expand row" 
            size="small" 
            onClick={() => setOpen(!open)}
            >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>

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
        <IconButton 
        aria-label="expand row" 
        size="small" 
        onClick={() => setOpen(!open)}
        >
        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>

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
              await fetchAccount(a);
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
                        <>
                        <TableRow hover tabIndex={-1} key={row.ac}>
                          <TableCell>{row.total_Hits}</TableCell>
                          <TableCell>{row.Last_Hit}</TableCell>
                        </TableRow>

                         <TableRow>
                         <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                           <Collapse in={open} timeout="auto" unmountOnExit>
                             <Box margin={1}>
                               <Typography variant="h6" gutterBottom component="div">
                                 History
                               </Typography>
                               <Table size="small" aria-label="purchases">
                                 <TableHead>
                                   <TableRow>
                                     <TableCell>Date</TableCell>
                                     <TableCell>Customer</TableCell>
                                     <TableCell align="right">Amount</TableCell>
                                     <TableCell align="right">Total price ($)</TableCell>
                                   </TableRow>
                                 </TableHead>
                                 <TableBody>
                                   {row.history.map((historyRow) => (
                                     <TableRow key={historyRow.date}>
                                       <TableCell component="th" scope="row">
                                         {historyRow.date}
                                       </TableCell>
                                       <TableCell>{historyRow.customerId}</TableCell>
                                       <TableCell align="right">{historyRow.amount}</TableCell>
                                       <TableCell align="right">
                                         {Math.round(historyRow.amount * row.price * 100) / 100}
                                       </TableCell>
                                     </TableRow>
                                   ))}
                                 </TableBody>
                               </Table>
                             </Box>
                           </Collapse>
                         </TableCell>
                       </TableRow>
                       </>
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
export default function CollapsibleTable() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
