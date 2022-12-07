import { ErrorResponse } from 'schema/Axios'

export const formatNumber = (n: string) => {
  return n.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export const getFileExtension = (filename: string) => {
  return filename.split('.').pop().toLowerCase()
}

export const onAxiosError = (error: ErrorResponse, setError: (value: string) => void) => {
  if (error.response && error.response.data) {
    const err = JSON.stringify(error.response.data).replace(/\"/g, '')
    setError(err)
  } else if (error.message) {
    const err = JSON.stringify(error.message).replace(/\"/g, '')
    setError(err)
  }
}
