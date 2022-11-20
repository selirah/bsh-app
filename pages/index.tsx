import React, { useEffect } from 'react'
import { ToastBox } from 'components'
import { toast, Slide } from 'react-toastify'

export default function Home() {
  useEffect(() => {
    toast(
      <ToastBox.WithAvatar
        title="Emilia Gates"
        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3744&q=80"
        onClick={() => console.log('hey')}
        actionText="Reply"
        description="Sure! 8:30pm works great"
      />,
      {
        transition: Slide,
        hideProgressBar: true,
        autoClose: 60000,
        position: 'top-right'
      }
    )
  }, [])

  return <div className="px-8 m-56"></div>
}
