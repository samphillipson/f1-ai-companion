export async function fetchCurrentStandings() {
  const res = await fetch("http://api.jolpi.ca/ergast/f1/current/driverStandings.json");
  if (!res.ok) {
    throw new Error("Failed to fetch standings");
  }
  const data = await res.json();
  return data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
}

export async function fetchRaceSchedule() {
  const res = await fetch("http://api.jolpi.ca/ergast/f1/current.json");
  if (!res.ok) {
    throw new Error("Failed to fetch schedule");
  }
  const data = await res.json();
  return data.MRData.RaceTable.Races;
}
