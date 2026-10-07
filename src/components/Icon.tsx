import type { SVGProps } from 'react'
type Nome = 'agenda' | 'pessoas' | 'mais' | 'busca' | 'editar' | 'excluir' | 'salvo'
const paths: Record<Nome, string> = {
  agenda: 'M5 4h14v16H5z M3 8h4 M3 12h4 M3 16h4 M10 9h5 M10 14h5',
  pessoas: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M16 3a4 4 0 0 1 0 8 M22 21v-2a4 4 0 0 0-3-3.87 M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0',
  mais: 'M12 5v14 M5 12h14',
  busca: 'M21 21l-5-5 M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0',
  editar: 'M16 3l5 5 M3 21l5-1L21 7a2 2 0 0 0-4-4L4 16z',
  excluir: 'M3 6h18 M9 6V3h6v3 M5 6l1 15h12l1-15 M10 10v7 M14 10v7',
  salvo: 'M12 3l8 4v6c0 4-8 8-8 8s-8-4-8-8V7z M8 12l3 3 5-6'
}
export default function Icon({ nome, ...props }: SVGProps<SVGSVGElement> & { nome: Nome }) {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" {...props}><path d={paths[nome]} /></svg>
}
