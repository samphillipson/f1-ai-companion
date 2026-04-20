"use client";
import { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";
import { fetchCurrentStandings } from "@/lib/jolpica";

export default function Dashboard() {
  const [standings, setStandings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchCurrentStandings();
        setStandings(data.slice(0, 5)); // Top 5
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
        <div className={`glass-panel ${styles.card} ${styles.placeholder}`}>
          <h3>Next Race</h3>
          <p>AI Predictive Insights Active...</p>
          <div className={styles.pulse}></div>
        </div>
      </div>
    </section>
  );
}
