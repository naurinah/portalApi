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
    minWidth: 850,
  },
});
function createData(name, cell, city, email) {
  return {name, cell, city, email};
}
export default function EditExpensePage (reload, setReload) {
        const classes = useStyles();
        const [open, setOpen] = React.useState(false);
        const handleClickOpen = () => {setOpen(true);  };
        const handleClose = () => { setOpen(false); };
        const [apis, setApis] = React.useState(null);
        const [rows, setRows] = React.useState([]);
        const fetchAccountDetails = async (ac) => {
       let newRows = rows;
      const response = await fetch(
        `http://portal.blue-ex.com/api1/customerportal/viewprofile.py?acno=${ac}`
      ).then((res) => res.json());
      };
   React.useEffect(async () => {
    if (reload) {
      setIsLoading(true);
      await fetchApiDetails();
      setIsLoading(false);
      setReload(false);
    }
  }, [reload]);
  React.useEffect(() => {
    if (apis) {
      setOriginalRows([]);
      let newRows = [];
      apis.map((a) => {
        newRows.push(
          createData(
            a["name"],
            a["city"],
            a["cell"],
            <AddCircleOutlineIcon
              className="cursor-pointer"
              onClick={() => {
                setModalAcno(a["api_no"]);
                setModalShow(true);
              }}
            />
          )
        );
      });
      setRows(newRows);
      setOriginalRows(newRows);
      setIsLoading(false);
    }
  }, [apis]);
  React.useEffect(async () => {
    await fetchApiDetails();
  }, []);
    return (
         <div>
//          <Button variant="outlined" color="primary" onClick={handleClickOpen} >ACTION </Button>
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
              <TableCell align="right">response.{row.Name}</TableCell>
              <TableCell align="right">response.{row.Cell}</TableCell>
              <TableCell align="right">response.{row.Email}</TableCell>
              <TableCell align="right">response.{row.Email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
              
          </DialogContentText>
        </DialogContent>
       <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
        </div>
       
    )
}
