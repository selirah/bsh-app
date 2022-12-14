import { IntlShape } from 'react-intl'
import { SubMenuTypes } from 'routes'
import { BsListCheck } from 'react-icons/bs'
import { AiOutlineBarChart, AiOutlineAreaChart } from 'react-icons/ai'
import { MdCreate } from 'react-icons/md'
import { FaUsers } from 'react-icons/fa'

export const routes = (intl: IntlShape) => {
  return [
    {
      link: 'agency-banking/agents-list',
      title: intl.formatMessage({ defaultMessage: 'Agents List' }),
      IconSVG: BsListCheck,
      scope: 'AgencyBanking:Manage'
    },
    {
      link: 'agency-banking/agents-report',
      title: intl.formatMessage({ defaultMessage: 'Agents Report' }),
      IconSVG: AiOutlineBarChart,
      scope: 'AgencyBanking:ViewReports'
    },
    {
      link: 'agency-banking/perfomance-report',
      title: intl.formatMessage({ defaultMessage: 'Performance Report' }),
      IconSVG: AiOutlineAreaChart,
      scope: 'AgencyBanking:ViewReports'
    },
    {
      link: 'agency-banking/create-agent',
      title: intl.formatMessage({ defaultMessage: 'Create Agent' }),
      IconSVG: MdCreate,
      scope: 'AgencyBanking:Manage'
    },
    {
      link: 'agency-banking/manage-users',
      title: intl.formatMessage({ defaultMessage: 'Manage Users' }),
      IconSVG: FaUsers,
      scope: 'AgencyBanking:Manage'
    }
  ] as SubMenuTypes[]
}
