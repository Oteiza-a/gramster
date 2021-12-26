import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'

// Components
import { TextField, Select, MenuItem, FormControl, InputLabel, RadioGroup, FormControlLabel, Radio, FormLabel, Button } from '@mui/material';
import { Separator } from '../../components/separator/Separator'
import { BasicHeader } from '../../components/basic-header/BasicHeader';
import { UnitsNumberInput } from '../../components/units-number-input/UnitsNumberInput';

// Utils
import { colorPalette } from '../../fixed-data/colorPalette'
import { validateField, validateForm } from '../../utils/forms';
import { unitsOfMeasurements } from '../../fixed-data/unitsOfMeasurements';

// Icons
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

// CSS
import './SheetForm.css'

export function SheetForm() {
  
  const navigate = useNavigate();

  const [form, setForm] = useState({
    sheetName: { value: '', error: false },
    sheetType: { value: '', error: false },
    hasLimit: { value: '', error: false },
    sheetLimit: { value: '', error: false, customValidation: (val) => val !== 0 },
    sheetLimitUnit: { value: '', error: false },
  })
  const [units, setUnits] = useState([])
  const [requiredFields, setRequiredFields] = useState(['sheetName', 'sheetType', 'hasLimit'])

  const handleFormChange = (fieldName, inputValue) => {
    let checkedField = form[fieldName]

    if (!particularInstructions(fieldName, inputValue)) return

    checkedField.value = inputValue
    checkedField.error = !validateField(checkedField)

    setForm({
      ...form,
      [fieldName]: checkedField
    })
  }

  const particularInstructions = (fieldName, inputValue) => {
    let isValid = true
    if (fieldName === 'sheetType') selectUnit(inputValue)
    if (fieldName === 'hasLimit') {
      const modifiedFields = ['sheetLimit', 'sheetLimitUnit']
      let newFields = []
      if (inputValue) newFields = [...requiredFields, ... modifiedFields]
      if (!inputValue) newFields = requiredFields.filter(field => !modifiedFields.includes(field))
      setRequiredFields(newFields)
    }

    isValid = !(fieldName === 'sheetLimit' && inputValue < 0)

    return isValid
  }

  const submitSheetForm = () => {
    const formValidation = validateForm(requiredFields, form)

    if (formValidation === true) {
      alert('success')
    } else {
      const formChecked = {}

      Object.keys(form).forEach((fieldName) => {
        const fieldObj = form[fieldName]
        if (formValidation.includes(fieldName)) fieldObj.error = true
        formChecked[fieldName] = fieldObj
      })

      setForm(formChecked)
    }
  }

  const selectUnit = (unit) => {
    setUnits(unitsOfMeasurements[unit])
  }

  const goBack = () => {
    navigate(-1)
  }

  return (
    <div className='sheet-page-container'>
      <div className='form-page-template'>

        <BasicHeader 
          whiteText='Create' 
          secondText='New Sheet'
          icon={<ArrowBackIosNewIcon onClick={goBack} fontSize='small' color={'primary'} />}
        />

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
              <MenuItem value={'proportions'}>Portions (1/4, 1/2)</MenuItem>
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
            ? <UnitsNumberInput 
                label='Determined Limit'
                value={form['sheetLimit'].value}
                handleInputChange={(e) => { handleFormChange('sheetLimit', e.target.value) }}
                error={form['sheetLimit'].error}
                
                unitValue={form['sheetLimitUnit'].value}
                handleUnitChange={(e) => { handleFormChange('sheetLimitUnit', e.target.value) } }
                options={units}
                unitError={form['sheetLimitUnit'].error}
                
                unitsLabel='Unit'
                required={true} 
                helperText="Can be changed later"
              />
            : ''
          }

          {/* SUBMIT BTN */}
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