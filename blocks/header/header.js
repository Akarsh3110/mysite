import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * Decorates the header block.
 * Injects WKND logo and wires up hamburger toggle.
 * Works with the EDS default nav structure where
 * nav links are plain <p> tags in .default-content-wrapper
 * @param {HTMLElement} block The header block element
 */
export default async function decorate(block) {
  // Fetch nav content
  const navMeta = getMetadata('nav');
  const navPath = navMeta ? new URL(navMeta, window.location).pathname : '/nav';

  const fragment = await loadFragment(navPath);

  // Build nav
  block.textContent = '';
  const nav = document.createElement('nav');
  nav.id = 'nav';
  nav.setAttribute('aria-expanded', 'false');

  // Hamburger 
  const hamburger = document.createElement('div');
  hamburger.classList.add('nav-hamburger');
  hamburger.innerHTML = `
    <button type="button" aria-label="Toggle navigation">
      <svg viewBox="0 0 24 24" width="24" height="24">
        <path d="M3 6h18M3 12h18M3 18h18"
          stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
    </button>
  `;

  //  Logo 
  const brand = document.createElement('a');
  brand.classList.add('nav-brand');
  brand.href = '/';
  brand.setAttribute('aria-label', 'WKND Home');
  // brand.textContent = 'WKND';
  const logoWrapper = document.createElement('div');
logoWrapper.classList.add('nav-logo');

// <img src="/icons/wknd-logo-light.svg" alt="WKND Logo" />
logoWrapper.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 239.35 89.09"><title>Asset 2</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_3" data-name="Layer 3"><path d="M60.33,94.83h-13L39.94,47.39h-.25l-7,47.43H19.78L4.9,5.93H19l6.88,46.59h.21L32.45,5.88H46.6l6.86,46.45h.27L60.1,5.92H74.24Z" transform="translate(-4.9 -5.81)"/><path d="M176.45,64.52V5.94h13.49V94.8H175.49l-18.18-56-.23,0v56H143.69v-89h2.61c3.76,0,7.52,0,11.28,0A1.33,1.33,0,0,1,159.14,7q7.54,25.5,15.14,51l2,6.61Z" transform="translate(-4.9 -5.81)"/><path d="M202,5.84h21.67c9.68,0,18.75,7.78,20.19,17.36a30.86,30.86,0,0,1,.35,4.53q0,22.61,0,45.22c0,9.72-5.55,17.9-14.23,20.78a22.16,22.16,0,0,1-6.45,1.09c-6.71.14-13.43.05-20.15.05H202Zm13.44,13.73V81.41c2.76,0,5.44.07,8.11,0A7.56,7.56,0,0,0,231,73.64c0-1,0-2,0-3q0-21.59,0-43.18a7.57,7.57,0,0,0-6.86-7.86C221.31,19.42,218.42,19.57,215.45,19.57Z" transform="translate(-4.9 -5.81)"/><path d="M98.88,94.81H85.34V5.92H98.88V36.78l.26.05,4.14-8q5.64-11,11.26-22a1.56,1.56,0,0,1,1.63-1c4,.05,8.08,0,12.12,0h1.24L128.44,8q-8.39,16.63-16.8,33.25a2.16,2.16,0,0,0-.09,2q10.31,25.15,20.57,50.32c.15.36.28.73.47,1.22-.39,0-.68.09-1,.09-4.6,0-9.2,0-13.8,0a1.3,1.3,0,0,1-1.44-1q-6.52-16.8-13.1-33.58c-.14-.36-.3-.72-.54-1.32-.94,1.89-1.71,3.62-2.65,5.25a9.9,9.9,0,0,0-1.25,5.25c.07,8,0,15.92,0,23.88Z" transform="translate(-4.9 -5.81)"/></g></g></svg>
`;

brand.appendChild(logoWrapper);

  //  Nav sections from fragment 
  // The fragment contains .section > .default-content-wrapper > <p> per link
  while (fragment.firstElementChild) {
    nav.append(fragment.firstElementChild);
  }

  // Prepend hamburger and logo before the sections
  nav.prepend(brand);
  nav.prepend(hamburger);

  //  Hamburger toggle 
  hamburger.querySelector('button').addEventListener('click', () => {
    const expanded = nav.getAttribute('aria-expanded') === 'true';
    nav.setAttribute('aria-expanded', expanded ? 'false' : 'true');
  });

  // Close nav when clicking outside
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target)) {
      nav.setAttribute('aria-expanded', 'false');
    }
  });
  // Convert nav <p> items to links
const navItems = nav.querySelectorAll('.default-content-wrapper p');

navItems.forEach((item) => {
  const text = item.textContent.trim().toLowerCase();

  // Create URL path (example: Adventure → /adventure)
  const path = `/${text.replace(/\s+/g, '-')}`;

  const link = document.createElement('a');
  link.href = path;
  link.textContent = item.textContent;

  item.replaceWith(link);
});
const currentPath = window.location.pathname.replace(/\/$/, '');

  const links = nav.querySelectorAll('.default-content-wrapper a');

  links.forEach((link) => {
    const linkPath = link.getAttribute('href').replace(/\/$/, '');

    if (
      currentPath === linkPath ||
      currentPath.startsWith(linkPath + '/')
    ) {
      link.classList.add('active');
    }
  });

  
// SEARCH BOX
const searchWrapper = document.createElement('div');
searchWrapper.classList.add('nav-search');

{/* <svg viewBox="0 0 24 24" width="16" height="16">
      <circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2" fill="none"/>
      <line x1="16.5" y1="16.5" x2="22" y2="22"
        stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </svg> */}
searchWrapper.innerHTML = `
  <span class="search-icon">
    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 width="18px" height="18px" viewBox="0 0 1152 1152" enable-background="new 0 0 1152 1152" xml:space="preserve">
<path d="M672,0C406.903,0,192,214.903,192,480c0,95.7,28.011,184.855,76.275,259.725C181.646,826.354,48.075,959.925,36,972
	c-18,18-36,36-36,72s18,54,36,72s36.012,36,72,36s54-18,72-36c12.075-12.075,145.646-145.646,232.275-232.275
	C487.144,931.988,576.3,960,672,960c265.097,0,480-214.903,480-480C1152,214.903,937.097,0,672,0z M672,816
	c-185.568,0-336-150.433-336-336c0-185.568,150.432-336,336-336c185.567,0,336,150.432,336,336C1008,665.567,857.567,816,672,816z"
	/>
</svg>

  </span>
  <input type="text" placeholder="SEARCH" />
`;

// Append search inside nav section (right side)
const navSection = nav.querySelector('.section');
navSection.appendChild(searchWrapper);

  block.append(nav);


// SHRINK HEADER ON SCROLL

const headerWrapper = document.querySelector('.header-wrapper');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    headerWrapper.classList.add('scrolled');
  } else {
    headerWrapper.classList.remove('scrolled');
  }
});
}