
import React from 'react'
import SearchBar from './components/SearchBar.jsx'
import CurrentCard from './components/CurrentCard.jsx'
import DailyForecast from './components/DailyForecast.jsx'
import HourlyChart from './components/HourlyChart.jsx'
import Toolbar from './components/Toolbar.jsx'
import useWeatherStore from './store/weatherStore.js'
import { fetchByCoords, fetchByName } from './services/openMeteo.js'
import ErrorBanner from './components/ErrorBanner.jsx'

export default function App(){
  const { location, setWeather, setLocation, setError, error } = useWeatherStore()

  const onSearchSelect = async (place) => {
    try {
      setError(null)
      setLocation(place)
      const data = await fetchByCoords(place.latitude, place.longitude)
      setWeather(data)
    } catch (e) {
      setError('Failed to fetch weather. Please try again.')
    }
  }

  const useMyLocation = () => {
    if (!navigator.geolocation) return setError('Geolocation not supported.')
    setError(null)
    navigator.geolocation.getCurrentPosition(async (pos) => {
      try {
        const { latitude, longitude } = pos.coords
        const place = { name: 'My location', country: '', latitude, longitude }
        setLocation(place)
        const data = await fetchByCoords(latitude, longitude)
        setWeather(data)
      } catch (e) {
        setError('Failed to fetch weather for your location.')
      }
    }, () => setError('Location permission denied.'))
  }

  React.useEffect(() => {
    // Try a default location on first load
    if (!location) {
      fetchByName('Chennai').then(({ place, data }) => {
        setLocation(place)
        setWeather(data)
      }).catch(()=>{})
    }
  }, [])

  return (
    <div className="layout">
      <header className="topbar">
        <div className="brand">
          <span className="logo">⛅</span>
          <div>
            <div className="title">Weather</div>
            <div className="subtitle">React + Open‑Meteo</div>
          </div>
        </div>
        <Toolbar onUseMyLocation={useMyLocation} />
      </header>

      <div className="container">
        <SearchBar onSelect={onSearchSelect} />

        {error && <ErrorBanner message={error} />}

        <div className="grid">
          <CurrentCard />
          <HourlyChart />
        </div>

        <DailyForecast />
      </div>

      <footer className="foot">Data by Open‑Meteo • No API key required</footer>
    </div>
  )
}
