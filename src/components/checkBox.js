import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

function FormControlLabelPosition({nameLabel}) {
  const [value, setValue] = React.useState('female');

  const handleChange = event => {
    setValue(event.target.value);
  };

  return (
    <FormControl component="fieldset">
      <FormGroup aria-label="position" name="position" value={value} onChange={handleChange} row>
        <FormControlLabel
          value="end"
          control={<Checkbox color="primary" />}
          label={nameLabel}
          labelPlacement="end"
        />
      </FormGroup>
    </FormControl>
  );
}

export default FormControlLabelPosition;
