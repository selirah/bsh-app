import React, { useState } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'components'

export default function Home() {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="px-8 m-56">
      <Button onClick={toggle}>Open Modal</Button>
      <Modal isOpen={isOpen} size="lg">
        <ModalHeader toggle={toggle} border>
          Payment Successful
        </ModalHeader>
        <ModalBody>
          <div>You can see the modal</div>
        </ModalBody>
        <ModalFooter border>
          <Button>Save</Button>
          <Button outline color="default" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}
