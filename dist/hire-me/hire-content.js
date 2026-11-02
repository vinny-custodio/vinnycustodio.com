(() => {
  const offers = [
    {copy:'An embedded design partner for your team, from shaping a product flow to getting the details ready for engineering. We agree on capacity, priorities, and collaboration time around the work you need.',format:'An ongoing engagement, shaped around your team. We agree on the number of active priorities, meeting involvement, and how new requests are scheduled.',link:'../melon-trains/',proof:'See the Melon Trains redesign',cta:'Copy email to discuss your team'},
    {copy:'One-to-one support for designers who want a considered critique, a stronger portfolio, or a clearer next step. Bring the work or question you want to focus on.',format:'A focused review or ongoing support, agreed together. We define the topic, what to share beforehand, and the feedback you need to move forward.',link:'../everkind/',proof:'Explore the thinking behind Everkind',cta:'Copy email to discuss mentorship'},
    {copy:'A clear story, thoughtful layouts, and details with character. For a new website or a fresh direction for the one you have, from content structure to responsive design.',format:'Design scope includes art direction, responsive layouts, and handoff. Development, copywriting, hosting, and launch support are discussed separately before we agree the project.',link:'../rhode-island-school-of-design/',proof:'See the RISD website redesign',cta:'Copy email to discuss your website'}
  ];
  document.querySelectorAll('.hire-offer').forEach((card,index)=>{
    const offer=offers[index];if(!offer)return;
    card.querySelector(':scope > p').textContent=offer.copy;
    const format=document.createElement('div');format.className='hire-format';
    const heading=document.createElement('h3');heading.textContent='How it works';
    const copy=document.createElement('p');copy.textContent=offer.format;
    const proof=document.createElement('a');proof.href=offer.link;proof.className='hire-proof';proof.textContent=offer.proof;
    format.append(heading,copy,proof);
    const cta=card.querySelector('.hire-cta');cta.before(format);
    cta.firstChild.textContent=offer.cta+' ';
  });
})();
