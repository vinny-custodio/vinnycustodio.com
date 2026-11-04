/* Microsoft Clarity, cookieless mode. No advertising storage or persistent analytics consent. */
(() => {
  if (!['vinnycustodio.com','www.vinnycustodio.com','vinnycustodio-com.pages.dev'].includes(location.hostname)) return;
  window.clarity=window.clarity||function(){(window.clarity.q=window.clarity.q||[]).push(arguments)};
  window.clarity('consentv2',{analytics_Storage:'denied',ad_Storage:'denied'});
  const script=document.createElement('script');script.async=true;script.src='https://www.clarity.ms/tag/z8khxk1p5g';document.head.append(script);
})();
