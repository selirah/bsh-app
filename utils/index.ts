import { KeyValuePair, ErrorResponse } from 'types'
import CrytoJS from 'crypto-js'

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
  return new File([u8arr], filename, { type: mime as string })
}

export const urlToFile = async (url: string, filename: string, mimeType = 'image/png') => {
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

export const resizeImage = (base64Str: any, maxWidth = 500, maxHeight = 500) => {
  return new Promise((resolve) => {
    let img = new Image()
    img.src = base64Str
    img.onload = () => {
      let canvas = document.createElement('canvas')
      let width = img.width
      let height = img.height

      if (width > height) {
        if (width > maxWidth) {
          height *= maxWidth / width
          width = maxWidth
        }
      } else {
        if (height > maxHeight) {
          width *= maxHeight / height
          height = maxHeight
        }
      }
      canvas.width = width
      canvas.height = height
      let ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, width, height)
      resolve(canvas.toDataURL())
    }
  })
}

export const isFileLarge = (size: number) => {
  return size / 1024 / 1024 > 5
}

export const isFileSizesLargerThan5MB = (files: File[]) => {
  let size = 0
  for (let file of files) {
    if (file) {
      size += file.size
    }
  }
  return isFileLarge(size)
}

export const encryptPassword = (password: string) => {
  const secretKey = CrytoJS.enc.Utf8.parse(process.env.NEXT_PUBLIC_PASSWORD_ENCRYPTION_SECRET)
  const iv = CrytoJS.enc.Utf8.parse(process.env.NEXT_PUBLIC_PASSWORD_ENCRYPTION_IV)

  const encrypted = CrytoJS.AES.encrypt(CrytoJS.enc.Utf8.parse(password), secretKey, {
    iv: iv,
    keySize: 128 / 8,
    mode: CrytoJS.mode.CBC,
    padding: CrytoJS.pad.Pkcs7
  })

  return encrypted.toString()
}
