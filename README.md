# Lista de contatos

Exercício do módulo 32: agenda feita com React, Redux Toolkit e Styled Components.

## Funcionalidades

- Adicionar contatos com nome completo, e-mail e telefone.
- Editar os três campos e cancelar alterações.
- Remover contatos após confirmação.
- Buscar por nome, e-mail ou telefone, com ordenação alfabética.
- Validar campos e impedir e-mails repetidos.
- Salvar a agenda no localStorage e restaurá-la ao recarregar.
- Interface responsiva, mensagens de resultado e navegação pelo teclado.

A primeira abertura mostra três contatos fictícios, com e-mails de exemplo. Eles podem ser editados ou removidos. Não há servidor ou envio de dados: os registros ficam somente neste navegador. Limpar os dados do site remove a agenda; em navegação privada ou com armazenamento bloqueado, a persistência pode não estar disponível. O aplicativo avisa quando não consegue recuperar ou salvar os registros.

## Executar

Requer Node.js 24 e npm.

```sh
npm ci
npm run dev
```

## Gerar versão de produção

```sh
npm run build
npm run preview
```

O build confere a tipagem TypeScript e gera a pasta `dist`. A configuração `vercel.json` define a publicação com Vite.

## Organização

- `src/store/index.ts`: estado Redux, ações de cadastro/edição/remoção, hooks tipados e persistência.
- `src/types.ts`: tipos, normalização, validação e formatação do telefone.
- `src/App.tsx`: lista, busca, formulário controlado e confirmação de exclusão.
- `src/styles.ts`: estilos globais, tema e componentes responsivos com Styled Components.
- `src/components/Icon.tsx`: ícones SVG locais.
