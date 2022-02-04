import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'

// Components
import { TextField, MenuItem, FormControl, RadioGroup, FormControlLabel, Radio, FormLabel, Button } from '@mui/material';
import { Separator } from '../../components/separator/Separator'
import { BasicHeader } from '../../components/basic-header/BasicHeader';
import { UnitsNumberInput } from '../../components/units-number-input/UnitsNumberInput';
import { LoadingOverlay } from '../../components/loading-overlay/LoadingOverlay';
import { ModalBase } from '../../components/modal-base/ModalBase';
import { ModalDialog } from '../../components/modal-dialog/ModalDialog';

// Utils
import { colorPalette } from '../../fixed-data/colorPalette'
import { isDefined, isMoreThanZero, parseFormToObj, requiredField, validateForm } from '../../helpers/forms';
import { unitsOfMeasurements } from '../../fixed-data/unitsOfMeasurements';

// Icons
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';
import HelpTwoToneIcon from '@mui/icons-material/HelpTwoTone';

// CSS
import './SheetForm.css'

export function SheetForm() {
  
  const navigate = useNavigate();

  const [units, setUnits] = useState([{ value: '', text: 'Select a type of measurement' }])
  const [disableForm, setDisableForm] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalDialog, setModalDialog] = useState({})
  const [loadingOverlay, setLoadingOverlay] = useState(false)
  const [requiredFields, setRequiredFields] = useState(['sheetName', 'sheetType', 'hasLimit'])
  const [form, setForm] = useState({
    sheetName: { value: '', validationFunc: requiredField, error: false, render: true },
    sheetType: { value: '', validationFunc: requiredField, error: false, render: true },
    hasLimit: { value: '', validationFunc: isDefined, error: false, render: true },
    sheetLimit: { value: '', validationFunc: (val) => requiredField(val) && isMoreThanZero(val), error: false, render: true },
    sheetLimitUnit: { value: '', validationFunc: requiredField, error: false, render: true },
  })
  const confirmDialog = {
    icon: <HelpTwoToneIcon color='primary' fontSize='inherit'/>,
    title: 'Confirmation',
    text: 'Do you want to confirm the sheet?',
    acceptButtonText: 'Confirm',
    rejectButtonText: 'Cancel',
    acceptButtonCallback: () => { setModalOpen(false); setLoadingOverlay(true); createSheet(); },
    rejectButtonCallback: () => { setModalOpen(false) },
  }

  const successDialog = {
    icon: <CheckCircleTwoToneIcon color='success' fontSize='inherit' />,
    title: 'Success',
    text: 'The sheet has been generated successfully.',
    acceptButtonText: 'Ok',
    acceptButtonCallback: () => { setModalOpen(false) },
  }

  const handleFormChange = (fieldName, inputValue) => {
    let field = form[fieldName]
    
    field.value = inputValue
    field.error = !field.validationFunc(inputValue)

    specificInstructions(fieldName, inputValue)
    
    setForm({
      ...form,
      [fieldName]: field,
    })
  }

  const specificInstructions = (fieldName, inputValue) => {
    if (fieldName === 'sheetType') selectUnit(inputValue)
    if (fieldName === 'hasLimit') {
      const modifiedFields = ['sheetLimit', 'sheetLimitUnit']
      let newFields = []
      if (inputValue) newFields = [...requiredFields, ...modifiedFields]
      if (!inputValue) newFields = requiredFields.filter(field => !modifiedFields.includes(field))
      setRequiredFields(newFields)
    }
  }

  const submitSheetForm = () => {
    const invalidFields = validateForm(requiredFields, form)
    
    if (invalidFields && invalidFields.length === 0) {
      setModalDialog(confirmDialog)
      setModalOpen(true)

    } else {
      const formChecked = {}

      Object.keys(form).forEach((fieldName) => {
        const fieldObj = form[fieldName]
        if (invalidFields.includes(fieldName)) fieldObj.error = true
        formChecked[fieldName] = fieldObj
      })

      setForm(formChecked)
    }
  }

  const createSheet = () => {
    const sheetObj = parseFormToObj(form)
    console.log(sheetObj)
  }

  const selectUnit = (unit) => setUnits(unitsOfMeasurements[unit])

  const goBack = () => navigate(-1)

  return (
    <div className='sheet-page-container'>

      <LoadingOverlay loading={loadingOverlay}/> 

      <ModalBase isOpen={modalOpen}>
        <ModalDialog 
          {...modalDialog}
        />
      </ModalBase>

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
            label='Sheet Name'
            fullWidth={true}
            required
          />
          
          {/* SHEET TYPE */}
          <FormControl 
            required 
            className='sheet-form-control basic-input-spacing'
            fullWidth={true}
          >
            <TextField 
              select
              value={form['sheetType'].value}
              onChange={(e) => { handleFormChange('sheetType', e.target.value) }}
              error={form['sheetType'].error} 
              label='Type'
            >
              <MenuItem value=''><em>Select a type</em></MenuItem>
              <MenuItem value={'grams'}>Kilos, Grams, Milligrams (2kg, 500gr, 300mg)</MenuItem>
              <MenuItem value={'liters'}>Liters, Milliliters (2lt, 400ml)</MenuItem>
              <MenuItem value={'proportions'}>Portions (1/4, 1/2)</MenuItem>
            </TextField>
          </FormControl>

          {/* SHEET HAS LIMITS */}
          <FormControl 
            required
            className='sheet-form-control radio-input-spacing' 
            component="fieldset"
            fullWidth={true}
            error={form['hasLimit'].error}
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
            disabled={disableForm}
          >
            Create Sheet
          </Button>

          <Separator color={colorPalette.darkerWhite} marginTop='20px'/>

        </div>
      </div>
    </div>
  );
}