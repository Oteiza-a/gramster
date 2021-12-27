export const validateForm = (requiredFields, formFields) => {
  const invalidFields = []
  let isFormValid = true

  requiredFields.forEach(requiredField => {
    const currentField = formFields[requiredField]
    if (!currentField) return

    if (!(validateField(currentField))) {
      invalidFields.push(requiredField)
      isFormValid = false
    } 
  })

  if (!isFormValid) return invalidFields
  return true
}

export const validateField = (field) => {
  const { value } = field
  const basicValidation = value !== undefined && value !== null && value !== ''
  const customValidation = field.customValidation ? field.customValidation(field.value) : true

  return basicValidation && customValidation
}