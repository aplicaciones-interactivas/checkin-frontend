import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 130,
      textAlign: 'center',
    },
    dense: {
      marginTop: 19,
    },
    menu: {
      width: 200,
    },
  }));

export default function InputField() {
    const classes = useStyles();
    const [values, setValues] = React.useState({
      people: '',
    });

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
      };
    return (
        <TextField
                id="standard-number"
                label="Personas"
                value={values.people}
                onChange={handleChange('people')}
                type="number"
                className={classes.textField}
                InputLabelProps={{
                shrink: true,
                }}
                margin="normal"
            />
    )
}