(() => {
  const app = document.querySelector('#app'), stage = document.querySelector('.demo-stage');
  const initial = new URLSearchParams(location.search).get('view') || 'home';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let entries = [[]], page = 0, state = 'listening', timers = [], generation = 0, busy = false;
  const img = (name, className = '') => '<img class="' + className + '" src="../assets/everkind/' + name + '" alt="">';
  const escape = text => text.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const stop = () => { timers.forEach(clearTimeout); timers = []; busy = false; };
  const later = (fn, ms) => timers.push(setTimeout(fn, ms));
  function notice() {}
  const brand = '<span class="brand">' + img('mark.svg') + img('wordmark.svg') + '<span class="sr-only">Everkind</span></span>';
  const header = () => '<header class="app-header"><button type="button" data-action="home" aria-label="Return to Home">' + img('menu.svg') + '</button>' + brand + '<button type="button" data-action="next" aria-label="New journal">' + img('edit.svg') + '</button></header>';
  const composer = (home = false) => home
    ? '<div class="mini-compose"><button class="round-control" type="button" data-action="photo" aria-label="Add photo">' + img('camera.svg') + '</button><button class="compose-link" type="button" data-action="journal">What’s on your mind?</button><button class="round-control" type="button" data-action="voice" aria-label="Open voice">' + img('voice.svg') + '</button></div>'
    : '<form class="journal-form"><button type="button" class="round-control" data-action="photo" aria-label="Add photo">' + img('camera.svg') + '</button><input name="thought" aria-label="Write a thought" placeholder="How was your day?" maxlength="600" autocomplete="off"><button class="round-control composer-action" type="button" data-action="voice" aria-label="Open voice">' + img('voice.svg') + '</button></form>';
  const journalLink = (title, copy, date) => '<button class="journal-link" type="button" data-action="resume"><strong>' + title + '</strong><p>' + copy + '</p><small>' + date + '</small></button>';
  function home() {
    app.innerHTML = '<div class="app-scroll home-scroll" tabindex="0" aria-label="Scroll Everkind home"><header class="home-header"><span class="home-brand">' + img('home-wordmark.svg') + img('home-mark.svg') + '<span class="sr-only">Everkind</span></span><div class="week"><span>mon</span><span>tue</span><span>wed</span><span class="today">thu</span><span>fri</span><span>sat</span><span>sun</span></div></header><div class="home-body"><h2><span class="green-dot"></span>Jump back in</h2><article class="reflection-card"><p>We are excited about the new safety features, she is an anxious driver so this encourages her to drive more and be free.</p><button type="button" class="reply-preview" data-action="resume">Hey there, want to pick up<br>where we left off?</button>' + composer(true) + '</article><section class="meditation-section"><div class="section-title"><h2>Personalized meditations</h2><button type="button" class="text-button" data-action="meditations">See all</button></div><div class="meditations"><article class="meditation"><button class="meditation-art" type="button" data-action="meditation" aria-label="Preview Peace meditation">' + img('peace.png') + '<span>New</span></button><div class="meditation-title"><strong>Peace</strong><button type="button" data-action="meditation-options" aria-label="Peace meditation options">' + img('more.svg') + '</button></div><div class="meditation-meta"><span>13m</span><button type="button" data-action="meditation" aria-label="Play Peace meditation">' + img('play.svg') + '</button></div></article><article class="meditation"><button class="meditation-art" type="button" data-action="meditation" aria-label="Preview Calm meditation">' + img('calm.png') + '</button><div class="meditation-title"><strong>Calm</strong></div><div class="meditation-meta"><span>13m</span><button type="button" data-action="meditation" aria-label="Play Calm meditation">' + img('play.svg') + '</button></div></article></div></section><div class="affirmation">' + img('sun.svg') + '<small>daily affirmation</small><p>I am worthy of rest, growth, and gentle progress, one moment at a time.</p></div><section class="journals-section"><div class="section-title"><h2>Journals</h2><button class="text-button" type="button" data-action="journals">See all</button></div>' + journalLink('Selling wife’s car','I sold my wife’s car today. It feels great, we found a sweet deal and ended up getting a new car right away.','Nov 2nd 2025') + journalLink('Doom Scrolling','Lately, I’ve found myself spending hours scrolling through negative news and social media updates. It leaves me feeling drained, anxious, and disconnected from reality.','March 24, 2025 @ 1:40 pm') + '</section></div></div><nav class="app-nav" aria-label="Everkind demo navigation"><button type="button" class="active" data-action="home">' + img('home.svg') + '<span>home</span></button><button type="button" class="new-journal" data-action="journal" aria-label="Start a journal">' + img('chat-plus.svg') + '</button><button type="button" data-action="profile">' + img('profile.svg') + '<span>Profile</span></button></nav>';
  }
  function journal() {
    app.innerHTML = '<section class="journal-view">' + header() + '<div class="paper-stack"><article class="paper"><div class="conversation" role="log" aria-live="polite" aria-label="Scripted journal conversation">' + (entries[page].length ? entries[page].map(m => '<div class="bubble ' + m.type + '">' + escape(m.text) + '</div>').join('') : '<div class="journal-empty">' + img('chat-empty.svg') + '<strong>Hey there! ready to reflect?</strong><p>What’s top of mind? What feeling or thought is most present for you right now?</p></div>') + '</div></article></div>' + composer() + '</section>';
    const log = app.querySelector('.conversation'); log.scrollTop = log.scrollHeight;
  }
  function flip(delta) {
    if (busy) return; stop(); const version = generation; busy = true;
    const finish = () => { if (version !== generation) return; page = Math.max(0, page + delta); entries[page] ||= []; busy = false; journal(); if (!reduced) app.querySelector('.paper').animate([{transform:'translateX(24px) rotate(2deg)'},{transform:'none'}],{duration:650,easing:'cubic-bezier(.2,.8,.2,1)'}); };
    if (reduced) return finish();
    app.querySelector('.paper').animate([{transform:'none'},{transform:'translate(-60px,-6px) rotate(-7deg)',offset:.45},{transform:'translate(-125%,22px) rotate(-12deg)'}],{duration:800,easing:'cubic-bezier(.45,0,.2,1)',fill:'forwards'}).finished.then(finish).catch(() => {});
  }
  function updateComposer() {
    const form = app.querySelector('.journal-form'); if (!form) return;
    const button = form.querySelector('.composer-action'), hasText = !!form.elements.thought.value.trim();
    button.innerHTML = img(hasText ? 'send.svg' : 'voice.svg'); button.type = hasText ? 'submit' : 'button'; button.dataset.action = hasText ? 'send' : 'voice'; button.setAttribute('aria-label', hasText ? 'Send thought' : 'Open voice');
  }
  function send(form) {
    if (busy || !form.elements.thought.value.trim()) return;
    const current = page, version = generation;
    busy = true;
    entries[current] = [];
    const script = [
      {type:'person',text:'I sold my wife’s car today.'},
      {type:'companion',text:'What led you to make this decision? How are you feeling about selling it?'},
      {type:'person',text:'It feels great, we found a sweet deal and ended up getting a new car right away.'},
      {type:'person',text:'We are excited about the new safety features, she is an anxious driver so this encourages her to drive more and be free.'}
    ];
    function renderStep(index) {
      if (version !== generation || current !== page || stage.dataset.view !== 'journal') return;
      journal();
      const input = app.querySelector('input');
      input.readOnly = true;
      input.value = '';
      if (index === script.length) { busy = false; input.readOnly = false; return; }
      const message = script[index];
      const log = app.querySelector('.conversation');
      const typing = document.createElement('div');
      typing.className = 'bubble typing' + (message.type === 'companion' ? ' companion' : '');
      typing.setAttribute('aria-label', message.type === 'companion' ? 'Companion is typing' : 'Sample journal entry is typing');
      typing.textContent = '•••';
      log.append(typing); log.scrollTop = log.scrollHeight;
      later(() => {
        if (version !== generation) return;
        entries[current].push(message);
        journal();
        app.querySelector('input').readOnly = true;
        const bubble = app.querySelector('.conversation').lastElementChild;
        if (!reduced) bubble.animate([{opacity:0,transform:'translateY(10px)'},{opacity:1,transform:'none'}],{duration:450,easing:'cubic-bezier(.2,.8,.2,1)'});
        later(() => renderStep(index + 1), 1000);
      }, index === 0 ? 500 : message.type === 'companion' ? 1300 : 1600);
    }
    renderStep(0);
  }
  function voice() {
    app.innerHTML = '<section class="voice-view" data-state="' + state + '"><button type="button" class="voice-close" data-action="journal" aria-label="Close voice">' + img('close.svg') + '</button><p class="voice-state" role="status" aria-live="polite"></p><div class="voice-aura" aria-hidden="true">' + img('voice-gradient.png') + '</div><p class="voice-caption"></p><button type="button" class="mic-control" data-action="mute" aria-label="Mute simulated voice" aria-pressed="false"></button></section>';
    updateVoice();
    cycleVoice();
  }
  function updateVoice() {
    const v = app.querySelector('.voice-view'); if (!v) return; v.dataset.state = state;
    v.querySelector('.voice-state').textContent = {idle:'everkind will listen whenever you’re ready',listening:'everkind is listening...',processing:'everkind is processing...',responding:'everkind is responding...'}[state];
    v.querySelector('.voice-caption').textContent = state === 'idle' ? 'Your microphone is muted' : '';
    const mic = v.querySelector('.mic-control'); mic.innerHTML = img(state === 'idle' ? 'mic-muted.svg' : 'mic.svg'); mic.setAttribute('aria-pressed', String(state === 'idle')); mic.setAttribute('aria-label',state === 'idle' ? 'Unmute simulated voice' : 'Mute simulated voice');
  }
  function cycleVoice() {
    later(() => {
      if (stage.dataset.view !== 'voice' || state === 'idle') return;
      state = 'processing'; updateVoice();
      later(() => {
        if (stage.dataset.view !== 'voice' || state === 'idle') return;
        state = 'responding'; updateVoice();
        later(() => {
          if (stage.dataset.view !== 'voice' || state === 'idle') return;
          state = 'listening'; updateVoice(); cycleVoice();
        }, 3600);
      }, 1400);
    }, 4200);
  }
  function navigate(view) {
    const old = app.firstElementChild?.cloneNode(true);
    const oldNav = app.querySelector('.app-nav')?.cloneNode(true);
    const previousBackground = getComputedStyle(app).background;
    const previousView = stage.dataset.view;
    generation++; stop(); stage.dataset.view = view;
    if (view === 'voice') {state = 'listening'; voice();} else if (view === 'journal') journal(); else home();
    if (!reduced && old && previousView !== view) {
      const outgoing = document.createElement('div');
      outgoing.className = 'screen-outgoing';
      outgoing.inert = true;
      outgoing.setAttribute('aria-hidden', 'true');
      outgoing.append(old);
      if (oldNav) outgoing.append(oldNav);
      outgoing.style.background = previousBackground;
      const scrollBefore = old.querySelector('.conversation');
      if (scrollBefore) scrollBefore.scrollTop = scrollBefore.scrollHeight;
      app.append(outgoing);
      const backwards = view === 'home' || (previousView === 'voice' && view === 'journal');
      const direction = backwards ? -1 : 1;
      const incoming = app.firstElementChild;
      incoming.style.zIndex = '3';
      if (view === 'journal') incoming.style.background = getComputedStyle(app).background;
      incoming.animate([
        {transform:'translateX(' + (direction * 100) + '%)'},
        {transform:'translateX(0)'}
      ], {duration:680,easing:'cubic-bezier(.22,.8,.2,1)'});
      app.querySelector(':scope > .app-nav')?.animate([
        {transform:'translateX(' + (direction * 100) + '%)'},
        {transform:'translateX(0)'}
      ], {duration:680,easing:'cubic-bezier(.22,.8,.2,1)'});
      outgoing.animate([
        {transform:'translateX(0) scale(1)'},
        {transform:'translateX(' + (-direction * 20) + '%) scale(.97)'}
      ], {duration:680,easing:'cubic-bezier(.22,.8,.2,1)',fill:'forwards'}).finished.then(() => outgoing.remove()).catch(() => outgoing.remove());
    }
  }
  function action(event) {
    const b = event.target.closest('[data-action]'); if (!b || b.disabled) return; const a = b.dataset.action;
    if (['home','journal','voice'].includes(a)) navigate(a);
    else if (a === 'resume') {page = 0; entries[0] = [{type:'person',text:'I sold my wife’s car today.'},{type:'companion',text:'What led you to make this decision? How are you feeling about selling it?'},{type:'person',text:'It feels great, we found a sweet deal and ended up getting a new car right away.'}]; navigate('journal');}
    else if (a === 'next') { if (stage.dataset.view !== 'journal') navigate('journal'); else flip(1); }
    else if (a === 'previous') flip(-1);
    else if (a === 'mute') {stop(); state = state === 'idle' ? 'listening' : 'idle'; updateVoice(); if (state === 'listening') cycleVoice();}
    else if (a === 'speak') {stop(); state = 'processing'; updateVoice(); later(() => {state = 'responding'; updateVoice(); later(() => {state = 'listening'; updateVoice();},4000);},1600);}
    else if (a === 'send') return;
    else if (a === 'meditations') app.querySelector('.meditations').scrollIntoView({block:'center',behavior:reduced?'auto':'smooth'});
    else if (a === 'journals') app.querySelector('.journals-section').scrollIntoView({block:'start',behavior:reduced?'auto':'smooth'});
    else notice({photo:'Photo upload is outside this prototype.',profile:'Profile is outside this prototype.',meditation:'Meditation playback is outside this prototype. No audio is playing.','meditation-options':'Meditation options are outside this prototype.'}[a] || '');
  }
  app.addEventListener('click',action);
  app.addEventListener('input', e => {if(e.target.name === 'thought') send(e.target.form);});
  app.addEventListener('submit',e => {e.preventDefault(); send(e.target);});
  document.querySelector('#reset-demo').addEventListener('click',() => {entries=[[]];page=0;navigate(initial);});
  const resize = () => {document.querySelector('.device').style.transform = 'scale(' + document.querySelector('.device-wrap').clientHeight/864 + ')';};
  new ResizeObserver(resize).observe(document.querySelector('.device-wrap'));
  document.addEventListener('visibilitychange',() => {if(document.hidden){stop();if(['processing','responding'].includes(state)){state='listening';updateVoice();}}});
  new IntersectionObserver(([entry]) => app.querySelectorAll('.voice-aura').forEach(n => n.style.animationPlayState=entry.isIntersecting?'running':'paused')).observe(document.body);
  navigate(initial); resize();
})();
