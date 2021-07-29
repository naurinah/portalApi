import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, cell, city, email) {
  return {
    name, cell, city, email,
  };
}

const headCells = [
  {
    id: 'name', numeric: false, disablePadding: false, label: 'NAME',
  },
  {
    id: 'cell', numeric: false, disablePadding: false, label: 'CELL',
  },
  {
    id: 'city', numeric: false, disablePadding: false, label: 'CITY',
  },
  {
    id: 'email', numeric: false, disablePadding: false, label: 'email',
  },
];

export default function EditExpensePage() {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => { setOpen(true); };
  const handleClose = () => { setOpen(false); };
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [originalRows, setOriginalRows] = React.useState([]);
  const [apis, setApis] = React.useState(null);
  const [rows, setRows] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const fetchAccount = async (ac) => {
    let newRows = rows;
    const response = await fetch(
      `http://portal.blue-ex.com/api1/customerportal/viewprofile.py?acno=${ac}`
    ).then((res) => res.json());
    newRows = [];
    if (newRows === []) {
      response.map((a) => {
        newRows = [createData(a.acno, a.total_Hits, a.Last_Hit)];
      });
    } else {
      response.map((a) => {
        newRows.push(createData(a.acno, a.total_Hits, a.Last_Hit));
      });
    }

    setRows(newRows);
    setOriginalRows(newRows);
    setIsLoading(false);
  };

  useEffect(async () => {
    if (acno !== undefined) {
      setIsLoading(true);
      setRows([]);
      let acSplit = [''];
      acSplit = acno.split(',');
      if (acSplit !== undefined) {
        acSplit.map(async (a) => {
          if (a !== '') {
            await fetchAccount(a);
          }
        });
      }
      setIsLoading(false);
    }
  }, [acno]);

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>Open alert dialog </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">Use Google's location service?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
              <Paper className={classes.paper}>
                <TableContainer component={Paper}>
                  <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Dessert (100g serving)</TableCell>
                        <TableCell align="right">Calories</TableCell>
                        <TableCell align="right">Fat&nbsp;(g)</TableCell>
                        <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                        <TableCell align="right">Protein&nbsp;(g)</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row) => (
                        <TableRow key={row.name}>
                          <TableCell component="th" scope="row">
                            {row.name}
                          </TableCell>
                          <TableCell align="right">{row.calories}</TableCell>
                          <TableCell align="right">{row.fat}</TableCell>
                          <TableCell align="right">{row.carbs}</TableCell>
                          <TableCell align="right">{row.protein}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
          
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
