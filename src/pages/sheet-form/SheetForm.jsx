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
import { isDefined, isFormValid, isMoreThanZero, parseFormToObj, requiredField, validateForm } from '../../helpers/forms';
import { unitsOfMeasurements } from '../../fixed-data/unitsOfMeasurements';

// Icons
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';
import HelpTwoToneIcon from '@mui/icons-material/HelpTwoTone';
import ErrorTwoToneIcon from '@mui/icons-material/ErrorTwoTone';

// Clients
import { postSheet } from '../../clients/sheets';

// CSS
import './SheetForm.css'

export function SheetForm() {
  
  const navigate = useNavigate();

  const [units, setUnits] = useState([{ value: '', text: 'Select a type of measurement' }])
  const [modalOpen, setModalOpen] = useState(false)
  const [modalDialog, setModalDialog] = useState({})
  const [loadingOverlay, setLoadingOverlay] = useState(false)
  const [requiredFields, setRequiredFields] = useState(['name', 'type', 'hasLimit'])
  const [form, setForm] = useState({
    name: { value: '', validationFunc: requiredField, error: false, render: true },
    type: { value: '', validationFunc: requiredField, error: false, render: true },
    hasLimit: { value: '', validationFunc: isDefined, error: false, render: true },
    limit: { value: '', validationFunc: (val) => requiredField(val) && isMoreThanZero(val), error: false, render: true },
    limitUnit: { value: '', validationFunc: requiredField, error: false, render: true },
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
    acceptButtonCallback: () => { navigate('/sheets/index') },
  }

  const errorDialog = {
    icon: <ErrorTwoToneIcon color='error' fontSize='inherit' />,
    title: 'Oops!',
    text: 'There has been a problem generating the sheet, try again.',
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
    if (fieldName === 'type') selectUnit(inputValue)
    if (fieldName === 'hasLimit') {
      const modifiedFields = ['limit', 'limitUnit']
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

  const createSheet = async () => {
    const sheetObj = parseFormToObj(form)

    const resData = await postSheet(sheetObj)
    if (resData) {
      setModalDialog(successDialog)
    } else {
      setModalDialog(errorDialog)
    }
    
    setLoadingOverlay(false)
    setModalOpen(true)
  }

  const selectUnit = (unit) => setUnits(unitsOfMeasurements[unit])

  const goBack = () => navigate(-1)

  return (
    <div className='sheet-page-container'>

      <LoadingOverlay loading={loadingOverlay} /> 

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
            value={form['name'].value}
            onChange={(e) => { handleFormChange('name', e.target.value) }}
            error={form['name'].error}
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
              value={form['type'].value}
              onChange={(e) => { handleFormChange('type', e.target.value) }}
              error={form['type'].error} 
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
            <FormLabel component="legend" >Sheet has determined limits</FormLabel>
            <RadioGroup
              value={form['hasLimit'].value}
              onChange={(e) => { handleFormChange('hasLimit', e.target.value === 'true' ? true : false)}}
              name="radio-buttons-group"
              row
            >
              <FormControlLabel value={true} control={<Radio />} label="Yes" className='text'/>
              <FormControlLabel value={false} control={<Radio />} label="No" className='text'/>
            </RadioGroup>
          </FormControl>

          {/* SHEET LIMITS */}
          {form['hasLimit'].value
            ? <UnitsNumberInput 
                label='Determined Limit'
                value={form['limit'].value}
                handleInputChange={(e) => { handleFormChange('limit', e.target.value) }}
                error={form['limit'].error}
                
                unitValue={form['limitUnit'].value}
                handleUnitChange={(e) => { handleFormChange('limitUnit', e.target.value) } }
                options={units}
                unitError={form['limitUnit'].error}
                
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
            disabled={isFormValid(requiredFields, form)}
          >
            Create Sheet
          </Button>

          <Separator color={colorPalette.darkerWhite} marginTop='20px'/>

        </div>
      </div>
    </div>
  );
}