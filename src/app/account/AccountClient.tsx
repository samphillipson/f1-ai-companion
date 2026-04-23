'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, User } from 'lucide-react';
import styles from '../auth.module.css';

interface AccountClientProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export default function AccountClient({ user }: AccountClientProps) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const res = await fetch('/api/user/password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to update password');
      } else {
        setSuccess('Password updated successfully!');
        setCurrentPassword('');
        setNewPassword('');
      }
    } catch (err: any) {
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <Link href="/" className={styles.backLink}>
          <ArrowLeft size={16} /> Back to Dashboard
        </Link>
        
        <div className={styles.header}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem', color: 'var(--accent)' }}>
            <User size={48} />
          </div>
          <h1 className={styles.title}>Account Settings</h1>
          <p className={styles.subtitle}>{user.email}</p>
        </div>

        {error && <div className={styles.error}>{error}</div>}
        {success && <div className={styles.success}>{success}</div>}

        <div className={styles.divider}>Change Password</div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="currentPassword">Current Password</label>
            <input
              id="currentPassword"
              type="password"
              className={styles.input}
              placeholder="••••••••"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="newPassword">New Password</label>
            <input
              id="newPassword"
              type="password"
              className={styles.input}
              placeholder="••••••••"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          <button 
            type="submit" 
            className={styles.button}
            disabled={isLoading}
          >
            {isLoading ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      </div>
    </div>
  );
}
