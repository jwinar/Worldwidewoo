/* THE RACK — spring-pendulum simulation, cycling widget, ledger form. Seed 3caee2fd. */
(function () {
  'use strict';

  var reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ────────────────────────────────────────────────────
     Hanging tags

     Each tag is a damped pendulum with its own natural
     frequency: a real pendulum's period grows with its
     length, so a tag on a long cord swings slower than one
     on a short cord and the wall never moves in unison.

         a" = -k(a - rest) - d·a'

     The visitor's pointer is a force, not a trigger. Moving
     across the rack transfers horizontal velocity into
     nearby tags; scrolling knocks the whole rail. The loop
     sleeps when every tag has settled and wakes on the next
     disturbance, so an idle page costs nothing.
     ──────────────────────────────────────────────────── */
  (function () {
    var nodes = Array.prototype.slice.call(document.querySelectorAll('[data-tag]'));
    if (!nodes.length || reduced) return;

    var RADIUS = 380;      // px of pointer influence
    var PUSH   = 0.013;    // pointer velocity -> angular velocity
    var MAX_V  = 620;      // clamp so a fast flick cannot spin a tag
    var MAX_A  = 13;       // degrees off rest; past this a tag stops being readable
    var SLEEP  = 0.02;     // below this the tag is considered still

    var tags = nodes.map(function (el) {
      var drop = parseFloat(getComputedStyle(el).getPropertyValue('--drop')) || 80;
      var rest = parseFloat(getComputedStyle(el).getPropertyValue('--tilt')) || 0;
      var len  = drop + el.offsetHeight * 0.5;
      return {
        el: el,
        rest: rest,
        a: rest,
        v: 0,
        // omega^2 = g / L  — longer cord, slower swing
        k: 2600 / Math.max(len, 40),
        d: 1.35 + Math.min(len, 260) / 460,
        len: len,
        cx: 0, cy: 0
      };
    });

    function measure() {
      for (var i = 0; i < tags.length; i++) {
        var r = tags[i].el.getBoundingClientRect();
        tags[i].cx = r.left + r.width / 2;
        tags[i].cy = r.top + Math.min(r.height, tags[i].len);
      }
    }
    measure();
    addEventListener('resize', measure);
    addEventListener('scroll', measure, { passive: true });

    var running = false, last = 0;

    function wake() {
      if (running) return;
      running = true;
      last = performance.now();
      requestAnimationFrame(step);
    }

    function step(now) {
      var dt = Math.min((now - last) / 1000, 0.032);
      last = now;
      var moving = false;

      for (var i = 0; i < tags.length; i++) {
        var t = tags[i];
        var off = t.a - t.rest;
        t.v += (-t.k * off - t.d * t.v) * dt;
        if (t.v > MAX_V) t.v = MAX_V; else if (t.v < -MAX_V) t.v = -MAX_V;
        t.a += t.v * dt;

        // Hitting the limit bleeds the swing rather than stopping it dead.
        var lim = t.rest + MAX_A, lo = t.rest - MAX_A;
        if (t.a > lim) { t.a = lim; t.v *= -0.35; }
        else if (t.a < lo) { t.a = lo; t.v *= -0.35; }

        if (Math.abs(t.v) > SLEEP || Math.abs(t.a - t.rest) > SLEEP) moving = true;
        else { t.a = t.rest; t.v = 0; }

        t.el.style.transform = 'rotate(' + t.a.toFixed(3) + 'deg)';
      }

      if (moving) requestAnimationFrame(step);
      else running = false;
    }

    function disturb(x, y, vx) {
      for (var i = 0; i < tags.length; i++) {
        var t = tags[i];
        var dx = x - t.cx, dy = y - t.cy;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > RADIUS) continue;
        var falloff = 1 - dist / RADIUS;
        // Short tags are lighter, so the same shove moves them further.
        t.v += vx * PUSH * falloff * falloff * (140 / t.len);
      }
      wake();
    }

    var px = 0, py = 0, pt = 0, primed = false;
    addEventListener('pointermove', function (e) {
      var now = performance.now();
      if (primed) {
        var dt = now - pt;
        if (dt > 0 && dt < 120) disturb(e.clientX, e.clientY, (e.clientX - px) / dt * 1000);
      }
      px = e.clientX; py = e.clientY; pt = now; primed = true;
    }, { passive: true });

    // A tap is a shove too, so touch is not left out.
    addEventListener('pointerdown', function (e) {
      disturb(e.clientX, e.clientY, (Math.random() - 0.5) * 900);
    }, { passive: true });

    // Scrolling knocks the whole rail.
    var lastY = scrollY;
    addEventListener('scroll', function () {
      var dy = scrollY - lastY;
      lastY = scrollY;
      if (Math.abs(dy) < 1) return;
      var kick = Math.max(-26, Math.min(26, dy)) * 1.7;
      for (var i = 0; i < tags.length; i++) tags[i].v += kick * (140 / tags[i].len);
      wake();
    }, { passive: true });

    // They arrive swinging rather than fading in.
    tags.forEach(function (t, i) {
      t.a = t.rest + (i % 2 ? 7 : -7) - i * 0.6;
      t.v = (i % 2 ? -30 : 34);
    });
    wake();
  })();

  /* ── The role on the name tag ─────────────────────── */
  (function () {
    var el = document.getElementById('role');
    if (!el) return;
    var WORDS = ['Operator', 'Analyst', 'Builder', 'Value investor'];
    var i = 0;
    el.textContent = WORDS[0];
    if (reduced) return;

    el.style.transition = 'opacity .28s ease, transform .28s ease';
    setInterval(function () {
      el.style.opacity = '0';
      el.style.transform = 'translateY(-4px)';
      setTimeout(function () {
        i = (i + 1) % WORDS.length;
        el.textContent = WORDS[i];
        el.style.transform = 'translateY(4px)';
        requestAnimationFrame(function () {
          el.style.opacity = '1';
          el.style.transform = 'none';
        });
      }, 280);
    }, 3000);
  })();

  /* ── The widget, running ──────────────────────────── */
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
    if (!hz || reduced) return;
    var host = hz.closest('.glass') || hz;
    var i = 0, timer = null;

    [hz, py, en].forEach(function (n) { n.style.transition = 'opacity .3s ease'; });

    function show() {
      i = (i + 1) % WORDS.length;
      var w = WORDS[i];
      [hz, py, en].forEach(function (n) { n.style.opacity = '0'; });
      setTimeout(function () {
        hz.textContent = w.hz; py.textContent = w.py; en.textContent = w.en;
        [hz, py, en].forEach(function (n) { n.style.opacity = '1'; });
      }, 300);
    }

    if (!('IntersectionObserver' in window)) return;
    new IntersectionObserver(function (es) {
      if (es[0].isIntersecting) { if (!timer) timer = setInterval(show, 3200); }
      else if (timer) { clearInterval(timer); timer = null; }
    }, { threshold: 0 }).observe(host);
  })();

  /* ── Reveals ──────────────────────────────────────── */
  (function () {
    if (reduced || !('IntersectionObserver' in window)) return;
    var els = document.querySelectorAll('.sect__h, .sect__note, .key, .reg__row, .about__pic, .about__copy, .sign__copy, .ledger');
    if (!els.length) return;
    els.forEach(function (el) { el.classList.add('lift'); });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e, n) {
        if (!e.isIntersecting) return;
        var el = e.target;
        setTimeout(function () { el.classList.add('is-in'); }, n * 45);
        io.unobserve(el);
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    els.forEach(function (el) { io.observe(el); });
  })();

  /* ── Sign the register ────────────────────────────
     No mail service is wired up yet. Rather than pretend to
     send, the form validates properly and says what it can
     do. To connect it: set ENDPOINT to a form service URL
     (Formspree, Basin, Netlify Forms).
     ────────────────────────────────────────────────── */
  (function () {
    var ENDPOINT = '';
    var form = document.getElementById('contact-form');
    if (!form) return;
    var status = form.querySelector('.ledger__status');
    var btn = form.querySelector('button[type="submit"]');
    var label = btn.querySelector('[data-btn-label]');

    function setErr(input, msg) {
      var line = input.closest('.ledger__line');
      var slot = form.querySelector('[data-err-for="' + input.id + '"]');
      if (msg) {
        line.setAttribute('data-invalid', '');
        input.setAttribute('aria-invalid', 'true');
        if (slot) slot.textContent = msg;
      } else {
        line.removeAttribute('data-invalid');
        input.removeAttribute('aria-invalid');
        if (slot) slot.textContent = '';
      }
      return !msg;
    }

    function validate() {
      var n = form.elements.name, e = form.elements.email, m = form.elements.message, ok = true;
      ok = setErr(n, n.value.trim() ? '' : 'A name for the register.') && ok;
      ok = setErr(e,
        !e.value.trim() ? 'An email, so I can come back to you.'
          : (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.value.trim()) ? '' : 'That address is missing something.')
      ) && ok;
      ok = setErr(m, m.value.trim() ? '' : 'A line or two about what you have in mind.') && ok;
      return ok;
    }

    ['name', 'email', 'message'].forEach(function (k) {
      var el = form.elements[k];
      el.addEventListener('blur', function () { if (el.value.trim()) validate(); });
      el.addEventListener('input', function () {
        if (el.closest('.ledger__line').hasAttribute('data-invalid')) validate();
      });
    });

    function say(msg, tone) {
      status.textContent = msg;
      if (tone) status.setAttribute('data-tone', tone); else status.removeAttribute('data-tone');
    }

    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      if (!validate()) {
        say('Check the lines marked above.', 'err');
        var bad = form.querySelector('[data-invalid] input, [data-invalid] textarea');
        if (bad) bad.focus();
        return;
      }
      if (!ENDPOINT) {
        say('The register is not connected to a mail service yet — please reach me on LinkedIn.', 'err');
        return;
      }
      btn.disabled = true;
      label.textContent = btn.getAttribute('data-busy');
      say('');
      fetch(ENDPOINT, { method: 'POST', headers: { Accept: 'application/json' }, body: new FormData(form) })
        .then(function (res) {
          if (!res.ok) throw new Error('bad status');
          form.reset();
          say('Signed in. I will come back to you shortly.', 'ok');
        })
        .catch(function () { say('That did not send. Please try again, or reach me on LinkedIn.', 'err'); })
        .then(function () {
          btn.disabled = false;
          label.textContent = btn.getAttribute('data-idle');
        });
    });
  })();
})();
