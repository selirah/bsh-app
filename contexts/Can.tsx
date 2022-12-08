import { createContext } from 'react'
import { createContextualCan } from '@casl/react'

const AbilityContext = createContext(null)

const Can = createContextualCan(AbilityContext.Consumer)

export { AbilityContext, Can }
