import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
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
  return {name, cell, city, email};
}


const fetchAccount = async (ac) => {
    let newRows = rows;
    const response = await fetch(
      `https://bigazure.com/api/json_v4/dashboard/API_PORTAL_API/api_customer.php?api_no=${ac}`
    ).then((res) => res.json());
    newRows = [];
    if (newRows === []) {
      response.map((a) => {
        newRows = [createData(a["Name"], a["Cell"], a["Email"],a["Email"])];
      });
    } else {
      response.map((a) => {
        newRows.push(createData(a["Name"], a["Cell"], a["Email"],a["Email"]));
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



    export default function EditExpensePage () {
        const [orderBy, setOrderBy] = React.useState("calories");

         const classes = useStyles();
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
        <DialogTitle id="alert-dialog-title">{"Customer Account Details"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
             <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Cell</TableCell>
            <TableCell align="right">City</TableCell>
            <TableCell align="right">Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.Name}</TableCell>
              <TableCell align="right">{row.Cell}</TableCell>
              <TableCell align="right">{row.Email}</TableCell>
              <TableCell align="right">{row.Email}</TableCell>
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
