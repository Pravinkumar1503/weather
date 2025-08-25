
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

const useWeatherStore = create(persist((set, get) => ({
  location: null,
  weather: null,
  error: null,

  units: { temp: 'c', wind: 'kmh' }, // 'c'|'f' and 'kmh'|'mph'

  recents: [],
  favorites: [],

  setLocation: (place) => set({ location: place }),
  setWeather: (data) => set({ weather: data }),
  setError: (msg) => set({ error: msg }),

  setUnits: (u) => set({ units: u }),
  addRecent: (place) => set(state => {
    const exists = state.recents.find(r => r.latitude===place.latitude && r.longitude===place.longitude)
    const next = exists ? state.recents : [place, ...state.recents].slice(0, 5)
    return { recents: next }
  }),

  toggleFavorite: () => set(state => {
    const loc = state.location
    if (!loc) return {}
    const exists = state.favorites.find(f => f.latitude===loc.latitude && f.longitude===loc.longitude)
    const next = exists
      ? state.favorites.filter(f => !(f.latitude===loc.latitude && f.longitude===loc.longitude))
      : [loc, ...state.favorites]
    return { favorites: next }
  })
}), {
  name: 'weather-react-v1',
  storage: createJSONStorage(() => localStorage)
}))

export default useWeatherStore
