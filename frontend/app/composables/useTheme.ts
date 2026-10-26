/** Misma clave que lee el script inline de nuxt.config para pintar el tema antes de montar Vue. */
export const THEME_STORAGE_KEY = 'heavnd-theme'

export type ThemePreference = 'SYSTEM' | 'LIGHT' | 'DARK'

const DARK_QUERY = '(prefers-color-scheme: dark)'

function readStored(): ThemePreference {
  try {
    const value = localStorage.getItem(THEME_STORAGE_KEY)
    return value === 'LIGHT' || value === 'DARK' ? value : 'SYSTEM'
  } catch {
    return 'SYSTEM'
  }
}

function apply(preference: ThemePreference) {
  const dark = preference === 'DARK' || (preference === 'SYSTEM' && window.matchMedia(DARK_QUERY).matches)
  document.documentElement.classList.toggle('dark', dark)
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? '#101012' : '#f6f5f2')
}

/**
 * Preferencia de tema. Sin cuentas en la landing, solo se guarda en localStorage.
 * Empieza en SYSTEM para que el HTML prerenderizado y la hidratación coincidan; restore() lee la
 * preferencia guardada al montar (el script inline ya ha pintado el tema correcto antes).
 */
export function useTheme() {
  const preference = useState<ThemePreference>('theme:preference', () => 'SYSTEM')

  function restore() {
    preference.value = readStored()
    window.matchMedia(DARK_QUERY).addEventListener('change', () => {
      if (preference.value === 'SYSTEM') apply('SYSTEM')
    })
  }

  function setPreference(value: ThemePreference) {
    preference.value = value
    try {
      localStorage.setItem(THEME_STORAGE_KEY, value)
    } catch {
      // Sin almacenamiento (modo privado): se aplica igual, solo que no se recuerda en este navegador.
    }
    apply(value)
  }

  return { preference, restore, setPreference }
}
