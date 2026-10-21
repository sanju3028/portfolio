/**
 * ==========================================================================
 * SANJAY MAKALA — PORTFOLIO CLIENT ENGINE
 * Features:
 *  - Interactive Generative Canvas Mesh
 *  - Web Audio Sound Effects (Zero External Files)
 *  - Interactive sanjay-cli Browser Terminal with Command History
 *  - Architecture Deep-Dive Modal System
 *  - Command Palette (Cmd+K / Ctrl+K)
 *  - Theme Engine (Obsidian Dark / Editorial Light with Persistence)
 *  - Metric Counters & Global Deployment Map Interactivity
 *  - Filterable Product Showcase with Auto-Rotating Hero Showcase
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* --------------------------------------------------------------------------
     1. Sound Synthesis Engine (Disabled per user request)
     -------------------------------------------------------------------------- */
  function playUiSound() {
    /* Muted / No sound effects per user request */
  }

  /* --------------------------------------------------------------------------
     2. Theme Switcher (Obsidian Dark vs Editorial Light)
     -------------------------------------------------------------------------- */
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlEl = document.documentElement;

  // Retrieve saved preference or default to dark
  const savedTheme = localStorage.getItem('sanjay_theme') || 'dark';
  htmlEl.setAttribute('data-theme', savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlEl.getAttribute('data-theme');
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
      htmlEl.setAttribute('data-theme', nextTheme);
      localStorage.setItem('sanjay_theme', nextTheme);
      playUiSound('click');
      showToast(`Switched to ${nextTheme === 'dark' ? 'Obsidian Dark' : 'Editorial Light'} theme`);
    });
  }

  /* --------------------------------------------------------------------------
     3. Toast Notifications
     -------------------------------------------------------------------------- */
  const toastEl = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-msg');
  let toastTimer = null;

  function showToast(message) {
    if (!toastEl || !toastMsg) return;
    toastMsg.textContent = message;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastEl.classList.remove('show');
    }, 2800);
  }

  /* --------------------------------------------------------------------------
     4. Copy to Clipboard Handlers
     -------------------------------------------------------------------------- */
  document.querySelectorAll('[data-copy]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const text = btn.getAttribute('data-copy');
      if (navigator.clipboard && text) {
        navigator.clipboard.writeText(text).then(() => {
          playUiSound('success');
          showToast(`Copied ${text} to clipboard!`);
        }).catch(() => {
          fallbackCopy(text);
        });
      } else if (text) {
        fallbackCopy(text);
      }
    });
  });

  function fallbackCopy(text) {
    const input = document.createElement('input');
    input.value = text;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
    playUiSound('success');
    showToast(`Copied ${text} to clipboard!`);
  }

  /* --------------------------------------------------------------------------
     5. Ambient Stationary Dot Grid (Calm, Zero Jitter, Zero Flicker)
     -------------------------------------------------------------------------- */
  const canvas = document.getElementById('bg-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouse = { x: -2000, y: -2000 };
    const SPACING = 38;

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    // Only track mouse hover on devices that support hover (prevents touch screen jitter)
    const canHover = window.matchMedia('(hover: hover)').matches;

    if (canHover) {
      window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
      });

      window.addEventListener('mouseleave', () => {
        mouse.x = -2000;
        mouse.y = -2000;
      });
    }

    function renderCanvas() {
      ctx.clearRect(0, 0, width, height);
      const isDark = htmlEl.getAttribute('data-theme') === 'dark';

      const cols = Math.ceil(width / SPACING);
      const rows = Math.ceil(height / SPACING);

      for (let r = 0; r <= rows; r++) {
        for (let c = 0; c <= cols; c++) {
          const px = c * SPACING;
          const py = r * SPACING;

          const dx = mouse.x - px;
          const dy = mouse.y - py;
          const dist = Math.sqrt(dx * dx + dy * dy);

          ctx.beginPath();
          if (dist < 100) {
            // Calm hover highlight: solid teal dot, slightly enlarged
            const intensity = 1 - dist / 100;
            ctx.arc(px, py, 1.2 + intensity * 1.2, 0, Math.PI * 2);
            ctx.fillStyle = isDark
              ? `rgba(20, 184, 166, ${0.35 + intensity * 0.45})`
              : `rgba(13, 148, 136, ${0.3 + intensity * 0.4})`;
          } else {
            // Default calm ambient dot (pure stationary grid)
            ctx.arc(px, py, 1, 0, Math.PI * 2);
            ctx.fillStyle = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)';
          }
          ctx.fill();
        }
      }

      requestAnimationFrame(renderCanvas);
    }

    renderCanvas();
  }

  /* --------------------------------------------------------------------------
     6. Mobile Drawer Navigation
     -------------------------------------------------------------------------- */
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const closeDrawerBtn = document.getElementById('close-drawer-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');

  function toggleDrawer(open) {
    if (!mobileDrawer) return;
    if (open) {
      mobileDrawer.classList.add('open');
      mobileDrawer.setAttribute('aria-hidden', 'false');
      mobileMenuBtn?.setAttribute('aria-expanded', 'true');
    } else {
      mobileDrawer.classList.remove('open');
      mobileDrawer.setAttribute('aria-hidden', 'true');
      mobileMenuBtn?.setAttribute('aria-expanded', 'false');
    }
  }

  mobileMenuBtn?.addEventListener('click', () => {
    playUiSound('click');
    toggleDrawer(true);
  });
  closeDrawerBtn?.addEventListener('click', () => {
    playUiSound('click');
    toggleDrawer(false);
  });
  document.querySelectorAll('.drawer-link').forEach(link => {
    link.addEventListener('click', () => toggleDrawer(false));
  });

  /* --------------------------------------------------------------------------
     7. Hero Showcase Device Tab Switcher with Auto-Rotation
     -------------------------------------------------------------------------- */
  const previewTabs = document.querySelectorAll('.preview-tab');
  const heroImg = document.getElementById('hero-feature-img');
  const frameUrl = document.querySelector('.frame-url');
  const overlayTitle = document.querySelector('.overlay-title');
  const overlaySub = document.querySelector('.overlay-subtitle');
  const overlayIcon = document.querySelector('.overlay-icon');

  let currentTabIdx = 0;
  let autoRotateInterval = null;

  function switchHeroTab(idx, isManual = false) {
    if (!previewTabs[idx]) return;
    previewTabs.forEach(t => t.classList.remove('active'));
    const tab = previewTabs[idx];
    tab.classList.add('active');

    const imgSrc = tab.getAttribute('data-img');
    const title = tab.getAttribute('data-title');
    const url = tab.getAttribute('data-url');
    const sub = tab.getAttribute('data-sub');
    const icon = tab.getAttribute('data-icon');

    if (heroImg) {
      heroImg.style.opacity = '0.3';
      setTimeout(() => {
        heroImg.src = imgSrc;
        heroImg.style.opacity = '1';
      }, 150);
    }

    if (frameUrl) frameUrl.innerHTML = `<span class="lock-icon">🔒</span> ${url}`;
    if (overlayTitle) overlayTitle.textContent = title;
    if (overlaySub) overlaySub.textContent = sub;
    if (overlayIcon) overlayIcon.textContent = icon;

    currentTabIdx = idx;
    if (isManual) playUiSound('tab');
  }

  previewTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      clearInterval(autoRotateInterval);
      switchHeroTab(index, true);
    });
  });

  // Auto rotate tabs every 6.5s
  autoRotateInterval = setInterval(() => {
    const nextIdx = (currentTabIdx + 1) % previewTabs.length;
    switchHeroTab(nextIdx, false);
  }, 6500);

  /* --------------------------------------------------------------------------
     8. Filterable Product Showcase Grid
     -------------------------------------------------------------------------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      playUiSound('tab');
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');

      productCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filterVal === 'all' || cat === filterVal) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* --------------------------------------------------------------------------
     9. Interactive Telemetry Inspector (Rock Solid, Zero Jitter, Touch-Safe)
     -------------------------------------------------------------------------- */
  const mapNodes = document.querySelectorAll('.map-node');
  const telemetryLoc = document.getElementById('telemetry-location');
  const telemetryDetail = document.getElementById('telemetry-detail');
  const telemetryLatency = document.getElementById('telemetry-latency');
  const telemetryStatus = document.getElementById('telemetry-status');

  function selectMapNode(node) {
    if (!node) return;
    mapNodes.forEach(n => n.classList.remove('active'));
    node.classList.add('active');

    const loc = node.getAttribute('data-location') || 'Node Active';
    const detail = node.getAttribute('data-detail') || 'Telemetry stream nominal';
    const latency = node.getAttribute('data-latency') || '<20ms latency';
    const status = node.getAttribute('data-status') || 'ONLINE';

    if (telemetryLoc) telemetryLoc.textContent = loc;
    if (telemetryDetail) telemetryDetail.textContent = detail;
    if (telemetryLatency) telemetryLatency.textContent = latency;
    if (telemetryStatus) telemetryStatus.textContent = status;
  }

  mapNodes.forEach(node => {
    // Smooth, instant selection on hover, click, or mobile touch
    node.addEventListener('mouseenter', () => selectMapNode(node));
    node.addEventListener('click', (e) => {
      e.stopPropagation();
      selectMapNode(node);
    });
    node.addEventListener('touchstart', (e) => {
      e.stopPropagation();
      selectMapNode(node);
    }, { passive: true });
  });

  /* --------------------------------------------------------------------------
     10. Metric Counter Animations (IntersectionObserver)
     -------------------------------------------------------------------------- */
  const metricCounters = document.querySelectorAll('[data-count]');
  let metricsAnimated = false;

  const metricsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !metricsAnimated) {
        metricsAnimated = true;
        metricCounters.forEach(el => {
          const target = parseInt(el.getAttribute('data-count'), 10);
          let current = 0;
          const step = Math.max(1, Math.floor(target / 25));
          const interval = setInterval(() => {
            current += step;
            if (current >= target) {
              el.textContent = target;
              clearInterval(interval);
            } else {
              el.textContent = current;
            }
          }, 35);
        });
      }
    });
  }, { threshold: 0.3 });

  const metricsSection = document.getElementById('metrics');
  if (metricsSection) metricsObserver.observe(metricsSection);

  /* --------------------------------------------------------------------------
     11. Architecture Deep-Dive Modal Data & System
     -------------------------------------------------------------------------- */
  const projectModal = document.getElementById('project-modal');
  const modalTag = document.getElementById('modal-project-tag');
  const modalTitle = document.getElementById('modal-project-title');
  const modalContent = document.getElementById('modal-project-content');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalDismissBtn = document.getElementById('modal-dismiss-btn');

  const ARCHITECTURE_DATA = {
    leakwatch: {
      tag: 'Zero-Knowledge Secret Detection Platform',
      title: 'LeakWatch — Technical Architecture & Security Model',
      body: `
        <div class="modal-section">
          <h4 class="modal-subhead">The Challenge</h4>
          <p>Developers routinely commit API keys, GitHub tokens, and AWS secrets into repositories. Existing commercial tools are either sluggish, post public PR comments that advertise vulnerability, or require ingesting entire private source trees into third-party cloud datastores.</p>
        </div>
        <div class="modal-section">
          <h4 class="modal-subhead">Core Architectural Decisions</h4>
          <ul class="modal-arch-list">
            <li><strong>Zero Raw Key Storage:</strong> Raw tokens are never persisted in PostgreSQL. We compute a salted HMAC-SHA256 fingerprint, capture line numbers and last-4 masked hint characters, and instantly purge raw bytes from memory.</li>
            <li><strong>Sub-300ms Webhook Pipeline:</strong> GitHub App webhooks push git commits via Octokit. Instead of cloning the repository, git unified patches are streamed and evaluated via high-entropy scanning and regex rule chains.</li>
            <li><strong>Private Notification Topology:</strong> Discovered alerts are dispatched exclusively over configured private Slack webhooks and transactional email channels — zero public annotations.</li>
          </ul>
        </div>
        <div class="modal-section">
          <h4 class="modal-subhead">Stack Breakdown</h4>
          <p>Next.js 15 (App Router), TypeScript strict mode, Supabase (PostgreSQL with Row Level Security), Octokit App Auth, Vitest test suites, Tailwind CSS.</p>
        </div>
      `
    },
    exitnote: {
      tag: 'Micro-SaaS Churn Intelligence',
      title: 'ExitNote — Lightweight Widget & Retention Engine',
      body: `
        <div class="modal-section">
          <h4 class="modal-subhead">The Challenge</h4>
          <p>SaaS founders see cancellations happen on Stripe, but lack understanding of *why* users churn. Heavy enterprise survey suites cost $100s/month and inject bloated bundle sizes that harm client app performance.</p>
        </div>
        <div class="modal-section">
          <h4 class="modal-subhead">Core Architectural Decisions</h4>
          <ul class="modal-arch-list">
            <li><strong>12 KB Shadow DOM Architecture:</strong> Built in pure vanilla TypeScript encapsulated in Shadow DOM. Guarantees zero CSS collisions with host client applications.</li>
            <li><strong>Dynamic Save Offers:</strong> If a customer cites "Pricing too high" or "Temporary pause", ExitNote dynamically triggers configurable one-click discount offers, achieving a ~38.5% recovery rate.</li>
            <li><strong>Multi-tenant Analytics:</strong> PostgreSQL schema with project-level public keys, origin whitelisting, and lost-MRR aggregation charts.</li>
          </ul>
        </div>
        <div class="modal-section">
          <h4 class="modal-subhead">Stack Breakdown</h4>
          <p>Next.js App Router, TypeScript, Shadow DOM Custom Elements, Supabase DB, Zod validation, Tailwind CSS tokens.</p>
        </div>
      `
    },
    linkedin: {
      tag: 'Autonomous AI Networking Tool',
      title: 'LinkedIn Reply Assistant — Extension & AI Prompt Flow',
      body: `
        <div class="modal-section">
          <h4 class="modal-subhead">The Challenge</h4>
          <p>Generic AI replies feel canned, robotic, and hurt creator credibility. Sanjay needed an extension that inspects the live DOM context, understands user relationship depth, and crafts thoughtful responses in seconds.</p>
        </div>
        <div class="modal-section">
          <h4 class="modal-subhead">Core Architectural Decisions</h4>
          <ul class="modal-arch-list">
            <li><strong>Manifest V3 Safe Execution:</strong> Background service workers handle LLM API streaming to protect client quotas and isolate keys.</li>
            <li><strong>DOM MutationObserver:</strong> Automatically detects active message threads and comment boxes to inject floating smart pills without altering page performance.</li>
            <li><strong>Tonal Modulation:</strong> One-click switching between "Insightful", "Casual", "Friendly", and "Direct Dealmaker" prompt chains.</li>
          </ul>
        </div>
        <div class="modal-section">
          <h4 class="modal-subhead">Stack Breakdown</h4>
          <p>Chrome Extension API (MV3), Vanilla TypeScript, Claude 3.5 Sonnet / OpenAI APIs, Custom Glassmorphism CSS.</p>
        </div>
      `
    },
    formula: {
      tag: 'KaTeX & Document Compilation Engine',
      title: 'FormulaEngine — Algorithmic Mathematics Publishing',
      body: `
        <div class="modal-section">
          <h4 class="modal-subhead">The Challenge</h4>
          <p>Undergraduate engineering students frequently lack unified, crisp formula sheets for complex multi-variable calculus, differential equations, and Laplace transforms. Existing PDF generators render fuzzy raster images with broken fractions.</p>
        </div>
        <div class="modal-section">
          <h4 class="modal-subhead">Core Architectural Decisions</h4>
          <ul class="modal-arch-list">
            <li><strong>Vector KaTeX Compilation:</strong> Evaluates LaTeX expressions into vector SVG equations for infinite print crispness.</li>
            <li><strong>Automated Puppeteer Pipeline:</strong> Headless Chromium pipeline compiling multi-column print CSS with page-break heuristics into high-density printable vector PDFs in under 1.2s.</li>
            <li><strong>Student Adoption:</strong> Trusted by 1,000+ STEM students across engineering universities in India.</li>
          </ul>
        </div>
        <div class="modal-section">
          <h4 class="modal-subhead">Stack Breakdown</h4>
          <p>Node.js, KaTeX, Puppeteer, Custom Responsive Print Media CSS, HTML5.</p>
        </div>
      `
    }
  };

  function openModal(key) {
    const data = ARCHITECTURE_DATA[key];
    if (!data || !projectModal) return;

    modalTag.textContent = data.tag;
    modalTitle.textContent = data.title;
    modalContent.innerHTML = data.body;

    projectModal.classList.add('open');
    projectModal.setAttribute('aria-hidden', 'false');
    playUiSound('tab');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!projectModal) return;
    projectModal.classList.remove('open');
    projectModal.setAttribute('aria-hidden', 'true');
    playUiSound('click');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.modal-trigger').forEach(btn => {
    btn.addEventListener('click', () => {
      const modalKey = btn.getAttribute('data-modal');
      openModal(modalKey);
    });
  });

  modalCloseBtn?.addEventListener('click', closeModal);
  modalDismissBtn?.addEventListener('click', closeModal);
  projectModal?.addEventListener('click', (e) => {
    if (e.target === projectModal) closeModal();
  });

  /* --------------------------------------------------------------------------
     12. Interactive sanjay-cli Terminal
     -------------------------------------------------------------------------- */
  const terminalInput = document.getElementById('terminal-input');
  const terminalHistory = document.getElementById('terminal-history');
  const terminalBody = document.getElementById('terminal-body');

  const COMMAND_REGISTRY = {
    help: `
Available commands:
  projects      - List all shipped products & core architectures
  cat [project] - View deep technical breakdown (e.g. 'cat leakwatch')
  skills        - Display full-stack, security & AI capabilities
  stats         - View live metrics, uptime & scan stats
  whoami        - Print visitor identity & builder bio
  hire / contact- Get Sanjay's direct contact channels
  theme         - Toggle dark/light theme
  matrix        - Enter the matrix (terminal visual)
  clear         - Clear terminal output
  sudo          - Execute superuser commands
`,
    projects: `
SHIPPED PRODUCTS BY SANJAY MAKALA:
-----------------------------------------------------------------------------
1. LeakWatch                 [SaaS / Security]   Automated GitHub Secret Detection
2. ExitNote                  [Micro-SaaS]        Cancellation Survey & Retention Widget
3. LinkedIn Reply Assistant  [AI / Extension]    Autonomous Contextual Engagement Copilot
4. FormulaEngine             [Dev & EdTech]      High-speed KaTeX PDF & Cheat Sheet Compiler
-----------------------------------------------------------------------------
Run 'cat <name>' (e.g. 'cat leakwatch') to inspect architecture.
`,
    skills: `
TECHNICAL STACK:
  • Languages:    TypeScript, JavaScript (ESNext), Python, SQL, HTML5, CSS3
  • Frameworks:   Next.js (App Router), React, Node.js, Express, Puppeteer
  • Databases:    Supabase, PostgreSQL (RLS), Redis
  • Security:     Zero-knowledge secret detection, HMAC crypto, entropy rules
  • AI & Agents:  Claude 3.7/3.5 Sonnet, GPT-4o, Prompt Engineering, MV3 Extensions
  • Quality:      Vitest, Playwright, Strict TS, CI/CD Actions
`,
    stats: `
SYSTEM TELEMETRY:
  • Production Products Shipped: 4
  • LeakWatch Token Matchers:    40+ active token patterns
  • Average Detection Latency:   280 ms
  • ExitNote Widget Weight:      12 KB gzipped (0 dependencies)
  • Security Model:              Zero raw secret storage
  • Availability:                Ready for select high-impact projects
`,
    whoami: `
Sanjay Makala:
  Full-stack engineer, AI product builder, and founder based in India.
  Passionate about clean code, security tooling, and shipping products that
  solve genuine real-world friction.
`,
    hire: `
LET'S BUILD TOGETHER:
  Email:    sanjaymakala.dev@gmail.com
  GitHub:   https://github.com
  Twitter:  https://x.com
  LinkedIn: https://linkedin.com
  Timezone: IST (UTC+5:30) • High availability for US/EU sync
`,
    contact: `
LET'S BUILD TOGETHER:
  Email:    sanjaymakala.dev@gmail.com
  LinkedIn: https://linkedin.com
  Location: India (Remote worldwide)
`,
    date: () => new Date().toUTCString(),
    theme: () => {
      themeToggleBtn?.click();
      return "Toggled website visual theme.";
    },
    sudo: "Permission denied: Nice try, but LeakWatch caught that attempt! ;)",
    matrix: () => {
      return "01001100 01100101 01100001 01101011 01010111 01100001 01110100 01100011 01101000\n[Wake up, Neo... Sanjay's code is running in production.]";
    }
  };

  COMMAND_REGISTRY['cat leakwatch'] = `
[LEAKWATCH ARCHITECTURE DUMP]
Type:        Automated Secret Scanner for GitHub Repositories
Security:    Salted HMAC-SHA256 Fingerprints only; Zero raw secrets persisted.
Latency:     < 300ms from git commit push to alert dispatch.
Channels:    Slack Incoming Webhook & Transactional Email.
Stack:       Next.js 15, TypeScript, Supabase, Octokit, Vitest.
`;

  COMMAND_REGISTRY['cat exitnote'] = `
[EXITNOTE ARCHITECTURE DUMP]
Type:        Micro-SaaS Churn Intelligence & Retention Widget
Footprint:   12 KB gzipped Shadow DOM custom element (zero host style collisions).
Mechanic:    Intercepts subscription cancellations; serves dynamic save discounts.
Impact:      Average 38.5% recovery rate of churn-risk customers.
Stack:       Next.js, TypeScript, PostgreSQL, Zod, Tailwind.
`;

  COMMAND_REGISTRY['cat linkedin'] = `
[LINKEDIN REPLY ASSISTANT ARCHITECTURE DUMP]
Type:        Contextual Chrome Extension (Manifest V3)
Mechanism:   DOM MutationObserver detects active message thread; injects response UI.
Models:      Claude 3.5 Sonnet & GPT-4o API integration with isolated key storage.
Tones:       Insightful, Casual, Friendly, Professional.
`;

  COMMAND_REGISTRY['cat formula'] = `
[FORMULAENGINE COMPILER DUMP]
Type:        High-density LaTeX to Vector PDF & Web Cheat Sheet Compiler
Engine:      KaTeX rendering with Puppeteer headless Chromium rasterization.
Use case:    STEM and Engineering students revising higher mathematics.
`;

  let historyStack = [];
  let historyIdx = -1;

  function runTerminalCommand(cmdRaw) {
    const cmd = cmdRaw.trim();
    if (!cmd) return;

    playUiSound('terminal');
    historyStack.push(cmd);
    historyIdx = historyStack.length;

    // Create entry
    const entry = document.createElement('div');
    entry.className = 'terminal-entry';

    const echo = document.createElement('div');
    echo.className = 'cmd-echo font-mono text-xs';
    echo.innerHTML = `<span class="prompt-user">visitor@sanjay</span>:<span class="prompt-path">~</span>$ <span>${escapeHtml(cmd)}</span>`;
    entry.appendChild(echo);

    const out = document.createElement('div');
    out.className = 'cmd-output font-mono text-xs';

    const lower = cmd.toLowerCase();

    if (lower === 'clear') {
      if (terminalHistory) terminalHistory.innerHTML = '';
      if (terminalInput) terminalInput.value = '';
      return;
    }

    if (COMMAND_REGISTRY[lower]) {
      const res = COMMAND_REGISTRY[lower];
      out.textContent = typeof res === 'function' ? res() : res;
    } else if (lower.startsWith('cat ')) {
      out.textContent = `File not found: '${cmd.substring(4)}'. Try 'cat leakwatch', 'cat exitnote', etc.`;
    } else {
      out.textContent = `zsh: command not found: ${cmd}. Type 'help' for available commands.`;
    }

    entry.appendChild(out);
    terminalHistory?.appendChild(entry);

    if (terminalInput) terminalInput.value = '';
    if (terminalBody) terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  terminalInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      runTerminalCommand(terminalInput.value);
    } else if (e.key === 'ArrowUp') {
      if (historyIdx > 0) {
        historyIdx--;
        terminalInput.value = historyStack[historyIdx] || '';
      }
      e.preventDefault();
    } else if (e.key === 'ArrowDown') {
      if (historyIdx < historyStack.length - 1) {
        historyIdx++;
        terminalInput.value = historyStack[historyIdx] || '';
      } else {
        historyIdx = historyStack.length;
        terminalInput.value = '';
      }
      e.preventDefault();
    }
  });

  // Quick run pills in terminal
  document.querySelectorAll('.cmd-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      const runCmd = pill.getAttribute('data-run');
      if (terminalInput && runCmd) {
        terminalInput.value = runCmd;
        runTerminalCommand(runCmd);
      }
    });
  });

  // Run in cli links from product cards
  document.querySelectorAll('.terminal-run-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const runCmd = link.getAttribute('data-cmd');
      const terminalSection = document.getElementById('terminal');
      terminalSection?.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        if (terminalInput && runCmd) {
          terminalInput.focus();
          terminalInput.value = runCmd;
          runTerminalCommand(runCmd);
        }
      }, 600);
    });
  });

  /* --------------------------------------------------------------------------
     13. Command Palette (Cmd+K / Ctrl+K)
     -------------------------------------------------------------------------- */
  /* --------------------------------------------------------------------------
     13. Keyboard Accessibility & Modals
     -------------------------------------------------------------------------- */
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (projectModal?.classList.contains('open')) closeModal();
      if (mobileDrawer?.classList.contains('open')) toggleDrawer(false);
    }
  });

  /* --------------------------------------------------------------------------
     14. Interactive Contact Form Submission Simulation
     -------------------------------------------------------------------------- */
  const contactForm = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-feedback');
  const formSubmitBtn = document.getElementById('form-submit-btn');

  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!formSubmitBtn || !formFeedback) return;

    const name = document.getElementById('form-name')?.value.trim();
    const email = document.getElementById('form-email')?.value.trim();
    const topic = document.getElementById('form-topic')?.value;
    const message = document.getElementById('form-message')?.value.trim();

    formSubmitBtn.disabled = true;
    formSubmitBtn.innerHTML = `<span>Dispatching Message...</span>`;
    formFeedback.textContent = '';
    formFeedback.className = 'form-feedback';

    setTimeout(() => {
      formSubmitBtn.disabled = false;
      formSubmitBtn.innerHTML = `<span>Send Direct Message</span>`;
      formFeedback.className = 'form-feedback success';
      formFeedback.textContent = `✓ Thank you, ${name}! Your note has been registered. Sanjay will get back to you shortly at ${email}.`;
      playUiSound('success');
      contactForm.reset();

      // Also generate mailto fallback
      const mailtoUrl = `mailto:sanjaymakala.dev@gmail.com?subject=${encodeURIComponent(`[Portfolio] ${topic} from ${name}`)}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`;
      console.log('Prepared direct mail link:', mailtoUrl);
    }, 900);
  });

  /* --------------------------------------------------------------------------
     15. Active Section Header Spy
     -------------------------------------------------------------------------- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });

});
