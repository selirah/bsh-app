import { useState, useEffect, createRef, DragEvent, ChangeEvent, Fragment } from 'react'
import classnames from 'classnames'
import { FiAlertCircle, FiUploadCloud } from 'react-icons/fi'
import { useIntl } from 'react-intl'

type FileTypes =
  | '.jpeg'
  | '.jpg'
  | '.png'
  | '.svg'
  | '.gif'
  | '.pdf'
  | '.xls'
  | '.xlsx'
  | '.json'
  | '.xml'
  | '.docs'
  | '.ppt'
type InputSizes = 'sm' | 'md' | 'lg'

export type FileInputProps = {
  name: string
  extensions: FileTypes[]
  size?: InputSizes
  fileSize?: number
  error?: string
  onChange?: (e: File) => void
  disabled?: boolean
}

export const FileInput: React.FC<FileInputProps> = (props) => {
  const { extensions, name, size, fileSize, error, disabled, onChange } = props
  const { formatMessage } = useIntl()
  const [, setDragging] = useState(false)
  const dropRef = createRef<any>()
  const [, setCounter] = useState(0)

  useEffect(() => {
    let div = dropRef.current
    div.addEventListener('dragenter', handleDragIn)
    div.addEventListener('dragleave', handleDragOut)
    div.addEventListener('dragover', handleDrag)
    div.addEventListener('drop', handleDrop)
  }, [])

  const handleDrag = (e: DragEvent<DataTransfer>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDragIn = (e: DragEvent<DataTransfer>) => {
    e.preventDefault()
    e.stopPropagation()
    setCounter((counter) => counter + 1)
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setDragging(true)
    }
  }

  const handleDragOut = (e: DragEvent<DataTransfer>) => {
    e.preventDefault()
    e.stopPropagation()
    setCounter((counter) => counter - 1)
    setDragging(false)
  }

  const handleDrop = (e: DragEvent<DataTransfer>) => {
    e.preventDefault()
    e.stopPropagation()
    setDragging(false)
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0]
      onChange(file)
    }
  }

  const onUpload = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      onChange(file)
    }
  }

  return (
    <Fragment>
      <div className="flex items-center justify-center" ref={dropRef}>
        <label
          htmlFor={name}
          className={classnames(
            'flex flex-col items-center justify-center w-full border border-dashed rounded cursor-pointer bg-light-container dark:bg-dark-container hover:border-primary dark:hover:border-primary peer-disabled:cursor-not-allowed common-transition hover:shadow-penumbra',
            {
              'h-[155px]': size === 'sm',
              'h-[175px]': size === 'md' || !size,
              'h-[195px] text-pNormal': size === 'lg',
              'border-light-form-inputBorder dark:border-dark-form-inputBorder': !error,
              'border-error': error
            }
          )}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <div
              className={classnames(
                'flex justify-center items-center border-4 bg-table-header dark:bg-dark-container rounded-full',
                {
                  'p-2': size === 'md' || !size,
                  'border-light-gray': !error,
                  'border-error': error
                }
              )}
            >
              <FiUploadCloud
                className={classnames('', {
                  'w-8 h-8': size === 'sm',
                  'w-9 h-9': size === 'md' || !size,
                  'w-10 h-10': size === 'lg',
                  'text-light-gray': !error,
                  'text-error': error
                })}
              />
            </div>
            <p className="mb-2">
              <span
                className={classnames('font-lato font-medium text-primary', {
                  'text-pSmall': size === 'sm',
                  'text-pNormal': size === 'md' || !size || size === 'lg'
                })}
              >
                {formatMessage({
                  defaultMessage: 'Click to upload or drag and drop',
                  description: 'Tells the user to click to select a file from their device'
                })}
              </span>
            </p>
            <p className="text-pSmall font-montserrat font-medium text-light-text dark:text-dark-text">
              {extensions.toString().toUpperCase()} ({`${fileSize ?? '250'} KB`})
            </p>
          </div>
          <input
            id={name}
            type="file"
            className="hidden peer"
            accept={extensions.toString()}
            disabled={disabled}
            onChange={onUpload}
          />
        </label>
      </div>
      {error ? (
        <div className="mt-[8px] items-center flex">
          <FiAlertCircle
            className={classnames('flex-shrink-0 inline mr-[4px] text-error-text', {
              'w-4 h-4': size === 'sm',
              'w-5 h-5': size === 'md' || !size || size === 'lg'
            })}
          />
          <span
            className={classnames('font-montserrat font-medium text-error-text', {
              'text-pSmall': size === 'sm',
              'text-pNormal': size === 'md' || !size || size === 'lg'
            })}
          >
            {error}
          </span>
        </div>
      ) : null}
    </Fragment>
  )
}
