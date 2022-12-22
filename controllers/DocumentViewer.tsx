import { useState } from 'react'
import { FileViewer, Modal, ModalHeader, ModalBody } from 'components'
import { getBase64 } from 'utils'

type Props = {
  isOpen: boolean
  toggle: () => void
  file: File
}

export const DocumentViewer: React.FC<Props> = (props) => {
  const { file, isOpen, toggle } = props
  const [data, setData] = useState('')

  getBase64(file).then((data: string) => setData(data))

  return (
    <Modal isOpen={isOpen} size="lg">
      <ModalHeader toggle={toggle} border>
        {file.name}
      </ModalHeader>
      <ModalBody>
        <FileViewer url={data} allowFullScreen />
      </ModalBody>
    </Modal>
  )
}
