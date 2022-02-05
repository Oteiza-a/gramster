import axios from 'axios'

const clientName = 'sheet'

export const getSheets = async () => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/sheets`)
    return res.data
  } catch (err) {
    console.error(`${clientName} client error:`, err)
  }
}

export const postSheet = async (sheet) => {
  try {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/sheets`, sheet)
    return res.data
  } catch (err) {
    console.error(`${clientName} client error:`, err)
  }
}
