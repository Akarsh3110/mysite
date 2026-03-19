import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**

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
      
      <svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4 18H10" stroke="#000000" stroke-width="2" stroke-linecap="round"/>
<path d="M4 12L16 12" stroke="#000000" stroke-width="2" stroke-linecap="round"/>
<path d="M4 6L20 6" stroke="#000000" stroke-width="2" stroke-linecap="round"/>
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
      currentPath === linkPath
      || currentPath.startsWith(`${linkPath}/`)
    ) {
      link.classList.add('active');
    }
  });

  // SEARCH BOX
  const searchWrapper = document.createElement('div');
  searchWrapper.classList.add('nav-search');

  searchWrapper.innerHTML = `
  <span class="search-icon">
    <img src="/icons/search.svg" alt="Search" />
  </span>
  <input type="text" placeholder="SEARCH" />
`;

  // Append search inside nav section (right side)
  const navSection = nav.querySelector('.section');
  navSection.appendChild(searchWrapper);

  block.append(nav);

  // SEARCH FUNCTIONALITY

  const searchInput = searchWrapper.querySelector('input');

  // Map of valid routes
  const routes = {
    adventures: '/adventures',
    magazine: '/magazine',
    faq: '/faqs',
    faqs: '/faqs',
    'about us': '/about-us',
  };

  // Toast function
  function showToast(message) {
    let toast = document.querySelector('.search-toast');

    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'search-toast';
      document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 2500);
  }

  // Handle search
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const value = searchInput.value.trim().toLowerCase();

      if (!value) return;

      // Exact match
      if (routes[value]) {
        window.location.href = routes[value];
        return;
      }

      // Partial match
      const match = Object.keys(routes).find((key) => value.includes(key));

      if (match) {
        window.location.href = routes[match];
      } else {
        showToast('Page not found');
      }
    }
  });

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
