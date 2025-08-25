
import React from 'react'
import useWeatherStore from '../store/weatherStore.js'
import { geocode } from '../services/openMeteo.js'

export default function SearchBar({ onSelect }){
  const [q, setQ] = React.useState('')
  const [suggs, setSuggs] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const { addRecent } = useWeatherStore()

  const search = async (name) => {
    if (!name.trim()) return setSuggs([])
    setLoading(true)
    try{
      const res = await geocode(name)
      setSuggs(res)
    } finally {
      setLoading(false)
    }
  }

  // Debounce
  React.useEffect(() => {
    const id = setTimeout(() => search(q), 300)
    return () => clearTimeout(id)
  }, [q])

  const handleSelect = (place) => {
    addRecent(place)
    onSelect(place)
    setSuggs([])
    setQ(place.name)
  }

  return (
    <div className="search">
      <input
        placeholder="Search city, e.g., Chennai, Mumbai, London"
        value={q}
        onChange={e=>setQ(e.target.value)}
      />
      {loading && <div className="muted">Searching…</div>}
      <div className="suggestions">
        {suggs.map(p => (
          <button key={`${p.latitude},${p.longitude}`} className="sugg" onClick={()=>handleSelect(p)}>
            <span>{p.name}{p.admin1 ? `, ${p.admin1}` : ''}{p.country ? `, ${p.country}` : ''}</span>
            <span className="pill">{p.latitude.toFixed(2)}, {p.longitude.toFixed(2)}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
