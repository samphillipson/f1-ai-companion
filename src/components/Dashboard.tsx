"use client";
import { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";
import { fetchCurrentStandings, fetchRaceSchedule } from "@/lib/jolpica";

export default function Dashboard() {
  const [standings, setStandings] = useState<any[]>([]);
  const [nextRace, setNextRace] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [standingsData, scheduleData] = await Promise.all([
          fetchCurrentStandings(),
          fetchRaceSchedule()
        ]);
        setStandings(standingsData.slice(0, 5)); // Top 5
        
        const now = new Date();
        const upcoming = scheduleData.find((r: any) => new Date(r.date) >= now) || scheduleData[0];
        setNextRace(upcoming);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <section id="dashboard" className={styles.dashboard}>
      <h2 className={styles.sectionTitle}>Current Standings</h2>
      <div className={styles.grid}>
        <div className={`glass-panel ${styles.card}`}>
          <h3>Driver Championship</h3>
          {loading ? (
            <div className={styles.loader}>Loading...</div>
          ) : (
            <ul className={styles.standingsList}>
              {standings.map((driver, idx) => (
                <li key={driver.Driver.driverId} className={styles.driverItem}>
                  <span className={styles.position}>{idx + 1}</span>
                  <span className={styles.name}>{driver.Driver.givenName} {driver.Driver.familyName}</span>
                  <span className={styles.points}>{driver.points} pts</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className={`glass-panel ${styles.card}`}>
          <h3>Next Race</h3>
          {loading ? (
            <div className={styles.loader}>Loading...</div>
          ) : nextRace ? (
            <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <h4 style={{ fontSize: '1.2rem', color: 'var(--color-primary)' }}>{nextRace.raceName}</h4>
              <p><strong>Date:</strong> {new Date(nextRace.date).toLocaleDateString()}</p>
              <p><strong>Circuit:</strong> {nextRace.Circuit.circuitName}</p>
              <p><strong>Location:</strong> {nextRace.Circuit.Location.locality}, {nextRace.Circuit.Location.country}</p>
            </div>
          ) : (
            <p>No upcoming races.</p>
          )}
        </div>
      </div>
    </section>
  );
}
