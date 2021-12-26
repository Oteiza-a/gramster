import React, { useState } from 'react';

// Components
import { TextField, Select, MenuItem, FormControl, InputLabel, RadioGroup, FormControlLabel, Radio, FormLabel, Button } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Separator } from '../../components/separator/Separator'

// Utils
import { colorPalette } from '../../fixed-data/colorPalette'
import { validateField, validateForm } from '../../utils/forms';

// CSS
import './SheetForm.css'

export function SheetForm() {

  const [form, setForm] = useState({
    sheetName: { value: '', error: false },
    sheetType: { value: '', error: false },
    hasLimit: { value: '', error: false },
    sheetLimit: { value: '', error: false, customValidation: (val) => val !== 0 },
  })
  const requiredFields = [ 'sheetName', 'sheetType', 'hasLimit', 'sheetLimit']

  const handleFormChange = (fieldName, inputValue) => {
    let checkedField = form[fieldName]
    checkedField.value = inputValue
    checkedField.error = !validateField(checkedField)

    setForm({
      ...form,
      [fieldName]: checkedField
    })
  }

  const submitSheetForm = () => {
    const formValidation = validateForm(requiredFields, form)

    if (formValidation === true) {
      // FORM SUCCESS
    } else {
      // CHECK ERRORS IN PARTICULAR FIELDS RETURN ED
    }
  }

  return (
    <div className='sheet-page-container'>
      <div className='basic-page-template'>

        <div className='flex-text-wrapper'>
          <div className='title'>Create</div>
          <div className='title primary-text'>New Sheet</div>
        </div>

        <Separator color={colorPalette.darkerWhite} marginBottom='0px'/>

        <div className="sheet-from-container">

          {/* SHEET NAME */}
          <TextField
            value={form['sheetName'].value}
            onChange={(e) => { handleFormChange('sheetName', e.target.value) }}
            error={form['sheetName'].error}
            className='basic-input-spacing'
            variant='filled'
            label='Sheet Name'
            fullWidth={true}
            required
          />
          
          {/* SHEET TYPE */}
          <FormControl 
            required 
            error={form['sheetType'].error} 
            className='sheet-form-control basic-input-spacing'
          >
            <InputLabel id='type'>Type</InputLabel>
            <Select 
              value={form['sheetType'].value}
              onChange={(e) => { handleFormChange('sheetType', e.target.value) }}
              
              variant='filled'
              labelId='type'
            >
              <MenuItem value=''><em>Select a type</em></MenuItem>
              <MenuItem value={'grams'}>Kilos, Grams, milligrams (2kg, 500gr, 300mg)</MenuItem>
              <MenuItem value={'liters'}>Liters, Milliliters (2lt, 400ml)</MenuItem>
              <MenuItem value={'proportions'}>Proportions (1/4, 1/2)</MenuItem>
            </Select>
          </FormControl>

          {/* SHEET HAS LIMITS */}
          <FormControl 
            required
            error={form['hasLimit'].error}
            className='sheet-form-control radio-input-spacing' 
            component="fieldset"
          >
            <FormLabel component="legend">Sheet has determined limits</FormLabel>
            <RadioGroup
              value={form['hasLimit'].value}
              onChange={(e) => { handleFormChange('hasLimit', e.target.value === 'true' ? true : false)}}
              name="radio-buttons-group"
              row
            >
              <FormControlLabel value={true} control={<Radio />} label="Yes" />
              <FormControlLabel value={false} control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>

          {/* SHEET LIMITS */}
          {form['hasLimit'].value
            ? <TextField
                value={form['sheetLimit'].value}
                onChange={(e) => { handleFormChange('sheetLimit', e.target.value) }}
                error={form['sheetLimit'].error}
                className='top-radio-spacing'
                variant='filled'
                label='Determined Limit'
                fullWidth={true}
                type="number"
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                shrink
                required
                helperText="Can be changed later"
              />
            : ''
          }

          <Button 
            onClick={submitSheetForm} 
            variant="contained"
            className='basic-input-spacing submit-button'
            endIcon={<AddCircleOutlineIcon color='white'/>}
          >
            Create Sheet
          </Button>

          <Separator color={colorPalette.darkerWhite} marginTop='20px'/>

        </div>

      </div>
    </div>
  );
}