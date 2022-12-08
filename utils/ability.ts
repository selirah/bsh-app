import { AbilityBuilder, PureAbility } from '@casl/ability'
import { getSession } from 'next-auth/react'

type Actions = 'manage' | 'read' | 'update' | 'create' | 'delete' | 'export'

export default async function defineAbilityFor(action: Actions, subject: string) {
  const session = await getSession()
  const { can, cannot, build } = new AbilityBuilder(PureAbility)
  if (session) {
    const { user } = session
    const { scopes } = user
    if (scopes.includes(subject)) {
      can(action)
    } else {
      cannot(action)
    }
  }
  return build()
}
