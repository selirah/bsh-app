import { KeyValuePair, ErrorResponse } from 'types'

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

export const detectMimeType = (base64: string) => {
  let signatures: KeyValuePair = {
    JVBERi0: 'application/pdf',
    R0lGODdh: 'image/gif',
    R0lGODlh: 'image/gif',
    iVBORw0KGgo: 'image/png',
    '/9j/': 'image/jpg'
  }
  for (let s in signatures) {
    if (base64.indexOf(s) === 0) {
      return signatures[s]
    }
  }
}

export const dataURLtoFile = (dataUrl: string, filename: string) => {
  let mime = detectMimeType(dataUrl)
  const bstr = Buffer.from(dataUrl, 'base64').toString()
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], filename, { type: mime })
}

export const urlToFile = async (url: string, filename: string, mimeType: string = 'image/png') => {
  const res = await fetch(url)
  const buffer = await res.arrayBuffer()
  return new File([buffer], filename, { type: mimeType })
}

export const getBase64 = (file: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}
