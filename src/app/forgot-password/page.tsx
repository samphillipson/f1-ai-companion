'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Mail } from 'lucide-react';
import styles from '../auth.module.css';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    setError('');

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        // To prevent user enumeration, we typically still show a success message even if the email wasn't found, 
        // but for a smaller app we might just show the error. Let's show a generic success message.
        setMessage('If an account exists with that email, a password reset link has been sent.');
      } else {
        setMessage('If an account exists with that email, a password reset link has been sent.');
        setEmail('');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <Link href="/login" className={styles.backLink}>
          <ArrowLeft size={16} /> Back to Login
        </Link>
        
        <div className={styles.header}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem', color: 'var(--accent)' }}>
            <Mail size={48} />
          </div>
          <h1 className={styles.title}>Forgot Password</h1>
          <p className={styles.subtitle}>Enter your email address and we'll send you a link to reset your password.</p>
        </div>

        {error && <div className={styles.error}>{error}</div>}
        {message && <div className={styles.success}>{message}</div>}

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className={styles.input}
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button 
            type="submit" 
            className={styles.button}
            disabled={isLoading || !!message}
          >
            {isLoading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>
      </div>
    </div>
  );
}
