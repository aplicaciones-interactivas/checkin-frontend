import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  paper: {
    marginTop: theme.spacing(3),
    width: '100%',
    overflowX: 'auto',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 650,
  },
  masInfoButton: {
    marginTop: theme.spacing(1),
    width: '100%'
},
}));

function createData(tipo, habitantes, superficie, invitados, precio) {
  return { tipo, habitantes, superficie, invitados, precio };
}

const rows = [
  createData('Doble', 2, '14m2', 'No', '$1204.0'),
  createData('Simple', 1, '10m2', 'Si', '$1000.0')
];

class DenseTable extends React.Component {
  render (){
  const {data} = this.props;
  const classes = this.props;
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Table className={classes.table} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Tipo</TableCell>
              <TableCell align="right">Habitantes</TableCell>
              <TableCell align="right">Superficie&nbsp;</TableCell>
              <TableCell align="right">Invitados&nbsp;</TableCell>
              <TableCell align="right">Precio&nbsp;</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.tipo}
                </TableCell>
                <TableCell align="right">{row.habitantes}</TableCell>
                <TableCell align="right">{row.superficie}</TableCell>
                <TableCell align="right">{row.invitados}</TableCell>
                <TableCell align="right" className={classes.masInfoButton}>
                     Reservar por: {row.precio}
                    <Button hreF="" variant="contained" color="primary">
                        Reservar
                    </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
}
}

export default (DenseTable);