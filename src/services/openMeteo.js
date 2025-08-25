
const GEOCODE_URL = 'https://geocoding-api.open-meteo.com/v1/search'
const FORECAST_URL = 'https://api.open-meteo.com/v1/forecast'

export async function geocode(name){
  const url = new URL(GEOCODE_URL)
  url.searchParams.set('name', name)
  url.searchParams.set('count', '5')
  url.searchParams.set('language', 'en')
  url.searchParams.set('format', 'json')
  const res = await fetch(url)
  if (!res.ok) throw new Error('geocode failed')
  const data = await res.json()
  return (data.results || []).map(r => ({
    name: r.name,
    country: r.country,
    admin1: r.admin1,
    latitude: r.latitude,
    longitude: r.longitude
  }))
}

export async function fetchByName(name){
  const results = await geocode(name)
  if (!results.length) throw new Error('not found')
  const place = results[0]
  const data = await fetchByCoords(place.latitude, place.longitude)
  return { place, data }
}

export async function fetchByCoords(lat, lon){
  const url = new URL(FORECAST_URL)
  url.searchParams.set('latitude', String(lat))
  url.searchParams.set('longitude', String(lon))
  url.searchParams.set('current', 'temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m')
  url.searchParams.set('hourly', 'temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,weather_code,wind_speed_10m')
  url.searchParams.set('daily', 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,sunrise,sunset')
  url.searchParams.set('timezone', 'auto')

  const res = await fetch(url)
  if (!res.ok) throw new Error('forecast failed')
  const raw = await res.json()

  return {
    generated: new Date().toISOString(),
    current: raw.current,
    hourly: raw.hourly,
    daily: raw.daily
  }
}
