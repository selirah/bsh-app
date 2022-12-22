import { Button } from 'components'
import Link from 'next/link'

type Props = {
  header: string
  returnLink: string
  returnButtonText: string
}

type SuccessProps = Props & {
  description: string
  createNewLink: string
  createNewBtnText: string
}

type ErrorProps = Props & {
  error: string
}

export const Success: React.FC<SuccessProps> = (props) => {
  const { description, header, returnLink, createNewLink, createNewBtnText, returnButtonText } =
    props

  return (
    <div className="py-[100px] rounded border border-dashed border-light-border dark:border-dark-border flex justify-center h-full items-center">
      <div className="block w-1/2">
        <h4 className="text-h4 font-lato text-dark-btnText dark:text-light-btnText">{header}</h4>
        <p className="text-pNormal font-montserrat font-light text-light-text dark:text-dark-text">
          {description}
        </p>
        <div className="flex mt-6 space-x-4">
          <Link href={createNewLink}>
            <Button size="sm" color="success">
              {createNewBtnText}
            </Button>
          </Link>
          <Link href={returnLink}>
            <Button size="sm" color="success" outline>
              {returnButtonText}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export const Error: React.FC<ErrorProps> = (props) => {
  const { header, returnLink, error, returnButtonText } = props

  return (
    <div className="py-[100px] rounded border border-dashed border-light-border dark:border-dark-border flex justify-center h-full items-center">
      <div className="block w-1/2">
        <h4 className="text-h4 font-lato text-error">{header}</h4>
        <p className="text-pNormal font-montserrat font-light text-light-text dark:text-dark-text">
          {error}
        </p>
        <div className="mt-6 space-x-4">
          <Link href={returnLink}>
            <Button size="sm" color="error" outline>
              {returnButtonText}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
