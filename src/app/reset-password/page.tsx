'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Key } from 'lucide-react';
import styles from '../auth.module.css';

function ResetPasswordForm() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [token, setToken] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const tokenParam = searchParams?.get('token');
    if (tokenParam) {
      setToken(tokenParam);
    } else {
      setError('Invalid or missing password reset token.');
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!token) {
      setError('Missing reset token');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to reset password');
      } else {
        setSuccess('Password has been reset successfully! Redirecting...');
        setTimeout(() => {
          router.push('/login');
        }, 3000);
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {error && <div className={styles.error}>{error}</div>}
      {success && <div className={styles.success}>{success}</div>}

      {!success && token && (
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="password">New Password</label>
            <input
              id="password"
              type="password"
              className={styles.input}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>
          
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="confirmPassword">Confirm New Password</label>
            <input
              id="confirmPassword"
              type="password"
              className={styles.input}
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>

          <button 
            type="submit" 
            className={styles.button}
            disabled={isLoading}
          >
            {isLoading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
      )}
    </>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem', color: 'var(--accent)' }}>
            <Key size={48} />
          </div>
          <h1 className={styles.title}>Reset Password</h1>
          <p className={styles.subtitle}>Enter your new password below.</p>
        </div>

        <Suspense fallback={<div>Loading...</div>}>
          <ResetPasswordForm />
        </Suspense>

        <div className={styles.footer} style={{ marginTop: '1.5rem' }}>
          <Link href="/login" className={styles.link}>Return to Login</Link>
        </div>
      </div>
    </div>
  );
}
