const slug = document.body.dataset.case;
const study = window.CASE_STUDIES[slug];
const assetRoot = "../assets/case-studies/";

const isDrawerView = new URLSearchParams(window.location.search).has("drawer");
if (isDrawerView) {
  document.body.classList.add("is-drawer-view");
}

if (!study) throw new Error(`Unknown case study: ${slug}`);
// Keep the written story at the opening and closing; preserve every media row and demo.
document.body.classList.add('case-compact-story');
const mediaLayout=study.originalCopy?study.layout:(study.layout||[]).filter(([type])=>type==='media'||type==='embed');
const closing=study.originalCopy?null:study.closing||study.sections?.at(-1);

document.title = `${study.title} - Vinny Custodio`;
document.querySelector("[data-title]").textContent = study.title;
document.querySelector("[data-intro]").textContent = study.intro;
document.querySelector("[data-role]").textContent = study.role;
document.querySelector("[data-goals]").textContent = study.goals;
document.querySelector("[data-timeline]").textContent = study.timeline;
if (study.editorial) {
  document.body.classList.add("case-editorial");
  document.querySelector(".case-facts")?.remove();
  const tags = document.createElement("div"); tags.className = "case-header-tags";
  (study.tags || []).forEach(label => { const tag = document.createElement("span"); tag.textContent = label; tags.append(tag); });
  document.querySelector("[data-title]").before(tags);
}

const story = document.querySelector("[data-gallery]");
story.className = "case-story";
document.querySelector("[data-overview]").remove();
document.querySelector("[data-narrative]").remove();

const mediaRow = (indexes, variant = "") => {
  const row = document.createElement("div");
  row.className = `case-media-row case-media-row--${indexes.length}${variant ? ` case-media-row--${variant}` : ""}`;
  indexes.forEach((index) => {
    const figure = document.createElement("figure");
    figure.className = "case-image";
    const img = document.createElement("img");
    img.src = assetRoot + study.images[index];
    img.alt = study.imageAlts?.[index] || `${study.title} project visual ${index + 1}`;
    img.loading = study.editorial && index > 0 ? "lazy" : "eager";
    if (study.editorial) { img.width = 1312; img.height = [3,6,7,9,10,11].includes(index) ? 620 : index === 2 ? 680 : 738; }
    figure.append(img);
    row.append(figure);
  });
  return row;
};

const overviewBlock = () => {
  const section = document.createElement("section");
  section.className = `case-overview case-overview--${study.overview.length} reveal`;
  if (study.overview.length === 3) section.insertAdjacentHTML("afterbegin", "<h2>Project overview</h2>");
  study.overview.forEach(([title, copy]) => {
    const article = document.createElement("article");
    article.innerHTML = `<h3>${title}</h3><p>${copy}</p>`;
    section.append(article);
  });
  return section;
};

const sectionBlock = (index) => {
  const [title, copy, tag] = study.sections[index];
  const section = document.createElement("section");
  section.className = "case-section reveal";
  if (study.editorial) {
    section.classList.add("case-editorial-section");
    const heading = document.createElement("h2"); heading.textContent = title;
    const body = document.createElement("p"); body.className = "case-editorial-copy"; body.textContent = copy;
    section.append(heading, body);
    return section;
  }
  section.innerHTML = `<p class="case-section-copy">${copy}</p>`;
  return section;
};

const embedBlock = (index) => {
  const embed = study.embeds[index];
  const figure = document.createElement("figure");
  figure.className = `case-animation${embed.format === "wide" ? " case-animation--wide" : ""}`;
  if (study.editorial) figure.classList.add("case-interactive");
  if (embed.background) {
    figure.classList.add("case-animation--layered");
    figure.style.backgroundImage = `url("${assetRoot + embed.background}")`;
  }
  const iframe = document.createElement("iframe");
  iframe.src = embed.src;
  iframe.title = embed.title;
  iframe.loading = study.editorial ? "lazy" : "eager";
  figure.append(iframe);
  return figure;
};

mediaLayout.forEach(([type, value, variant],mediaIndex) => {
  if (type === "media") story.append(mediaRow(value, variant));
  if (type === "overview" && study.overview.length) story.append(overviewBlock());
  if (type === "section") story.append(sectionBlock(value));
  if (type === "embed") story.append(embedBlock(value));
  if(mediaIndex===0&&study.process){
    const block=document.createElement('section');block.className='case-process';
    const introduction=document.createElement('p');introduction.className='case-process-intro';introduction.textContent=study.process.intro;
    block.append(introduction);
    if(study.process.story){const detail=document.createElement('p');detail.className='case-process-detail';detail.textContent=study.process.story;block.append(detail)}
    story.append(block);
  }
});
if(closing){
  const section=document.createElement('section');section.className='case-section case-closing';
  const heading=document.createElement('h2');heading.textContent=closing[0];
  const copy=document.createElement('p');copy.textContent=closing[1];
  section.append(heading,copy);story.append(section);
}

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const reveals = document.querySelectorAll(".reveal");
if (reducedMotion || !("IntersectionObserver" in window)) reveals.forEach((el) => el.classList.add("is-visible"));
else {
  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); }
  }), { threshold: .1 });
  reveals.forEach((el) => observer.observe(el));
}

document.querySelector("[data-year]").textContent = new Date().getFullYear();

if (isDrawerView) {
  const caseOrder = [
    "everkind",
    "melon-trains",
    "rhode-island-school-of-design",
    "design-labs",
    "university-of-mary-washington",
    "control-social",
    "vista-app",
    "pantrx",
    "georgia-department-of-agriculture",
  ];
  const currentIndex = Math.max(0, caseOrder.indexOf(slug));
  const nextSlug = caseOrder[(currentIndex + 1) % caseOrder.length];
  const nextStudy = window.CASE_STUDIES[nextSlug];
  const footer = document.querySelector(".case-footer");
  footer.classList.add("drawer-end");
  const nextColors={"melon-trains":"#ff2b62","rhode-island-school-of-design":"#2857ff","design-labs":"#5b42f3","university-of-mary-washington":"#ffc20a","control-social":"#ff785f","vista-app":"#a78bfa"};
  footer.style.setProperty('--next-color',nextColors[nextSlug] || '#5047f8');
  if (nextSlug === "everkind") footer.style.setProperty("--next-color", "#f7d3e9");
  footer.style.setProperty('--next-ink',['university-of-mary-washington','control-social','vista-app'].includes(nextSlug)?'#17171c':'#fff');
  if (nextSlug === "everkind") footer.style.setProperty("--next-ink", "#322344");
  footer.innerHTML = `
    <p class="drawer-end-label">Next case study</p>
    <h2 class="drawer-next-title">${nextStudy.title}</h2>
    <a class="drawer-next-button" href="../${nextSlug}/?drawer=1">View next case study <span aria-hidden="true">→</span></a>
  `;
  window.parent.postMessage({ type: "case-drawer-title", title: study.title }, window.location.origin);
}
