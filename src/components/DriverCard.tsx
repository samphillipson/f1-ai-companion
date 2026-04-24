'use client';

import { useState, useEffect } from 'react';
import styles from './DriverCard.module.css';

interface Driver {
  driverId: string;
  permanentNumber?: string;
  givenName: string;
  familyName: string;
  dateOfBirth: string;
  nationality: string;
}

interface DriverCardProps {
  driver: Driver;
  currentPoints: string;
  currentWins: string;
  currentPosition: string;
}

export default function DriverCard({ driver, currentPoints, currentWins, currentPosition }: DriverCardProps) {
  const [activeTab, setActiveTab] = useState<'personal' | 'season'>('personal');
  const [backgroundInfo, setBackgroundInfo] = useState<{ 
    personal: string; 
    career: string;
    stats?: {
      titles: string;
      wins: string;
      podiums: string;
      bestFinish: string;
    }
  } | null>(null);
  const [loadingInfo, setLoadingInfo] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchInfo();
  }, []);

  const fetchInfo = async () => {
    
    setLoadingInfo(true);
    setError(null);
    try {
      const response = await fetch(`/api/driver-info?id=${driver.driverId}&name=${encodeURIComponent(driver.givenName + ' ' + driver.familyName)}`);
      if (response.ok) {
        const data = await response.json();
        setBackgroundInfo(data);
      } else {
        throw new Error('Failed to fetch');
      }
    } catch (err) {
      console.error("Failed to fetch driver info", err);
      setError('Failed to load. Please try again.');
    } finally {
      setLoadingInfo(false);
    }
  };

  const calculateAge = (dob: string) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.nameContainer}>
          <span className={styles.givenName}>{driver.givenName}</span>
          <span className={styles.familyName}>{driver.familyName}</span>
        </div>
        <div className={styles.number}>{driver.permanentNumber || '-'}</div>
      </div>

      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === 'personal' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('personal')}
        >
          Personal
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'season' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('season')}
        >
          Season
        </button>
      </div>

      {activeTab === 'personal' ? (
        <div className={styles.content}>
          <div className={styles.infoRow}>
            <span className={styles.label}>Nationality</span>
            <span className={styles.value}>{driver.nationality}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.label}>Date of Birth</span>
            <span className={styles.value}>{driver.dateOfBirth}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.label}>Age</span>
            <span className={styles.value}>{calculateAge(driver.dateOfBirth)} yrs</span>
          </div>
          <div className={styles.scrollableTextContainer}>
            <span className={styles.label}>Background</span>
            {loadingInfo ? (
              <p className={styles.loadingText}>Fetching AI background info...</p>
            ) : backgroundInfo?.personal ? (
              <p className={styles.paragraphText}>{backgroundInfo.personal}</p>
            ) : (
              error && <p className={styles.errorText}>{error}</p>
            )}
          </div>
        </div>
      ) : (
        <div className={styles.content}>
          <div className={styles.infoRow}>
            <span className={styles.label}>Position</span>
            <span className={`${styles.value} ${styles.highlight}`}>P{currentPosition}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.label}>Points</span>
            <span className={styles.value}>{currentPoints} pts</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.label}>Wins</span>
            <span className={styles.value}>{currentWins}</span>
          </div>

          {backgroundInfo?.stats && (
            <div className={styles.lifetimeStats}>
              <div className={styles.statsDivider}>LIFETIME</div>
              <div className={styles.infoRow}>
                <span className={styles.label}>Championships</span>
                <span className={`${styles.value} ${styles.highlight}`}>{backgroundInfo.stats.titles}</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.label}>Total Wins</span>
                <span className={styles.value}>{backgroundInfo.stats.wins}</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.label}>Podiums</span>
                <span className={styles.value}>{backgroundInfo.stats.podiums}</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.label}>Best Finish</span>
                <span className={styles.value}>{backgroundInfo.stats.bestFinish}</span>
              </div>
            </div>
          )}

          <div className={styles.scrollableTextContainer}>
            <span className={styles.label}>Career History</span>
            {loadingInfo ? (
              <p className={styles.loadingText}>Fetching AI career info...</p>
            ) : backgroundInfo?.career ? (
              <p className={styles.paragraphText}>{backgroundInfo.career}</p>
            ) : (
              error && <p className={styles.errorText}>{error}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
