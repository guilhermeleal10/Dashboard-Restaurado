function initializeDashboardPage() {
  const page = document.querySelector('.page.active[id^="page-dash-"]');
  if (!page) return;

  const mainContent = page.querySelector('.main-content');
  if (mainContent) {
    mainContent.style.paddingLeft = '';
  }

  setTimeout(() => {
    page.querySelectorAll('.bar-fill[data-height]').forEach((bar) => {
      bar.style.height = bar.dataset.height + '%';
    });
  }, 400);
}

document.addEventListener('DOMContentLoaded', initializeDashboardPage);
