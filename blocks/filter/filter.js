/* eslint-disable no-use-before-define */
import renderCards from '../../helper/helper.js';

export default async function decorate(block) {
  //  GET ERROR MESSAGE FROM BLOCK
  const errorRow = block.children[1];
  const errorMessage = errorRow
    ? errorRow.textContent.trim()
    : 'Failed to load adventures.';

  //  REMOVE CONFIG ROWS
  if (block.children[0]) block.children[0].remove();
  if (block.children[0]) block.children[0].remove();

  let items = [];

  try {
  //  GET DATA URL FROM LINK
    const link = block.querySelector('.button-wrapper a');
    const dataUrl = link ? link.href : '/data.json';

    const response = await fetch(dataUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    items = data.data;
  } catch (error) {
  // console.error('Failed to load adventure data:', error);

    block.innerHTML = `
    <div class="error-message">
      ${errorMessage}
    </div>
  `;
    return;
  }

  //  HEADING
  const headingWrapper = document.createElement('div');
  headingWrapper.className = 'adventure-heading';

  const heading = document.createElement('h2');
  heading.textContent = 'Current Adventure';

  headingWrapper.appendChild(heading);
  block.appendChild(headingWrapper);
  //

  // filters container
  const filtersContainer = document.createElement('div');
  filtersContainer.className = 'adventure-filters';

  const categories = ['All', ...new Set(items.map((item) => item.category))];

  categories.forEach((cat) => {
    const filter = document.createElement('div');
    filter.textContent = cat.toUpperCase();
    filter.className = 'adventure-filter';
    if (cat === 'All') filter.classList.add('active');

    filter.addEventListener('click', () => {
      block.querySelectorAll('.adventure-filter')
        .forEach((f) => f.classList.remove('active'));
      filter.classList.add('active');
      // renderCards(cat);
      renderCards(grid, items, cat);
    });

    filtersContainer.appendChild(filter);
  });

  block.appendChild(filtersContainer);

  // grid container
  const grid = document.createElement('div');
  grid.className = 'adventure-grid';
  block.appendChild(grid);

  renderCards(grid, items, 'All');
}
