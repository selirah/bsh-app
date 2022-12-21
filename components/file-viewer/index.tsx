import DocumentViewer from 'react-iframe'

type Props = {
  url: string
  allowFullScreen?: boolean
}

export const FileViewer: React.FC<Props> = (props) => {
  const { allowFullScreen, url } = props

  return <DocumentViewer url={url} width="100%" height="668px" allowFullScreen={allowFullScreen} />
}
