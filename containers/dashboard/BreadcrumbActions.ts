import { ActionObject } from 'components'
import { IntlShape } from 'react-intl'

export const breadcrumbActions = (intl: IntlShape) => {
  return [
    {
      link: '/agency-list',
      title: intl.formatMessage({ defaultMessage: 'Agency List' })
    },
    {
      link: '/create-agent',
      title: intl.formatMessage({ defaultMessage: 'Create Agency' })
    }
  ] as ActionObject[]
}
