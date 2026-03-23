// OS DONOS DO META 2.0 

const App = (() => {
  const STORAGE_KEYS = {
    session: 'odm-current-user',
    a11y: 'odm-a11y-settings'
  };

  const routes = {
    login: 'login.html',
    recovery: 'recovery.html',
    'dash-dev': 'dash-dev.html',
    'dash-gerente': 'dash-gerente.html',
    'dash-atendente': 'dash-atendente.html',
    'dash-usuario': 'dash-usuario.html'
  };

  const dashboardByRole = {
    programador: 'dash-dev',
    gerente: 'dash-gerente',
    atendente: 'dash-atendente',
    usuario: 'dash-usuario'
  };

  const roleByDashboard = {
    'dash-dev': 'programador',
    'dash-gerente': 'gerente',
    'dash-atendente': 'atendente',
    'dash-usuario': 'usuario'
  };

  const state = {
    currentUser: null,
    currentPage: null,
    a11y: { highContrast: false, largeText: false, dyslexia: false, reduceMotion: false },
    librasOpen: false
  };

  const users = [
    { id: 1, name: 'Carlos Dev', email: 'dev@meta.com', password: '1234', role: 'programador', avatar: 'CD', initials: 'CD' },
    { id: 2, name: 'Marina Gestora', email: 'gerente@meta.com', password: '1234', role: 'gerente', avatar: 'MG', initials: 'MG' },
    { id: 3, name: 'João Atendente', email: 'atendente@meta.com', password: '1234', role: 'atendente', avatar: 'JA', initials: 'JA' },
    { id: 4, name: 'Ana Usuária', email: 'usuario@meta.com', password: '1234', role: 'usuario', avatar: 'AU', initials: 'AU' }
  ];

  const roleConfig = {
    programador: { label: 'Programador', color: '#00d4ff', icon: '💻', pages: ['dash-dev', 'editor-codigo', 'monitor-api', 'registros', 'configuracoes-dev'] },
    gerente: { label: 'Gerente', color: '#00ff88', icon: '📊', pages: ['dash-gerente', 'relatorios', 'equipe', 'metas', 'configuracoes-gerente'] },
    atendente: { label: 'Atendente', color: '#ffaa00', icon: '🎧', pages: ['dash-atendente', 'chamados', 'clientes', 'conversas', 'configuracoes-atendente'] },
    usuario: { label: 'Usuário', color: '#bb88ff', icon: '👤', pages: ['dash-usuario', 'meus-pedidos', 'suporte', 'perfil-usuario'] }
  };

  function init() {
    restoreSession();
    restoreA11y();
    setupNavigation();
    setupAccessibility();
    setupLibras();
    setupAnimations();
    bindOverlayDismiss();
    animateLogo();
    syncCurrentPage();
  }

  function getPagesBasePath() {
    const path = window.location.pathname.replace(/\\/g, '/');
    return /\/pages\/[^/]+$/i.test(path) ? '' : 'pages/';
  }

  function getRoute(pageId) {
    const fileName = routes[pageId] || routes.login;
    return getPagesBasePath() + fileName;
  }

  function navigate(pageId, replace = false) {
    const route = getRoute(pageId);
    const currentPath = window.location.pathname.replace(/\\/g, '/');
    const normalizedRoute = route.replace(/^\.\//, '');

    if (!replace && (state.currentPage === pageId || currentPath.endsWith('/' + normalizedRoute) || currentPath.endsWith(normalizedRoute))) {
      updateActiveNav(pageId);
      return;
    }

    if (replace) {
      window.location.replace(route);
      return;
    }
    window.location.href = route;
  }

  function syncCurrentPage() {
    const bodyPage = document.body.dataset.page || detectPageFromMarkup();
    state.currentPage = bodyPage;

    const pageEl = document.getElementById('page-' + bodyPage);
    if (pageEl) {
      pageEl.classList.add('active');
      triggerPageAnimations(pageEl);
    }

    if (bodyPage === 'login' && state.currentUser) {
      navigate(getDashboardPageForRole(state.currentUser.role), true);
      return;
    }

    if (bodyPage && bodyPage.startsWith('dash-')) {
      const expectedRole = roleByDashboard[bodyPage];
      if (!ensureAuthorized(expectedRole)) {
        return;
      }
      hydrateCurrentUserUI();
      updateActiveNav(bodyPage);
    }
  }

  function detectPageFromMarkup() {
    const page = document.querySelector('.page[id^="page-"]');
    return page ? page.id.replace('page-', '') : 'login';
  }

  function restoreSession() {
    try {
      const storedUser = localStorage.getItem(STORAGE_KEYS.session);
      if (!storedUser) return;
      state.currentUser = JSON.parse(storedUser);
    } catch (error) {
      state.currentUser = null;
      localStorage.removeItem(STORAGE_KEYS.session);
    }
  }

  function persistSession() {
    try {
      if (state.currentUser) {
        localStorage.setItem(STORAGE_KEYS.session, JSON.stringify(state.currentUser));
        return;
      }
      localStorage.removeItem(STORAGE_KEYS.session);
    } catch (error) {
      console.warn('Não foi possível persistir a sessão localmente.', error);
    }
  }

  function restoreA11y() {
    try {
      const storedA11y = localStorage.getItem(STORAGE_KEYS.a11y);
      if (!storedA11y) return;
      const parsed = JSON.parse(storedA11y);
      state.a11y = { ...state.a11y, ...parsed };
    } catch (error) {
      localStorage.removeItem(STORAGE_KEYS.a11y);
    }
    applyA11yState();
  }

  function persistA11y() {
    try {
      localStorage.setItem(STORAGE_KEYS.a11y, JSON.stringify(state.a11y));
    } catch (error) {
      console.warn('Não foi possível salvar as preferências de acessibilidade.', error);
    }
  }

  function applyA11yState() {
    const mappings = [
      ['highContrast', 'high-contrast', 'btn-contrast'],
      ['largeText', 'large-text', 'btn-largetext'],
      ['dyslexia', 'dyslexia', 'btn-dyslexia'],
      ['reduceMotion', 'reduce-motion', 'btn-motion']
    ];

    mappings.forEach(([stateKey, cssClass, btnId]) => {
      document.body.classList.toggle(cssClass, !!state.a11y[stateKey]);
      document.getElementById(btnId)?.classList.toggle('active', !!state.a11y[stateKey]);
      document.getElementById(btnId)?.setAttribute('aria-pressed', String(!!state.a11y[stateKey]));
    });
  }

  function setupNavigation() {
    document.addEventListener('click', (event) => {
      const target = event.target.closest('[data-page]');
      if (!target) return;
      if (target.dataset.section) return;

      event.preventDefault();
      const page = target.dataset.page;
      if (page === 'logout') {
        logout();
        return;
      }

      navigate(page);
    });
  }

  function showPage(pageId) {
    navigate(pageId);
  }

  function updateActiveNav(pageId) {
    document.querySelectorAll('.nav-item').forEach((item) => {
      item.classList.toggle('active', item.dataset.page === pageId);
    });
  }

  function login(email, password) {
    const user = users.find((item) => item.email.toLowerCase() === email.toLowerCase() && item.password === password);
    if (!user) return null;
    state.currentUser = user;
    persistSession();
    return user;
  }

  function logout() {
    state.currentUser = null;
    persistSession();
    navigate('login');
  }

  function ensureAuthorized(expectedRole) {
    if (!state.currentUser) {
      navigate('login', true);
      return false;
    }

    if (expectedRole && state.currentUser.role !== expectedRole) {
      navigate(getDashboardPageForRole(state.currentUser.role), true);
      return false;
    }

    return true;
  }

  function getDashboardPageForRole(role) {
    return dashboardByRole[role] || 'login';
  }

  function getCurrentUser() {
    return state.currentUser;
  }

  function getRoleConfig(role) {
    return roleConfig[role] || {};
  }

  function hydrateCurrentUserUI() {
    const user = state.currentUser;
    if (!user) return;

    const roleLabel = getRoleConfig(user.role).label;

    document.querySelectorAll('.sidebar-user-name, .current-user-name').forEach((el) => {
      el.textContent = user.name;
    });
    document.querySelectorAll('.sidebar-user-role, .current-user-role').forEach((el) => {
      el.textContent = roleLabel;
    });
    document.querySelectorAll('.sidebar-user-avatar, .user-avatar').forEach((el) => {
      el.textContent = user.initials;
    });
  }

  function toast(msg, type = 'info', icon = 'ℹ️', duration = 3500) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const colors = { info: '#00d4ff', success: '#00ff88', error: '#ff3366', warning: '#ffaa00' };
    const toastEl = document.createElement('div');
    toastEl.className = 'toast';
    toastEl.innerHTML = `<span style="font-size:18px">${icon}</span><div style="flex:1"><div style="font-weight:600;font-size:13px;color:${colors[type]}">${msg}</div></div><button onclick="this.parentElement.remove()" style="background:none;border:none;color:#3a6b8a;cursor:pointer;font-size:16px;">✕</button>`;
    container.appendChild(toastEl);

    setTimeout(() => {
      toastEl.classList.add('removing');
      setTimeout(() => toastEl.remove(), 300);
    }, duration);
  }

  function setupAccessibility() {
    document.getElementById('btn-contrast')?.addEventListener('click', () => toggleA11y('highContrast', 'high-contrast', 'btn-contrast'));
    document.getElementById('btn-largetext')?.addEventListener('click', () => toggleA11y('largeText', 'large-text', 'btn-largetext'));
    document.getElementById('btn-dyslexia')?.addEventListener('click', () => toggleA11y('dyslexia', 'dyslexia', 'btn-dyslexia'));
    document.getElementById('btn-motion')?.addEventListener('click', () => toggleA11y('reduceMotion', 'reduce-motion', 'btn-motion'));
  }

  function toggleA11y(stateKey, cssClass, btnId) {
    state.a11y[stateKey] = !state.a11y[stateKey];
    document.body.classList.toggle(cssClass, state.a11y[stateKey]);
    document.getElementById(btnId)?.classList.toggle('active', state.a11y[stateKey]);
    document.getElementById(btnId)?.setAttribute('aria-pressed', String(state.a11y[stateKey]));
    persistA11y();

    const labels = {
      highContrast: 'Alto Contraste',
      largeText: 'Texto Grande',
      dyslexia: 'Fonte Dislexia',
      reduceMotion: 'Sem Animações'
    };
    toast(labels[stateKey] + (state.a11y[stateKey] ? ' ativado' : ' desativado'), 'info', '♿');
  }

  function setupLibras() {
    const btn = document.getElementById('libras-btn');
    const panel = document.getElementById('libras-panel');
    if (!btn || !panel) return;

    panel.setAttribute('aria-hidden', 'true');

    btn.addEventListener('click', () => {
      state.librasOpen = !state.librasOpen;
      panel.classList.toggle('show', state.librasOpen);
      panel.setAttribute('aria-hidden', String(!state.librasOpen));
      btn.setAttribute('aria-expanded', String(state.librasOpen));
    });

    document.addEventListener('click', (event) => {
      if (event.target.closest('.libras-widget')) return;
      state.librasOpen = false;
      panel.classList.remove('show');
      panel.setAttribute('aria-hidden', 'true');
      btn.setAttribute('aria-expanded', 'false');
    });
  }

  function librasAction(action) {
    const messages = {
      interprete: ['Modo intérprete selecionado.', 'success', '🤟'],
      vlibras: ['Assistência em Libras selecionada.', 'success', '🎬'],
      audio: ['Recurso de áudio selecionado.', 'success', '🔊'],
      legenda: ['Legenda simplificada selecionada.', 'success', '📝']
    };

    const current = messages[action] || ['Recurso de acessibilidade selecionado.', 'info', '♿'];
    toast(current[0], current[1], current[2]);

    state.librasOpen = false;
    document.getElementById('libras-panel')?.classList.remove('show');
    document.getElementById('libras-panel')?.setAttribute('aria-hidden', 'true');
    document.getElementById('libras-btn')?.setAttribute('aria-expanded', 'false');
  }
  function bindOverlayDismiss() {
    document.addEventListener('click', (event) => {
      if (!event.target.classList.contains('sidebar-overlay')) return;
      document.querySelector('.sidebar')?.classList.remove('open');
      event.target.classList.remove('show');
    });
  }

  window.toggleSidebar = function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    const mainContent = document.querySelector('.page.active .main-content');
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
      sidebar?.classList.toggle('open');
      overlay?.classList.toggle('show');
      return;
    }

    sidebar?.classList.toggle('collapsed');
    mainContent?.classList.toggle('sidebar-collapsed');
    overlay?.classList.remove('show');
  };

  function triggerPageAnimations(page) {
    const items = page.querySelectorAll('.animate-in');
    items.forEach((item, index) => {
      item.style.animationDelay = (index * 0.08) + 's';
      item.style.opacity = '0';
      void item.offsetWidth;
      item.style.opacity = '';
    });

    setTimeout(() => {
      page.querySelectorAll('.bar-fill[data-height]').forEach((bar) => {
        bar.style.height = bar.dataset.height + '%';
      });

      page.querySelectorAll('[data-count]').forEach((el) => {
        const target = parseInt(el.dataset.count, 10);
        animateCounter(el, target);
      });
    }, 300);
  }

  function animateCounter(el, target) {
    let current = 0;
    const step = target / 40;
    const interval = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = el.dataset.prefix + Math.round(current).toLocaleString('pt-BR') + (el.dataset.suffix || '');
      if (current >= target) clearInterval(interval);
    }, 30);
  }

  function setupAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-in').forEach((el) => observer.observe(el));
  }

  function animateLogo() {
    const logoEls = document.querySelectorAll('.logo-animated');
    const text = 'OS DONOS DO META 2.0';
    logoEls.forEach((el) => {
      el.textContent = '';
      let index = 0;
      const interval = setInterval(() => {
        el.textContent += text[index];
        index += 1;
        if (index >= text.length) clearInterval(interval);
      }, 60);
    });
  }

  return {
    init,
    login,
    logout,
    getCurrentUser,
    getRoleConfig,
    getDashboardPageForRole,
    showPage,
    toast,
    users,
    updateActiveNav,
    librasAction
  };
})();

// ============================================================
// LOGIN PAGE
// ============================================================
const LoginPage = (() => {
  function init() {
    const emailInput = document.getElementById('login-email');
    const passInput = document.getElementById('login-password');
    const btnLogin = document.getElementById('btn-login');
    const alertEl = document.getElementById('login-alert');
    const togglePass = document.getElementById('toggle-pass');
    const formContainer = document.getElementById('login-form');

    if (!emailInput || !passInput || !btnLogin || !alertEl) return;

    togglePass?.addEventListener('click', () => {
      const isPass = passInput.type === 'password';
      passInput.type = isPass ? 'text' : 'password';
      togglePass.textContent = isPass ? '🙈' : '👁️';
    });

    document.querySelectorAll('[data-fill]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const role = btn.dataset.fill;
        const user = App.users.find((item) => item.role === role);
        if (!user) return;
        emailInput.value = user.email;
        passInput.value = user.password;
        passInput.type = 'text';
      });
    });

    formContainer?.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter') return;
      event.preventDefault();
      doLogin(emailInput.value.trim(), passInput.value);
    });

    btnLogin.addEventListener('click', () => doLogin(emailInput.value.trim(), passInput.value));

    function doLogin(email, pass) {
      alertEl.classList.add('hidden');
      if (!email || !pass) {
        showAlert('Preencha todos os campos', 'error');
        return;
      }

      btnLogin.innerHTML = '<span class="spinner"></span> Entrando...';
      btnLogin.disabled = true;

      setTimeout(() => {
        const user = App.login(email, pass);
        if (!user) {
          showAlert('E-mail ou senha incorretos', 'error');
          btnLogin.innerHTML = '🚀 Entrar no Sistema';
          btnLogin.disabled = false;
          return;
        }

        App.toast('Bem-vindo, ' + user.name + '!', 'success', '🎉');
        btnLogin.innerHTML = '🚀 Entrar no Sistema';
        btnLogin.disabled = false;

        setTimeout(() => {
          App.showPage(App.getDashboardPageForRole(user.role));
        }, 450);
      }, 900);
    }

    function showAlert(msg, type) {
      alertEl.className = 'alert alert-' + type;
      alertEl.innerHTML = (type === 'error' ? '⚠️ ' : '✅ ') + msg;
      alertEl.classList.remove('hidden');
    }
  }

  return { init };
})();

// ============================================================
// RECOVERY PAGE
// ============================================================
const RecoveryPage = (() => {
  function init() {
    const alertEl = document.getElementById('recovery-alert');
    const emailInput = document.getElementById('recovery-email');
    const btnSend = document.getElementById('btn-send-recovery');

    if (!alertEl || !emailInput || !btnSend) return;

    btnSend.addEventListener('click', () => {
      const email = emailInput.value.trim();
      if (!email || !email.includes('@')) {
        alertEl.className = 'alert alert-error';
        alertEl.innerHTML = '⚠️ Digite um e-mail válido';
        alertEl.classList.remove('hidden');
        return;
      }

      const userExists = App.users.find((user) => user.email.toLowerCase() === email.toLowerCase());
      btnSend.innerHTML = '<span class="spinner"></span> Enviando...';
      btnSend.disabled = true;

      setTimeout(() => {
        alertEl.className = 'alert alert-success';
        alertEl.innerHTML = userExists
          ? '✅ Link de recuperação enviado para ' + email
          : '✅ Se o e-mail estiver cadastrado, você receberá um link em breve';
        alertEl.classList.remove('hidden');
        btnSend.innerHTML = '📨 Enviar Link de Recuperação';
        btnSend.disabled = false;
      }, 1200);
    });
  }

  return { init };
})();

// ============================================================
// INITIALIZE
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  App.init();
  LoginPage.init();
  RecoveryPage.init();
  initCharts();
});

// ---- CHARTS ----
function initCharts() {
  const charts = {
    'chart-dev': [85, 62, 78, 91, 55, 73, 88],
    'chart-gerente': [40, 65, 55, 80, 70, 90, 75],
    'chart-atendente': [12, 18, 14, 22, 16, 20, 19],
    'chart-usuario': [3, 1, 5, 2, 4, 1, 3]
  };
  const labels = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];

  Object.entries(charts).forEach(([id, data]) => {
    const el = document.getElementById(id);
    if (!el) return;
    const max = Math.max(...data);
    el.innerHTML = data.map((value, index) => `
      <div class="bar-item">
        <div class="bar-fill" data-height="${Math.round((value / max) * 100)}" style="height:0%"></div>
        <span class="bar-label">${labels[index]}</span>
      </div>`).join('');
  });
}






