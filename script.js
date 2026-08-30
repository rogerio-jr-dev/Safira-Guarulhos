const amenityData = [
  'Salão de festas','Brinquedoteca','Espaço gourmet','Piscina infantil','Piscina com deck','Casa de campo','2 churrasqueiras','Quadra de areia','Quadra gramada','Pet place','Playground','Sala de cinema','Minimercado','Espaço delivery','Sala de jogos','Sport bar','Lavanderia','Academia','Espaço beleza','Sala de massagem','Espaço cross fit','Espaço zen','Espaço manicure'
];

const benefitData = [
  ['Torneiras econômicas','Dispositivos que economizam água.'],
  ['Vaso sanitário','Duplo acionamento.'],
  ['Medição de gás','Previsão para individualização.'],
  ['Sensores de presença','No hall dos apartamentos.'],
  ['Lâmpadas LED','Entregues no hall.'],
  ['Paisagismo','Plantas nativas de baixa manutenção.'],
  ['Ponto de TV','Na sala, com previsão de cabeamento nos quartos.'],
  ['Gás encanado','Ponto para fogão e chuveiro.'],
  ['Impermeabilização','Banheiros, área de serviço e terraços.'],
  ['Área verde','Favorece a permeabilidade da chuva no solo.'],
  ['Elevadores','Quatro por torre: dois sociais e dois de serviço.'],
  ['Acabamentos','Materiais de qualidade escolhidos para facilitar limpeza e manutenção.'],
  ['Bicicletário','Espaço para armazenamento de bicicletas.']
];

const specData = [
  ['Endereço','Rua Armando Endres, 333','Jardim Vila Galvão'],
  ['Área do terreno','9.500 m²',''],
  ['Área construída','44.325,50 m²',''],
  ['Torres','2 torres residenciais',''],
  ['Unidades totais','656 unidades',''],
  ['Unid. por pavimento','14 unidades',''],
  ['Pavimentos','Térreo + 23','pavimentos'],
  ['Área tipo meio','40,72 m²','2 dormitórios'],
  ['Área tipo ponta','42,25 m²','2 dormitórios'],
  ['Vagas carros','636',''],
  ['Vagas motos','40',''],
  ['Vagas visitantes','32',''],
  ['Incorporação / construção','Cavazani Construtora','']
];

// Dados atualizados para suportar um carrossel robusto (10+ imagens)
const galleryData = [
  { src: 'assets/gallery-piscina.jpg', title: 'Piscina com deck', label: 'Lazer', fallback: 'Imagem da piscina' },
  { src: 'assets/gallery-churrasqueira.jpg', title: 'Churrasqueira', label: 'Convivência', fallback: 'Imagem da churrasqueira' },
  { src: 'assets/gallery-academia.jpg', title: 'Academia', label: 'Bem-estar', fallback: 'Imagem da academia' },
  { src: 'assets/gallery-crossfit.jpg', title: 'Espaço Cross Fit', label: 'Saúde', fallback: 'Imagem do cross fit' },
  { src: 'assets/gallery-salao.jpg', title: 'Salão de festas', label: 'Convivência', fallback: 'Imagem do salão de festas' },
  { src: 'assets/gallery-playground.jpg', title: 'Playground', label: 'Família', fallback: 'Imagem do playground' },
  { src: 'assets/gallery-gourmet.jpg', title: 'Espaço Gourmet', label: 'Gastronomia', fallback: 'Imagem do espaço gourmet' },
  { src: 'assets/gallery-pet-place.jpg', title: 'Pet Place', label: 'Seu pet', fallback: 'Imagem do Pet Place' },
  { src: 'assets/gallery-cinema.jpg', title: 'Sala de Cinema', label: 'Entretenimento', fallback: 'Imagem da sala de cinema' },
  { src: 'assets/gallery-brinquedoteca.jpg', title: 'Brinquedoteca', label: 'Diversão', fallback: 'Imagem da brinquedoteca' },
  { src: 'assets/gallery-quadra.jpg', title: 'Quadra Gramada', label: 'Esportes', fallback: 'Imagem da quadra' },
  { src: 'assets/gallery-quadraareia.jpg', title: 'Quadra de Areia', label: 'Exclusivo', fallback: 'Imagem da quadra de areia' },
  { src: 'assets/gallery-massagem.jpg', title: 'Espaço de Massagem', label: 'Saúde', fallback: 'Imagem da sala de massagem' }
];

/* =========================================================
   ESTADO DO CARROSSEL
========================================================= */
let currentGalleryIndex = 0;
let galleryAutoplayInterval;
let isGalleryAnimating = false;

/* =========================================================
   FUNÇÕES DE RENDERIZAÇÃO GERAIS
========================================================= */

function renderAmenities() {
  const grid = document.querySelector('#amenities-grid');
  const cloud = document.querySelector('#amenity-cloud');

  const categories = [
    { title: 'Convivência', items: ['Salão de festas','Espaço gourmet','Casa de campo','2 churrasqueiras','Sport bar','Sala de jogos'] },
    { title: 'Esporte & lazer', items: ['Piscina infantil','Piscina com deck','Quadra de areia','Quadra gramada','Academia','Espaço cross fit','Playground','Pet place'] },
    { title: 'Bem-estar', items: ['Espaço beleza','Sala de massagem','Espaço zen','Espaço manicure','Lavanderia'] },
    { title: 'Comodidade', items: ['Brinquedoteca','Sala de cinema','Minimercado','Espaço delivery'] }
  ];

  let counter = 1;
  grid.innerHTML = categories.map(category => {
    const items = category.items.map(name => {
      const number = String(counter).padStart(2, '0');
      counter++;
      return `
        <div class="amenity-item">
          <span class="amenity-number">${number}</span>
          <div class="amenity-name"><strong>${name}</strong></div>
        </div>
      `;
    }).join('');

    return `
      <div class="amenity-column reveal">
        <div class="amenity-column-header"><span></span><h3>${category.title}</h3></div>
        <div class="amenity-column-list">${items}</div>
      </div>
    `;
  }).join('');

  if (cloud) {
    cloud.innerHTML = amenityData.map(name => `<span>${name}</span>`).join('');
  }
}

function renderBenefits(){
  document.querySelector('#benefits-list').innerHTML = benefitData.map(([title,desc])=>`<div class="benefit-item"><strong>${title}</strong><span>${desc}</span></div>`).join('');
}

function renderSpecs(){
  document.querySelector('#spec-grid').innerHTML = specData.map(([label,value,detail])=>`<article class="spec-card"><small>${label}</small><strong>${value}</strong>${detail?`<span>${detail}</span>`:''}</article>`).join('');
}

/* =========================================================
   LÓGICA DO CARROSSEL (GALERIA)
========================================================= */

function galleryCard(item, extra=''){
  return `<article class="gallery-slide ${extra}" data-src="${item.src}" data-title="${item.title}"><img src="${item.src}" alt="${item.title}" onerror="this.closest('.gallery-slide').classList.add('missing'); this.remove();"><div class="missing-copy">${item.fallback}</div><div class="gallery-slide-copy"><small>${item.label}</small><strong>${item.title}</strong></div></article>`;
}

function renderGallery(){
  const root = document.querySelector('#gallery-slider');
  if(!root) return;

  // Estilo global corrigido (esconde o texto por padrão, exibe só se der erro)
  if (!document.getElementById('gallery-missing-style')) {
    const missingStyle = document.createElement('style');
    missingStyle.id = 'gallery-missing-style';
    missingStyle.textContent = `.missing-copy{display:none}.gallery-slide.missing{display:grid;place-items:center;background:linear-gradient(135deg,#1d477b,#0b1730)}.gallery-slide.missing .missing-copy{display:block;position:absolute;z-index:1;color:#a9ddff;font:800 20px Montserrat;text-align:center;max-width:240px}.gallery-side .missing-copy{font-size:14px}.gallery-slide.missing:after{display:none}`;
    document.head.appendChild(missingStyle);
  }

  // Prepara o contêiner para animações
  root.style.transition = 'opacity 0.25s ease-in-out';
  
  updateGalleryView();
  setupGallerySwipeAndAutoplay();
}
function updateGalleryView() {
  const root = document.querySelector('#gallery-slider');
  if(!root) return;

  const len = galleryData.length;
  const i0 = currentGalleryIndex;
  const i1 = (currentGalleryIndex + 1) % len;
  const i2 = (currentGalleryIndex + 2) % len;

  root.style.opacity = '0';
  
  setTimeout(() => {
    root.innerHTML = `
      <div class="gallery-main">${galleryCard(galleryData[i0])}</div>
      <div class="gallery-side">
        ${galleryCard(galleryData[i1])}
        ${galleryCard(galleryData[i2])}
      </div>
    `;
    
    root.style.opacity = '1';
    isGalleryAnimating = false;

    // Recria os listeners do modal para os novos elementos injetados
    root.querySelectorAll('.gallery-slide').forEach(el => {
      el.addEventListener('click', () => openModal(el.dataset.src, el.dataset.title));
    });
  }, 250);
}

function nextGallerySlide() {
  if (isGalleryAnimating) return;
  isGalleryAnimating = true;
  currentGalleryIndex = (currentGalleryIndex + 1) % galleryData.length;
  updateGalleryView();
  resetGalleryAutoplay();
}

function prevGallerySlide() {
  if (isGalleryAnimating) return;
  isGalleryAnimating = true;
  currentGalleryIndex = (currentGalleryIndex - 1 + galleryData.length) % galleryData.length;
  updateGalleryView();
  resetGalleryAutoplay();
}

function setupGalleryControls() {
  const btnNext = document.querySelector('.gallery-next');
  const btnPrev = document.querySelector('.gallery-prev');
  if(btnNext) btnNext.addEventListener('click', nextGallerySlide);
  if(btnPrev) btnPrev.addEventListener('click', prevGallerySlide);
}

function setupGallerySwipeAndAutoplay() {
  const root = document.querySelector('#gallery-slider');
  let touchStartX = 0;
  let touchEndX = 0;

  // Lógica de Swipe
  root.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  root.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchStartX - touchEndX > 50) nextGallerySlide(); // Swipe Esquerda
    if (touchEndX - touchStartX > 50) prevGallerySlide(); // Swipe Direita
  }, { passive: true });

  // Autoplay com pausa no Hover
  startGalleryAutoplay();
  root.addEventListener('mouseenter', () => clearInterval(galleryAutoplayInterval));
  root.addEventListener('mouseleave', startGalleryAutoplay);
}

function startGalleryAutoplay() {
  galleryAutoplayInterval = setInterval(() => {
    if(!isGalleryAnimating) nextGallerySlide();
  }, 4500); // Avança a cada 4.5 segundos
}

function resetGalleryAutoplay() {
  clearInterval(galleryAutoplayInterval);
  startGalleryAutoplay();
}

/* =========================================================
   MODAL E UX GERAL
========================================================= */

function openModal(src, title){
  const modal = document.querySelector('#image-modal');
  const img = document.querySelector('#modal-image');
  const cap = document.querySelector('#modal-caption');
  
  if(!src || src.includes('undefined')) return; // Previne erro se a imagem não existir
  
  img.src = src; 
  img.alt = title; 
  cap.textContent = title;
  modal.classList.add('is-open'); 
  modal.setAttribute('aria-hidden','false');
}

function closeModal(){
  const modal = document.querySelector('#image-modal');
  modal.classList.remove('is-open'); 
  modal.setAttribute('aria-hidden','true');
}

function setupNav(){
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  toggle.addEventListener('click',()=>{
    const open = !nav.classList.contains('open');
    nav.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded','false');
  }));
}

function setupReveal(){
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: .12 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

function setupForm(){
  document.querySelector('#contact-form').addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const nome = data.get('nome'); 
    const email = data.get('email'); 
    const tel = data.get('telefone'); 
    const msg = data.get('mensagem') || 'Quero receber mais informações sobre o Safira Condomínio Club.';
    const subject = encodeURIComponent(`Interesse no Safira Condomínio Club — ${nome}`);
    const body = encodeURIComponent(`Nome: ${nome}\nE-mail: ${email}\nTelefone: ${tel}\n\nMensagem:\n${msg}`);
    window.location.href = `mailto:SEUEMAIL@DOMINIO.COM?subject=${subject}&body=${body}`;
  });
}

// Fechamento Global do Modal
document.querySelector('.modal-close').addEventListener('click', closeModal);
document.querySelector('#image-modal').addEventListener('click', e => { if(e.target.id === 'image-modal') closeModal() });
document.addEventListener('keydown', e => { if(e.key === 'Escape') closeModal() });

// Init
renderAmenities();
renderBenefits();
renderSpecs();
renderGallery();
setupGalleryControls();
setupNav();
setupReveal();
setupForm();