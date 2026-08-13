(() => {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");

  if (toggle && nav) {
    const setOpen = (open) => {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      nav.classList.toggle("is-open", open);
    };

    toggle.addEventListener("click", () => {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setOpen(false));
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") setOpen(false);
    });
  }

  const revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length && "IntersectionObserver" in window) {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      revealEls.forEach((el) => el.classList.add("is-visible"));
    } else {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
      );
      revealEls.forEach((el) => observer.observe(el));
    }
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  if (header) {
    const onScroll = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* —— Holiday / seasonal hero logos ——
   * Flip this to false to keep the default hero logo year-round for visitors.
   * Preview with ?dev=1 still works either way.
   */
  const HOLIDAY_LOGOS_ENABLED = true;

  const HERO_LOGOS = {
    default: "assets/Logo%20-%20Reimage%20Var%203%20-%20Fixed.png",
    independence: "assets/Logo%20-%20Independence%20Day.png",
    thanksgiving: "assets/Logo%20-%20Thanksgiving.png",
    christmas: "assets/Logo%20-%20Christmas.png",
    newyear: "assets/Logo%20-%20New%20Year.png",
  };

  const LOGO_LABELS = {
    auto: "Auto (by date)",
    default: "Default",
    independence: "Independence Day",
    thanksgiving: "Thanksgiving",
    christmas: "Christmas",
    newyear: "New Year",
  };

  const heroLogo = document.getElementById("hero-logo");
  const params = new URLSearchParams(window.location.search);
  const devMode = params.get("dev") === "1";
  const holidayParam = (params.get("holiday") || "").toLowerCase();
  const storageKey = "trisun-hero-logo-preview";

  const startOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

  const thanksgivingDate = (year) => {
    const nov1 = new Date(year, 10, 1);
    const dow = nov1.getDay();
    const firstThu = dow <= 4 ? 1 + (4 - dow) : 1 + (11 - dow);
    return new Date(year, 10, firstThu + 21);
  };

  const inRangeInclusive = (date, start, end) => {
    const t = startOfDay(date).getTime();
    return t >= startOfDay(start).getTime() && t <= startOfDay(end).getTime();
  };

  const holidayForDate = (date) => {
    if (!HOLIDAY_LOGOS_ENABLED) return "default";

    const y = date.getFullYear();
    const m = date.getMonth();
    const day = date.getDate();

    // Independence Day: Jun 28 – Jul 7
    if (inRangeInclusive(date, new Date(y, 5, 28), new Date(y, 6, 7))) {
      return "independence";
    }

    const thanks = thanksgivingDate(y);
    // Thanksgiving: Nov 15 – Thanksgiving Day
    if (inRangeInclusive(date, new Date(y, 10, 15), thanks)) {
      return "thanksgiving";
    }

    // Christmas: day after Thanksgiving – Dec 26
    const christmasStart = new Date(thanks);
    christmasStart.setDate(christmasStart.getDate() + 1);
    if (inRangeInclusive(date, christmasStart, new Date(y, 11, 26))) {
      return "christmas";
    }

    // New Year: Dec 27 – Jan 3 (crosses year boundary)
    if (m === 11 && day >= 27) return "newyear";
    if (m === 0 && day <= 3) return "newyear";

    return "default";
  };

  const resolveLogoKey = () => {
    // Dev preview can force logos even when the live feature is off
    if (devMode) {
      const forced = sessionStorage.getItem(storageKey);
      if (forced && HERO_LOGOS[forced]) return forced;
      if (forced === "auto") return holidayForDate(new Date());
    }

    if (devMode && holidayParam && HERO_LOGOS[holidayParam]) return holidayParam;
    if (devMode && holidayParam === "auto") return holidayForDate(new Date());

    if (!HOLIDAY_LOGOS_ENABLED) return "default";

    if (holidayParam && HERO_LOGOS[holidayParam]) return holidayParam;
    if (holidayParam === "auto") return holidayForDate(new Date());

    return holidayForDate(new Date());
  };

  const applyHeroLogo = (key) => {
    if (!heroLogo) return;
    const theme = key in HERO_LOGOS ? key : "default";
    const src = HERO_LOGOS[theme] || HERO_LOGOS.default;
    heroLogo.src = src;
    heroLogo.dataset.logoKey = theme;
    const hero = heroLogo.closest(".hero");
    if (hero) hero.dataset.theme = theme;
  };

  applyHeroLogo(resolveLogoKey());

  if (devMode && heroLogo) {
    const panel = document.createElement("div");
    panel.className = "dev-logo-panel";
    panel.innerHTML = `
      <label for="dev-logo-select">Hero logo preview</label>
      <select id="dev-logo-select">
        ${Object.keys(LOGO_LABELS)
          .map((key) => `<option value="${key}">${LOGO_LABELS[key]}</option>`)
          .join("")}
      </select>
      <p class="dev-logo-hint">
        Live holidays: <strong>${HOLIDAY_LOGOS_ENABLED ? "ON" : "OFF"}</strong>
        (<code>HOLIDAY_LOGOS_ENABLED</code> in main.js)
      </p>
      <table class="dev-logo-schedule">
        <caption>Schedule</caption>
        <thead>
          <tr><th>Logo</th><th>When shown</th></tr>
        </thead>
        <tbody>
          <tr>
            <td>Independence Day</td>
            <td>Jun 28 – Jul 7</td>
          </tr>
          <tr>
            <td>Thanksgiving</td>
            <td>Nov 15 – Thanksgiving</td>
          </tr>
          <tr>
            <td>Christmas</td>
            <td>Day after Thanksgiving – Dec 26</td>
          </tr>
          <tr>
            <td>New Year</td>
            <td>Dec 27 – Jan 3</td>
          </tr>
          <tr>
            <td>Default</td>
            <td>All other dates</td>
          </tr>
        </tbody>
      </table>
    `;
    document.body.appendChild(panel);

    const select = panel.querySelector("#dev-logo-select");
    const stored = sessionStorage.getItem(storageKey);
    if (stored && (stored === "auto" || HERO_LOGOS[stored])) {
      select.value = stored;
    } else if (holidayParam && (holidayParam === "auto" || HERO_LOGOS[holidayParam])) {
      select.value = holidayParam;
    } else {
      select.value = "auto";
    }

    const syncFromSelect = () => {
      const value = select.value;
      sessionStorage.setItem(storageKey, value);
      applyHeroLogo(value === "auto" ? holidayForDate(new Date()) : value);
    };

    select.addEventListener("change", syncFromSelect);
  }
})();
