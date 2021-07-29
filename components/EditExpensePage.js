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
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, city, cell,email) {
  return { name, city, cell,email};
}
const headCells = [
  { id: "name", numeric: false, disablePadding: false, label: "Name" },
  { id: "city", numeric: false, disablePadding: false, label: "Address" },
  { id: "cell", numeric: false, disablePadding: false,label: "Cell"},
   {id: "email", numeric: false,disablePadding: false, label: "Email"},
];


    export default function EditExpensePage () {
       const classes = useStyles();
       const [open, setOpen] = React.useState(false);
      const [order, setOrder] = React.useState("asc");
      const [orderBy, setOrderBy] = React.useState("calories");
      const [page, setPage] = React.useState(0);
      const [rowsPerPage, setRowsPerPage] = React.useState(10);
      const [apis, setApis] = React.useState(null);
      const [rows, setRows] = React.useState([]);
      const [isLoading, setIsLoading] = React.useState(true);
      
      const fetchAccount = async (ac) => {
              let newRows = rows;
              const response = await fetch(
                `http://portal.blue-ex.com/api1/customerportal/viewprofile.py?acno=${ac}`
              ).then((res) => res.json());
              console.log(response.detail);
              if (newRows === []) {
                newRows = [
                  createData(
                    response.detail[0]["Name"],
                    response.detail[0]["City"],
                    response.detail[0]["Cell"] === null
                      ? "---"
                      : response.detail[0]["Cell"]
                    response.detail[0]["Email"],
                  ),
                ];
              } else {
                newRows.push(
                  createData(
                    response.detail[0]["Name"],
                    response.detail[0]["City"],
                    response.detail[0]["Cell"] === null
                      ? "---"
                      : response.detail[0]["Cell"]
                    response.detail[0]["Email"],
                  )
                );
              }
              setRows(newRows);
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

            useEffect(() => {
              console.log("rows", rows);
            }, [rows]);


      
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
            <TableCell align="left">NAME</TableCell>
            <TableCell align="left">CELL</TableCell>
            <TableCell align="left">EMAIL</TableCell>
            <TableCell align="left">CITY</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
             <TableRow hover tabIndex={-1} key={row.account}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.city}</TableCell>
              <TableCell align="right">{row.cell}</TableCell>
              <TableCell align="right">{row.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
 
          </DialogContentText>
        </DialogContent>
        {<DialogActions>
         
          <Button onClick={handleClose} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>}
      </Dialog>
        </div>
       
    )
}
