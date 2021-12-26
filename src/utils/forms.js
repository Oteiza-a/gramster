export const validateForm = (requiredFields, formFields) => {
  const invalidFields = []

  const isFormValid = requiredFields.every(requiredField => {
    const currentField = formFields[requiredField]
    if (!currentField) return true

    if (!(validateField(currentField))) {
      invalidFields.push(requiredField)
      return false
    } 

    return true
  })

  if (!isFormValid) return invalidFields
  return false
}

export const validateField = (field) => {
  const { value } = field
  const basicValidation = value !== undefined && value !== null && value !== ''
  const customValidation = field.customValidation ? field.customValidation(field.value) : true

  return basicValidation && customValidation
}