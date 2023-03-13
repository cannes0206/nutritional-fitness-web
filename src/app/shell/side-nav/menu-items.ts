export interface Menu {
  navigation: MenuItem[];
};

export interface MenuItem {
  id: string;
  text: string;
  icon: string;
  href?: string;
  permissions: string[];
};

export const UpperNavigation: MenuItem[] = [
  {
    id: 'overview',
    text: 'Overview',
    icon: 'dashboard',
    href: '/overview',
    permissions: ['admin']
  },
  {
    id: 'users',
    text: 'Users',
    icon: 'groups',
    href: '/users',
    permissions: ['admin']
  },
  {
    id: 'learningModules',
    text: 'Learning Modules',
    icon: 'menu_book',
    href: '/learningmodules',
    permissions: ['admin']
  },
  {
    id: 'meal',
    text: 'Meal',
    icon: 'set_meal',
    href: '/meals',
    permissions: ['admin']
  }
];

export const LowerNavigation: MenuItem[] = [
  {
    id: 'messages',
    text: 'Messages',
    icon: 'mail',
    href: '/messages',
    permissions: ['admin']
  },
  {
    id: 'annoucements',
    text: 'Annoucements',
    icon: 'campaign',
    href: '/annoucements',
    permissions: ['admin']
  },
  {
    id: 'emailtemplates',
    text: 'Email Templates',
    icon: 'article',
    href: '/emailtemplates',
    permissions: ['admin']
  },
];
