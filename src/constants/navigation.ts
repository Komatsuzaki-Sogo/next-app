import { Info, Tool, LogOut, Clipboard } from '@deemlol/next-icons';

export type NavItem = {
  id: string;
  type: 'link' | 'dropdown';
  href?: string;
  label: string;
  icon: React.ComponentType<{ className?: string; color?: string }>;
  items?: {
    href?: string;
    label: string;
    icon: React.ComponentType<{ className?: string; color?: string }>;
    isLogout?: boolean;
  }[];
};

export const NAV_CONFIG: NavItem[] = [
  {
    id: 'dashboard',
    type: 'link',
    href: '/dashboard',
    label: 'ダッシュボード',
    icon: Clipboard,
  },
  {
    id: 'user-menu',
    type: 'dropdown',
    label: 'ユーザーメニュー',
    icon: Info,
    items: [
      { href: '/user', label: 'ユーザー情報', icon: Info },
      { href: '/user/password', label: 'パスワード変更', icon: Tool },
      { label: 'ログアウト', icon: LogOut, isLogout: true },
    ],
  },
];

export const ASSETS = {
  avatarPlaceholder: '/img/avatar-placeholder.png',
};
