import { Fragment, useCallback, useState, useEffect } from 'react'
import { ErrorMessage, useField } from 'formik'
import { FileBullet, FileErrorWrapper } from 'components'
import { useIntl } from 'react-intl'
import { FiUploadCloud } from 'react-icons/fi'
import classnames from 'classnames'
import { FileError, FileRejection, useDropzone } from 'react-dropzone'
import InputError from './InputError'

type Accept = {
  [key: string]: string[]
}

type InputSizes = 'sm' | 'md' | 'lg'

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
  | '.doc'
  | '.docx'
  | '.ppt'
  | '.pptx'
  | '.csv'
  | '.txt'

const mapMimeType = (type: FileTypes) => {
  switch (type) {
    case '.csv':
      return 'text/csv'
    case '.doc':
      return 'application/msword'
    case '.docx':
      return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    case '.gif':
      return 'image/gif'
    case '.jpeg':
    case '.jpg':
      return 'image/jpeg'
    case '.json':
      return 'application/json'
    case '.pdf':
      return 'application/pdf'
    case '.png':
      return 'image/png'
    case '.ppt':
      return 'application/vnd.ms-powerpoint'
    case '.pptx':
      return 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    case '.svg':
      return 'image/svg+xml'
    case '.txt':
      return 'text/plain'
    case '.xls':
      return 'application/vnd.ms-excel'
    case '.xlsx':
      return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    case '.xml':
      return 'application/xml'
  }
}

const removeDuplicates = (arr: FileTypes[]) => {
  return arr.filter((item, index) => arr.indexOf(item) === index)
}

type UploadableFile = {
  file: File
  errors: FileError[]
}

type Props = {
  name: string
  extensions: FileTypes[]
  size?: InputSizes
  maxSizeInKB: number
  multiple?: boolean
  maxFiles?: number
  disabled?: boolean
  label?: string
}

export const FileInput: React.FC<Props> = (props) => {
  const { extensions, name, maxFiles, maxSizeInKB, multiple, size, disabled, label } = props
  const [files, setFiles] = useState<UploadableFile[]>([])
  const [value, , helpers] = useField(name)
  let acceptedTypes: Accept = {}
  const { formatMessage } = useIntl()
  const [error, setError] = useState(false)

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
    const mappedAcceptedFiles = acceptedFiles.map((file) => ({ file, errors: [] }))
    setFiles((curr) => [...curr, ...mappedAcceptedFiles, ...rejectedFiles])
  }, [])

  useEffect(() => {
    if (files.length) {
      helpers.setValue(files)
    } else {
      helpers.setValue(value.value)
      setFiles(value.value)
    }
    files.map((file) => {
      if (file.errors.length) {
        setError(true)
      } else {
        setError(false)
      }
    })
  }, [files])

  removeDuplicates(extensions).map((ex) => {
    const mime = mapMimeType(ex)
    if (mime in acceptedTypes) {
      acceptedTypes[mime] = [ex]
    } else {
      acceptedTypes[mime] = [ex]
    }
  })

  const { getInputProps, getRootProps } = useDropzone({
    onDrop,
    accept: acceptedTypes,
    maxSize: maxSizeInKB * 1024,
    multiple: multiple,
    maxFiles: maxFiles
  })

  const onDelete = (file: File) => {
    setFiles((curr) => curr.filter((fw) => fw.file !== file))
  }

  return (
    <Fragment>
      {label ? (
        <label
          className={classnames(
            'block mb-[8px] font-lato font-medium text-light-form-label dark:text-dark-form-label',
            {
              'text-pSmall': size === 'sm',
              'text-pNormal': size === 'md' || !size || size === 'lg'
            }
          )}
        >
          {label}
        </label>
      ) : null}
      <div className="flex items-center justify-center">
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
          {...getRootProps()}
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
              {extensions.toString().toUpperCase()} ({`${Math.round(maxSizeInKB / 1024)} MB`})
            </p>
          </div>
          <input
            {...getInputProps()}
            id={name}
            className="hidden peer"
            disabled={disabled}
            multiple={multiple}
          />
        </label>
      </div>
      {files.map((fileWrapper, index) =>
        fileWrapper.errors.length ? (
          <FileErrorWrapper
            errors={fileWrapper.errors}
            file={fileWrapper.file}
            key={index}
            onRemove={onDelete}
          />
        ) : (
          <FileBullet file={fileWrapper.file} key={index} onRemove={onDelete} />
        )
      )}
      <ErrorMessage name={name}>{(msg) => <InputError size={size}>{msg}</InputError>}</ErrorMessage>
    </Fragment>
  )
}
