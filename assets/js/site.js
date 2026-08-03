/* QUIET MACHINE — theme, grain, and motion. */
(function () {
  'use strict';

  var reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasGSAP = typeof window.gsap !== 'undefined';
  if (reduced) document.documentElement.classList.add('no-motion');
  if (hasGSAP && window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

  var root = document.documentElement;

  /* ── Theme ─────────────────────────────────────────
     The inline script in <head> already set the theme before
     first paint; this only wires the control and keeps the
     browser chrome colour in step. */
  (function () {
    var btn = document.getElementById('theme-toggle');
    var meta = document.querySelector('meta[name="theme-color"]');
    if (!btn) return;

    var COLORS = { dark: '#0A0A0C', light: '#F7F6F3' };

    function paint(theme) {
      root.setAttribute('data-theme', theme);
      if (meta) meta.setAttribute('content', COLORS[theme]);
      btn.setAttribute('aria-label', 'Switch to ' + (theme === 'dark' ? 'light' : 'dark') + ' theme');
      if (window.ScrollTrigger) ScrollTrigger.refresh();
    }

    paint(root.getAttribute('data-theme') || 'dark');

    btn.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      paint(next);
      try { localStorage.setItem('jw-theme', next); } catch (e) {}
    });

    // Follow the OS only while the visitor has not chosen for themselves.
    matchMedia('(prefers-color-scheme: light)').addEventListener('change', function (e) {
      try { if (localStorage.getItem('jw-theme')) return; } catch (err) {}
      paint(e.matches ? 'light' : 'dark');
    });
  })();

  /* ── Film grain ────────────────────────────────────
     One monochrome noise tile, generated once and handed to CSS
     as a data URI. CSS does the movement, so nothing repaints. */
  (function () {
    var el = document.querySelector('.grain');
    if (!el) return;
    var SIZE = 140;
    var c = document.createElement('canvas');
    c.width = c.height = SIZE;
    var ctx = c.getContext('2d', { willReadFrequently: false });
    if (!ctx) return;

    var img = ctx.createImageData(SIZE, SIZE);
    var d = img.data;
    for (var i = 0; i < d.length; i += 4) {
      var v = (Math.random() * 255) | 0;
      d[i] = d[i + 1] = d[i + 2] = v;
      d[i + 3] = 255;
    }
    ctx.putImageData(img, 0, 0);

    try {
      el.style.backgroundImage = 'url(' + c.toDataURL('image/png') + ')';
    } catch (e) {
      el.remove(); // tainted canvas or no toDataURL: no grain rather than a broken layer
    }
  })();

  /* ── Nav shadow on scroll ──────────────────────────── */
  (function () {
    var nav = document.querySelector('.nav');
    if (!nav) return;
    var on = false;
    function check() {
      var should = window.scrollY > 12;
      if (should === on) return;
      on = should;
      if (should) nav.setAttribute('data-scrolled', ''); else nav.removeAttribute('data-scrolled');
    }
    check();
    addEventListener('scroll', check, { passive: true });
  })();

  /* ── Hero role rotator ─────────────────────────────── */
  (function () {
    var el = document.getElementById('rotator');
    if (!el) return;
    var WORDS = ['Operator', 'Analyst', 'Builder', 'Value investor'];
    var i = 0;
    el.textContent = WORDS[0];
    if (reduced || !hasGSAP) return;

    setInterval(function () {
      i = (i + 1) % WORDS.length;
      gsap.to(el, {
        opacity: 0, y: -8, filter: 'blur(4px)', duration: 0.32, ease: 'power2.in',
        onComplete: function () {
          el.textContent = WORDS[i];
          gsap.fromTo(el,
            { opacity: 0, y: 8, filter: 'blur(4px)' },
            { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.5, ease: 'expo.out' });
        }
      });
    }, 2800);
  })();

  /* ── Widget: the product's own mechanism, running ───── */
  (function () {
    var WORDS = [
      { hz: '你好', py: 'nǐ hǎo',  en: 'hello' },
      { hz: '谢谢', py: 'xiè xie', en: 'thank you' },
      { hz: '学习', py: 'xué xí',  en: 'to study' },
      { hz: '耐心', py: 'nài xīn', en: 'patience' },
      { hz: '复利', py: 'fù lì',   en: 'compound interest' }
    ];
    var hz = document.getElementById('w-hz'),
        py = document.getElementById('w-py'),
        en = document.getElementById('w-en');
    if (!hz) return;
    var phone = hz.closest('.phone');
    var i = 0, timer = null;

    function show(n) {
      var w = WORDS[n];
      if (reduced || !hasGSAP) {
        hz.textContent = w.hz; py.textContent = w.py; en.textContent = w.en;
        return;
      }
      gsap.to([hz, py, en], {
        opacity: 0, y: -6, duration: 0.26, ease: 'power2.in', stagger: 0.04,
        onComplete: function () {
          hz.textContent = w.hz; py.textContent = w.py; en.textContent = w.en;
          gsap.fromTo([hz, py, en],
            { opacity: 0, y: 6 },
            { opacity: 1, y: 0, duration: 0.45, ease: 'expo.out', stagger: 0.05 });
        }
      });
    }

    if (reduced || !hasGSAP || !('IntersectionObserver' in window)) return;
    new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) {
        if (!timer) timer = setInterval(function () { i = (i + 1) % WORDS.length; show(i); }, 3200);
      } else if (timer) { clearInterval(timer); timer = null; }
    }, { threshold: 0 }).observe(phone || hz);
  })();

  /* ── Scroll choreography ───────────────────────────── */
  if (hasGSAP && window.ScrollTrigger && !reduced) {
    document.querySelectorAll('.sect__head, .cell, .about__portrait, .about__copy, .role, .contact__copy, .form')
      .forEach(function (el) { el.classList.add('reveal'); });

    ScrollTrigger.batch('.reveal', {
      start: 'top 92%',
      once: true,
      onEnter: function (batch) {
        gsap.fromTo(batch,
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.85, ease: 'expo.out', stagger: 0.07, overwrite: true });
      }
    });

    gsap.utils.toArray('.bars__seg').forEach(function (seg, i) {
      gsap.from(seg, {
        scaleX: 0, duration: 1, ease: 'expo.out', delay: i * 0.06,
        scrollTrigger: { trigger: '.bars', start: 'top 88%', once: true }
      });
    });

    // Hero settles as it leaves.
    gsap.to('.hero__inner', {
      y: -40, opacity: 0.35, ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'center center', end: 'bottom top', scrub: 0.5 }
    });

    // The one number counts up, then stays put.
    gsap.utils.toArray('[data-count]').forEach(function (el) {
      var target = parseFloat(el.getAttribute('data-count'));
      var pre = el.getAttribute('data-prefix') || '';
      var suf = el.getAttribute('data-suffix') || '';
      var o = { v: 0 };
      gsap.to(o, {
        v: target, duration: 1.8, ease: 'expo.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        onUpdate: function () { el.textContent = pre + Math.round(o.v).toLocaleString('en-AU') + suf; },
        onComplete: function () { el.textContent = pre + target.toLocaleString('en-AU') + suf; }
      });
    });

    // Hero entrance.
    gsap.from('.hero__avail', { opacity: 0, y: 14, duration: 0.7, ease: 'expo.out', delay: 0.1 });
    gsap.from('.hero__name', { opacity: 0, y: 26, duration: 1.1, ease: 'expo.out', delay: 0.16 });
    gsap.from('.hero__creed, .hero__role', { opacity: 0, y: 16, duration: 0.9, ease: 'expo.out', delay: 0.34, stagger: 0.08 });
    gsap.from('.hero__cue', { opacity: 0, duration: 0.8, ease: 'expo.out', delay: 0.6 });
  }

  /* ── Contact form ──────────────────────────────────
     No mail service is wired up yet. Rather than pretend to
     send, the form validates properly and says what it can do.
     To connect it: set ENDPOINT to a form service URL
     (Formspree, Basin, Netlify Forms). */
  (function () {
    var ENDPOINT = '';
    var form = document.getElementById('contact-form');
    if (!form) return;
    var status = form.querySelector('.form__status');
    var btn = form.querySelector('button[type="submit"]');
    var label = btn.querySelector('[data-btn-label]');

    function setErr(input, msg) {
      var field = input.closest('.field');
      var slot = form.querySelector('[data-err-for="' + input.id + '"]');
      if (msg) {
        field.setAttribute('data-invalid', '');
        input.setAttribute('aria-invalid', 'true');
        if (slot) slot.textContent = msg;
      } else {
        field.removeAttribute('data-invalid');
        input.removeAttribute('aria-invalid');
        if (slot) slot.textContent = '';
      }
      return !msg;
    }

    function validate() {
      var n = form.elements.name, e = form.elements.email, m = form.elements.message, ok = true;
      ok = setErr(n, n.value.trim() ? '' : 'Tell me who you are.') && ok;
      ok = setErr(e,
        !e.value.trim() ? 'An email address, so I can reply.'
          : (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.value.trim()) ? '' : 'That address is missing something.')
      ) && ok;
      ok = setErr(m, m.value.trim() ? '' : 'A line or two about what you have in mind.') && ok;
      return ok;
    }

    ['name', 'email', 'message'].forEach(function (k) {
      var el = form.elements[k];
      el.addEventListener('blur', function () { if (el.value.trim()) validate(); });
      el.addEventListener('input', function () {
        if (el.closest('.field').hasAttribute('data-invalid')) validate();
      });
    });

    function say(msg, tone) {
      status.textContent = msg;
      if (tone) status.setAttribute('data-tone', tone); else status.removeAttribute('data-tone');
    }

    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      if (!validate()) {
        say('Check the fields marked above.', 'err');
        var bad = form.querySelector('[data-invalid] input, [data-invalid] textarea');
        if (bad) bad.focus();
        return;
      }
      if (!ENDPOINT) {
        say('This form is not connected to a mail service yet — please reach me on LinkedIn.', 'err');
        return;
      }
      btn.disabled = true;
      label.textContent = btn.getAttribute('data-busy');
      say('');
      fetch(ENDPOINT, { method: 'POST', headers: { Accept: 'application/json' }, body: new FormData(form) })
        .then(function (res) {
          if (!res.ok) throw new Error('bad status');
          form.reset();
          say('Message sent. I will come back to you shortly.', 'ok');
        })
        .catch(function () { say('That did not send. Please try again, or reach me on LinkedIn.', 'err'); })
        .then(function () {
          btn.disabled = false;
          label.textContent = btn.getAttribute('data-idle');
        });
    });
  })();
})();
