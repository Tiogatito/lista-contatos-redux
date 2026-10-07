import { configureStore, createListenerMiddleware, createSlice, isAnyOf, nanoid } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import type { Contato, DadosContato } from '../types'
import { validarContato } from '../types'

const CHAVE = 'agenda-contatos:v1'
interface EstadoContatos { itens: Contato[]; aviso: string }
const exemplos: Contato[] = [
  { id: 'exemplo-ana', nome: 'Ana Carolina Silva', email: 'ana.silva@example.com', telefone: '11987654321' },
  { id: 'exemplo-bruno', nome: 'Bruno Henrique Costa', email: 'bruno.costa@example.com', telefone: '21976543210' },
  { id: 'exemplo-mariana', nome: 'Mariana Oliveira', email: 'mariana@example.com', telefone: '31965432109' }
]

function carregar(): EstadoContatos {
  try {
    const salvo = localStorage.getItem(CHAVE)
    if (salvo === null) return { itens: exemplos, aviso: '' }
    const itens: unknown = JSON.parse(salvo)
    if (!Array.isArray(itens) || !itens.every((item: unknown) => {
      if (!item || typeof item !== 'object') return false
      const contato = item as Contato
      return typeof contato.id === 'string' && typeof contato.nome === 'string' && typeof contato.email === 'string' && typeof contato.telefone === 'string' && Object.keys(validarContato(contato)).length === 0
    })) throw new Error('Formato inválido')
    if (new Set(itens.map(item => item.id)).size !== itens.length || new Set(itens.map(item => item.email.toLowerCase())).size !== itens.length) throw new Error('Contatos repetidos')
    return { itens, aviso: '' }
  } catch {
    return { itens: [], aviso: 'Não foi possível recuperar os contatos salvos neste navegador. Você pode usar a agenda nesta sessão.' }
  }
}

const contatos = createSlice({
  name: 'contatos',
  initialState: carregar(),
  reducers: {
    adicionar: {
      reducer(estado, { payload }: PayloadAction<Contato>) { estado.itens.push(payload) },
      prepare(dados: DadosContato) { return { payload: { ...dados, id: nanoid() } } }
    },
    editar(estado, { payload }: PayloadAction<Contato>) {
      const indice = estado.itens.findIndex(item => item.id === payload.id)
      if (indice !== -1) estado.itens[indice] = payload
    },
    remover(estado, { payload }: PayloadAction<string>) { estado.itens = estado.itens.filter(item => item.id !== payload) },
    definirAviso(estado, { payload }: PayloadAction<string>) { estado.aviso = payload }
  }
})
export const { adicionar, editar, remover, definirAviso } = contatos.actions
const persistencia = createListenerMiddleware()
export const store = configureStore({ reducer: { contatos: contatos.reducer }, middleware: getDefault => getDefault().prepend(persistencia.middleware) })
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
persistencia.startListening({
  matcher: isAnyOf(adicionar, editar, remover),
  effect: (_, api) => {
    try {
      localStorage.setItem(CHAVE, JSON.stringify((api.getState() as RootState).contatos.itens))
      api.dispatch(definirAviso(''))
    } catch {
      api.dispatch(definirAviso('Os contatos estão disponíveis nesta sessão, mas o navegador não permitiu salvá-los.'))
    }
  }
})
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
