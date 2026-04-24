import styles from "../page.module.css";
import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <div className={styles.container}>
      <main className={styles.main} style={{ paddingTop: '5rem' }}>
        <div className="glass-panel" style={{ padding: '3rem', borderRadius: '16px' }}>
          <h1 className={styles.title} style={{ marginBottom: '2rem' }}>Privacy Policy</h1>
          
          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ color: 'var(--f1-red)', marginBottom: '1rem' }}>1. Information We Collect</h2>
            <p style={{ opacity: 0.8, lineHeight: '1.6' }}>
              We collect information you provide directly to us when you create an account, use our AI Assistant, or contact us. This may include your email address and any messages you send to the AI.
            </p>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ color: 'var(--f1-red)', marginBottom: '1rem' }}>2. How We Use Your Information</h2>
            <p style={{ opacity: 0.8, lineHeight: '1.6' }}>
              We use the information to provide, maintain, and improve our services, including processing your AI queries and managing your account.
            </p>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ color: 'var(--f1-red)', marginBottom: '1rem' }}>3. Data Security</h2>
            <p style={{ opacity: 0.8, lineHeight: '1.6' }}>
              We use industry-standard security measures to protect your information. However, no method of transmission over the Internet is 100% secure.
            </p>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ color: 'var(--f1-red)', marginBottom: '1rem' }}>4. AI and Third Parties</h2>
            <p style={{ opacity: 0.8, lineHeight: '1.6' }}>
              Our AI Assistant is powered by Google Gemini. Your queries are sent to Google for processing. Please refer to Google's Privacy Policy for more information on how they handle data.
            </p>
          </section>

          <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <Link href="/" className={styles.backButton}>
              ← Back to Dashboard
            </Link>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <p className={styles.disclaimer}>
            <strong>Disclaimer:</strong> This is an unofficial fan application. F1, FORMULA ONE, FORMULA 1, FIA FORMULA ONE WORLD CHAMPIONSHIP, GRAND PRIX and related marks are trade marks of Formula One Licensing B.V.
          </p>
        </div>
      </footer>
    </div>
  );
}
