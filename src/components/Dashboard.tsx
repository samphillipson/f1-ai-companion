"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
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
              {standings.map((driver, idx) => {
                const constructor = driver.Constructors[0];
                const teamId = constructor?.constructorId || 'unknown';
                
                // Updated 2026 Team Colors
                const teamColors: Record<string, string> = {
                  'red_bull': '#3671C6',
                  'mercedes': '#27F4D2',
                  'ferrari': '#E80020',
                  'mclaren': '#FF8000',
                  'aston_martin': '#229971',
                  'alpine': '#0093CC',
                  'haas': '#B6BABD',
                  'williams': '#64C4FF',
                  'rb': '#6692FF',
                  'sauber': '#E11B22', // Audi Red
                  'audi': '#E11B22',
                  'cadillac': '#FFD700'
                };

                const teamColor = teamColors[teamId] || 'var(--f1-red)';

                return (
                  <li 
                    key={driver.Driver.driverId} 
                    className={styles.driverItem}
                    style={{ '--team-color': teamColor } as any}
                  >
                    <div className={styles.teamAccent}></div>
                    <span className={styles.position}>{idx + 1}</span>
                    <span className={styles.name}>{driver.Driver.givenName} {driver.Driver.familyName}</span>
                    <span className={styles.points}>{driver.points} pts</span>
                  </li>
                );
              })}
            </ul>
          )}
          <div style={{ marginTop: 'auto', paddingTop: '1rem' }}>
            <Link href="/drivers" className={styles.actionBtn}>
              View All Drivers
            </Link>
          </div>
        </div>
        <div className={`glass-panel ${styles.card}`}>
          <h3>Next Race</h3>
          {loading ? (
            <div className={styles.loader}>Loading...</div>
          ) : nextRace ? (
            <div className={styles.nextRaceInfo}>
              <h4 className={styles.raceTitle}>{nextRace.raceName}</h4>
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
