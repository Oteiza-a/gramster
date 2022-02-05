export const validateForm = (requiredFields, formFields) => {
  const invalidFields = []

  requiredFields.forEach(requiredField => {
    const currentField = formFields[requiredField]
    if (!currentField) return
    if (!currentField.validationFunc(currentField.value)) invalidFields.push(requiredField)
  })

  return invalidFields
}

export const isFormValid = (requiredFields, formFields) => {
  return !requiredFields.every(requiredField => {
    const currentField = formFields[requiredField]
    if (!currentField) return false
    return currentField.validationFunc(currentField.value)
  })
}

export const requiredField = (val) => Boolean(val)

export const isNumeric = (val) => /^\d+$/.test(val)

export const isDefined = (val) => val !== undefined && val !== null && val !== ''

export const isMoreThanZero = (val) => /^\d+$/.test(val) && val > 0

export const parseFormToObj = (form) => {
  const obj = {}
  Object.keys(form).forEach(key => obj[key] = form[key].value)
  return obj
}