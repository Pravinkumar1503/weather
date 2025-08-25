
import React from 'react'
import useWeatherStore from '../store/weatherStore.js'
import { codeToIcon, cToF, kmhToMph } from '../utils/weatherCodes.js'

export default function CurrentCard(){
  const { location, weather, units } = useWeatherStore()
  if (!weather || !location) return <div className="card">Loading current weather…</div>

  const c = weather.current
  const temp = units.temp==='c' ? Math.round(c.temperature_2m) : Math.round(cToF(c.temperature_2m))
  const wind = units.wind==='kmh' ? Math.round(c.wind_speed_10m) + ' km/h' : Math.round(kmhToMph(c.wind_speed_10m)) + ' mph'

  return (
    <div className="card">
      <div className="row" style={{justifyContent:'space-between'}}>
        <div>
          <div style={{fontWeight:700,fontSize:18}}>{location.name}{location.country ? `, ${location.country}` : ''}</div>
          <div className="muted">{new Date(weather.generated).toLocaleString()}</div>
        </div>
        <div style={{fontSize:42}}>{codeToIcon(c.weather_code)}</div>
      </div>

      <div className="row" style={{gap:16,marginTop:12}}>
        <div className="pill" style={{fontSize:24}}>{temp}°{units.temp}</div>
        <div className="pill">Feels {units.temp==='c' ? Math.round(c.apparent_temperature) : Math.round(cToF(c.apparent_temperature))}°</div>
        <div className="pill">Humidity {c.relative_humidity_2m}%</div>
        <div className="pill">Wind {wind}</div>
      </div>
    </div>
  )
}
