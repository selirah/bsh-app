import React from 'react'
import { TrashIcon, PhotographIcon, DocumentIcon } from '@heroicons/react/solid'
import { getFileExtension } from 'utils'

interface FileBulletProps {
  file: File
  onRemove?: () => void
  onClick?: (file: File) => void
}

export const FileBullet: React.FC<FileBulletProps> = (props) => {
  const { file, onRemove, onClick } = props

  return (
    <div className="flex justify-between mt-2">
      <div
        className="inline-flex items-center space-x-2 font-montserrat font-medium text-pSmall cursor-pointer"
        onClick={() => onClick(file)}
      >
        {getFileExtension(file.name) === 'jpeg' || getFileExtension(file.name) === 'png' ? (
          <PhotographIcon className="w-5 h-5 text-light-text dark:text-dark-tex hover:text-primary common-transitiont" />
        ) : (
          <DocumentIcon className="w-5 h-5 text-light-text dark:text-dark-text hover:text-primary common-transition" />
        )}
        <span className="text-light-text dark:text-dark-text hover:text-primary common-transition">
          {file.name}
        </span>
      </div>
      <TrashIcon className="w-5 h-5 text-error-text dark:text-dark-text" onClick={onRemove} />
    </div>
  )
}
