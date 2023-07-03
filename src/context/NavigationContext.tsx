import { createContext } from 'preact'

const NavigationContext = createContext(window.location.href)

export default NavigationContext
