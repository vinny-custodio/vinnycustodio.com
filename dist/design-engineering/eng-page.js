(() => {
 const drawer=new URLSearchParams(location.search).has('drawer');
 if(drawer){document.body.classList.add('is-drawer-view');parent.postMessage({type:'case-drawer-title',title:document.querySelector('h1')?.textContent},location.origin)}
 const sync=()=>document.querySelectorAll('.eng-demo').forEach(frame=>{try{frame.contentDocument.documentElement.dataset.theme=document.documentElement.dataset.theme||'light'}catch{}});
 document.querySelectorAll('.eng-demo').forEach(frame=>frame.addEventListener('load',sync));new MutationObserver(sync).observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']});
})();
