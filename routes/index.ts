import {
  HomeIcon,
  GlobeIcon,
  LibraryIcon,
  CreditCardIcon,
  FolderIcon,
  SwitchHorizontalIcon,
  BadgeCheckIcon,
  ClockIcon,
  ChartBarIcon,
  FingerPrintIcon,
  UsersIcon
} from '@heroicons/react/outline'

export type SubMenuTypes = {
  title: string
  link: string
  active?: boolean
  IconSVG?: React.FC<React.SVGProps<SVGSVGElement>>
  inaccessible?: boolean
  scope?: string
}

export type MenuTypes = {
  menuTitle: string
  active?: boolean
  IconSVG: React.FC<React.SVGProps<SVGSVGElement>>
  link?: string
  subLinks?: SubMenuTypes[]
  scope?: string
}

export const Routes: MenuTypes[] = [
  {
    menuTitle: 'Dashboard',
    IconSVG: HomeIcon,
    active: false,
    link: '/dashboard',
    scope: 'Dashboard'
  },
  {
    menuTitle: 'Client 360',
    IconSVG: GlobeIcon,
    active: false,
    link: '/client360',
    scope: 'Client360'
  },
  {
    menuTitle: 'Banking',
    IconSVG: LibraryIcon,
    active: false,
    subLinks: [
      {
        title: 'Agency Banking',
        link: '/agency-banking',
        active: false,
        scope: 'AgencyBanking'
      },
      {
        title: 'm-Banking',
        link: '/m-banking',
        active: false,
        scope: 'mBanking'
      },
      {
        title: 'e-Banking',
        link: '/e-banking',
        active: false,
        scope: 'eBanking'
      }
    ]
  },
  {
    menuTitle: 'Payments',
    IconSVG: CreditCardIcon,
    active: false,
    subLinks: [
      {
        title: 'Bulk Payments',
        link: '/bulk-payments',
        active: false,
        scope: 'BulkPayments'
      },
      {
        title: 'Government Salaries',
        link: '/government-payments',
        active: false,
        scope: 'GovernmentSalaries'
      },
      {
        title: 'Tax Payments',
        link: '/tax-payments',
        active: false,
        scope: 'TaxPayments'
      },
      {
        title: 'Billers',
        link: '/billers',
        active: false,
        scope: 'Billers'
      },
      {
        title: 'Online Payments',
        link: '/online-payments',
        active: false,
        scope: 'OnlinePayment'
      },
      {
        title: 'Till Payments',
        link: '/till-payments',
        active: false,
        scope: 'TillManagement'
      }
    ]
  },
  {
    menuTitle: 'Transfers',
    IconSVG: SwitchHorizontalIcon,
    active: false,
    subLinks: [
      {
        title: 'SWIFT & RTGS',
        link: '/swift-transfer',
        active: false,
        scope: 'SWIFTRTGS'
      },
      {
        title: 'Funds Transfer',
        link: '/funds-transfer',
        active: false,
        scope: 'FundTransfers'
      },
      {
        title: 'MC Send',
        link: '/mc-send',
        active: false,
        scope: 'MCSend'
      }
    ]
  },
  {
    menuTitle: 'Products',
    IconSVG: FolderIcon,
    active: false,
    subLinks: [
      {
        title: 'Card Management',
        link: '/cards-management',
        active: false,
        scope: 'Cards'
      },
      {
        title: 'Chequebook Management',
        link: '/chequebook-management',
        active: false,
        scope: 'ChequeBookManagement'
      },
      {
        title: 'Contract Management',
        link: '/contract-management',
        active: false,
        scope: 'ContractManagement'
      }
    ]
  },
  {
    menuTitle: 'Services',
    IconSVG: BadgeCheckIcon,
    active: false,
    subLinks: [
      {
        title: 'Cash Allocations',
        link: '/cash-allocations',
        active: false,
        scope: 'CashAllocations'
      },
      {
        title: 'Thunes',
        link: '/thunes',
        active: false,
        scope: 'Thunes'
      },
      {
        title: 'Hologram',
        link: '/hologram',
        active: false,
        scope: 'Hologram'
      },
      {
        title: 'Inventory',
        link: '/inventory',
        active: false,
        scope: 'Inventory'
      },
      {
        title: 'Fees & Commissions',
        link: '/fees-commissions',
        active: false,
        scope: 'FeesCommissions'
      },
      {
        title: 'Payment Hub Service',
        link: '/paymenthub-service',
        active: false,
        scope: 'PaymentHubServiceManagement'
      }
    ]
  },
  {
    menuTitle: 'Static Data',
    IconSVG: ClockIcon,
    active: false,
    subLinks: [
      {
        title: 'Customer Onboarding',
        link: '/customer-onboarding',
        active: false,
        scope: 'CustomerOnboarding'
      },
      {
        title: 'Account Opening',
        link: '/account-opening',
        active: false,
        scope: 'AccountOpening'
      },
      {
        title: 'Entity Onboarding',
        link: '/entity-onboarding',
        active: false,
        scope: 'EntityOnboarding'
      },
      {
        title: 'Dormant Account Activation',
        link: '/dormant-account-activation',
        active: false,
        scope: 'DormantAccountActivation'
      },
      {
        title: 'Update Customer',
        link: '/update-customer',
        active: false,
        scope: 'UpdateCustomer'
      }
    ]
  },
  {
    menuTitle: 'Reports',
    IconSVG: ChartBarIcon,
    active: false,
    link: '/reports',
    scope: 'Reports'
  },
  {
    menuTitle: 'Biometric',
    IconSVG: FingerPrintIcon,
    active: false,
    link: '/biometric',
    scope: 'Biometric'
  },
  {
    menuTitle: 'User & Roles',
    IconSVG: UsersIcon,
    active: false,
    link: '/user-roles',
    scope: 'UserRoles'
  }
]
