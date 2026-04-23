'use client';

import { signOut } from 'next-auth/react';
import styles from '@/app/page.module.css';

export default function SignOutButton() {
  return (
    <button 
      onClick={() => signOut({ callbackUrl: '/' })} 
      className={styles.loginBtn}
      style={{ cursor: 'pointer' }}
    >
      Sign Out
    </button>
  );
}
