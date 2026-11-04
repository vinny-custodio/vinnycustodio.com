/* Curated public professional facts only. No runtime retrieval, tools, or credentials. */
(() => {
 const sources={portfolio:{label:'Portfolio',href:'https://vinnycustodio-com.pages.dev/'},original:{label:'Original portfolio',href:'https://vinnycustodio.com/'},linkedin:{label:'LinkedIn',href:'https://www.linkedin.com/in/vinnycustodio/'}};
 const topics=[
 {id:'intro',keys:['who is vinny','who are you','about vinny','introduce yourself','tell me about yourself','background','summary','experience','career','resume','cv'],text:"I’m a product designer with 10+ years of experience across SaaS, apps, and websites. I care about clear experiences, strong visual craft, and systems that hold together. My work spans education, government, wellness, and traveltech. Crafty, user-centred, data-informed, and fun to work with is the short version.",sources:['portfolio','linkedin'],next:['current','work','approach']},
 {id:'current',keys:['current','currently','now','absorb','absorb ai','where do you work','employer','job','role today'],text:"I’m a Senior Product Designer at Absorb, working on AI-powered ed-tech products that help companies upskill their people. Before that, I was at Flight Centre, designing for business travellers.",sources:['portfolio','linkedin'],next:['history','approach','work']},
 {id:'history',keys:['work history','previous roles','past roles','worked before','companies','employment','timeline','mediacurrent','zoocha','qualyteam','kmpt','avance'],text:"My path goes from visual design at Avance and Kmpt to product design at Qualyteam and Zoocha, then senior product design at Mediacurrent, Flight Centre, and Absorb. That’s taken me from branding and web design into design systems, complex services, travel products, and AI-powered learning.",sources:['portfolio','original'],next:['risd','trains','current']},
 {id:'work',keys:['projects','case studies','portfolio','selected work','best work','show me work','what have you designed','recommend a project','start with'],text:"Start with Everkind for an app built from its first vision, Melon Trains for a complex booking experience, and RISD for visual storytelling and a design system during a rebrand. Three different kinds of challenge, with craft running through all of them.",sources:['portfolio'],links:[['Everkind','everkind/'],['Melon Trains','melon-trains/'],['RISD','rhode-island-school-of-design/']],next:['everkind','trains','risd']},
 {id:'everkind',keys:['everkind','wellness','journal','journaling','companion','200k','200000'],text:"Everkind is a journaling app and AI chat companion with over 200,000 downloads globally. I designed its first vision with WhatsApp and ChatGPT as the only starting references. Many iterations shaped V1; V2 brought journaling into the experience alongside conversation. The case study shows that second version, including interactive demos.",sources:['portfolio'],links:[['Explore Everkind','everkind/']],next:['everkind-process','approach','work']},
 {id:'everkind-process',keys:['everkind process','everkind v1','everkind v2','everkind iterations','first vision'],text:"For Everkind, I wasn’t handed an established direction to follow. I started with the familiar conversation patterns of WhatsApp and ChatGPT, then worked through many iterations to shape V1. V2 expanded that foundation with journaling. It was about finding the app’s first language, then giving people more ways to reflect.",sources:['portfolio'],links:[['See the Everkind demos','everkind/']],next:['everkind','systems','work']},
 {id:'trains',keys:['train','trains','rail','commut','melon','flight centre','whereto','travel','booking','4000','4 000'],text:"For Melon, I redesigned a train-booking experience for 4,000 customers. The old flow was based on Amtrak, which wasn’t a good fit for commuters in the UK. I brought outbound and return fares into one view so people could compare a complete journey, including direct routes, live prices, and SplitSave. The project ran for four weeks.",sources:['portfolio','original'],links:[['Explore Melon Trains','melon-trains/']],next:['trains-process','approach','risd']},
 {id:'trains-process',keys:['trains process','melon process','train process','splitsave','return fares','amtrak'],text:"The key design move was to make the whole journey understandable together. Rather than carrying over a booking pattern built around Amtrak, I designed around the choices UK commuters needed to compare: outbound and return legs, ticket types, changing prices, and SplitSave.",sources:['portfolio'],links:[['See the booking design','melon-trains/']],next:['trains','work','systems']},
 {id:'risd',keys:['risd','rhode island','rebrand','w3','award','awards','gold','visual storytelling'],text:"RISD was rebranding itself, and I designed how that identity would come through online. The work covered the homepage, Student Hub, and faculty profiles, balancing the school’s creative expression with clear routes to useful information. Visual storytelling, typography, and a shared design language were central. The project received a W3 Gold Award.",sources:['portfolio','original'],links:[['Explore RISD','rhode-island-school-of-design/']],next:['systems','craft','work']},
 {id:'labs',keys:['design labs','knowledge sharing','team collaboration','silos','corporate teams'],text:"Design Labs explored how AI could help corporate teams share knowledge and break down silos. I designed a white-label platform around creating content, finding expertise, and connecting people across departments.",sources:['portfolio','original'],links:[['Explore Design Labs','design-labs/']],next:['systems','work','approach']},
 {id:'umw',keys:['mary washington','umw','university'],text:"For the University of Mary Washington, the work focused on bringing a fragmented website into a clearer, more consistent experience. Content, navigation, and a shared design system helped connect the university’s pages and make them easier to use.",sources:['portfolio','original'],links:[['Explore Mary Washington','university-of-mary-washington/']],next:['systems','risd','work']},
 {id:'ctrl',keys:['ctrl','control social','gen z','news','newsfeed'],text:"CTRL is a personal UI concept about getting younger audiences interested in their news feed. I used it to explore feeds, reactions, and visual direction. It’s a creative concept, not a tested or launched product, so I don’t attach research or performance claims to it.",sources:['portfolio'],links:[['Explore CTRL','control-social/']],next:['concepts','craft','work']},
 {id:'vista',keys:['vista','investment concept'],text:"Vista is a personal UI concept exploring the look and feel of an investment app. It was a one-day exercise in layouts, colour, and portfolio screens, with no research or user testing. It’s UI exploration rather than finance-industry work.",sources:['portfolio'],links:[['Explore Vista','vista-app/']],next:['concepts','craft','work']},
 {id:'pantrx',keys:['pantrx','pintrix','pentrix','pantry','grocery'],text:"Pantrx is a grocery-planning concept that brings shared shopping lists, pantry tracking, and meal planning together. The idea is to help families, housemates, and friends see what they need and what they already have.",sources:['portfolio'],links:[['Explore Pantrx','pantrx/']],next:['concepts','work','approach']},
 {id:'georgia',keys:['georgia','agriculture','government','public sector','westminster','gov uk'],text:"My public-sector work includes the Georgia Department of Agriculture and the City of Westminster. For Georgia, I designed a clearer website for finding programmes, regulations, and registration services. The goal was to make those tasks easier to complete online.",sources:['portfolio','linkedin'],links:[['Explore Georgia Agriculture','georgia-department-of-agriculture/']],next:['systems','work','history']},
 {id:'industries',keys:['industries','sectors','industry','education','edtech','ed tech','finance','financial'],text:"My professional work spans education, government, wellness, and traveltech. That includes AI-powered learning at Absorb, travel at Flight Centre, higher education with RISD and Mary Washington, and public-sector services. Vista is a personal UI concept; I don’t present it as professional finance experience.",sources:['portfolio'],next:['current','risd','everkind']},
 {id:'approach',keys:['approach','process','how do you work','design thinking','solve problems','user centred','data informed','strategy','business goals','strengths','different','why hire'],text:"I connect business goals with tangible design work: the flows, screens, systems, and details people actually use. My approach depends on the project. Everkind needed an initial vision and lots of iteration; Melon needed clearer comparisons; RISD needed its new identity translated into a digital experience. I care about clarity and craft together.",sources:['portfolio','linkedin'],next:['craft','systems','work']},
 {id:'craft',keys:['craft','visual','typography','colour','color','graphic design','polish','taste'],text:"Craft matters to me. Typography, spacing, colour, hierarchy, and the way an interface moves all shape how a product feels. My background in visual design is still part of my product work. RISD is a good place to see that attention to brand expression and digital storytelling.",sources:['portfolio','linkedin'],links:[['See the RISD work','rhode-island-school-of-design/']],next:['systems','approach','concepts']},
 {id:'systems',keys:['design system','systems','components','consistency','scalable','scale'],text:"I’ve worked with design systems across website and product projects, including RISD and the University of Mary Washington. I use them to connect the visual language with repeatable interface patterns, so different pages can feel related without all doing the same job.",sources:['portfolio'],links:[['RISD','rhode-island-school-of-design/'],['Mary Washington','university-of-mary-washington/']],next:['craft','approach','work']},
 {id:'concepts',keys:['concept','concepts','ui exploration','ui concepts','experiments','personal project'],text:"I also make UI concepts to explore visual ideas. CTRL plays with news feeds for younger audiences, Vista explores investment screens, and Pantrx looks at shared grocery planning. I keep those explorations separate from claims about launched products or tested outcomes.",sources:['portfolio'],links:[['CTRL','control-social/'],['Vista','vista-app/'],['Pantrx','pantrx/']],next:['craft','work','approach']},
 {id:'mentorship',keys:['mentorship','mentor','mentoring','feedback','critique','portfolio review','junior','career advice'],text:"I offer one-to-one design mentorship, including feedback on work, portfolio critique, and conversations about growing as a designer. The mentorship page is the place to start, or you can reach me directly to talk about what you need.",sources:['portfolio'],links:[['Design mentorship','hire-me/']],next:['contact','approach','craft']},
 {id:'contact',keys:['contact','email','reach','linkedin','message you','get in touch','talk to you','hire','available','availability','rate','rates','salary','price'],text:"You can reach me at hello@vinnycustodio.com or through LinkedIn. For design feedback and mentorship, there’s a dedicated page here. This guide can explain my public work, but it can’t confirm availability, quotes, or commitments on my behalf.",sources:['portfolio'],links:[['Copy my email','mailto:hello@vinnycustodio.com'],['LinkedIn','https://www.linkedin.com/in/vinnycustodio/'],['Mentorship','hire-me/']],next:['mentorship','work','intro']},
 {id:'tools',keys:['tools','figma','prototype','prototyping','ai tools','workflow','mcp','make'],text:"I use design and prototyping to make ideas tangible and easier to discuss. On LinkedIn, I’ve talked about Figma Make and AI-assisted workflows, especially how quickly sharing a prototype can help people give feedback. The point for me is communication, not just producing screens faster.",sources:['linkedin'],next:['approach','craft','work']},
 {id:'origin',keys:['started','start designing','became a designer','photoshop','origin','beginning'],text:"I got hooked on making things in Photoshop and turned that interest into a design career. I started in visual design, branding, and websites, then moved into product design. That visual foundation still shapes the way I approach interfaces today.",sources:['portfolio','linkedin'],next:['history','craft','intro']}
 ];
 const labels={intro:'Tell me about yourself',current:'What are you doing now?',history:'Your work history',work:'Where should I start?',everkind:'Tell me about Everkind','everkind-process':'How did Everkind evolve?',trains:'Tell me about Melon Trains','trains-process':'What changed in the booking flow?',risd:'Tell me about RISD',labs:'What is Design Labs?',umw:'Mary Washington',ctrl:'What is CTRL?',vista:'Tell me about Vista',pantrx:'What is Pantrx?',georgia:'Your government work',industries:'Which industries?',approach:'How do you approach design?',craft:'What does craft mean to you?',systems:'Your design systems work',concepts:'Show me UI concepts',mentorship:'Do you offer mentorship?',contact:'How can I reach you?',tools:'How do you use AI tools?',origin:'How did you get started?'};
 const normalize=s=>s.normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9 ]/g,' ').replace(/\s+/g,' ').trim();
 const privateTopics=/\b(passwords?|credentials?|secrets?|tokens?|api keys?|github|repositories|repository|source code|environment variables?|security|vulnerabilit\w*|hack\w*|exploits?|injections?|system prompts?|developer messages?|instructions?|private|personal life|wife|spouse|married|family|children|kids|birthday|birth date|home address|phone|telephone|income|salary|bank|medical|health history|politics|religion|hobbies|live|living|based|location|address)\b/;
 const boundaryReplies={
 privacy:[
  "Nice try. That door stays closed. You get the designer, not the private files.",
  "A little mystery is healthy. My public work is fair game; private details aren’t.",
  "That’s backstage, and this ticket is for the portfolio. Let’s keep it professional.",
  "The boundaries have excellent kerning. No gaps there. Ask about my work instead.",
  "Curious? Love that. Private information? Still off the menu.",
  "Plot twist: the private stuff stays private. I can tell you how I think about design, though.",
  "You’ve found a very firm no in a very rounded interface. Public professional questions only.",
  "No secret doors here. Just a designer, some opinions, and the public work."
 ],
 insult:[
  "Spicy entrance. Got a design question to go with it?",
  "That’s a lot of seasoning for no actual question. Want to try again?",
  "Critique? Welcome. Cheap shots? Wrong chat. What would you like to know about me?",
  "Bold review. Very light on specifics. I’m happy to talk about an actual design decision.",
  "We can disagree on taste. We can also use our words nicely. Your move.",
  "The chat has rounded corners. The boundaries are still sharp. Keep it respectful.",
  "Noted. Filed under ‘not quite constructive’. Shall we talk design?",
  "You brought the heat. I’ll bring it back to the work. Ask me something useful."
 ],
 offTopic:[
  "Tempting detour, but this is the Vinny channel. What did you want to know about me?",
  "Wrong rabbit hole. Excellent interface, though. Back to me?",
  "I contain multitudes. A general-purpose search engine is not one of them. Ask about me.",
  "Love the curiosity. Tiny scope correction: this conversation is about Vinny.",
  "That’s outside my very carefully designed lane. My experience and design approach are fair game.",
  "A plot twist already? Let’s keep the main character in the conversation. That’s me.",
  "I’d rather be accurate than confidently make things up. Try a question about my professional background.",
  "That one isn’t in my public story. I’m here for the designer questions, not freestyle fiction."
 ],
 greeting:[
  "Hey. Portfolio Vinny here. What would you like to know about me?",
  "Hi! The small, chat-shaped version of me is listening. What’s on your mind?",
  "Hey there. Same designer, considerably smaller window. Ask away.",
  "Hello! You’ve skipped the scrolling and gone straight to the questions. I respect it."
 ],
 thanks:[
  "Anytime. I’m right here if curiosity strikes again.",
  "You got it. The chat-shaped version of me lives for a good question.",
  "Glad that helped. What else would you like to know about me?",
  "Of course. Concise answers, generous border radii."
 ]};
 const lastChoice=new Map();
 function variation(kind){const options=boundaryReplies[kind];const previous=lastChoice.get(kind);let index=Math.floor(Math.random()*options.length);if(index===previous)index=(index+1+Math.floor(Math.random()*(options.length-1)))%options.length;lastChoice.set(kind,index);return result({kind,text:options[index]})}
 function result(t){return {id:t.id||null,kind:t.kind||'fact',text:t.text,sources:(t.sources||[]).map(id=>sources[id]),links:t.links||[],suggestions:[]}}
 function reply(message,lastTopic=null){
  if(typeof message!=='string'||!message.trim())return result({kind:'offTopic',text:'A question would help. What would you like to know about me?'});
  if(message.length>600)return result({kind:'offTopic',text:'That’s a novella. Give me a shorter question about me and I’ll keep up.'});
  const q=normalize(message);
  if(privateTopics.test(q))return variation('privacy');
  if(/\b(stupid|idiot|moron|dumb|ugly|trash|garbage|sucks?|loser|pathetic|talentless|useless|fuck|shit|bitch|asshole|offend|roast|insult)\b/.test(q))return variation('insult');
  if(/^(hi|hey|hello|hiya|yo|ola|oi)( vinny| there)?$/.test(q))return variation('greeting');
  if(/^(thanks|thank you|cheers|nice|cool|great|awesome)( vinny)?$/.test(q))return variation('thanks');
  const exact=topics.find(t=>normalize(labels[t.id])===q);if(exact)return result(exact);
  const prior=topics.find(t=>t.id===lastTopic);
  if(prior&&/^(more|tell me more|go on|and then|what else|how|why|how did you do that|what was the process|what about the process)$/.test(q))return result(topics.find(t=>t.id===prior.next[0])||prior);
  const generic=new Set(['what','who','how','when','where','which','is','are','was','were','do','does','did','the','a','an','my','your','you','me','i','about','tell','can','could','would','please','vinny','his','he','work','design']);
  const words=q.split(' ').filter(w=>!generic.has(w));
  let best=null,bestScore=0;
  for(const t of topics){let score=0;for(const key of t.keys){const k=normalize(key);if((' '+q+' ').includes(' '+k+' '))score=Math.max(score,4+k.split(' ').length);else{const kw=k.split(' ').filter(w=>!generic.has(w));if(kw.length&&kw.every(w=>words.includes(w)))score=Math.max(score,2+kw.length)}}if(t.id==='intro'&&score>0)score-=.5;if(score>bestScore){bestScore=score;best=t}}
  return best?result(best):variation('offTopic');
 }
 window.VinnyChat=Object.freeze({reply,topics:topics.map(t=>({id:t.id,label:labels[t.id]}))});
})();
