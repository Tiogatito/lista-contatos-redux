import styled, { createGlobalStyle } from 'styled-components'

export const tema = { azul: '#1d4ed8', azulClaro: '#eff6ff', fundo: '#f6f8fc', texto: '#17233b', secundario: '#52617a', borda: '#e1e7f0', branco: '#ffffff', perigo: '#b42318', verde: '#166534' }
export const GlobalStyle = createGlobalStyle`
  * { box-sizing: border-box; }
  body { margin: 0; color: ${({ theme }) => theme.texto}; background: ${({ theme }) => theme.fundo}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.5; }
  button, input { font: inherit; }
  button { cursor: pointer; }
  button, a, input { -webkit-tap-highlight-color: transparent; }
  :focus-visible { outline: 3px solid ${({ theme }) => theme.azul}; outline-offset: 4px; }
  button:disabled { cursor: default; }
  h1, h2, p { margin: 0; }
  svg { flex-shrink: 0; }
  @media (prefers-reduced-motion: reduce) { *, *::before, *::after { scroll-behavior: auto !important; transition: none !important; } }
`
export const Layout = styled.div`min-height: 100vh; display: grid; grid-template-columns: 224px minmax(0,1fr); @media(max-width: 850px){ grid-template-columns: 1fr; }`
export const Sidebar = styled.aside`
  background: ${({ theme }) => theme.branco}; border-right: 1px solid ${({ theme }) => theme.borda}; padding: 32px 20px; display: flex; flex-direction: column; gap: 44px;
  @media(max-width:850px){ padding:18px 24px; border-right:0; border-bottom:1px solid ${({ theme }) => theme.borda}; flex-direction:row; align-items:center; justify-content:space-between; gap:16px; }
`
export const Marca = styled.div`display:flex; align-items:center; gap:12px; font-size:23px; font-weight:750; letter-spacing:-.7px;`
export const MarcaIcone = styled.span`display:grid; place-items:center; width:40px; height:40px; border-radius:12px; background:${({ theme }) => theme.azul}; color:white;`
export const NavItem = styled.div`background:${({ theme }) => theme.azulClaro}; color:${({ theme }) => theme.azul}; border-radius:10px; padding:12px; display:flex; gap:10px; align-items:center; font-weight:650; font-size:14px; @media(max-width:480px){ padding:10px; }`
export const SideFooter = styled.p`margin-top:auto; font-size:12px; color:${({ theme }) => theme.secundario}; @media(max-width:850px){ display:none; }`
export const Main = styled.main`width:100%; max-width:1500px; margin:auto; padding:46px 42px; align-self:start; @media(max-width:600px){ padding:28px 18px; }`
export const Skip = styled.a`position:fixed; top:-80px; left:20px; z-index:10; padding:12px; background:white; color:${({ theme }) => theme.azul}; &:focus{top:12px;}`
export const Header = styled.header`display:flex; justify-content:space-between; gap:24px; align-items:center; margin-bottom:30px; h1{ font-size:clamp(26px,3vw,36px); line-height:1.2; letter-spacing:-1px; margin-bottom:10px; } p{color:${({ theme }) => theme.secundario}; font-size:15px;} @media(max-width:500px){align-items:flex-start; flex-direction:column;gap:14px;}`
export const Eyebrow = styled.p`text-transform:uppercase; letter-spacing:1.7px; color:${({ theme }) => theme.azul}!important; font-size:11px!important; font-weight:750; margin-bottom:10px;`
export const Button = styled.button<{ $variant?: 'primary' | 'danger' | 'plain' }>`
  border:1px solid ${({ theme, $variant }) => $variant === 'primary' ? theme.azul : $variant === 'danger' ? theme.perigo : theme.borda};
  background:${({ theme, $variant }) => $variant === 'primary' ? theme.azul : theme.branco};
  color:${({ theme, $variant }) => $variant === 'primary' ? theme.branco : $variant === 'danger' ? theme.perigo : theme.texto};
  display:inline-flex; align-items:center; justify-content:center; gap:8px; padding:11px 16px; min-height:44px; border-radius:9px; font-size:14px; font-weight:650; transition:background .15s;
  &:hover{background:${({ theme, $variant }) => $variant === 'primary' ? '#173fac' : theme.fundo};}
`
export const Content = styled.div`display:grid; grid-template-columns:minmax(0,1fr) 320px; gap:24px; align-items:start; @media(max-width:1100px){grid-template-columns:1fr;} `
export const Panel = styled.section`background:${({ theme }) => theme.branco}; border:1px solid ${({ theme }) => theme.borda}; border-radius:16px; overflow:hidden;`
export const PanelHead = styled.div`padding:24px; border-bottom:1px solid ${({ theme }) => theme.borda}; h2{font-size:17px;letter-spacing:-.3px;} p{color:${({ theme }) => theme.secundario}; font-size:13px; margin-top:6px;}`
export const PanelTitle = styled.div`display:flex; gap:10px; align-items:center; justify-content:space-between; margin-bottom:20px;`
export const Badge = styled.span`display:inline-flex; align-items:center; gap:6px; background:${({ theme }) => theme.azulClaro}; color:${({ theme }) => theme.azul}; padding:4px 10px; border-radius:24px; font-size:12px; font-weight:650;`
export const Search = styled.div`position:relative; svg{position:absolute;top:14px;left:14px;color:${({ theme }) => theme.secundario};} input{padding-left:42px;}`
export const Input = styled.input`display:block; width:100%; min-width:0; padding:12px 14px; border:1px solid ${({ theme }) => theme.borda}; border-radius:9px; background:white; color:${({ theme }) => theme.texto}; font-size:14px; min-height:46px; &[aria-invalid=true]{border-color:${({ theme }) => theme.perigo};} &::placeholder{color:#65758d;}`
export const List = styled.ul`list-style:none; padding:0; margin:0;`
export const Row = styled.li`display:grid; grid-template-columns:42px minmax(0,1fr) auto; gap:14px; align-items:center; padding:23px 24px; border-bottom:1px solid ${({ theme }) => theme.borda}; &:last-child{border-bottom:0;} @media(max-width:580px){grid-template-columns:38px minmax(0,1fr); gap:12px;padding:20px;}`
export const Avatar = styled.span`display:grid;place-items:center; width:42px; height:42px; border-radius:13px; background:${({ theme }) => theme.azulClaro}; color:${({ theme }) => theme.azul}; font-size:14px; font-weight:700;`
export const ContactInfo = styled.div`min-width:0; h3{font-size:15px; margin:0 0 5px;} p{color:${({ theme }) => theme.secundario};font-size:13px;overflow-wrap:anywhere;} span{display:inline-block; margin-top:3px; font-size:13px; color:${({ theme }) => theme.secundario};}`
export const Actions = styled.div`display:flex;gap:8px; button{padding:10px;font-size:13px;} @media(max-width:580px){grid-column:2;}`
export const Form = styled.form`padding:24px; display:grid;gap:18px; label{display:block; font-size:13px; font-weight:650; margin-bottom:7px;} small{display:block;margin-top:6px;color:${({ theme }) => theme.secundario};font-size:12px;} `
export const ErrorText = styled.p`color:${({ theme }) => theme.perigo};font-size:12px; margin-top:6px;`
export const FormButtons = styled.div`display:flex;flex-wrap:wrap;gap:10px; button{flex:1;}`
export const Note = styled.p`font-size:12px;color:${({ theme }) => theme.secundario};margin-top:16px; display:flex;gap:7px;align-items:flex-start;`
export const Empty = styled.div`padding:52px 24px; text-align:center; svg{color:${({ theme }) => theme.azul};margin-bottom:12px;} h3{font-size:17px;margin:0 0 8px;} p{font-size:14px;color:${({ theme }) => theme.secundario};}`
export const Feedback = styled.p`min-height:24px; margin:18px 0; font-size:14px; color:${({ theme }) => theme.verde};`
export const Warning = styled.p`font-size:14px; background:#fff7ed; color:#9a3412; border:1px solid #fed7aa; padding:14px; border-radius:10px; margin-bottom:20px;`
export const Dialog = styled.dialog`border:1px solid ${({ theme }) => theme.borda}; border-radius:16px; padding:28px; width:440px; max-width:calc(100vw - 32px); color:${({ theme }) => theme.texto}; &::backdrop{background:rgb(15 23 42 / .4);} h2{font-size:22px;margin-bottom:12px;} p{font-size:14px;color:${({ theme }) => theme.secundario};margin-bottom:24px;overflow-wrap:anywhere;} `
