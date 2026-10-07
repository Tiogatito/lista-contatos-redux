import { useEffect, useMemo, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { adicionar, editar, remover, useAppDispatch, useAppSelector } from './store'
import type { Contato, DadosContato, ErrosContato } from './types'
import { formatarTelefone, limparContato, normalizar, validarContato } from './types'
import Icon from './components/Icon'
import * as S from './styles'

const vazio: DadosContato = { nome: '', email: '', telefone: '' }

export default function App() {
  const dispatch = useAppDispatch()
  const { itens, aviso } = useAppSelector(estado => estado.contatos)
  const [busca, setBusca] = useState('')
  const [dados, setDados] = useState<DadosContato>(vazio)
  const [editando, setEditando] = useState<string | null>(null)
  const [erros, setErros] = useState<ErrosContato>({})
  const [mensagem, setMensagem] = useState('')
  const [excluindo, setExcluindo] = useState<Contato | null>(null)
  const nomeRef = useRef<HTMLInputElement>(null)
  const formularioRef = useRef<HTMLFormElement>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const novoRef = useRef<HTMLButtonElement>(null)
  const resultados = useMemo(() => {
    const termo = normalizar(busca.trim())
    const numeros = busca.replace(/\D/g, '')
    return itens.filter(contato => normalizar(`${contato.nome} ${contato.email} ${contato.telefone} ${formatarTelefone(contato.telefone)}`).includes(termo) || (/^[\d\s()+.-]+$/.test(busca) && numeros.length > 0 && contato.telefone.replace(/\D/g, '').includes(numeros))).sort((a,b) => a.nome.localeCompare(b.nome, 'pt-BR'))
  }, [itens, busca])

  useEffect(() => {
    if (excluindo && !dialogRef.current?.open) dialogRef.current?.showModal()
  }, [excluindo])

  function resetar() { setDados(vazio); setEditando(null); setErros({}) }
  function focarFormulario() {
    formularioRef.current?.scrollIntoView({ block: 'nearest', behavior: 'auto' })
    nomeRef.current?.focus()
  }
  function novoContato() { resetar(); setMensagem(''); focarFormulario() }
  function editarContato(contato: Contato) {
    setEditando(contato.id); setDados({ nome: contato.nome, email: contato.email, telefone: contato.telefone }); setErros({}); setMensagem(''); focarFormulario()
  }
  function salvar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault()
    const limpos = limparContato(dados)
    const validacao = validarContato(limpos)
    if (itens.some(contato => contato.id !== editando && contato.email.toLowerCase() === limpos.email)) validacao.email = 'Este e-mail já está na sua agenda.'
    setErros(validacao)
    const primeiro = Object.keys(validacao)[0]
    if (primeiro) { formularioRef.current?.querySelector<HTMLInputElement>(`[name="${primeiro}"]`)?.focus(); return }
    if (editando) dispatch(editar({ ...limpos, id: editando }))
    else dispatch(adicionar(limpos))
    setMensagem(`${limpos.nome}: contato ${editando ? 'atualizado' : 'adicionado'} com sucesso.`)
    resetar(); setBusca(''); nomeRef.current?.focus()
  }
  function confirmarExclusao() {
    if (!excluindo) return
    dispatch(remover(excluindo.id))
    if (editando === excluindo.id) resetar()
    setMensagem(`${excluindo.nome}: contato removido.`)
    dialogRef.current?.close()
    novoRef.current?.focus()
  }

  return <>
    <S.Skip href="#conteudo">Ir para meus contatos</S.Skip>
    <S.Layout>
      <S.Sidebar>
        <S.Marca><S.MarcaIcone><Icon nome="agenda" /></S.MarcaIcone>agenda<span style={{ color: '#1d4ed8' }}>.</span></S.Marca>
        <S.NavItem><Icon nome="pessoas" />Meus contatos</S.NavItem>
        <S.SideFooter>As pessoas certas,<br />sempre por perto.</S.SideFooter>
      </S.Sidebar>
      <S.Main id="conteudo" tabIndex={-1}>
        <S.Header>
          <div><S.Eyebrow>Sua agenda pessoal</S.Eyebrow><h1>Meus contatos</h1><p>Organize suas conexões em um só lugar.</p></div>
          <S.Button ref={novoRef} onClick={novoContato} $variant="primary"><Icon nome="mais" />Novo contato</S.Button>
        </S.Header>
        {aviso && <S.Warning role="alert">{aviso}</S.Warning>}
        <S.Content>
          <div>
            <S.Panel aria-labelledby="lista-titulo">
              <S.PanelHead>
                <S.PanelTitle><h2 id="lista-titulo">Todos os contatos</h2><S.Badge>{itens.length} {itens.length === 1 ? 'contato' : 'contatos'}</S.Badge></S.PanelTitle>
                <label htmlFor="busca" style={{ display: 'block', fontSize: 13, marginBottom: 7 }}>Buscar na agenda</label>
                <S.Search><Icon nome="busca" /><S.Input id="busca" type="search" value={busca} onChange={evento => setBusca(evento.target.value)} placeholder="Nome, e-mail ou telefone" /></S.Search>
                {busca && <p role="status">{resultados.length} {resultados.length === 1 ? 'resultado encontrado' : 'resultados encontrados'}</p>}
              </S.PanelHead>
              {resultados.length ? <S.List>{resultados.map(contato => <S.Row key={contato.id}>
                <S.Avatar aria-hidden="true">{contato.nome.split(' ').filter(Boolean).filter((_, i, arr) => i === 0 || i === arr.length - 1).map(parte => parte[0]).join('').toUpperCase()}</S.Avatar>
                <S.ContactInfo><h3>{contato.nome}</h3><p>{contato.email}</p><span>{formatarTelefone(contato.telefone)}</span></S.ContactInfo>
                <S.Actions>
                  <S.Button aria-label={`Editar ${contato.nome}`} onClick={() => editarContato(contato)}><Icon nome="editar" />Editar</S.Button>
                  <S.Button $variant="danger" aria-label={`Excluir ${contato.nome}`} onClick={() => setExcluindo(contato)}><Icon nome="excluir" />Excluir</S.Button>
                </S.Actions>
              </S.Row>)}</S.List> : <S.Empty><Icon nome="pessoas" width="32" height="32" /><h3>{busca ? 'Nenhum contato encontrado' : 'Sua agenda começa aqui'}</h3><p>{busca ? 'Tente outro nome, e-mail ou telefone.' : 'Adicione seu primeiro contato no formulário.'}</p>{busca && <S.Button onClick={() => setBusca('')} style={{ marginTop: 16 }}>Limpar busca</S.Button>}</S.Empty>}
            </S.Panel>
            <S.Note><Icon nome="salvo" width="16" height="16" />Seus contatos são salvos apenas neste navegador.</S.Note>
            <S.Feedback role="status" aria-live="polite">{mensagem}</S.Feedback>
          </div>
          <S.Panel aria-labelledby="form-titulo">
            <S.PanelHead><h2 id="form-titulo">{editando ? 'Editar contato' : 'Adicionar contato'}</h2><p>{editando ? 'Atualize os dados e salve as alterações.' : 'Preencha os três campos para começar.'}</p></S.PanelHead>
            <S.Form ref={formularioRef} onSubmit={salvar} noValidate>
              {(['nome', 'email', 'telefone'] as const).map(campo => <div key={campo}>
                <label htmlFor={campo}>{campo === 'nome' ? 'Nome completo' : campo === 'email' ? 'E-mail' : 'Telefone'}</label>
                <S.Input ref={campo === 'nome' ? nomeRef : undefined} id={campo} name={campo} type={campo === 'email' ? 'email' : campo === 'telefone' ? 'tel' : 'text'} autoComplete={campo === 'nome' ? 'name' : campo === 'telefone' ? 'tel' : 'email'} maxLength={campo === 'nome' ? 100 : campo === 'email' ? 254 : 24} value={dados[campo]} onChange={evento => { setDados({ ...dados, [campo]: evento.target.value }); setErros({ ...erros, [campo]: undefined }) }} required aria-invalid={Boolean(erros[campo])} aria-describedby={erros[campo] ? `${campo}-erro` : campo === 'telefone' ? 'telefone-ajuda' : undefined} placeholder={campo === 'nome' ? 'Nome e sobrenome' : campo === 'email' ? 'nome@exemplo.com' : '(11) 99999-9999'} />
                {erros[campo] && <S.ErrorText id={`${campo}-erro`}>{erros[campo]}</S.ErrorText>}
                {campo === 'telefone' && <small id="telefone-ajuda">Inclua o DDD. Para outro país, use +código.</small>}
              </div>)}
              <S.FormButtons><S.Button type="submit" $variant="primary">{editando ? 'Salvar alterações' : 'Adicionar contato'}</S.Button>{editando && <S.Button type="button" onClick={() => { resetar(); setMensagem('Edição cancelada.'); nomeRef.current?.focus() }}>Cancelar</S.Button>}</S.FormButtons>
            </S.Form>
          </S.Panel>
        </S.Content>
      </S.Main>
    </S.Layout>
    <S.Dialog ref={dialogRef} aria-labelledby="excluir-titulo" aria-describedby="excluir-descricao" onClose={() => setExcluindo(null)}>
      <h2 id="excluir-titulo">Excluir contato?</h2><p id="excluir-descricao">{excluindo?.nome} será removido da sua agenda. Essa ação não pode ser desfeita.</p>
      <S.FormButtons><S.Button onClick={() => dialogRef.current?.close()} autoFocus>Cancelar</S.Button><S.Button onClick={confirmarExclusao} $variant="danger">Confirmar exclusão</S.Button></S.FormButtons>
    </S.Dialog>
  </>
}
