type Props = {
  scopes: string[]
  scope: string
  userId: number
  ownerId?: number
  authorize: () => any
  unauthorize: () => React.ReactNode
}

const check = (scopes: string[], scope: string, userId: number, ownerId?: number) => {
  if (!scopes.length) return false
  if (!scopes.includes(scope)) return false
  if (ownerId && userId === ownerId) return false
  return true
}

const Can = (props: Props) => {
  const { authorize, scope, scopes, unauthorize, userId, ownerId } = props
  return check(scopes, scope, userId, ownerId) ? authorize() : unauthorize()
}
export default Can
