import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React from 'react';
import './UnitsNumberInput.css'

export function UnitsNumberInput({ 
  label,
  value, 
  handleInputChange, 
  error, 

  unitsLabel,
  unitValue, 
  handleUnitChange,
  unitError,
  
  options, 
  required, 
  helperText 
}) {

  return (
    <div className='pair-inputs-container'>

      <TextField
        value={value}
        onChange={(e) => { handleInputChange(e) }}
        error={error}
        className='basic-input-spacing left-input'
        label={label}
        fullWidth={true}
        type="number"
        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
        required={required}
        helperText={helperText}
        
      />

      <FormControl 
        error={unitError} 
        className='basic-input-spacing right-input'
      >
        <TextField 
          select
          value={unitValue}
          onChange={(e) => { handleUnitChange(e) }}
          label={unitsLabel}
        >
          {options.map((option, i) => <MenuItem value={option.value} key={i}>{option.text}</MenuItem>)}
        </TextField>
      </FormControl>


    </div>
  );
}