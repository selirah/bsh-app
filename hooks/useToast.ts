import React from 'react'
import { toast, Slide } from 'react-toastify'

export const useToast = () => {
  const callToast = (toastComponent?: React.ReactNode) => {
    return toast(toastComponent, {
      transition: Slide,
      hideProgressBar: true,
      autoClose: 10000,
      position: 'top-right'
    })
  }

  return callToast
}
