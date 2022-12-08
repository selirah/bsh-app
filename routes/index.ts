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

type Scope = {
  action: 'manage' | 'read' | 'update' | 'create' | 'delete' | 'export'
  subject: string
}

export type SubMenuTypes = {
  title: string
  link: string
  active?: boolean
  IconSVG?: React.FC<React.SVGProps<SVGSVGElement>>
  scope?: Scope
}

export type MenuTypes = {
  menuTitle: string
  active?: boolean
  IconSVG: React.FC<React.SVGProps<SVGSVGElement>>
  link?: string
  subLinks?: SubMenuTypes[]
  scope?: Scope
  spacing?: boolean
}

export const Routes: MenuTypes[] = [
  {
    menuTitle: 'Dashboard',
    IconSVG: AiOutlineDashboard,
    active: false,
    link: '/dashboard',
    scope: {
      action: 'manage',
      subject: 'Dashboard'
    }
  },
  {
    menuTitle: 'Client 360',
    IconSVG: MdOutline360,
    active: false,
    link: '/client360',
    scope: {
      action: 'manage',
      subject: 'Client360'
    },
    spacing: true
  },
  {
    menuTitle: 'Banking',
    IconSVG: AiOutlineBank,
    active: false,
    subLinks: [
      {
        title: 'Agency Banking',
        link: '/agency-banking',
        active: false,
        scope: {
          action: 'manage',
          subject: 'AgencyBanking'
        }
      },
      {
        title: 'm-Banking',
        link: '/m-banking',
        active: false,
        scope: {
          action: 'manage',
          subject: 'mBanking'
        }
      },
      {
        title: 'e-Banking',
        link: '/e-banking',
        active: false,
        scope: {
          action: 'manage',
          subject: 'eBanking'
        }
      }
    ]
  },
  {
    menuTitle: 'Payments',
    IconSVG: ImCreditCard,
    active: false,
    subLinks: [
      {
        title: 'Bulk Payments',
        link: '/bulk-payments',
        active: false,
        scope: {
          action: 'manage',
          subject: 'BulkPayments'
        }
      },
      {
        title: 'Government Salaries',
        link: '/government-payments',
        active: false,
        scope: {
          action: 'manage',
          subject: 'GovernmentSalaries'
        }
      },
      {
        title: 'Tax Payments',
        link: '/tax-payments',
        active: false,
        scope: {
          action: 'manage',
          subject: 'TaxPayments'
        }
      },
      {
        title: 'Billers',
        link: '/billers',
        active: false,
        scope: {
          action: 'manage',
          subject: 'Billers'
        }
      },
      {
        title: 'Online Payments',
        link: '/online-payments',
        active: false,
        scope: {
          action: 'manage',
          subject: 'OnlinePayment'
        }
      },
      {
        title: 'Till Payments',
        link: '/till-payments',
        active: false,
        scope: {
          action: 'manage',
          subject: 'TillManagement'
        }
      }
    ]
  },
  {
    menuTitle: 'Transfers',
    IconSVG: BiTransferAlt,
    active: false,
    subLinks: [
      {
        title: 'SWIFT & RTGS',
        link: '/swift-transfer',
        active: false,
        scope: {
          action: 'manage',
          subject: 'SWIFTRTGS'
        }
      },
      {
        title: 'Funds Transfer',
        link: '/funds-transfer',
        active: false,
        scope: {
          action: 'manage',
          subject: 'FundTransfers'
        }
      },
      {
        title: 'MC Send',
        link: '/mc-send',
        active: false,
        scope: {
          action: 'manage',
          subject: 'MCSend'
        }
      }
    ]
  },
  {
    menuTitle: 'Products',
    IconSVG: MdOutlineProductionQuantityLimits,
    active: false,
    subLinks: [
      {
        title: 'Card Management',
        link: '/cards-management',
        active: false,
        scope: {
          action: 'manage',
          subject: 'Cards'
        }
      },
      {
        title: 'Chequebook Management',
        link: '/chequebook-management',
        active: false,
        scope: {
          action: 'manage',
          subject: 'ChequeBookManagement'
        }
      },
      {
        title: 'Contract Management',
        link: '/contract-management',
        active: false,
        scope: {
          action: 'manage',
          subject: 'ContractManagement'
        }
      }
    ]
  },
  {
    menuTitle: 'Services',
    IconSVG: MdOutlineMiscellaneousServices,
    active: false,
    subLinks: [
      {
        title: 'Cash Allocations',
        link: '/cash-allocations',
        active: false,
        scope: {
          action: 'manage',
          subject: 'CashAllocations'
        }
      },
      {
        title: 'Thunes',
        link: '/thunes',
        active: false,
        scope: {
          action: 'manage',
          subject: 'Thunes'
        }
      },
      {
        title: 'Hologram',
        link: '/hologram',
        active: false,
        scope: {
          action: 'manage',
          subject: 'Hologram'
        }
      },
      {
        title: 'Inventory',
        link: '/inventory',
        active: false,
        scope: {
          action: 'manage',
          subject: 'Inventory'
        }
      },
      {
        title: 'Fees & Commissions',
        link: '/fees-commissions',
        active: false,
        scope: {
          action: 'manage',
          subject: 'FeesCommissions'
        }
      },
      {
        title: 'Payment Hub Service',
        link: '/paymenthub-service',
        active: false,
        scope: {
          action: 'manage',
          subject: 'PaymentHubServiceManagement'
        }
      }
    ]
  },
  {
    menuTitle: 'Static Data',
    IconSVG: MdUpdate,
    active: false,
    spacing: true,
    subLinks: [
      {
        title: 'Customer Onboarding',
        link: '/customer-onboarding',
        active: false,
        scope: {
          action: 'manage',
          subject: 'CustomerOnboarding'
        }
      },
      {
        title: 'Account Opening',
        link: '/account-opening',
        active: false,
        scope: {
          action: 'manage',
          subject: 'AccountOpening'
        }
      },
      {
        title: 'Entity Onboarding',
        link: '/entity-onboarding',
        active: false,
        scope: {
          action: 'manage',
          subject: 'EntityOnboarding'
        }
      },
      {
        title: 'Dormant Account Activation',
        link: '/dormant-account-activation',
        active: false,
        scope: {
          action: 'manage',
          subject: 'DormantAccountActivation'
        }
      },
      {
        title: 'Update Customer',
        link: '/update-customer',
        active: false,
        scope: {
          action: 'manage',
          subject: 'UpdateCustomer'
        }
      }
    ]
  },
  {
    menuTitle: 'Reports',
    IconSVG: AiOutlineBarChart,
    active: false,
    link: '/reports',
    scope: {
      action: 'manage',
      subject: 'Reports'
    }
  },
  {
    menuTitle: 'Biometric',
    IconSVG: MdFingerprint,
    active: false,
    link: '/biometric',
    scope: {
      action: 'manage',
      subject: 'Biometric'
    }
  },
  {
    menuTitle: 'User & Roles',
    IconSVG: HiOutlineUserGroup,
    active: false,
    link: '/user-roles',
    scope: {
      action: 'manage',
      subject: 'UserRoles'
    }
  }
]
