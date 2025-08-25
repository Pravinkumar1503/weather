
# Weather (React + Vite) — Open‑Meteo

A modern **React** weather app powered by **Open‑Meteo** (no API key needed).  
Features:
- City search with suggestions (Open‑Meteo Geocoding)
- Current conditions
- 7‑day forecast
- Hourly temperature chart (Recharts)
- °C/°F and km/h or mph toggles
- "Use my location" (browser geolocation)
- Favorites & recent searches (Zustand + localStorage)
- Clean responsive UI

## Run
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
npm run preview
```

## Notes
- Uses the free Open‑Meteo endpoints so it works without an API key.
- If you prefer OpenWeatherMap, swap the service layer `src/services/openMeteo.js` with your own.
