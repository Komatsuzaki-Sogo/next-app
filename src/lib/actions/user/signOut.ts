'use server';

import { signOut } from '@/auth';

export async function handleLogoutAction() {
  await signOut();
}
