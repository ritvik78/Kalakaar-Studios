(() => {
  const STORAGE_PREFIX = 'kalakaar.availability.';
  const CURRENT_ARTIST_KEY = 'kalakaar.currentArtistId';

  const pad2 = (n) => String(n).padStart(2, '0');

  function toIsoDateLocal(year, monthIndex, day) {
    return `${year}-${pad2(monthIndex + 1)}-${pad2(day)}`;
  }

  function safeJsonParse(value, fallback) {
    try {
      return JSON.parse(value);
    } catch {
      return fallback;
    }
  }

  function slugify(input) {
    const text = String(input || '').trim().toLowerCase();
    if (!text) return '';
    return text
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .replace(/--+/g, '-');
  }

  function monthTitle(year, monthIndex) {
    const d = new Date(year, monthIndex, 1);
    return d.toLocaleString(undefined, { month: 'long', year: 'numeric' });
  }

  function getArtistIdFromDashboard() {
    const stageNameInput = document.getElementById('artistStageName');
    const fallback = localStorage.getItem(CURRENT_ARTIST_KEY) || '';
    const initialName = stageNameInput?.value || fallback;
    const initialId = slugify(initialName);

    if (initialId) {
      localStorage.setItem(CURRENT_ARTIST_KEY, initialId);
    }

    if (stageNameInput) {
      stageNameInput.addEventListener('change', () => {
        const nextId = slugify(stageNameInput.value);
        if (nextId) {
          localStorage.setItem(CURRENT_ARTIST_KEY, nextId);
        }
      });
    }

    return initialId;
  }

  function getArtistIdFromProfile() {
    const explicit = document.querySelector('[data-artist-id]')?.getAttribute('data-artist-id');
    if (explicit) return slugify(explicit);

    const name = document.querySelector('h1')?.textContent || document.title;
    return slugify(name);
  }

  function loadAvailabilityMap(artistId) {
    if (!artistId) return {};
    const raw = localStorage.getItem(`${STORAGE_PREFIX}${artistId}`);
    const parsed = safeJsonParse(raw, null);
    if (!parsed || typeof parsed !== 'object') return {};
    return parsed;
  }

  function saveAvailabilityMap(artistId, map) {
    if (!artistId) return;
    localStorage.setItem(`${STORAGE_PREFIX}${artistId}`, JSON.stringify(map));
  }

  function setDateStatus(map, isoDate, status) {
    if (status === 'available' || status === 'unavailable') {
      map[isoDate] = status;
      return;
    }
    delete map[isoDate];
  }

  function getDateStatus(map, isoDate) {
    const value = map?.[isoDate];
    if (value === 'available' || value === 'unavailable') return value;
    return 'unknown';
  }

  function initCalendar(root, { role, artistId, modeRoot }) {
    const titleEl = root.querySelector('[data-cal-title]');
    const gridEl = root.querySelector('[data-cal-grid]');
    const prevBtn = root.querySelector('[data-cal-prev]');
    const nextBtn = root.querySelector('[data-cal-next]');
    const emptyEl = root.querySelector('[data-cal-empty]');

    if (!titleEl || !gridEl) return;

    const today = new Date();
    let viewYear = today.getFullYear();
    let viewMonth = today.getMonth();

    let mode = 'unavailable';

    let availabilityMap = loadAvailabilityMap(artistId);

    function updateEmptyState() {
      if (!emptyEl) return;
      const hasAny = Object.keys(availabilityMap).length > 0;
      emptyEl.style.display = hasAny ? 'none' : 'block';
    }

    function reloadAndRender() {
      availabilityMap = loadAvailabilityMap(artistId);
      updateEmptyState();
      render();
    }

    function render() {
      titleEl.textContent = monthTitle(viewYear, viewMonth);
      gridEl.innerHTML = '';

      const firstOfMonth = new Date(viewYear, viewMonth, 1);
      const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
      const firstDow = firstOfMonth.getDay(); // 0..6 (Sun..Sat)

      const prevMonthDays = new Date(viewYear, viewMonth, 0).getDate();

      for (let i = 0; i < 42; i++) {
        const dayOffset = i - firstDow + 1;
        let cellYear = viewYear;
        let cellMonth = viewMonth;
        let cellDay = dayOffset;
        let inCurrentMonth = true;

        if (dayOffset <= 0) {
          inCurrentMonth = false;
          const prevDay = prevMonthDays + dayOffset;
          cellDay = prevDay;
          cellMonth = viewMonth - 1;
          if (cellMonth < 0) {
            cellMonth = 11;
            cellYear = viewYear - 1;
          }
        } else if (dayOffset > daysInMonth) {
          inCurrentMonth = false;
          cellDay = dayOffset - daysInMonth;
          cellMonth = viewMonth + 1;
          if (cellMonth > 11) {
            cellMonth = 0;
            cellYear = viewYear + 1;
          }
        }

        const iso = toIsoDateLocal(cellYear, cellMonth, cellDay);
        const status = getDateStatus(availabilityMap, iso);

        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'availability-day';
        btn.textContent = String(cellDay);
        btn.setAttribute('data-iso', iso);

        if (!inCurrentMonth) btn.classList.add('availability-day--other');
        if (status === 'available') btn.classList.add('availability-day--available');
        if (status === 'unavailable') btn.classList.add('availability-day--unavailable');

        if (role !== 'editor') {
          btn.disabled = true;
          btn.classList.add('availability-day--readonly');
        }

        btn.addEventListener('click', () => {
          if (role !== 'editor') return;

          const nextStatus = mode;
          setDateStatus(availabilityMap, iso, nextStatus);
          saveAvailabilityMap(artistId, availabilityMap);
          updateEmptyState();
          render();
        });

        gridEl.appendChild(btn);
      }
    }

    function setMode(nextMode) {
      mode = nextMode;
      if (!modeRoot) return;
      modeRoot.querySelectorAll('[data-availability-mode]').forEach((b) => {
        const isActive = b.getAttribute('data-availability-mode') === nextMode;
        b.classList.toggle('availability-mode--active', isActive);
      });
    }

    if (role === 'editor' && modeRoot) {
      modeRoot.querySelectorAll('[data-availability-mode]').forEach((btn) => {
        btn.addEventListener('click', () => {
          setMode(btn.getAttribute('data-availability-mode') || 'unavailable');
        });
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        viewMonth -= 1;
        if (viewMonth < 0) {
          viewMonth = 11;
          viewYear -= 1;
        }
        render();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        viewMonth += 1;
        if (viewMonth > 11) {
          viewMonth = 0;
          viewYear += 1;
        }
        render();
      });
    }

    window.addEventListener('storage', (e) => {
      if (!e || typeof e.key !== 'string') return;
      if (e.key === `${STORAGE_PREFIX}${artistId}`) {
        reloadAndRender();
      }
    });

    updateEmptyState();
    setMode(mode);
    render();
  }

  function initAvailability() {
    const calendars = document.querySelectorAll('.availability-calendar[data-availability-role]');
    if (!calendars.length) return;

    const onDashboard = Boolean(document.getElementById('artistStageName'));
    const artistId = onDashboard ? getArtistIdFromDashboard() : getArtistIdFromProfile();

    calendars.forEach((root) => {
      const role = root.getAttribute('data-availability-role') || 'viewer';
      const scope = root.closest('.tab-content') || root.closest('section') || document;
      const modeRoot = role === 'editor' ? scope : null;
      initCalendar(root, { role, artistId, modeRoot });

      const emptyEl = root.querySelector('[data-cal-empty]');
      if (emptyEl && artistId) {
        emptyEl.textContent = emptyEl.getAttribute('data-empty-text') || 'No availability set yet.';
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAvailability);
  } else {
    initAvailability();
  }
})();
