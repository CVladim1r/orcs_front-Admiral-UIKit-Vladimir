import { PATH_PAGE } from '@/shared/lib/react-router';

interface FlatSidebarItem {
  title: string;
  href: string;
  itemStart?: React.ReactNode;
}

interface NestedSidebarItem {
  title: string;
  isOpen?: boolean;
  children: SidebarItem[];
  itemStart?: React.ReactNode;
}

export type SidebarItem = FlatSidebarItem | NestedSidebarItem;

interface SidebarData {
  items: SidebarItem[];
}

export function isNestedItem(pet: SidebarItem): pet is NestedSidebarItem {
  return (pet as NestedSidebarItem).children !== undefined;
}

export const sidebarData: SidebarData = {
  items: [
    {
      title: 'management',
      children: [
        { title: 'users', href: PATH_PAGE.users },
        { title: 'datasets', href: PATH_PAGE.dataSets },
        { title: 'hostusers', href: PATH_PAGE.hostUsers },
        { title: 'environments', href: PATH_PAGE.environments },
        { title: 'vdbs', href: PATH_PAGE.vdbs },
        { title: 'logs', href: PATH_PAGE.logs },
      ],
    },
    
  ],
};
