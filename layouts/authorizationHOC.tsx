import { useSession } from 'next-auth/react'
import { UILoader, Unauthorized } from 'components'
import Can from './Can'

export const authorizationHOC =
  <P extends object>(
    scope: string,
    Component?: React.ComponentType<P>,
    isLink = false,
    ownerId?: number
  ) =>
  (props: any) => {
    const { data: session, status } = useSession()
    if (status === 'loading') {
      return <UILoader size="lg" />
    } else if (status === 'authenticated') {
      const { user } = session
      const { scopes, userId } = user
      return (
        <Can
          scopes={scopes}
          scope={scope}
          userId={userId}
          authorize={() => (isLink ? <Component {...(props as P)} /> : true)}
          unauthorize={() => (isLink ? <Unauthorized /> : false)}
          ownerId={ownerId}
        />
      )
    }
  }
