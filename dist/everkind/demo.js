(() => {
  const app = document.querySelector('#app');
  const stage = document.querySelector('.demo-stage');
  const initialView = new URLSearchParams(location.search).get('view') || 'home';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let timers = [], voiceState = 'listening', currentPage = 0, entries = [[]], active = true, navigation = 0;
  const later = (fn, ms) => { const id = setTimeout(fn, ms); timers.push(id); return id; };
  const clearTimers = () => { timers.forEach(clearTimeout); timers = []; };
  const brand = '<span class="brand"><img src="../assets/everkind/mark.svg" alt=""><img src="../assets/everkind/wordmark.svg" alt="Everkind"></span>';
  const header = (left = 'home') => '<header class="app-header"><button type="button" data-action="' + left + '" aria-label="Back to home">‹</button>' + brand + '<button type="button" data-action="journal" aria-label="Open journal">＋</button></header>';
  const escape = text => text.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function toast(text) {
    app.querySelector('.demo-message')?.remove();
    const n = document.createElement('p'); n.className = 'demo-message'; n.setAttribute('role', 'status'); n.textContent = text; app.append(n); later(() => n.remove(), 2400);
  }
  function renderHome() {
    app.innerHTML = header() + '<div class="app-scroll" tabindex="0" aria-label="Scroll Everkind home"><div class="week"><span>mon</span><span>tue</span><span>wed</span><span class="today">thu</span><span>fri</span><span>sat</span><span>sun</span></div><h2><span class="green-dot"></span>Jump back in</h2><article class="reflection-card"><p>We are excited about the new safety features, she is an anxious driver so this encourages her to drive more and be free.</p><button type="button" class="reply-preview" data-action="resume">Hey there, want to pick up<br>where we left off?</button><div class="mini-compose"><button type="button" data-action="photo" aria-label="Add a photo">◎</button><button type="button" class="compose-link" data-action="journal">What’s on your mind?</button><button type="button" data-action="voice" aria-label="Start voice demo">◉</button></div></article><div class="section-title"><h2>Personalized meditations</h2><button type="button" class="text-button" data-action="meditations">See all</button></div><div class="meditations"><button class="meditation" type="button" data-action="meditation"><div class="meditation-art"><img src="../assets/everkind/meditation-pink.png" alt=""><span>New</span></div><strong>Peace</strong><small>13m · A moment for yourself</small></button><button class="meditation" type="button" data-action="meditation"><div class="meditation-art"><img src="../assets/everkind/meditation-purple.png" alt=""><span>New</span></div><strong>Calm</strong><small>13m · Find a little stillness</small></button></div><div class="section-title"><h2>Journals</h2><button class="text-button" type="button" data-action="journals">See all</button></div><button class="journal-link" type="button" data-action="resume"><strong>Selling wife’s car</strong><p>I sold my wife’s car today. It feels great, we found a sweet deal.</p><small>Nov 2nd 2025</small></button><button class="journal-link" type="button" data-action="journal"><strong>A little time for myself</strong><p>Taking a breath and noticing the small things.</p><small>Sample journal</small></button><div class="affirmation">I am worthy of rest, growth, and gentle progress, one moment at a time.</div></div><nav class="app-nav" aria-label="Everkind demo navigation"><button type="button" class="active" data-action="home"><span class="nav-icon">⌂</span>Home</button><button type="button" class="new-journal" data-action="journal" aria-label="Start a journal">＋</button><button type="button" data-action="profile"><span class="nav-icon">○</span>Profile</button></nav>';
  }
  function renderJournal() {
    const messages = entries[currentPage];
    app.innerHTML = '<section class="journal-view">' + header() + '<div class="paper-stack"><article class="paper"><div class="journal-date">My ' + (currentPage + 1) + (currentPage === 0 ? 'st' : currentPage === 1 ? 'nd' : currentPage === 2 ? 'rd' : 'th') + ' Journal</div><div class="conversation" role="log" aria-live="polite" aria-label="Scripted journal conversation">' + (messages.length ? messages.map(m => '<div class="bubble ' + m.type + '">' + escape(m.text) + '</div>').join('') : '<div class="journal-empty"><strong>Hey there! Ready to reflect?</strong><p>What’s top of mind? What feeling or thought is most present for you right now?</p></div>') + '</div></article></div><form class="journal-form"><button type="button" class="round-control" data-action="photo" aria-label="Add a photo">◎</button><input name="thought" aria-label="Write a thought" placeholder="How was your day?" maxlength="600" autocomplete="off"><button class="round-control send" type="submit" aria-label="Send thought">↑</button><button type="button" class="round-control" data-action="voice" aria-label="Open voice demo">◉</button></form><div class="journal-tools"><button type="button" data-action="previous" ' + (currentPage === 0 ? 'disabled' : '') + '>‹ Previous</button><span>Page ' + (currentPage + 1) + '</span><button type="button" data-action="next">New page ›</button><button type="button" data-action="summary">Done</button></div></section>';
    const log = app.querySelector('.conversation'); log.scrollTop = log.scrollHeight;
  }
  function flipPage(direction) {
    clearTimers();
    const version = navigation;
    const paper = app.querySelector('.paper');
    const finish = () => { currentPage = Math.max(0, currentPage + direction); entries[currentPage] ||= []; renderJournal(); const next = app.querySelector('.paper'); if (!reduced) next.animate([{transform:'translateX(26px) rotate(3deg) scale(.97)',opacity:.5},{transform:'none',opacity:1}], {duration:650,easing:'cubic-bezier(.2,.8,.2,1)'}); };
    if (reduced) return finish();
    app.querySelectorAll('.journal-tools button').forEach(b => b.disabled = true);
    const a = paper.animate([{transform:'none'},{transform:'translate(-65px,-8px) rotate(-7deg)',offset:.4},{transform:'translate(-130%,30px) rotate(-13deg)'}], {duration:720,easing:'cubic-bezier(.45,0,.2,1)',fill:'forwards'});
    a.finished.then(() => { if (version === navigation) finish(); }).catch(() => {});
  }
  function sendThought(form) {
    const input = form.elements.thought;
    const thought = input.value.trim(); if (!thought) return;
    const page = currentPage; entries[page].push({type:'person',text:thought}); renderJournal();
    const log = app.querySelector('.conversation'), typing = document.createElement('div'); typing.className = 'bubble companion typing'; typing.textContent = '•••'; typing.setAttribute('aria-label', 'Companion is preparing a scripted reply'); log.append(typing); log.scrollTop = log.scrollHeight;
    app.querySelector('.send').disabled = true;
    later(() => {
      const count = entries[page].filter(m => m.type === 'person').length;
      const replies = ['What part of that moment is staying with you? Take your time, there’s no right way to put it into words.', 'If you could make a little space for yourself today, what would that look like?', 'That feels like a good thought to keep. You can start another page or revisit this reflection whenever you like.'];
      entries[page].push({type:'companion',text:replies[(count - 1) % replies.length]});
      if (currentPage === page && app.querySelector('.journal-view')) { renderJournal(); app.querySelector('input').focus({preventScroll:true}); }
    }, 1000);
  }
  function renderVoice() {
    app.innerHTML = '<section class="voice-view" data-state="' + voiceState + '"><button type="button" class="voice-close" data-action="journal" aria-label="Close voice demo">×</button><p class="voice-state" role="status" aria-live="polite"></p><div class="voice-aura" aria-hidden="true"><img src="../assets/everkind/voice-gradient.png" alt=""></div><div class="voice-bottom"><p class="voice-caption"></p><div class="voice-controls"><button type="button" class="mic-control" data-action="mute" aria-label="Mute voice demo" aria-pressed="false"><img src="../assets/everkind/mic.svg" alt=""></button><button type="button" class="voice-advance" data-action="speak">Try a response</button></div></div></section>';
    updateVoice();
  }
  function updateVoice() {
    const v = app.querySelector('.voice-view'); if (!v) return;
    v.dataset.state = voiceState;
    v.querySelector('.voice-state').textContent = {idle:'everkind will listen whenever you’re ready',listening:'everkind is listening...',processing:'everkind is processing...',responding:'everkind is responding...'}[voiceState];
    v.querySelector('.voice-caption').textContent = {idle:'Your microphone is muted',listening:'Simulated voice session. Your microphone stays off.',processing:'A little moment to think.',responding:'“What would you like to make more space for today?”'}[voiceState];
    const mic = v.querySelector('.mic-control'); mic.setAttribute('aria-pressed', String(voiceState === 'idle')); mic.setAttribute('aria-label', voiceState === 'idle' ? 'Unmute simulated voice' : 'Mute simulated voice'); mic.style.opacity = voiceState === 'idle' ? '.5' : '1';
    v.querySelector('.voice-advance').disabled = voiceState === 'processing' || voiceState === 'responding';
  }
  function simulateVoice() {
    clearTimers(); voiceState = 'processing'; updateVoice();
    later(() => { voiceState = 'responding'; updateVoice(); later(() => {voiceState = 'listening'; updateVoice();}, 4000); }, 1600);
  }
  function renderSummary() {
    app.innerHTML = header('journal') + '<div class="app-scroll summary"><h2>Here’s what came up</h2><article class="reflection-card"><p>This is a sample reflection summary for the prototype, not an analysis of what you typed.</p><div class="chips"><span>Making space</span><span>Small moments</span><span>Reflection</span></div><h2>Something to keep</h2><p>A little time to notice how your day felt can be a starting point.</p><h2>A next step</h2><p>Make room for a small pause tomorrow.</p><button type="button" class="reply-preview" data-action="journal">Back to your journal</button></article></div>';
  }
  function navigate(view) {
    navigation++;
    clearTimers(); stage.dataset.view = view;
    document.querySelector('#demo-instruction').textContent = view === 'voice' ? 'Try the microphone and response controls.' : view === 'journal' ? 'Write a thought. Then turn the page.' : 'Scroll inside the phone. Try the controls.';
    if (view === 'voice') { voiceState = 'listening'; renderVoice(); }
    else if (view === 'journal') renderJournal();
    else if (view === 'summary') renderSummary();
    else renderHome();
  }
  app.addEventListener('submit', e => { if (e.target.matches('.journal-form')) { e.preventDefault(); sendThought(e.target); } });
  app.addEventListener('click', e => {
    const button = e.target.closest('[data-action]'); if (!button || button.disabled) return;
    const action = button.dataset.action;
    if (['home','journal','voice','summary'].includes(action)) navigate(action);
    else if (action === 'resume') { entries[0] ||= []; if (!entries[0].length) entries[0] = [{type:'person',text:'I sold my wife’s car today.'},{type:'companion',text:'What led you to make this decision? How are you feeling about selling it?'}]; currentPage = 0; navigate('journal'); }
    else if (action === 'next') flipPage(1);
    else if (action === 'previous') flipPage(-1);
    else if (action === 'mute') { clearTimers(); voiceState = voiceState === 'idle' ? 'listening' : 'idle'; updateVoice(); }
    else if (action === 'speak') simulateVoice();
    else if (action === 'photo') toast('Photo attachment is not included in this browser demo.');
    else if (action === 'profile') toast('Demo profile. Nothing is saved or sent.');
    else if (action === 'meditation') toast('Meditation preview only. No audio is playing.');
    else if (action === 'meditations') app.querySelector('.meditations').scrollIntoView({block:'start',behavior:reduced?'auto':'smooth'});
    else if (action === 'journals') app.querySelector('.journal-link').scrollIntoView({block:'center',behavior:reduced?'auto':'smooth'});
  });
  document.querySelector('#reset-demo').addEventListener('click', () => { entries = [[]]; currentPage = 0; navigate(initialView); });
  function resizeDevice() { const wrap = document.querySelector('.device-wrap'); document.querySelector('.device').style.transform = 'scale(' + wrap.clientHeight / 844 + ')'; }
  new ResizeObserver(resizeDevice).observe(document.querySelector('.device-wrap'));
  document.addEventListener('visibilitychange', () => { if (document.hidden) clearTimers(); if (!document.hidden && app.querySelector('.voice-view') && ['processing','responding'].includes(voiceState)) {voiceState = 'listening'; updateVoice();} });
  const visibility = new IntersectionObserver(([entry]) => {active = entry.isIntersecting; app.querySelectorAll('.voice-aura').forEach(n => n.style.animationPlayState = active ? 'running' : 'paused');}, {threshold:0});
  visibility.observe(document.body);
  navigate(initialView); resizeDevice();
})();
