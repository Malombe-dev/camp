// client/src/utils/locationData.js

import raw from './locationRaw.json';

// 🧩 Fix: Use correct names exactly as they appear
const countiesTable = raw.find(t => t.name === 'counties')?.data || [];
const subcountiesTable = raw.find(t => t.name === 'subcounties')?.data || [];
const stationsTable = raw.find(t => t.name === 'station')?.data || []; // ← FIXED here



const locationData = countiesTable.map((county) => {
  const countySubcounties = subcountiesTable.filter(
    sub => sub.county_id === county.county_id
  );

  const constituencies = countySubcounties.map(sub => {
    const subWards = stationsTable
      .filter(station => station.subcounty_id === sub.subcounty_id)
      .map(station => ({
        constituency: station.constituency_name?.trim(),
        ward: station.ward?.trim()
      }))
      .filter(st => st.constituency && st.ward);

    // Group by constituency name
    const grouped = {};
    for (const entry of subWards) {
      if (!grouped[entry.constituency]) {
        grouped[entry.constituency] = [];
      }
      grouped[entry.constituency].push(entry.ward);
    }

    return Object.entries(grouped).map(([constituencyName, wards]) => ({
      name: constituencyName,
      wards: [...new Set(wards)]
    }));
  }).flat();

  return {
    name: county.county_name?.trim(),
    constituencies
  };
});

console.log("✅ Sample Final County:", locationData[0]);

export { locationData };
