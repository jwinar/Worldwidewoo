/* IN TRANSIT — split-flap board behaviour. Seed 79b4e05a. */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasGSAP = typeof window.gsap !== 'undefined';
  if (reduced) document.documentElement.classList.add('no-motion');
  if (hasGSAP && window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

  /* ────────────────────────────────────────────────
     Split-flap
     Each character position churns through a glyph
     set and lands on its target, the way a Solari
     board settles one flap at a time.
     ──────────────────────────────────────────────── */

  var LATIN = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-·';
  var LOWER = 'abcdefghijklmnopqrstuvwxyzǎàáīíìǐūúǔ';
  var HANZI = '雅你好谢学习耐心复利';

  function charsetFor(str) {
    if (/[一-鿿]/.test(str)) return HANZI;
    return /[a-z]/.test(str) ? LOWER : LATIN;
  }

  /* Loops only run while their element is on screen. */
  function whileVisible(el, ms, fn) {
    var id = null;
    function start() { if (id === null) id = setInterval(fn, ms); }
    function stop() { if (id !== null) { clearInterval(id); id = null; } }
    if (!('IntersectionObserver' in window)) { start(); return; }
    new IntersectionObserver(function (entries) {
      entries[0].isIntersecting ? start() : stop();
    }, { threshold: 0 }).observe(el);
  }

  function build(el, text) {
    el.textContent = '';
    /* Assistive tech gets the whole word; the per-character cells are
       presentation only, or a screen reader spells the name out. */
    el.setAttribute('aria-label', text);
    el.setAttribute('role', 'text');
    var cells = [];
    for (var i = 0; i < text.length; i++) {
      var c = document.createElement('span');
      c.className = 'flap__c';
      c.setAttribute('aria-hidden', 'true');
      if (text[i] === ' ') {
        c.setAttribute('data-space', '');
        c.textContent = ' ';
      } else {
        c.textContent = text[i];
      }
      el.appendChild(c);
      cells.push(c);
    }
    return cells;
  }

  /* Animate an existing set of cells to `text`. Cells are rebuilt when the
     length changes, so cycling words of different lengths stays correct. */
  function flapTo(el, text, opts) {
    opts = opts || {};
    var cells = el.__cells;
    if (!cells || cells.length !== text.length) {
      cells = el.__cells = build(el, text);
      if (reduced || !hasGSAP) return;
    } else {
      el.setAttribute('aria-label', text);
    }

    if (reduced || !hasGSAP) {
      for (var n = 0; n < cells.length; n++) {
        cells[n].textContent = text[n] === ' ' ? ' ' : text[n];
      }
      return;
    }

    var set = charsetFor(text);
    var stagger = opts.stagger != null ? opts.stagger : 0.045;
    var dur = opts.duration != null ? opts.duration : 0.62;
    var tiled = el.hasAttribute('data-tiles');

    cells.forEach(function (cell, i) {
      var target = text[i];
      if (target === ' ') {
        cell.setAttribute('data-space', '');
        cell.textContent = ' ';
        return;
      }
      cell.removeAttribute('data-space');

      var steps = 6 + Math.floor(Math.random() * 7);
      var state = { k: 0 };
      var off = Math.floor(Math.random() * set.length);
      var last = -1;

      gsap.killTweensOf(state);
      gsap.to(state, {
        k: steps,
        duration: dur,
        delay: i * stagger,
        ease: 'power3.out',
        onUpdate: function () {
          var k = Math.floor(state.k);
          if (k === last) return;
          last = k;
          cell.textContent = k >= steps ? target : set[(off + k * 5) % set.length];
          if (tiled) {
            gsap.fromTo(cell, { scaleY: 0.62, y: '-6%' },
              { scaleY: 1, y: '0%', duration: 0.13, ease: 'power2.out', overwrite: 'auto' });
          }
        },
        onComplete: function () { cell.textContent = target; }
      });
    });
  }

  /* Static flaps — fire once when scrolled into view. */
  document.querySelectorAll('.flap[data-flap]').forEach(function (el) {
    if (el.closest('.hero__name')) return; // the hero flaps on load, not on scroll
    var text = el.getAttribute('data-flap');
    build(el, text);
    if (reduced || !hasGSAP || !window.ScrollTrigger) return;

    // Start blank-ish so the settle is visible, then flap on entry.
    var fired = false;
    ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      once: true,
      onEnter: function () {
        if (fired) return;
        fired = true;
        flapTo(el, text, { stagger: el.hasAttribute('data-tiles') ? 0.05 : 0.028 });
      }
    });
  });

  /* Hero role line — cycles through the four hats. */
  (function () {
    var el = document.querySelector('[data-flap-cycle]');
    if (!el) return;
    var words;
    try { words = JSON.parse(el.getAttribute('data-flap-cycle')); }
    catch (e) { return; }
    if (!words || !words.length) return;

    build(el, words[0]);
    if (reduced || !hasGSAP) return;

    var i = 0;
    flapTo(el, words[0], { stagger: 0.03 });
    whileVisible(el, 3400, function () {
      i = (i + 1) % words.length;
      flapTo(el, words[i], { stagger: 0.03 });
    });
  })();

  /* Hanzi Mind widget — the product's own mechanism, running. */
  (function () {
    var WORDS = [
      { hz: '你好', py: 'nǐ hǎo',  en: 'hello' },
      { hz: '谢谢', py: 'xiè xie', en: 'thank you' },
      { hz: '学习', py: 'xué xí',  en: 'to study' },
      { hz: '耐心', py: 'nài xīn', en: 'patience' },
      { hz: '复利', py: 'fù lì',   en: 'compound interest' }
    ];
    var slots = {
      hz: document.querySelector('[data-flap-words="hz"]'),
      py: document.querySelector('[data-flap-words="py"]'),
      en: document.querySelector('[data-flap-words="en"]')
    };
    if (!slots.hz) return;

    var i = 0;
    function show(n) {
      var w = WORDS[n];
      flapTo(slots.hz, w.hz, { stagger: 0.07, duration: 0.5 });
      flapTo(slots.py, w.py, { stagger: 0.022, duration: 0.45 });
      flapTo(slots.en, w.en, { stagger: 0.018, duration: 0.45 });
    }
    show(0);
    if (reduced || !hasGSAP) return;
    whileVisible(slots.hz.closest('.phone') || slots.hz, 3800, function () {
      i = (i + 1) % WORDS.length;
      show(i);
    });
  })();

  /* Sydney clock — a board always tells you the time. */
  (function () {
    var el = document.getElementById('clock');
    if (!el) return;
    var fmt;
    try {
      fmt = new Intl.DateTimeFormat('en-AU', {
        timeZone: 'Australia/Sydney', hour: '2-digit', minute: '2-digit',
        second: '2-digit', hour12: false
      });
    } catch (e) {
      fmt = new Intl.DateTimeFormat('en-AU', {
        hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
      });
    }
    function tick() { el.textContent = fmt.format(new Date()); }
    tick();
    setInterval(tick, 1000);
  })();

  /* Scroll reveals + the stack bar drawing itself. */
  if (hasGSAP && window.ScrollTrigger && !reduced) {
    var revealSel = [
      '.sect__lede', '.board__head', '.board__detail', '.board__status',
      '.build__body', '.build__meta', '.build__sub', '.phone',
      '.stack__h', '.stack__key', '.stack__note',
      '.record__row', '.creds__item', '.contact__copy', '.form'
    ].join(',');

    document.querySelectorAll(revealSel).forEach(function (el) {
      el.classList.add('reveal');
    });

    ScrollTrigger.batch('.reveal', {
      start: 'top 90%',
      once: true,
      onEnter: function (batch) {
        gsap.fromTo(batch, { opacity: 0, y: 12 }, {
          opacity: 1, y: 0, duration: 0.7, ease: 'expo.out',
          stagger: 0.06, overwrite: true,
          onStart: function () { batch.forEach(function (b) { b.classList.add('is-in'); }); }
        });
      }
    });

    gsap.utils.toArray('.stack__seg').forEach(function (seg, i) {
      gsap.from(seg, {
        scaleX: 0, duration: 0.9, ease: 'expo.out', delay: i * 0.07,
        scrollTrigger: { trigger: '.stack__bar', start: 'top 85%', once: true }
      });
    });

    // The hero board settles as you leave it.
    gsap.to('.hero__board', {
      y: -18, ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.4 }
    });
  }

  /* Hero name — flaps in on load rather than on scroll. */
  window.addEventListener('load', function () {
    document.querySelectorAll('.hero__name .flap').forEach(function (el, i) {
      var text = el.getAttribute('data-flap');
      if (reduced || !hasGSAP) { build(el, text); return; }
      gsap.delayedCall(0.12 + i * 0.22, function () {
        flapTo(el, text, { stagger: 0.05, duration: 0.75 });
      });
    });
  });

  /* ────────────────────────────────────────────────
     Contact form
     No mail service is wired up yet. Rather than
     pretend to send, the form validates properly and
     then says exactly what it can and cannot do.
     To connect it: set ENDPOINT to a form service URL
     (Formspree, Basin, Netlify Forms) and the POST
     path below takes over.
     ──────────────────────────────────────────────── */
  (function () {
    var ENDPOINT = '';
    var form = document.getElementById('contact-form');
    if (!form) return;

    var status = form.querySelector('.form__status');
    var btn = form.querySelector('button[type="submit"]');

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
      var name = form.elements.name;
      var email = form.elements.email;
      var msg = form.elements.message;
      var ok = true;

      ok = setErr(name, name.value.trim() ? '' : 'Tell me who you are.') && ok;
      ok = setErr(email,
        !email.value.trim() ? 'An email address, so I can reply.'
          : (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim()) ? '' : 'That address is missing something.')
      ) && ok;
      ok = setErr(msg, msg.value.trim() ? '' : 'A line or two about what you have in mind.') && ok;
      return ok;
    }

    ['name', 'email', 'message'].forEach(function (n) {
      var el = form.elements[n];
      el.addEventListener('blur', function () { if (el.value.trim()) validate(); });
      el.addEventListener('input', function () {
        if (el.closest('.field').hasAttribute('data-invalid')) validate();
      });
    });

    function say(msg, tone) {
      status.textContent = msg;
      if (tone) status.setAttribute('data-tone', tone);
      else status.removeAttribute('data-tone');
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
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

      var label = btn.querySelector('[data-btn-label]');
      btn.disabled = true;
      label.textContent = btn.getAttribute('data-busy');
      say('');

      fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(form)
      }).then(function (res) {
        if (!res.ok) throw new Error('bad status');
        form.reset();
        say('Message sent. I will come back to you shortly.', 'ok');
      }).catch(function () {
        say('That did not send. Please try again, or reach me on LinkedIn.', 'err');
      }).then(function () {
        btn.disabled = false;
        label.textContent = btn.getAttribute('data-idle');
      });
    });
  })();
})();
