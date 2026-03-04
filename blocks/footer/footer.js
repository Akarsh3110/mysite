import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

export default async function decorate(block) {
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta
    ? new URL(footerMeta, window.location).pathname
    : '/footer';

  const fragment = await loadFragment(footerPath);

  block.textContent = '';

  const container = document.createElement('div');
  container.classList.add('footer-container');

  const content = fragment.querySelector('.default-content-wrapper');
  const paragraphs = [...content.querySelectorAll('p')];

  // Create Structure
  const footerTop = document.createElement('div');
  footerTop.classList.add('footer-top');

  const footerLeft = document.createElement('div');
  footerLeft.classList.add('footer-left');

  const footerRight = document.createElement('div');
  footerRight.classList.add('footer-right');

  const footerBottom = document.createElement('div');
  footerBottom.classList.add('footer-bottom');

  // ===== Append Elements Based on Order =====
  // 0 = logo
  // 1-4 = nav links
  footerLeft.append(
    paragraphs[0],
    paragraphs[1],
    paragraphs[2],
    paragraphs[3],
    paragraphs[4],
  );

  // 5 = FOLLOW US
  // 6-8 = social icons
  footerRight.append(
    paragraphs[5],
    paragraphs[6],
    paragraphs[7],
    paragraphs[8],
  );

  // 9-10 = copyright + description
  footerBottom.append(
    paragraphs[9],
    paragraphs[10],
  );

  footerTop.append(footerLeft, footerRight);
  container.append(footerTop, footerBottom);
  block.append(container);
}
