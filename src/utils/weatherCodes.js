
// Mapping Open‑Meteo WMO weather codes to simple emoji icons (for demo UI).
export function codeToIcon(code){
  const map = {
    0:'☀️', 1:'🌤️', 2:'⛅', 3:'☁️',
    45:'🌫️', 48:'🌫️',
    51:'🌦️', 53:'🌦️', 55:'🌦️',
    56:'🌧️', 57:'🌧️',
    61:'🌧️', 63:'🌧️', 65:'🌧️',
    66:'🌧️', 67:'🌧️',
    71:'🌨️', 73:'🌨️', 75:'🌨️',
    77:'❄️',
    80:'🌧️', 81:'🌧️', 82:'🌧️',
    85:'🌨️', 86:'🌨️',
    95:'⛈️', 96:'⛈️', 99:'⛈️'
  }
  return map[String(code)] || map[code] || '🌡️'
}

export const cToF = (c) => (c * 9) / 5 + 32
export const kmhToMph = (k) => k * 0.621371
