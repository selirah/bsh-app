import React, { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import classnames from 'classnames'
import { FiX } from 'react-icons/fi'

type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

type ModalProps = {
  isOpen: boolean
  children: React.ReactNode
  size?: Size
}

type ModalHeaderProps = {
  children: React.ReactNode
  toggle: () => void
  border?: boolean
}

type ModalBodyProps = {
  children: React.ReactNode
}

type ModalFooterProps = {
  children: React.ReactNode
  border?: boolean
}

export const Modal: React.FC<ModalProps> = (props) => {
  const { isOpen, children, size } = props

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => null} static>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-overlay bg-opacity-70" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                as="div"
                className={classnames(
                  'w-full transform overflow-hidden rounded bg-light-container p-[24px] text-left align-middle shadow-penumbra transition-all dark:bg-dark-container',
                  {
                    'max-w-[480px]': size === 'xs',
                    'max-w-[640px]': size === 'sm' || !size,
                    'max-w-[768px]': size === 'md',
                    'max-w-[1024px]': size === 'lg',
                    'max-w-[1280px]': size === 'xl'
                  }
                )}
              >
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export const ModalHeader: React.FC<ModalHeaderProps> = (props) => {
  const { children, border, toggle } = props
  return (
    <Fragment>
      <div className="flex justify-between">
        <Dialog.Title
          as="div"
          className={classnames(
            'text-pLarge font-lato font-medium leading-6 text-dark-btnText dark:text-light-btnText'
          )}
        >
          {children}
        </Dialog.Title>
        <button type="button" className="rounded-md font-bold focus:outline-none" onClick={toggle}>
          <span className="sr-only">Close panel</span>
          <FiX
            className="h-5 w-5 text-light-text dark:text-dark-text hover:text-primary common-transition"
            aria-hidden="true"
          />
        </button>
      </div>
      {border ? (
        <div className="mt-4 border-b border-light-border dark:border-dark-border"></div>
      ) : null}
    </Fragment>
  )
}

export const ModalBody: React.FC<ModalBodyProps> = (props) => {
  const { children } = props

  return <div className="mt-6 mb-6">{children}</div>
}

export const ModalFooter: React.FC<ModalFooterProps> = (props) => {
  const { children, border } = props

  return (
    <div>
      {border ? (
        <div className="mb-4 mt-4 border-t border-light-border dark:border-dark-border"></div>
      ) : null}
      <div className="flex justify-end items-center space-x-2">{children}</div>
    </div>
  )
}
