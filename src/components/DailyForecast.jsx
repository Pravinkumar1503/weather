
import React from 'react'
import useWeatherStore from '../store/weatherStore.js'
import { codeToIcon } from '../utils/weatherCodes.js'

export default function DailyForecast(){
  const { weather, units } = useWeatherStore()
  if (!weather) return null
  const days = weather.daily

  const formatTemp = (c) => units.temp==='c' ? Math.round(c) + '°C' : Math.round((c*9)/5 + 32) + '°F'

  return (
    <div className="card">
      <div style={{fontWeight:700, marginBottom:10}}>7‑day forecast</div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(140px, 1fr))',gap:10}}>
        {days.time.map((d, idx) => (
          <div key={d} className="card" style={{padding:12}}>
            <div className="muted">{new Date(d).toLocaleDateString(undefined,{weekday:'short', month:'short', day:'numeric'})}</div>
            <div style={{fontSize:32}}>{codeToIcon(days.weather_code[idx])}</div>
            <div className="row">
              <span className="pill">↑ {formatTemp(days.temperature_2m_max[idx])}</span>
              <span className="pill">↓ {formatTemp(days.temperature_2m_min[idx])}</span>
            </div>
            <div className="muted">Rain chance {days.precipitation_probability_max[idx] ?? 0}%</div>
          </div>
        ))}
      </div>
    </div>
  )
}
