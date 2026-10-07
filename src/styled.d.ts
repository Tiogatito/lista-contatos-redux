import 'styled-components'
import type { tema } from './styles'
declare module 'styled-components' { export interface DefaultTheme extends Readonly<typeof tema> {} }
