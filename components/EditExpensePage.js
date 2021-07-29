import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

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

    export default function EditExpensePage () {
        const [open, setOpen] = React.useState(false);
      
        const handleClickOpen = () => {
          setOpen(true);
        };
      
        const handleClose = () => {
          setOpen(false);
        };
   
    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open alert dialog
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           <TableContainer component={Paper}>
                  <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>{row.name}</TableCell>
                        <TableCell align="right">{row.cell}</TableCell>
                        <TableCell align="right">{row.city}</TableCell>
                        <TableCell align="right">{row.email}</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row) => (
                        <TableRow key={row.name}>
                          <TableCell component="th" scope="row">
                            {row.name}
                          </TableCell>
                          <TableCell align="right">{row.name}</TableCell>
                          <TableCell align="right">{row.cell}</TableCell>
                          <TableCell align="right">{row.city}</TableCell>
                          <TableCell align="right">{row.email}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
          </DialogContentText>
        </DialogContent>
        {/* <DialogActions>
          <Button onClick={handleClose} color="primary">
            Disagree
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions> */}
      </Dialog>
        </div>
       
    )
}
