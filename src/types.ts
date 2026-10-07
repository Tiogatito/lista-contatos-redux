export interface Contato {
  id: string
  nome: string
  email: string
  telefone: string
}

export type DadosContato = Omit<Contato, 'id'>
export type ErrosContato = Partial<Record<keyof DadosContato, string>>

export const normalizar = (valor: string) => valor.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('pt-BR')
export const limparContato = (dados: DadosContato): DadosContato => ({
  nome: dados.nome.trim().replace(/\s+/g, ' '),
  email: dados.email.trim().toLowerCase(),
  telefone: dados.telefone.trim()
})

export function validarContato(dados: DadosContato): ErrosContato {
  const erros: ErrosContato = {}
  if (dados.nome.length < 3 || !/\S+\s+\S+/.test(dados.nome)) erros.nome = 'Informe o nome completo.'
  if (dados.nome.length > 100) erros.nome = 'Use até 100 caracteres.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(dados.email) || dados.email.length > 254) erros.email = 'Informe um e-mail válido.'
  const digitos = dados.telefone.replace(/\D/g, '')
  if (!/^\+?[\d\s().-]+$/.test(dados.telefone) || digitos.length < 10 || digitos.length > 15) erros.telefone = 'Informe um telefone com DDD (10 a 15 dígitos).'
  return erros
}

export function formatarTelefone(telefone: string) {
  const digitos = telefone.replace(/\D/g, '')
  if (digitos.length === 11 && !telefone.startsWith('+')) return `(${digitos.slice(0, 2)}) ${digitos.slice(2, 7)}-${digitos.slice(7)}`
  if (digitos.length === 10 && !telefone.startsWith('+')) return `(${digitos.slice(0, 2)}) ${digitos.slice(2, 6)}-${digitos.slice(6)}`
  return telefone
}
