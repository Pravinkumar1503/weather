
import React from 'react'
import useWeatherStore from '../store/weatherStore.js'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { cToF } from '../utils/weatherCodes.js'

export default function HourlyChart(){
  const { weather, units } = useWeatherStore()
  if (!weather) return <div className="card">Hourly forecast loading…</div>

  const hours = weather.hourly.time.slice(0, 24).map((t, i) => ({
    time: new Date(t).getHours() + ':00',
    temp: units.temp === 'c' ? weather.hourly.temperature_2m[i] : cToF(weather.hourly.temperature_2m[i])
  }))

  return (
    <div className="card">
      <div style={{fontWeight:700, marginBottom:8}}>Next 24 hours</div>
      <ResponsiveContainer width="100%" height={240}>
        <LineChart data={hours}>
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="temp" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
