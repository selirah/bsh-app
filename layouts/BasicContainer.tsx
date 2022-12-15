type Props = {
  children: React.ReactNode
}

export const BasicContainer: React.FC<Props> = (props) => {
  const { children } = props
  return (
    <div className="block p-[16px] bg-light-container dark:bg-dark-container shadow-penumbra rounded">
      {children}
    </div>
  )
}
