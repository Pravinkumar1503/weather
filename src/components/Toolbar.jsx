
import React from 'react'
import useWeatherStore from '../store/weatherStore.js'

export default function Toolbar({ onUseMyLocation }){
  const { units, setUnits, recents, favorites, toggleFavorite, location } = useWeatherStore()
  const setTemp = (u) => setUnits({ ...units, temp: u })
  const setWind = (u) => setUnits({ ...units, wind: u })

  const favActive = favorites.some(f => f.latitude === location?.latitude && f.longitude === location?.longitude)

  return (
    <div className="row" style={{gap:12}}>
      <div className="row">
        <span className="muted">Temp:</span>
        <button className="btn" onClick={()=>setTemp('c')} disabled={units.temp==='c'}>°C</button>
        <button className="btn" onClick={()=>setTemp('f')} disabled={units.temp==='f'}>°F</button>
      </div>
      <div className="row">
        <span className="muted">Wind:</span>
        <button className="btn" onClick={()=>setWind('kmh')} disabled={units.wind==='kmh'}>km/h</button>
        <button className="btn" onClick={()=>setWind('mph')} disabled={units.wind==='mph'}>mph</button>
      </div>
      <button className="btn" onClick={onUseMyLocation}>Use my location</button>
      <button className="btn" onClick={()=>toggleFavorite()} disabled={!location}>{favActive ? '★ Favorite' : '☆ Favorite'}</button>
    </div>
  )
}
