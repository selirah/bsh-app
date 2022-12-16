import { StatusTypes } from 'types'
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
        <Badge color="warning" pill size="sm" state>
          {status}
        </Badge>
      )
    case StatusTypes.REJECTED:
      return (
        <Badge color="info" pill size="sm" state>
          {status}
        </Badge>
      )
    case StatusTypes.PENDINGEDIT:
      return (
        <Badge color="warning" pill size="sm" state>
          {status}
        </Badge>
      )
    case StatusTypes.PENDINGVERIFICATION:
      return (
        <Badge color="warning" pill size="sm" state>
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
