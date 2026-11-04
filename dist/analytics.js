/* Microsoft Clarity: opt-in only; no tracking request before acceptance. */
(() => {
  if (!['vinnycustodio.com','www.vinnycustodio.com','vinnycustodio-com.pages.dev'].includes(location.hostname)) return;
  const key='portfolio-analytics-consent-v1';
  let loaded=false, choice;
  try { choice=localStorage.getItem(key); } catch {}
  const style=document.createElement('style');
  style.textContent='.analytics-consent{position:fixed;z-index:250;left:20px;bottom:20px;width:min(360px,calc(100vw - 40px));box-sizing:border-box;padding:20px;border-radius:24px;background:#fff;color:#25252b;border:1px solid #ddd;box-shadow:0 8px 32px #0001;font-family:inherit;font-size:14px;line-height:1.5}.analytics-consent p{margin:0 0 14px;font-family:inherit;font-size:14px;line-height:1.5}.analytics-consent a{color:inherit;text-decoration:underline}.analytics-consent div{display:flex;gap:8px}.analytics-consent button{border:0;border-radius:999px;padding:10px 18px;font:inherit;background:#eee;color:#25252b;cursor:pointer}.analytics-consent button[data-accept]{background:#25252b;color:#fff}.analytics-settings{font:inherit;color:inherit;background:none;border:0;padding:0;cursor:pointer;text-decoration:underline}html[data-theme=dark] .analytics-consent,.about-page .analytics-consent{background:#181818;color:#fff;border-color:#383838}@media(max-width:760px){.analytics-consent{bottom:110px}}';
  document.head.append(style);
  const panel=document.createElement('section');panel.className='analytics-consent';panel.setAttribute('aria-label','Analytics preferences');panel.hidden=true;
  panel.innerHTML='<p>I use Microsoft Clarity to understand visits through heatmaps and session recordings. Chat conversations are masked. <a href="https://privacy.microsoft.com/privacystatement" target="_blank" rel="noreferrer">Microsoft privacy</a></p><div><button type="button" data-accept>Accept analytics</button><button type="button" data-decline>Decline</button></div>';
  document.body.append(panel);
  function load(){
    if(loaded)return;loaded=true;
    window.clarity=window.clarity||function(){(window.clarity.q=window.clarity.q||[]).push(arguments)};
    window.clarity('consentv2',{analytics_Storage:'granted',ad_Storage:'denied'});
    const script=document.createElement('script');script.async=true;script.src='https://www.clarity.ms/tag/z8khxk1p5g';document.head.append(script);
  }
  function save(value){try{localStorage.setItem(key,value)}catch{}panel.hidden=true;if(value==='accepted')load();else if(loaded){window.clarity('consentv2',{analytics_Storage:'denied',ad_Storage:'denied'});window.clarity('stop');}}
  panel.querySelector('[data-accept]').addEventListener('click',()=>save('accepted'));
  panel.querySelector('[data-decline]').addEventListener('click',()=>save('declined'));
  function settings(){document.querySelectorAll('footer .footer-meta>div').forEach(footer=>{if(footer.querySelector('.analytics-settings'))return;const button=document.createElement('button');button.className='analytics-settings';button.type='button';button.textContent='Analytics preferences';button.addEventListener('click',()=>{panel.hidden=false;panel.querySelector('button').focus()});footer.append(button)});}
  settings();new MutationObserver(settings).observe(document.body,{childList:true,subtree:true});
  if(choice==='accepted')load();else if(choice!=='declined')panel.hidden=false;
})();
