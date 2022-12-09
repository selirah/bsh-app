import { HiOutlineUserGroup } from 'react-icons/hi2'
import { AiOutlineDashboard, AiOutlineBank, AiOutlineBarChart } from 'react-icons/ai'
import {
  MdOutline360,
  MdOutlineProductionQuantityLimits,
  MdFingerprint,
  MdOutlineMiscellaneousServices,
  MdUpdate
} from 'react-icons/md'
import { ImCreditCard } from 'react-icons/im'
import { BiTransferAlt } from 'react-icons/bi'

export type SubMenuTypes = {
  title: string
  link: string
  IconSVG?: React.FC<React.SVGProps<SVGSVGElement>>
  scope?: string
}

export type MenuTypes = {
  id: number
  menuTitle: string
  IconSVG: React.FC<React.SVGProps<SVGSVGElement>>
  link?: string
  subLinks?: SubMenuTypes[]
  scope?: string
  spacing?: boolean
}

export const Routes: MenuTypes[] = [
  {
    id: 1,
    menuTitle: 'Dashboard',
    IconSVG: AiOutlineDashboard,
    link: '/admin/dashboard',
    scope: 'Dashboard'
  },
  {
    id: 2,
    menuTitle: 'Client 360',
    IconSVG: MdOutline360,
    link: '/admin/client-360',
    scope: 'Client360',
    spacing: true
  },
  {
    id: 3,
    menuTitle: 'Banking',
    IconSVG: AiOutlineBank,
    subLinks: [
      {
        title: 'Agency Banking',
        link: '/admin/agency-banking',
        scope: 'AgencyBanking'
      },
      {
        title: 'm-Banking',
        link: '/admin/m-banking',
        scope: 'mBanking'
      },
      {
        title: 'e-Banking',
        link: '/admin/e-banking',
        scope: 'eBanking'
      }
    ]
  },
  {
    id: 4,
    menuTitle: 'Payments',
    IconSVG: ImCreditCard,
    subLinks: [
      {
        title: 'Bulk Payments',
        link: '/admin/bulk-payments',
        scope: 'BulkPayments'
      },
      {
        title: 'Government Salaries',
        link: '/admin/government-payments',
        scope: 'GovernmentSalaries'
      },
      {
        title: 'Tax Payments',
        link: '/admin/tax-payments',
        scope: 'TaxPayments'
      },
      {
        title: 'Billers',
        link: '/admin/billers',
        scope: 'Billers'
      },
      {
        title: 'Online Payments',
        link: '/admin/online-payments',
        scope: 'OnlinePayment'
      },
      {
        title: 'Till Payments',
        link: '/admin/till-payments',
        scope: 'TillManagement'
      }
    ]
  },
  {
    id: 5,
    menuTitle: 'Transfers',
    IconSVG: BiTransferAlt,
    subLinks: [
      {
        title: 'SWIFT & RTGS',
        link: '/admin/swift-transfer',
        scope: 'SWIFTRTGS'
      },
      {
        title: 'Funds Transfer',
        link: '/admin/funds-transfer',
        scope: 'FundTransfers'
      },
      {
        title: 'MC Send',
        link: '/admin/mc-send',
        scope: 'MCSend'
      }
    ]
  },
  {
    id: 6,
    menuTitle: 'Products',
    IconSVG: MdOutlineProductionQuantityLimits,
    subLinks: [
      {
        title: 'Card Management',
        link: '/admin/cards-management',
        scope: 'Cards'
      },
      {
        title: 'Chequebook Management',
        link: '/admin/chequebook-management',
        scope: 'ChequeBookManagement'
      },
      {
        title: 'Contract Management',
        link: '/admin/contract-management',
        scope: 'ContractManagement'
      }
    ]
  },
  {
    id: 7,
    menuTitle: 'Services',
    IconSVG: MdOutlineMiscellaneousServices,
    subLinks: [
      {
        title: 'Cash Allocations',
        link: '/admin/cash-allocations',
        scope: 'CashAllocations'
      },
      {
        title: 'Thunes',
        link: '/admin/thunes',
        scope: 'Thunes'
      },
      {
        title: 'Hologram',
        link: '/admin/hologram',
        scope: 'Hologram'
      },
      {
        title: 'Inventory',
        link: '/admin/inventory',
        scope: 'Inventory'
      },
      {
        title: 'Fees & Commissions',
        link: '/admin/fees-commissions',
        scope: 'FeesCommissions'
      },
      {
        title: 'Payment Hub Service',
        link: '/admin/paymenthub-service',
        scope: 'PaymentHubServiceManagement'
      }
    ]
  },
  {
    id: 8,
    menuTitle: 'Static Data',
    IconSVG: MdUpdate,
    spacing: true,
    subLinks: [
      {
        title: 'Customer Onboarding',
        link: '/admin/customer-onboarding',
        scope: 'CustomerOnboarding'
      },
      {
        title: 'Account Opening',
        link: '/admin/account-opening',
        scope: 'AccountOpening'
      },
      {
        title: 'Entity Onboarding',
        link: '/admin/entity-onboarding',
        scope: 'EntityOnboarding'
      },
      {
        title: 'Dormant Account Activation',
        link: '/admin/dormant-account-activation',
        scope: 'DormantAccountActivation'
      },
      {
        title: 'Update Customer',
        link: '/admin/update-customer',
        scope: 'UpdateCustomer'
      }
    ]
  },
  {
    id: 9,
    menuTitle: 'Reports',
    IconSVG: AiOutlineBarChart,
    link: '/admin/reports',
    scope: 'Reports'
  },
  {
    id: 10,
    menuTitle: 'Biometric',
    IconSVG: MdFingerprint,
    link: '/admin/biometric',
    scope: 'Biometric'
  },
  {
    id: 11,
    menuTitle: 'User & Roles',
    IconSVG: HiOutlineUserGroup,
    link: '/admin/user-roles',
    scope: 'UserRoles'
  }
]
