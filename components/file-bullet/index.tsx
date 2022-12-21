import { FiTrash, FiImage, FiFile } from 'react-icons/fi'
import { getFileExtension } from 'utils'
import { BsFileEarmarkPdfFill } from 'react-icons/bs'
import { FileError } from 'react-dropzone'
import classnames from 'classnames'

type Props = {
  file: File
  onClick?: (file: File) => void
}

type FileBulletProps = Props & {
  onRemove?: (file: File) => void
}

type FileErrorWrapperProps = Props & {
  errors: FileError[]
  onRemove?: (file: File) => void
}

type FileViewerListProps = Props & {
  rightAlign?: boolean
}

export const FileBullet: React.FC<FileBulletProps> = (props) => {
  const { file, onRemove, onClick } = props

  return (
    <div className="flex justify-between mt-2">
      <div
        className="inline-flex items-center space-x-2 font-montserrat font-medium text-pSmall cursor-pointer"
        onClick={() => (onClick ? onClick(file) : null)}
      >
        {getFileExtension(file.name) === 'jpeg' || getFileExtension(file.name) === 'png' ? (
          <FiImage className="w-5 h-5 text-light-text dark:text-dark-text hover:text-primary common-transitiont" />
        ) : getFileExtension(file.name) === 'pdf' ? (
          <BsFileEarmarkPdfFill className="w-5 h-5 text-light-text dark:text-dark-text hover:text-primary common-transition" />
        ) : (
          <FiFile className="w-5 h-5 text-light-text dark:text-dark-text hover:text-primary common-transition" />
        )}
        <span className="text-light-text dark:text-dark-text hover:text-primary common-transition">
          {file.name}
        </span>
      </div>
      <FiTrash className="w-5 h-5 text-error cursor-pointer" onClick={() => onRemove(file)} />
    </div>
  )
}

export const FileErrorWrapper: React.FC<FileErrorWrapperProps> = (props) => {
  const { file, onRemove, onClick, errors } = props

  return (
    <>
      <div className="flex justify-between mt-2">
        <div
          className="inline-flex items-center space-x-2 font-montserrat font-medium text-pSmall cursor-pointer"
          onClick={() => (onClick ? onClick(file) : null)}
        >
          {getFileExtension(file.name) === 'jpeg' || getFileExtension(file.name) === 'png' ? (
            <FiImage className="w-5 h-5 text-light-text dark:text-dark-text hover:text-primary common-transitiont" />
          ) : getFileExtension(file.name) === 'pdf' ? (
            <BsFileEarmarkPdfFill className="w-5 h-5 text-light-text dark:text-dark-text hover:text-primary common-transition" />
          ) : (
            <FiFile className="w-5 h-5 text-light-text dark:text-dark-text hover:text-primary common-transition" />
          )}
          <span className="text-light-text dark:text-dark-text hover:text-primary common-transition">
            {file.name}
          </span>
        </div>
        <FiTrash className="w-5 h-5 text-error cursor-pointer" onClick={() => onRemove(file)} />
      </div>
      {errors.map((error, index) => (
        <div key={index} className="font-montserrat text-pSmall text-error">
          {error.message}
        </div>
      ))}
    </>
  )
}

export const FileViewerList: React.FC<FileViewerListProps> = (props) => {
  const { file, onClick, rightAlign } = props

  return (
    <div
      className={classnames('items-center px-2 py-4 w-full', {})}
      onClick={() => (onClick ? onClick(file) : null)}
    >
      <div
        className={classnames(
          'inline-flex items-center space-x-2 font-montserrat font-medium text-pSmall cursor-pointer'
        )}
      >
        {getFileExtension(file.name) === 'jpeg' || getFileExtension(file.name) === 'png' ? (
          <FiImage className="w-4 h-4 text-light-text dark:text-dark-text hover:text-primary common-transitiont" />
        ) : getFileExtension(file.name) === 'pdf' ? (
          <BsFileEarmarkPdfFill className="w-4 h-4 text-light-text dark:text-dark-text hover:text-primary common-transition" />
        ) : (
          <FiFile className="w-4 h-4 text-light-text dark:text-dark-text hover:text-primary common-transition" />
        )}
        <span
          className={classnames(
            'text-light-text dark:text-dark-text hover:text-primary common-transition',
            {
              'text-right': rightAlign
            }
          )}
        >
          {file.name}
        </span>
      </div>
    </div>
  )
}
