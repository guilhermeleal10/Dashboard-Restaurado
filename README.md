# Os Donos Do Meta 2.0

Sistema web com multiperfis, interface responsiva e navegação por páginas separadas.

## Visão Geral

O projeto simula uma plataforma de gestão com quatro perfis principais:

- `Programador`
- `Gerente`
- `Atendente`
- `Usuário`

Cada perfil possui:

- página própria
- menu lateral com seções funcionais
- atalhos rápidos no botão `☰` quando aplicável
- ações e conteúdos adaptados ao papel do perfil

## Estrutura Atual

```text
Dashboard restaurado/
|- index.html
|- README.md
|- assets/
|  |- css/
|  |  \- styles.css
|  \- js/
|     |- app.js
|     |- dashboard.js
|     \- layout.js
\- pages/
   |- login.html
   |- recovery.html
   |- dash-dev.html
   |- dash-gerente.html
   |- dash-atendente.html
   \- dash-usuario.html
```

## Como Abrir

1. Abra `index.html` no navegador.
2. O sistema redireciona para `pages/login.html`.
3. Entre com uma conta demo ou use os botões de acesso rápido.

## Credenciais Demo

| Perfil | E-mail | Senha | Página |
|---|---|---|---|
| Programador | `dev@meta.com` | `1234` | `dash-dev.html` |
| Gerente | `gerente@meta.com` | `1234` | `dash-gerente.html` |
| Atendente | `atendente@meta.com` | `1234` | `dash-atendente.html` |
| Usuário | `usuario@meta.com` | `1234` | `dash-usuario.html` |

## Funcionalidades Implementadas

### Acesso

- login por perfil
- redirecionamento para a página correta
- recuperação de acesso
- persistência simples de sessão com `localStorage`

### Navegação

- páginas separadas em `pages/`
- menu lateral funcional por seção
- menu rápido no botão `☰` para perfis com atalhos
- recolhimento do menu lateral em notebook
- menu hambúrguer em telas menores

### Perfil `Usuário`

- `Início`
- `Meus Pedidos`
- `Favoritos`
- `Pagamentos`
- `Contato`
- `Perguntas Frequentes`
- `Meu Perfil`
- `Configurações`

### Perfil `Programador`

- `Painel Técnico`
- `Logs do Sistema`
- `Servidores`
- `Feedbacks`
- `Implantação`
- `Configuração`
- cadastro rápido de nova rota
- registro rápido de incidente

### Perfil `Gerente`

- `Painel Gerencial`
- `Metas e KPIs`
- `Equipe`
- `Financeiro`
- `Produtos`
- `Notificações`
- `Configuração`
- adição rápida de colaborador
- atualização de meta principal

### Perfil `Atendente`

- `Painel de Atendente`
- `Chamados`
- `Chat em Tempo Real`
- `Clientes`
- `Base de Conhecimentos`
- `Agenda`
- `Meu Desempenho`
- `Configuração`
- cadastro de novos clientes
- abertura de chamados

## Acessibilidade

Recursos disponíveis no rodapé:

- alto contraste
- texto grande
- fonte para dislexia
- redução de animações
- painel de Libras

## Responsividade

O layout foi ajustado para:

- notebook
- tablet
- Android
- telas pequenas

Elementos adaptados:

- sidebar
- topbar
- cards
- tabelas
- barra de acessibilidade
- painel de Libras

## Arquivos Principais

### `assets/js/app.js`

Responsável por:

- sessão
- navegação entre páginas
- autenticação
- acessibilidade
- comportamento global do sistema

### `assets/js/layout.js`

Responsável por:

- menu rápido do `☰`
- seções funcionais dos dashboards
- modais de ações
- funções dinâmicas por perfil

### `assets/js/dashboard.js`

Responsável por:

- inicialização visual das dashboards
- animação de barras
- ajustes leves de página

### `assets/css/styles.css`

Responsável por:

- tema visual
- responsividade
- sidebar
- topbar
- cards
- modais
- menu rápido

## Observações

- O projeto usa HTML, CSS e JavaScript puro.
- Parte dos dados e interações é simulada para demonstração.
- O foco atual está em navegação, organização por perfil e experiência visual.

## Próximos Passos Sugeridos

- persistir dados criados nos formulários
- conectar as ações a armazenamento real
- reduzir repetição entre páginas HTML
- adicionar testes de navegação e responsividade
