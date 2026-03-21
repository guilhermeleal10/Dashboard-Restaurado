const roleQuickActions = {
  'dash-dev': {
    title: 'Atalhos do Programador',
    subtitle: 'Ações rápidas para desenvolvimento e operação.',
    actions: [
      { id: 'toggle-sidebar', label: 'Alternar navegação', description: 'Mostra ou recolhe o menu lateral.' },
      { id: 'novo-endpoint', label: 'Cadastrar nova rota', description: 'Adiciona uma nova rota na tabela de APIs.' },
      { id: 'registrar-incidente', label: 'Registrar incidente', description: 'Insere um novo evento crítico nos logs.' },
      { id: 'implantar-versao', label: 'Implantação rápida', description: 'Simula a publicação de uma nova versão.' }
    ]
  },
  'dash-gerente': {
    title: 'Atalhos do Gerente',
    subtitle: 'Ferramentas para equipe, metas e acompanhamento.',
    actions: [
      { id: 'toggle-sidebar', label: 'Alternar navegação', description: 'Mostra ou recolhe o menu lateral.' },
      { id: 'novo-colaborador', label: 'Adicionar colaborador', description: 'Inclui um novo colaborador na equipe.' },
      { id: 'nova-meta', label: 'Registrar nova meta', description: 'Atualiza o objetivo principal da equipe.' },
      { id: 'gerar-relatorio', label: 'Gerar relatório', description: 'Cria um resumo gerencial instantâneo.' }
    ]
  },
  'dash-atendente': {
    title: 'Atalhos do Atendente',
    subtitle: 'Ferramentas para atendimento ao cliente.',
    actions: [
      { id: 'toggle-sidebar', label: 'Alternar navegação', description: 'Mostra ou recolhe o menu lateral.' },
      { id: 'novo-cliente', label: 'Cadastrar cliente', description: 'Registra um novo cliente no atendimento.' },
      { id: 'abrir-chamado', label: 'Abrir chamado', description: 'Adiciona um novo chamado à fila.' },
      { id: 'registrar-retorno', label: 'Registrar retorno', description: 'Anota um retorno importante do cliente.' }
    ]
  }
};

const dashboardSectionConfig = {
  'dash-usuario': {
    defaultSection: 'inicio',
    titleMap: {
      inicio: '🏠 MINHA ÁREA',
      'meus-pedidos': '📦 MEUS PEDIDOS',
      favoritos: '❤️ FAVORITOS',
      pagamentos: '💳 PAGAMENTOS',
      contato: '🎧 CONTATO',
      'perguntas-frequentes': '❓ PERGUNTAS FREQUENTES',
      'meu-perfil': '👤 MEU PERFIL',
      configuracoes: '⚙️ CONFIGURAÇÕES'
    },
    templates: {
      'meus-pedidos': `
        <div class="glass-card card">
          <div class="card-header"><span class="card-title">📦 Histórico de Pedidos</span><button class="btn btn-outline btn-sm" onclick="App.toast('Atualizando pedidos...','info','📦')">Atualizar</button></div>
          <div style="display:flex;flex-direction:column;gap:12px">
            <div class="glass-card" style="padding:16px"><strong>#PED-20260318</strong><div style="font-size:12px;color:var(--text-secondary);margin-top:6px">Plano Meta Premium · Status: Em separação</div></div>
            <div class="glass-card" style="padding:16px"><strong>#PED-20260311</strong><div style="font-size:12px;color:var(--text-secondary);margin-top:6px">Kit Estratégico · Status: Entregue</div></div>
            <div class="glass-card" style="padding:16px"><strong>#PED-20260227</strong><div style="font-size:12px;color:var(--text-secondary);margin-top:6px">Consultoria Expressa · Status: Concluído</div></div>
          </div>
        </div>`,
      favoritos: `
        <div class="section-grid">
          <div class="glass-card card"><div class="card-header"><span class="card-title">❤️ Itens Favoritos</span></div><div style="display:flex;flex-direction:column;gap:10px"><div class="tag">Plano Premium</div><div class="tag">Consultoria Expressa</div><div class="tag">Mentoria de Resultado</div></div></div>
          <div class="glass-card card"><div class="card-header"><span class="card-title">⭐ Recomendações</span></div><p style="font-size:13px;color:var(--text-secondary)">Com base nos seus favoritos, recomendamos revisar os planos anuais e o pacote de suporte prioritário.</p></div>
        </div>`,
      pagamentos: `
        <div class="section-grid">
          <div class="glass-card card"><div class="card-header"><span class="card-title">💳 Formas de Pagamento</span></div><div style="display:flex;flex-direction:column;gap:10px"><div class="glass-card" style="padding:14px">Cartão final 4821 · Principal</div><div class="glass-card" style="padding:14px">PIX habilitado</div><div class="glass-card" style="padding:14px">Boleto sob demanda</div></div></div>
          <div class="glass-card card"><div class="card-header"><span class="card-title">📄 Últimas Cobranças</span></div><div style="display:flex;flex-direction:column;gap:10px"><div>03/2026 · R$ 249,90 · Pago</div><div>02/2026 · R$ 249,90 · Pago</div><div>01/2026 · R$ 249,90 · Pago</div></div></div>
        </div>`,
      contato: `
        <div class="glass-card card">
          <div class="card-header"><span class="card-title">🎧 Fale com a Equipe</span></div>
          <div style="display:flex;flex-direction:column;gap:12px">
            <input class="form-input" id="usuario-contato-assunto" placeholder="Assunto do contato">
            <textarea class="form-input" id="usuario-contato-msg" placeholder="Descreva sua solicitação" style="min-height:120px;resize:vertical"></textarea>
            <button class="btn btn-primary" onclick="App.toast('Mensagem enviada para o suporte.','success','🎧')">Enviar mensagem</button>
          </div>
        </div>`,
      'perguntas-frequentes': `
        <div class="glass-card card">
          <div class="card-header"><span class="card-title">❓ Perguntas Frequentes</span></div>
          <div style="display:flex;flex-direction:column;gap:12px">
            <div><strong>Como acompanho meu pedido?</strong><div style="font-size:12px;color:var(--text-secondary);margin-top:4px">Acompanhe pelo menu “Meus Pedidos”.</div></div>
            <div><strong>Como alterar minha forma de pagamento?</strong><div style="font-size:12px;color:var(--text-secondary);margin-top:4px">Acesse a seção “Pagamentos” e escolha outra forma disponível.</div></div>
            <div><strong>Como falar com o suporte?</strong><div style="font-size:12px;color:var(--text-secondary);margin-top:4px">Use a área “Contato” para abrir uma solicitação.</div></div>
          </div>
        </div>`,
      'meu-perfil': `
        <div class="glass-card card">
          <div class="card-header"><span class="card-title">👤 Dados do Perfil</span></div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
            <input class="form-input" value="Ana Usuária" placeholder="Nome">
            <input class="form-input" value="usuario@meta.com" placeholder="E-mail">
            <input class="form-input" value="(11) 99999-0000" placeholder="Telefone">
            <input class="form-input" value="Plano Premium" placeholder="Plano">
          </div>
          <button class="btn btn-primary" style="margin-top:16px" onclick="App.toast('Perfil atualizado com sucesso.','success','👤')">Salvar alterações</button>
        </div>`,
      configuracoes: `
        <div class="glass-card card">
          <div class="card-header"><span class="card-title">⚙️ Preferências da Conta</span></div>
          <div style="display:flex;flex-direction:column;gap:12px">
            <button class="btn btn-outline" onclick="App.toast('Preferência de notificação salva.','success','🔔')">Notificações por e-mail</button>
            <button class="btn btn-outline" onclick="App.toast('Privacidade ajustada.','success','🔒')">Privacidade da conta</button>
            <button class="btn btn-outline" onclick="App.toast('Preferência de idioma mantida em português.','info','🌐')">Idioma do sistema</button>
          </div>
        </div>`
    }
  },
  'dash-dev': {
    defaultSection: 'painel-tecnico',
    titleMap: {
      'painel-tecnico': '💻 CENTRAL DE DESENVOLVIMENTO',
      'logs-sistema': '📋 LOGS DO SISTEMA',
      servidores: '📡 SERVIDORES',
      feedbacks: '💬 FEEDBACKS',
      implantacao: '🚀 IMPLANTAÇÃO',
      configuracao: '⚙️ CONFIGURAÇÃO'
    },
    templates: {
      'logs-sistema': `
        <div class="glass-card card"><div class="card-header"><span class="card-title">📋 Central de Logs</span><button class="btn btn-outline btn-sm" onclick="App.toast('Logs sincronizados.','success','📋')">Sincronizar</button></div><div style="background:rgba(0,5,15,0.8);border-radius:8px;padding:16px;font-family:monospace;font-size:12px;display:flex;flex-direction:column;gap:8px"><div>[15:02] Serviço de autenticação validado.</div><div>[14:58] Cache de sessão renovado.</div><div>[14:44] Nova coleta de métricas concluída.</div><div>[14:31] Rotina de backup executada.</div></div></div>`,
      servidores: `
        <div class="section-grid">
          <div class="glass-card card"><div class="card-header"><span class="card-title">📡 Estado dos Servidores</span></div><div style="display:flex;flex-direction:column;gap:12px"><div>Servidor API 01 · Operacional · 68% CPU</div><div>Servidor API 02 · Operacional · 54% CPU</div><div>Banco Primário · Operacional · 41% Disco</div></div></div>
          <div class="glass-card card"><div class="card-header"><span class="card-title">🛡️ Observabilidade</span></div><p style="font-size:13px;color:var(--text-secondary)">As métricas mais recentes mostram estabilidade de rede, banco e cache em tempo real.</p></div>
        </div>`,
      feedbacks: `
        <div class="glass-card card">
          <div class="card-header"><span class="card-title">💬 Feedbacks Técnicos</span></div>
          <div style="display:flex;flex-direction:column;gap:10px">
            <div class="glass-card" style="padding:14px">Usuários pedem melhoria no fluxo de pagamento móvel.</div>
            <div class="glass-card" style="padding:14px">Equipe de suporte sinalizou instabilidade em relatórios.</div>
            <div class="glass-card" style="padding:14px">Gerência solicitou mais visibilidade de integrações externas.</div>
          </div>
        </div>`,
      implantacao: `
        <div class="glass-card card">
          <div class="card-header"><span class="card-title">🚀 Histórico de Implantação</span></div>
          <div style="display:flex;flex-direction:column;gap:12px">
            <div>v2.4.8 · Produção · Concluída hoje</div>
            <div>v2.4.7 · Homologação · Concluída ontem</div>
            <div>v2.4.6 · Produção · Concluída em 16/03/2026</div>
          </div>
          <button class="btn btn-primary" style="margin-top:16px" onclick="App.toast('Nova implantação preparada para revisão.','success','🚀')">Preparar nova implantação</button>
        </div>`,
      configuracao: `
        <div class="glass-card card">
          <div class="card-header"><span class="card-title">⚙️ Configuração Técnica</span></div>
          <div style="display:flex;flex-direction:column;gap:12px">
            <button class="btn btn-outline" onclick="App.toast('Variáveis de ambiente revisadas.','success','🧩')">Variáveis de ambiente</button>
            <button class="btn btn-outline" onclick="App.toast('Chaves de integração verificadas.','success','🔐')">Integrações e chaves</button>
            <button class="btn btn-outline" onclick="App.toast('Alertas técnicos configurados.','success','🔔')">Alertas do sistema</button>
          </div>
        </div>`
    }
  },
  'dash-gerente': {
    defaultSection: 'painel-gerencial',
    titleMap: {
      'painel-gerencial': '📊 PAINEL GERENCIAL',
      'metas-kpis': '🎯 METAS E KPIs',
      equipe: '👥 EQUIPE',
      financeiro: '💰 FINANCEIRO',
      produtos: '📦 PRODUTOS',
      notificacoes: '🔔 NOTIFICAÇÕES',
      configuracao: '⚙️ CONFIGURAÇÃO'
    },
    templates: {
      'metas-kpis': `
        <div class="section-grid">
          <div class="glass-card card"><div class="card-header"><span class="card-title">🎯 Metas Ativas</span></div><div style="display:flex;flex-direction:column;gap:12px"><div>Meta de receita · 78% atingida</div><div>Meta de retenção · 91% atingida</div><div>Meta de satisfação · 94% atingida</div></div></div>
          <div class="glass-card card"><div class="card-header"><span class="card-title">📌 KPIs Estratégicos</span></div><div style="display:flex;flex-direction:column;gap:10px"><div>LTV médio: R$ 1.820</div><div>Conversão comercial: 13,4%</div><div>Churn mensal: 2,1%</div></div></div>
        </div>`,
      equipe: `
        <div class="glass-card card"><div class="card-header"><span class="card-title">👥 Visão da Equipe</span></div><div style="display:flex;flex-direction:column;gap:12px"><div>Comercial: 14 pessoas</div><div>Atendimento: 9 pessoas</div><div>Tecnologia: 6 pessoas</div><div>Marketing: 5 pessoas</div></div></div>`,
      financeiro: `
        <div class="section-grid">
          <div class="glass-card card"><div class="card-header"><span class="card-title">💰 Receita e Custos</span></div><div style="display:flex;flex-direction:column;gap:10px"><div>Receita acumulada: R$ 284.750</div><div>Custos fixos: R$ 96.400</div><div>Margem operacional: 31%</div></div></div>
          <div class="glass-card card"><div class="card-header"><span class="card-title">📈 Projeção</span></div><p style="font-size:13px;color:var(--text-secondary)">Se o ritmo atual for mantido, a equipe deve superar a meta mensal em até 9%.</p></div>
        </div>`,
      produtos: `
        <div class="glass-card card"><div class="card-header"><span class="card-title">📦 Portfólio de Produtos</span></div><div style="display:flex;flex-direction:column;gap:10px"><div>Plano Premium · Maior saída</div><div>Plano Business · Melhor margem</div><div>Plano Starter · Porta de entrada</div></div><button class="btn btn-primary" style="margin-top:16px" onclick="App.toast('Novo produto enviado para análise.','success','📦')">Analisar novo produto</button></div>`,
      notificacoes: `
        <div class="glass-card card"><div class="card-header"><span class="card-title">🔔 Central de Notificações</span></div><div style="display:flex;flex-direction:column;gap:10px"><div class="glass-card" style="padding:14px">Equipe comercial ultrapassou a meta semanal.</div><div class="glass-card" style="padding:14px">Atendimento registrou aumento de volume no turno da manhã.</div><div class="glass-card" style="padding:14px">Tecnologia concluiu a implantação da versão 2.4.8.</div></div></div>`,
      configuracao: `
        <div class="glass-card card"><div class="card-header"><span class="card-title">⚙️ Configuração Gerencial</span></div><div style="display:flex;flex-direction:column;gap:12px"><button class="btn btn-outline" onclick="App.toast('Permissões de liderança atualizadas.','success','🔐')">Permissões da equipe</button><button class="btn btn-outline" onclick="App.toast('Painel de metas sincronizado.','success','🎯')">Regras de metas</button><button class="btn btn-outline" onclick="App.toast('Alertas executivos revisados.','success','🔔')">Alertas executivos</button></div></div>`
    }
  },
  'dash-atendente': {
    defaultSection: 'painel-atendente',
    titleMap: {
      'painel-atendente': '🎧 CENTRAL DE ATENDIMENTO',
      chamados: '🎫 CHAMADOS',
      'chat-tempo-real': '💬 CHAT EM TEMPO REAL',
      clientes: '👥 CLIENTES',
      'base-conhecimentos': '📚 BASE DE CONHECIMENTOS',
      agenda: '📅 AGENDA',
      'meu-desempenho': '📊 MEU DESEMPENHO',
      configuracao: '⚙️ CONFIGURAÇÃO'
    },
    templates: {
      chamados: `
        <div class="glass-card card"><div class="card-header"><span class="card-title">🎫 Fila de Chamados</span><button class="btn btn-outline btn-sm" onclick="App.toast('Fila de chamados atualizada.','success','🎫')">Atualizar</button></div><div style="display:flex;flex-direction:column;gap:10px"><div>#4901 · Cobrança duplicada · Urgente</div><div>#4902 · Dúvida sobre contrato · Normal</div><div>#4903 · Solicitação de cancelamento · Baixa</div></div></div>`,
      'chat-tempo-real': `
        <div class="glass-card card"><div class="card-header"><span class="card-title">💬 Conversas Abertas</span></div><div style="display:flex;flex-direction:column;gap:12px"><div class="glass-card" style="padding:14px">Cliente Carla Mendes · aguardando retorno</div><div class="glass-card" style="padding:14px">Cliente Diego Nunes · em validação de pagamento</div></div><button class="btn btn-primary" style="margin-top:16px" onclick="App.toast('Conversa priorizada para atendimento.','success','💬')">Priorizar conversa</button></div>`,
      clientes: `
        <div id="clientes-cadastrados-card" class="glass-card card">
          <div class="card-header"><span class="card-title">👥 Carteira de Clientes</span><div style="display:flex;gap:8px;align-items:center"><span class="badge badge-yellow" id="clientes-cadastrados-total">2 novos</span><button class="btn btn-primary btn-sm" onclick="handleQuickAction('novo-cliente','dash-atendente')">+ Novo cliente</button></div></div>
          <div id="clientes-cadastrados-lista" style="display:flex;flex-direction:column;gap:10px"><div class="glass-card" style="padding:14px">Carla Mendes · carla@email.com</div><div class="glass-card" style="padding:14px">Diego Nunes · diego@email.com</div></div>
        </div>`,
      'base-conhecimentos': `
        <div class="glass-card card"><div class="card-header"><span class="card-title">📚 Artigos de Apoio</span></div><div style="display:flex;flex-direction:column;gap:10px"><div>Fluxo de estorno e reembolso</div><div>Procedimento para troca de plano</div><div>Checklist de confirmação cadastral</div></div></div>`,
      agenda: `
        <div class="glass-card card"><div class="card-header"><span class="card-title">📅 Agenda do Turno</span></div><div style="display:flex;flex-direction:column;gap:10px"><div>09:00 · Retorno para Carla Mendes</div><div>11:30 · Revisão de chamados críticos</div><div>15:00 · Follow-up com clientes ativos</div></div></div>`,
      'meu-desempenho': `
        <div class="section-grid">
          <div class="glass-card card"><div class="card-header"><span class="card-title">📊 Indicadores Pessoais</span></div><div style="display:flex;flex-direction:column;gap:10px"><div>87 atendimentos resolvidos hoje</div><div>Tempo médio de resposta: 4 min</div><div>Satisfação média: 97%</div></div></div>
          <div class="glass-card card"><div class="card-header"><span class="card-title">🏆 Evolução da Semana</span></div><p style="font-size:13px;color:var(--text-secondary)">Seu desempenho está acima da meta semanal e com ótimo tempo de resposta.</p></div>
        </div>`,
      configuracao: `
        <div class="glass-card card"><div class="card-header"><span class="card-title">⚙️ Configuração de Atendimento</span></div><div style="display:flex;flex-direction:column;gap:12px"><button class="btn btn-outline" onclick="App.toast('Assinatura de atendimento atualizada.','success','✍️')">Assinatura automática</button><button class="btn btn-outline" onclick="App.toast('Status padrão alterado.','success','🟢')">Status padrão</button><button class="btn btn-outline" onclick="App.toast('Notificações do turno ajustadas.','success','🔔')">Notificações do turno</button></div></div>`
    }
  }
};

function getCurrentPageId() {
  return document.body?.dataset.page || '';
}

function sendChatMsg() {
  const input = document.getElementById('chat-input');
  if (!input || !input.value.trim()) return;
  App.toast('Mensagem enviada: "' + input.value.substring(0, 30) + '"', 'success', '💬');
  input.value = '';
}

function setupDashboardSections() {
  const pageId = getCurrentPageId();
  const config = dashboardSectionConfig[pageId];
  if (!config) return;

  const page = document.getElementById('page-' + pageId);
  const mainContent = page?.querySelector('.main-content');
  const topbar = mainContent?.querySelector('.topbar');
  if (!page || !mainContent || !topbar) return;

  const existingSections = mainContent.querySelectorAll('.dashboard-section');
  if (existingSections.length === 0) {
    const defaultSection = document.createElement('section');
    defaultSection.className = 'dashboard-section';
    defaultSection.dataset.section = config.defaultSection;

    const nodesToMove = Array.from(mainContent.children).filter((child) => child !== topbar);
    nodesToMove.forEach((child) => defaultSection.appendChild(child));
    mainContent.appendChild(defaultSection);

    Object.entries(config.templates).forEach(([sectionId, html]) => {
      const section = document.createElement('section');
      section.className = 'dashboard-section hidden';
      section.dataset.section = sectionId;
      section.innerHTML = html;
      mainContent.appendChild(section);
    });
  }

  const titleEl = topbar.querySelector('.page-title');
  const navItems = document.querySelectorAll('.sidebar-nav [data-section]');

  function activateSection(sectionId) {
    mainContent.querySelectorAll('.dashboard-section').forEach((section) => {
      section.classList.toggle('hidden', section.dataset.section !== sectionId);
    });

    navItems.forEach((item) => {
      item.classList.toggle('active', item.dataset.section === sectionId);
    });

    if (titleEl && config.titleMap[sectionId]) {
      titleEl.textContent = config.titleMap[sectionId];
    }
  }

  navItems.forEach((item) => {
    item.addEventListener('click', (event) => {
      event.preventDefault();
      activateSection(item.dataset.section);
    });
  });

  activateSection(config.defaultSection);
}

function setupQuickMenu() {
  const pageId = getCurrentPageId();
  const config = roleQuickActions[pageId];
  const hamburger = document.querySelector('.hamburger');
  if (!config || !hamburger) return;

  const menu = document.createElement('aside');
  menu.id = 'quick-menu';
  menu.className = 'quick-menu hidden';
  menu.setAttribute('aria-hidden', 'true');
  menu.innerHTML = `
    <div class="quick-menu-header">
      <div>
        <div class="quick-menu-title">${config.title}</div>
        <div class="quick-menu-subtitle">${config.subtitle}</div>
      </div>
      <button type="button" class="quick-menu-close" aria-label="Fechar menu rápido">✕</button>
    </div>
    <div class="quick-menu-list">
      ${config.actions.map((action) => `
        <button type="button" class="quick-menu-action" data-action="${action.id}">
          <strong>${action.label}</strong>
          <span>${action.description}</span>
        </button>
      `).join('')}
    </div>
  `;
  document.body.appendChild(menu);

  const closeBtn = menu.querySelector('.quick-menu-close');

  function openMenu() {
    menu.classList.remove('hidden');
    menu.setAttribute('aria-hidden', 'false');
  }

  function closeMenu() {
    menu.classList.add('hidden');
    menu.setAttribute('aria-hidden', 'true');
  }

  hamburger.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    menu.classList.contains('hidden') ? openMenu() : closeMenu();
  });

  closeBtn?.addEventListener('click', closeMenu);

  menu.addEventListener('click', (event) => {
    const actionButton = event.target.closest('[data-action]');
    if (!actionButton) return;
    closeMenu();
    handleQuickAction(actionButton.dataset.action, pageId);
  });

  document.addEventListener('click', (event) => {
    if (menu.classList.contains('hidden')) return;
    if (event.target.closest('#quick-menu') || event.target.closest('.hamburger')) return;
    closeMenu();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });
}

function handleQuickAction(actionId, pageId) {
  const handlers = {
    'toggle-sidebar': () => window.toggleSidebar?.(),
    'novo-endpoint': () => openEndpointModal(),
    'registrar-incidente': () => registerIncident(),
    'implantar-versao': () => deployVersion(),
    'novo-colaborador': () => openCollaboratorModal(),
    'nova-meta': () => openGoalModal(),
    'gerar-relatorio': () => App.toast('Relatório gerencial gerado com sucesso.', 'success', '📊'),
    'novo-cliente': () => openClientModal(),
    'abrir-chamado': () => openTicketModal(),
    'registrar-retorno': () => App.toast('Retorno do cliente registrado no histórico.', 'success', '📝')
  };

  const handler = handlers[actionId];
  if (!handler) {
    App.toast('Ação indisponível nesta página.', 'warning', '⚠️');
    return;
  }

  handler(pageId);
}

function openActionModal({ title, fields, submitLabel, onSubmit }) {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal">
      <div class="modal-title">${title}</div>
      <form id="action-modal-form">
        ${fields.map((field) => `
          <div class="form-group">
            <label class="form-label" for="${field.id}">${field.label}</label>
            <input
              id="${field.id}"
              name="${field.id}"
              class="form-input"
              type="${field.type || 'text'}"
              placeholder="${field.placeholder || ''}"
              ${field.required === false ? '' : 'required'}
            >
          </div>
        `).join('')}
        <div class="modal-footer">
          <button type="button" class="btn btn-outline" data-close-modal>Cancelar</button>
          <button type="submit" class="btn btn-primary">${submitLabel}</button>
        </div>
      </form>
    </div>
  `;

  document.body.appendChild(overlay);

  const form = overlay.querySelector('#action-modal-form');
  const closeButton = overlay.querySelector('[data-close-modal]');

  function closeModal() {
    overlay.remove();
  }

  closeButton?.addEventListener('click', closeModal);
  overlay.addEventListener('click', (event) => {
    if (event.target === overlay) closeModal();
  });

  form?.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const values = Object.fromEntries(formData.entries());
    onSubmit(values);
    closeModal();
  });
}

function openEndpointModal() {
  openActionModal({
    title: 'Cadastrar nova rota',
    submitLabel: 'Salvar rota',
    fields: [
      { id: 'rota', label: 'Rota', placeholder: '/api/v2/nova-funcionalidade' },
      { id: 'metodo', label: 'Método', placeholder: 'GET ou POST' },
      { id: 'latencia', label: 'Latência média', placeholder: '120ms' },
      { id: 'requisicoes', label: 'Req/min', placeholder: '320' }
    ],
    onSubmit: appendEndpointRow
  });
}

function appendEndpointRow(values) {
  const tbody = document.querySelector('#page-dash-dev tbody');
  if (!tbody) return;

  const method = (values.metodo || 'GET').toUpperCase();
  const methodClass = method === 'POST' ? 'badge-yellow' : 'badge-green';
  const row = document.createElement('tr');
  row.innerHTML = `
    <td><code style="color:var(--neon-blue)">${values.rota || '/api/v2/nova-rota'}</code></td>
    <td><span class="badge ${methodClass}">${method}</span></td>
    <td><span class="badge badge-green">● Online</span></td>
    <td>${values.latencia || '120ms'}</td>
    <td>${values.requisicoes || '320'}</td>
  `;
  tbody.prepend(row);
  App.toast('Nova rota cadastrada na central técnica.', 'success', '✅');
}

function registerIncident() {
  const logContainer = document.querySelector('#page-dash-dev .card:nth-of-type(3) div[style*="font-family:monospace"]');
  if (!logContainer) {
    App.toast('Incidente registrado.', 'success', '🐛');
    return;
  }

  const log = document.createElement('div');
  log.style.color = 'var(--danger)';
  log.style.marginBottom = '6px';
  log.textContent = `[2026-03-19 15:12:00] ❌ Incidente registrado manualmente - validar serviço de autenticação`;
  log.prepend;
  logContainer.prepend(log);
  App.toast('Incidente crítico registrado nos logs.', 'warning', '🐛');
}

function deployVersion() {
  const statusItems = document.querySelectorAll('#page-dash-dev .animate-in div[style*="border-radius:8px"]');
  if (statusItems[1]) {
    statusItems[1].innerHTML = '🕐 Última implantação: agora mesmo';
  }
  App.toast('Nova versão preparada para implantação rápida.', 'success', '🚀');
}

function openCollaboratorModal() {
  openActionModal({
    title: 'Adicionar colaborador',
    submitLabel: 'Salvar colaborador',
    fields: [
      { id: 'nome', label: 'Nome completo', placeholder: 'Fernanda Souza' },
      { id: 'setor', label: 'Setor', placeholder: 'Comercial' },
      { id: 'meta', label: 'Meta principal', placeholder: 'R$ 40k ou 80 tickets' },
      { id: 'status', label: 'Status', placeholder: 'Em progresso ou Atingida' }
    ],
    onSubmit: appendCollaboratorRow
  });
}

function appendCollaboratorRow(values) {
  const tbody = document.querySelector('#page-dash-gerente tbody');
  if (!tbody) return;

  const initials = (values.nome || 'Novo Colaborador')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();
  const achieved = values.status?.toLowerCase().includes('atingida')
    ? `<span class="badge badge-green">✅ ${values.status}</span>`
    : `<span class="badge badge-yellow">⚡ ${values.status || 'Em progresso'}</span>`;
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>
      <div style="display:flex;align-items:center;gap:10px">
        <div style="width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,#008844,var(--success));display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;color:#000">${initials || 'NC'}</div>
        ${values.nome || 'Novo Colaborador'}
      </div>
    </td>
    <td>${values.setor || 'Operações'}</td>
    <td>${values.meta || 'Meta definida'}</td>
    <td style="color:var(--success)">${values.meta || 'Meta definida'}</td>
    <td>${achieved}</td>
  `;
  tbody.prepend(row);
  App.toast('Novo colaborador incluído no painel da equipe.', 'success', '👥');
}

function openGoalModal() {
  openActionModal({
    title: 'Registrar nova meta',
    submitLabel: 'Salvar meta',
    fields: [
      { id: 'descricao', label: 'Descrição da meta', placeholder: 'Atingir 85% da meta mensal' },
      { id: 'percentual', label: 'Percentual atual', placeholder: '85%' }
    ],
    onSubmit: updateManagerGoal
  });
}

function updateManagerGoal(values) {
  const goalText = document.querySelector('#page-dash-gerente .glass-card.animate-in div[style*="font-family:var(--font-display)"]');
  if (goalText) {
    goalText.textContent = values.descricao || `Meta mensal: ${values.percentual || '85%'} atingida`;
  }
  App.toast('Meta principal atualizada no painel gerencial.', 'success', '🎯');
}

function openClientModal() {
  openActionModal({
    title: 'Cadastrar cliente',
    submitLabel: 'Salvar cliente',
    fields: [
      { id: 'nome', label: 'Nome completo', placeholder: 'Carla Mendes' },
      { id: 'email', label: 'E-mail', type: 'email', placeholder: 'carla@email.com' },
      { id: 'telefone', label: 'Telefone', placeholder: '(11) 99999-9999' },
      { id: 'origem', label: 'Origem', placeholder: 'Indicação ou site' }
    ],
    onSubmit: appendClientCard
  });
}

function ensureClientBoard() {
  let board = document.getElementById('clientes-cadastrados-card');
  if (board) return board;

  const page = document.getElementById('page-dash-atendente');
  const mainContent = page?.querySelector('.main-content');
  if (!mainContent) return null;

  board = document.createElement('div');
  board.id = 'clientes-cadastrados-card';
  board.className = 'glass-card card animate-in delay-4';
  board.style.borderColor = 'rgba(255,170,0,0.2)';
  board.innerHTML = `
    <div class="card-header">
      <span class="card-title">👥 Clientes cadastrados hoje</span>
      <span class="badge badge-yellow" id="clientes-cadastrados-total">0 novos</span>
    </div>
    <div id="clientes-cadastrados-lista" style="display:flex;flex-direction:column;gap:10px"></div>
  `;
  mainContent.appendChild(board);
  return board;
}

function appendClientCard(values) {
  const board = ensureClientBoard();
  const list = document.getElementById('clientes-cadastrados-lista');
  const countBadge = document.getElementById('clientes-cadastrados-total');
  if (!board || !list || !countBadge) return;

  const initials = (values.nome || 'Novo Cliente')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();
  const item = document.createElement('div');
  item.style.display = 'flex';
  item.style.alignItems = 'center';
  item.style.gap = '12px';
  item.style.padding = '12px';
  item.style.borderRadius = '10px';
  item.style.background = 'rgba(255,170,0,0.08)';
  item.style.border = '1px solid rgba(255,170,0,0.22)';
  item.innerHTML = `
    <div style="width:34px;height:34px;border-radius:50%;background:linear-gradient(135deg,#aa6600,var(--warning));display:flex;align-items:center;justify-content:center;font-weight:700;color:#000;flex-shrink:0">${initials || 'NC'}</div>
    <div style="flex:1">
      <div style="font-size:13px;font-weight:600">${values.nome || 'Novo Cliente'}</div>
      <div style="font-size:11px;color:var(--text-secondary)">${values.email || 'email@cliente.com'} · ${values.telefone || '(00) 00000-0000'}</div>
      <div style="font-size:11px;color:var(--text-muted);margin-top:4px">Origem: ${values.origem || 'Cadastro manual'}</div>
    </div>
    <span class="badge badge-green">Ativo</span>
  `;
  list.prepend(item);

  const currentCount = list.children.length;
  countBadge.textContent = `${currentCount} novo${currentCount > 1 ? 's' : ''}`;
  App.toast('Cliente cadastrado com sucesso pelo atendimento.', 'success', '👥');
}

function openTicketModal() {
  openActionModal({
    title: 'Abrir chamado',
    submitLabel: 'Criar chamado',
    fields: [
      { id: 'titulo', label: 'Título', placeholder: 'Dificuldade para finalizar compra' },
      { id: 'cliente', label: 'Cliente', placeholder: 'Carla Mendes' },
      { id: 'prioridade', label: 'Prioridade', placeholder: 'Urgente, Normal ou Baixa' }
    ],
    onSubmit: appendTicketCard
  });
}

function appendTicketCard(values) {
  const queue = document.querySelector('#page-dash-atendente .section-grid .glass-card .card-header + div');
  if (!queue) return;

  const priority = (values.prioridade || 'Normal').toLowerCase();
  const badgeClass = priority.includes('urg') ? 'badge-red' : priority.includes('baix') ? 'badge-blue' : 'badge-yellow';
  const label = priority.includes('urg') ? 'Urgente' : priority.includes('baix') ? 'Baixo' : 'Normal';
  const ticketNumber = 4800 + queue.children.length + 1;
  const item = document.createElement('div');
  item.style.padding = '12px';
  item.style.borderRadius = '8px';
  item.style.border = '1px solid rgba(255,170,0,0.3)';
  item.style.background = 'rgba(255,170,0,0.05)';
  item.innerHTML = `
    <div style="display:flex;justify-content:space-between;margin-bottom:6px">
      <span style="font-size:13px;font-weight:600">#${ticketNumber} - ${values.titulo || 'Novo chamado'}</span>
      <span class="badge ${badgeClass}">${label}</span>
    </div>
    <div style="font-size:12px;color:var(--text-muted)">Cliente: ${values.cliente || 'Cliente recém-cadastrado'} · Agora</div>
    <button class="btn btn-outline btn-sm" style="margin-top:8px;width:100%" onclick="App.toast('Atendimento iniciado - #${ticketNumber}','success','🎧')">Atender</button>
  `;
  queue.prepend(item);
  App.toast('Chamado incluído na fila de atendimento.', 'success', '🎫');
}

document.addEventListener('DOMContentLoaded', () => {
  setupDashboardSections();
  setupQuickMenu();
});





