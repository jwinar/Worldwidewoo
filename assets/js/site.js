/* THE NIGHT AUDIT — scroll is time. Lenis + ScrollTrigger + SplitText. */
(function () {
  'use strict';

  var reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasGSAP = typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined';
  var root = document.documentElement;

  var fmt = new Intl.NumberFormat('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  function money(n) { return (n < 0 ? '−' : '') + '$' + fmt.format(Math.abs(n)); }

  /* Figures read correctly with no JS and under reduced motion. */
  var figures = Array.prototype.slice.call(document.querySelectorAll('.fig'));
  function settleFigures() {
    figures.forEach(function (f) { f.textContent = money(parseFloat(f.getAttribute('data-to'))); });
  }

  if (reduced || !hasGSAP) {
    settleFigures();
    return;
  }

  gsap.registerPlugin(ScrollTrigger);
  var hasSplit = typeof window.SplitText !== 'undefined';
  if (hasSplit) gsap.registerPlugin(SplitText);

  /* ────────────────────────────────────────────────
     Smooth scroll
     Lenis interpolates the scroll position and GSAP's
     ticker drives it, so the scrubbed timelines below
     read the same clock as the scroll itself. Without
     this the whole page feels like a document; with it,
     it feels like a thing you are moving through.
     ──────────────────────────────────────────────── */
  var lenis = null;
  if (typeof window.Lenis !== 'undefined' && matchMedia('(pointer: fine)').matches) {
    lenis = new Lenis({ lerp: 0.095, wheelMultiplier: 0.95 });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
    gsap.ticker.lagSmoothing(0);
    root.classList.add('smooth');

    // in-page links have to go through Lenis or they fight it
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var el = document.querySelector(a.getAttribute('href'));
        if (!el) return;
        e.preventDefault();
        lenis.scrollTo(el, { offset: 0 });
      });
    });
  }

  /* ────────────────────────────────────────────────
     The hours
     Every chapter declares the colour of its hour. The
     ground is interpolated continuously between them, so
     the page never cuts from one background to the next —
     it gets lighter the way a night does.
     ──────────────────────────────────────────────── */
  (function () {
    var chapters = Array.prototype.slice.call(document.querySelectorAll('[data-ch]'));
    if (chapters.length < 2) return;

    function rgb(hex) {
      var n = parseInt(hex.slice(1), 16);
      return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
    }
    var stops = chapters.map(function (el) {
      return {
        el: el,
        bg: rgb(el.dataset.bg), fg: rgb(el.dataset.fg),
        dim: rgb(el.dataset.dim), accent: rgb(el.dataset.accent)
      };
    });

    function mix(a, b, t) {
      return 'rgb(' + Math.round(a[0] + (b[0] - a[0]) * t) + ','
                    + Math.round(a[1] + (b[1] - a[1]) * t) + ','
                    + Math.round(a[2] + (b[2] - a[2]) * t) + ')';
    }

    var headClock = document.getElementById('clock-head');
    var heroClock = document.getElementById('clock-hero');
    var START = 23 * 60, SPAN = 7 * 60; // 23:00 → 06:00
    var dawn = document.getElementById('dawn');
    var head = document.querySelector('.head');
    var headLight = false;

    function paint() {
      var read = scrollY + innerHeight * 0.5;
      var i = 0;
      for (var k = 0; k < stops.length; k++) {
        if (read >= stops[k].el.offsetTop) i = k;
      }
      var cur = stops[i], nxt = stops[Math.min(i + 1, stops.length - 1)];
      var top = cur.el.offsetTop;
      var h = cur.el.offsetHeight || 1;
      var t = Math.max(0, Math.min(1, (read - top) / h));

      root.style.setProperty('--bg', mix(cur.bg, nxt.bg, t));
      root.style.setProperty('--fg', mix(cur.fg, nxt.fg, t));
      root.style.setProperty('--dim', mix(cur.dim, nxt.dim, t));
      root.style.setProperty('--accent', mix(cur.accent, nxt.accent, t));

      var doc = document.body.scrollHeight - innerHeight;
      var p = doc > 0 ? Math.max(0, Math.min(1, scrollY / doc)) : 0;
      var mins = START + SPAN * p;
      var hh = Math.floor(mins / 60) % 24, mm = Math.floor(mins % 60);
      var s = (hh < 10 ? '0' : '') + hh + ':' + (mm < 10 ? '0' : '') + mm;
      if (headClock) headClock.textContent = s;
      if (heroClock) heroClock.textContent = s;

      /* Dawn owns an opaque ground, so the header swaps to dark type the
         moment it slides underneath — a switch, never a fade through a
         mid-tone where neither colour would be readable. */
      if (dawn && head) {
        var under = dawn.getBoundingClientRect().top <= 72;
        if (under !== headLight) { headLight = under; head.classList.toggle('head--light', under); }
      }
    }

    paint();
    ScrollTrigger.create({ start: 0, end: 'max', onUpdate: paint, onRefresh: paint });
    addEventListener('resize', paint);


  })();

  /* ── Masked line reveals ──────────────────────────
     SplitText's own line masking: each line rides up out of
     a clip. Text stays selectable and screen-reader intact. */
  (function () {
    if (!hasSplit) return;
    document.fonts.ready.then(function () {
      document.querySelectorAll('.ln').forEach(function (el) {
        var split = SplitText.create(el, { type: 'lines', mask: 'lines', linesClass: 'ln-line' });
        gsap.from(split.lines, {
          yPercent: 115,
          duration: 1.05,
          ease: 'expo.out',
          stagger: 0.075,
          scrollTrigger: { trigger: el, start: 'top 88%', once: true }
        });
      });
      ScrollTrigger.refresh();
    });
  })();

  /* ────────────────────────────────────────────────
     02:30 — the audit
     The one pinned moment. The visitor's scroll is what
     posts each line and what settles the balance; the
     sequence cannot run without them, which is the whole
     point of scrubbing it rather than playing it.
     ──────────────────────────────────────────────── */
  (function () {
    var section = document.querySelector('.ch--audit');
    var stage = document.getElementById('audit');
    if (!section || !stage) return;
    var rows = Array.prototype.slice.call(section.querySelectorAll('[data-row]'));
    var seal = document.getElementById('seal');

    function build(trigger) {
      gsap.set(rows, { opacity: 0.12, y: 10 });
      if (seal) gsap.set(seal, { opacity: 0 });

      var tl = gsap.timeline({ scrollTrigger: trigger });
      rows.forEach(function (row, i) {
        var at = i * 0.9;
        tl.to(row, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, at);
        var fig = row.querySelector('.fig');
        if (!fig) return;
        var target = parseFloat(fig.getAttribute('data-to'));
        var o = { v: 0 };
        tl.to(o, {
          v: target, duration: 0.8, ease: 'power2.out',
          onUpdate: function () { fig.textContent = money(o.v); },
          onComplete: function () { fig.textContent = money(target); }
        }, at);
      });
      if (seal) tl.to(seal, { opacity: 1, duration: 0.6, ease: 'power2.out' }, rows.length * 0.9 - 0.2);
      return tl;
    }

    /* The ledger is taller than a phone, so pinning it there would run rows
       under the fixed header. Wide screens get the scrubbed pin; narrow ones
       play the same sequence as they scroll past, unpinned. */
    var mm = gsap.matchMedia();

    mm.add('(min-width: 48em)', function () {
      var tl = build({
        trigger: section, start: 'top top', end: '+=2400',
        pin: stage, scrub: 0.6, anticipatePin: 1
      });
      return function () { tl.scrollTrigger && tl.scrollTrigger.kill(); tl.kill(); };
    });

    mm.add('(max-width: 47.99em)', function () {
      var tl = build({
        trigger: section, start: 'top 70%', end: 'bottom 60%', scrub: 0.8
      });
      return function () { tl.scrollTrigger && tl.scrollTrigger.kill(); tl.kill(); };
    });
  })();

  /* ── The widget, running ──────────────────────────── */
  (function () {
    var WORDS = [
      { hz: '耐心', py: 'nài xīn', en: 'patience' },
      { hz: '复利', py: 'fù lì',   en: 'compound interest' },
      { hz: '你好', py: 'nǐ hǎo',  en: 'hello' },
      { hz: '学习', py: 'xué xí',  en: 'to study' },
      { hz: '谢谢', py: 'xiè xie', en: 'thank you' }
    ];
    var hz = document.getElementById('w-hz'),
        py = document.getElementById('w-py'),
        en = document.getElementById('w-en');
    if (!hz) return;
    var i = 0, timer = null;

    function show() {
      i = (i + 1) % WORDS.length;
      var w = WORDS[i];
      gsap.to([hz, py, en], {
        opacity: 0, y: -5, duration: 0.25, ease: 'power2.in', stagger: 0.03,
        onComplete: function () {
          hz.textContent = w.hz; py.textContent = w.py; en.textContent = w.en;
          gsap.fromTo([hz, py, en], { opacity: 0, y: 5 },
            { opacity: 1, y: 0, duration: 0.45, ease: 'expo.out', stagger: 0.04 });
        }
      });
    }

    ScrollTrigger.create({
      trigger: hz.closest('.glass') || hz,
      onEnter: function () { if (!timer) timer = setInterval(show, 3200); },
      onLeave: function () { clearInterval(timer); timer = null; },
      onEnterBack: function () { if (!timer) timer = setInterval(show, 3200); },
      onLeaveBack: function () { clearInterval(timer); timer = null; }
    });
  })();

  /* ── Contact ──────────────────────────────────────
     No mail service is wired up yet. Set ENDPOINT to a form
     service URL (Formspree, Basin, Netlify Forms) and the
     POST path takes over. */
  (function () {
    var ENDPOINT = '';
    var form = document.getElementById('contact-form');
    if (!form) return;
    var status = form.querySelector('.form__s');
    var btn = form.querySelector('button[type="submit"]');
    var label = btn.querySelector('[data-btn-label]');

    function setErr(input, msg) {
      var f = input.closest('.fld');
      var slot = form.querySelector('[data-err-for="' + input.id + '"]');
      if (msg) { f.setAttribute('data-invalid', ''); input.setAttribute('aria-invalid', 'true'); if (slot) slot.textContent = msg; }
      else { f.removeAttribute('data-invalid'); input.removeAttribute('aria-invalid'); if (slot) slot.textContent = ''; }
      return !msg;
    }
    function validate() {
      var n = form.elements.name, e = form.elements.email, m = form.elements.message, ok = true;
      ok = setErr(n, n.value.trim() ? '' : 'Your name.') && ok;
      ok = setErr(e, !e.value.trim() ? 'An email, so I can reply.'
        : (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.value.trim()) ? '' : 'That address is missing something.')) && ok;
      ok = setErr(m, m.value.trim() ? '' : 'A line or two.') && ok;
      return ok;
    }
    ['name', 'email', 'message'].forEach(function (k) {
      var el = form.elements[k];
      el.addEventListener('blur', function () { if (el.value.trim()) validate(); });
      el.addEventListener('input', function () { if (el.closest('.fld').hasAttribute('data-invalid')) validate(); });
    });
    function say(m, tone) { status.textContent = m; if (tone) status.setAttribute('data-tone', tone); else status.removeAttribute('data-tone'); }

    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      if (!validate()) {
        say('Check the fields above.', 'err');
        var bad = form.querySelector('[data-invalid] input, [data-invalid] textarea');
        if (bad) bad.focus();
        return;
      }
      if (!ENDPOINT) { say('This form is not connected to a mail service yet — please reach me on LinkedIn.', 'err'); return; }
      btn.disabled = true; label.textContent = btn.getAttribute('data-busy'); say('');
      fetch(ENDPOINT, { method: 'POST', headers: { Accept: 'application/json' }, body: new FormData(form) })
        .then(function (r) { if (!r.ok) throw new Error('bad'); form.reset(); say('Sent. I will come back to you shortly.', 'ok'); })
        .catch(function () { say('That did not send. Please try again, or reach me on LinkedIn.', 'err'); })
        .then(function () { btn.disabled = false; label.textContent = btn.getAttribute('data-idle'); });
    });
  })();
})();
