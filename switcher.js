/**
 * Design Switcher Component
 * Injects a floating dock on all 5 portfolio styles
 */
(function() {
  const SITES = [
    { id: 'classic', name: '01. Founder Studio', url: 'index.html', icon: '💎' },
    { id: 'gameplay', name: '02. Cyber Quest RPG', url: 'gameplay.html', icon: '🎮' },
    { id: 'adventure', name: '03. Cosmic Explorer', url: 'adventure.html', icon: '🚀' },
    { id: 'cyberdeck', name: '04. CyberDeck OS', url: 'cyberdeck.html', icon: '⚡' },
    { id: 'minimalist', name: '05. Kinetic Swiss', url: 'minimalist.html', icon: '🖤' },
    { id: 'hub', name: 'Compare All (Hub)', url: 'hub.html', icon: '✨' }
  ];

  function getActiveId() {
    const path = window.location.pathname.toLowerCase();
    if (path.includes('gameplay')) return 'gameplay';
    if (path.includes('adventure')) return 'adventure';
    if (path.includes('cyberdeck')) return 'cyberdeck';
    if (path.includes('minimalist')) return 'minimalist';
    if (path.includes('hub')) return 'hub';
    return 'classic';
  }

  function initSwitcher() {
    // If dock already exists, return
    if (document.querySelector('.design-switcher-dock')) return;

    const activeId = getActiveId();
    const dock = document.createElement('div');
    dock.className = 'design-switcher-dock';

    let html = `
      <span class="switcher-label">Design Variants:</span>
      <div class="switcher-pills">
    `;

    SITES.forEach(s => {
      const isActive = s.id === activeId;
      const isHub = s.id === 'hub';
      html += `
        <a href="${s.url}" class="switcher-pill ${isActive ? 'active' : ''} ${isHub ? 'switcher-hub-btn' : ''}" title="${s.name}">
          <span class="pill-emoji">${s.icon}</span>
          <span>${s.name}</span>
        </a>
      `;
    });

    html += `</div>`;
    dock.innerHTML = html;
    document.body.appendChild(dock);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSwitcher);
  } else {
    initSwitcher();
  }
})();
