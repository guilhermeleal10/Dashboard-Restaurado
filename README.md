# Os Donos Do Meta 2.0

Dashboard web multiperfil desenvolvido com HTML, CSS e JavaScript puro. O projeto simula uma plataforma de gestao com autenticacao local, dashboards por perfil, acessibilidade e interacoes dinamicas sem dependencia de framework.

## Visao geral

O sistema possui quatro perfis de demonstracao:

- `Programador`
- `Gerente`
- `Atendente`
- `Usuario`

Cada perfil possui dashboard próprio, menu lateral com seções internas e conteudo adaptado ao contexto de uso.

## Principais recursos

- login com redirecionamento automatico por perfil
- recuperação de acesso com validação simples de e-mail
- dashboards com navegação interna por seções
- animações leves de entrada, contadores e gráficos
- layout responsivo para desktop, tablet e mobile
- barra de acessibilidade fixa em todas as páginas

## Perfis e acessos demo

| Perfil | E-mail | Senha | Dashboard |
| Programador | `dev@meta.com` | `1234` | `pages/dash-dev.html` |
| Gerente | `gerente@meta.com` | `1234` | `pages/dash-gerente.html` |
| Atendente | `atendente@meta.com` | `1234` | `pages/dash-atendente.html` |
| Usuario | `usuario@meta.com` | `1234` | `pages/dash-usuario.html` |l.

## Estrutura do projeto

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
   |- Recuperar senha.html
   |- dash-dev.html
   |- dash-gerente.html
   |- dash-atendente.html
   \- dash-usuario.html
```

## Seções por perfil

### Usuario

- `Inicio`
- `Meus Pedidos`
- `Favoritos`
- `Pagamentos`
- `Contato`
- `Perguntas Frequentes`
- `Meu Perfil`
- `Configuracoes`

### Programador

- `Painel Tecnico`
- `Logs do Sistema`
- `Servidores`
- `Feedbacks`
- `Implantacao`
- `Configuracao`

### Gerente

- `Painel Gerencial`
- `Metas e KPIs`
- `Equipe`
- `Financeiro`
- `Produtos`
- `Notificacoes`
- `Configuracao`

### Atendente

- `Painel de Atendente`
- `Chamados`
- `Chat em Tempo Real`
- `Clientes`
- `Base de Conhecimentos`
- `Agenda`
- `Meu Desempenho`
- `Configuracao`

## Acessibilidade

O projeto inclui recursos de acessibilidade em todas as paginas:

- alto contraste
- texto grande
- ajuste de leitura para dislexia
- reducao de animações
- painel de Libras
