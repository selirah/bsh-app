import { StatusTypes, UserStatusTypes } from 'types'
import { Badge } from 'components'

export const transformStatus = (status: string) => {
  switch (status) {
    case StatusTypes.ACTIVE:
      return (
        <Badge color="success" pill size="sm" state>
          {status}
        </Badge>
      )
    case StatusTypes.BLOCKED:
      return (
        <Badge color="error" pill size="sm" state>
          {status}
        </Badge>
      )
    case StatusTypes.PENDINGBLOCK:
      return (
        <Badge color="error" pill size="sm" state>
          {status}
        </Badge>
      )
    case StatusTypes.REJECTED:
    case UserStatusTypes.NEW:
      return (
        <Badge color="info" pill size="sm" state>
          {status}
        </Badge>
      )
    case StatusTypes.PENDINGEDIT:
    case UserStatusTypes.PENDINGUNBLOCK:
      return (
        <Badge color="warning" pill size="sm" state>
          {status}
        </Badge>
      )
    case StatusTypes.PENDINGVERIFICATION:
    case UserStatusTypes.PENDINGACTIVATION:
      return (
        <Badge color="warning" pill size="sm" state>
          {status}
        </Badge>
      )
    case UserStatusTypes.RESET:
    case UserStatusTypes.PENDINGRESET:
      return (
        <Badge color="default" pill size="sm" state>
          {status}
        </Badge>
      )
    default:
      return (
        <Badge color="default" pill size="sm" state>
          {status}
        </Badge>
      )
  }
}
