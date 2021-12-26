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
        variant='filled'
        label={label}
        fullWidth={true}
        type="number"
        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
        shrink
        required={required}
        helperText={helperText}
        
      />

      <FormControl 
        error={unitError} 
        className='basic-input-spacing right-input'
      >
        <InputLabel id={unitsLabel}>{unitsLabel}</InputLabel>
        <Select 
          value={unitValue}
          onChange={(e) => { handleUnitChange(e) }}
          variant='filled'
          labelId={unitsLabel}
        >
          {options.map((option) => <MenuItem value={option.value}>{option.text}</MenuItem>)}
        </Select>
      </FormControl>


    </div>
  );
}